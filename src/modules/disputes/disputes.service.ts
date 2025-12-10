import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateDisputeDto } from './dtos/create-dispute.dto';
import { ResolveDisputeDto } from './dtos/resolve-dispute.dto';
import { BusinessLoggerService } from '../../common/logger/business-logger.service';
import { RateLimiterService } from '../../common/rate-limiter/rate-limiter.service';

@Injectable()
export class DisputesService {
  private readonly logger = new Logger(DisputesService.name);

  constructor(
    private prisma: PrismaService,
    private businessLogger: BusinessLoggerService,
    private rateLimiter: RateLimiterService,
  ) {}

  async createDispute(userId: string, userRole: string, dto: CreateDisputeDto) {
    try {
      this.logger.log(
        `Creating dispute for booking ${dto.bookingId} by user ${userId}`,
      );

      // Check rate limit
      this.rateLimiter.checkDisputeRateLimit(userId);

      // Validate input
      if (!dto.bookingId || !dto.reason) {
        throw new BadRequestException('Booking ID and reason are required');
      }

      // Use transaction to ensure consistency
      const dispute = await this.prisma.$transaction(async (tx) => {
        // Verify booking exists
        const booking = await tx.booking.findUnique({
          where: { id: dto.bookingId },
        });

        if (!booking) {
          this.logger.warn(
            `Booking ${dto.bookingId} not found for dispute creation`,
          );
          throw new NotFoundException('Booking not found');
        }

        // Verify user is part of the booking
        if (booking.clientId !== userId && booking.proId !== userId) {
          this.logger.warn(
            `User ${userId} attempted to create dispute for booking ${dto.bookingId} without permission`,
          );
          throw new ForbiddenException('Access denied');
        }

        // Check if dispute already exists for this booking
        const existingDispute = await tx.dispute.findUnique({
          where: { bookingId: dto.bookingId },
        });

        if (existingDispute) {
          this.logger.warn(
            `Dispute already exists for booking ${dto.bookingId}`,
          );
          throw new ConflictException(
            'Dispute already exists for this booking',
          );
        }

        // Determine who initiated the dispute
        const initiatedBy = booking.clientId === userId ? 'client' : 'pro';

        return await tx.dispute.create({
          data: {
            bookingId: dto.bookingId,
            initiatedBy,
            reason: dto.reason.trim(),
            description: dto.description?.trim(),
          },
          include: {
            booking: {
              include: {
                client: { include: { clientProfile: true } },
                pro: { include: { proProfile: true } },
                serviceCategory: true,
                city: true,
              },
            },
          },
        });
      });

      this.logger.log(
        `Dispute ${dispute.id} created successfully for booking ${dto.bookingId}`,
      );

      // Log business event
      this.businessLogger.logDisputeCreated(
        dispute.id,
        dto.bookingId,
        userId,
        userRole,
        dto.reason,
        { description: dto.description },
      );

      return dispute;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException ||
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        `Failed to create dispute for booking ${dto.bookingId}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to create dispute');
    }
  }

  async getUserDisputes(userId: string) {
    try {
      this.logger.log(`Fetching disputes for user ${userId}`);

      if (!userId) {
        throw new BadRequestException('User ID is required');
      }

      const disputes = await this.prisma.dispute.findMany({
        where: {
          OR: [
            { booking: { clientId: userId } },
            { booking: { proId: userId } },
          ],
        },
        include: {
          booking: {
            include: {
              client: { include: { clientProfile: true } },
              pro: { include: { proProfile: true } },
              serviceCategory: true,
              city: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      this.logger.log(`Found ${disputes.length} disputes for user ${userId}`);
      return disputes;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(
        `Failed to fetch disputes for user ${userId}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to fetch disputes');
    }
  }

  async getDisputeById(id: string, userId: string, userRole: string) {
    try {
      this.logger.log(`Fetching dispute ${id} for user ${userId}`);

      if (!id || !userId) {
        throw new BadRequestException('Dispute ID and User ID are required');
      }

      const dispute = await this.prisma.dispute.findUnique({
        where: { id },
        include: {
          booking: {
            include: {
              client: { include: { clientProfile: true } },
              pro: { include: { proProfile: true } },
              serviceCategory: true,
              city: true,
            },
          },
          resolver: {
            select: { id: true, email: true },
          },
        },
      });

      if (!dispute) {
        this.logger.warn(`Dispute ${id} not found`);
        throw new NotFoundException('Dispute not found');
      }

      // Check if user has access (participant or admin)
      const isParticipant =
        dispute.booking.clientId === userId || dispute.booking.proId === userId;
      if (!isParticipant && userRole !== 'admin') {
        this.logger.warn(
          `User ${userId} attempted to access dispute ${id} without permission`,
        );
        throw new ForbiddenException('Access denied');
      }

      this.logger.log(`Dispute ${id} fetched successfully for user ${userId}`);
      return dispute;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        `Failed to fetch dispute ${id}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to fetch dispute');
    }
  }

  async resolveDispute(id: string, adminId: string, dto: ResolveDisputeDto) {
    try {
      this.logger.log(
        `Resolving dispute ${id} by admin ${adminId} with status ${dto.status}`,
      );

      if (!id || !adminId) {
        throw new BadRequestException('Dispute ID and Admin ID are required');
      }

      // Validate status
      if (!['resolved', 'closed'].includes(dto.status)) {
        throw new BadRequestException('Invalid resolution status');
      }

      // Use transaction to ensure consistency
      const updatedDispute = await this.prisma.$transaction(async (tx) => {
        const dispute = await tx.dispute.findUnique({
          where: { id },
        });

        if (!dispute) {
          this.logger.warn(`Dispute ${id} not found for resolution`);
          throw new NotFoundException('Dispute not found');
        }

        if (dispute.status !== 'open') {
          this.logger.warn(
            `Attempted to resolve already resolved dispute ${id} with status ${dispute.status}`,
          );
          throw new ConflictException('Dispute is already resolved');
        }

        return await tx.dispute.update({
          where: { id },
          data: {
            status: dto.status,
            resolution: dto.resolution?.trim(),
            resolvedAt: new Date(),
            resolvedBy: adminId,
          },
          include: {
            booking: {
              include: {
                client: { include: { clientProfile: true } },
                pro: { include: { proProfile: true } },
                serviceCategory: true,
                city: true,
              },
            },
            resolver: {
              select: { id: true, email: true },
            },
          },
        });
      });

      this.logger.log(
        `Dispute ${id} resolved successfully with status ${dto.status}`,
      );

      // Log business event
      this.businessLogger.logDisputeResolved(
        id,
        adminId,
        updatedDispute.status,
        dto.status,
        dto.resolution,
      );

      return updatedDispute;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ConflictException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        `Failed to resolve dispute ${id}: ${error.message}`,
        error.stack,
      );
      throw new BadRequestException('Failed to resolve dispute');
    }
  }
}
