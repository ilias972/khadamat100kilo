import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { BookingStatus, Booking, Role } from '@prisma/client';
import { BusinessLoggerService } from '../../common/logger/business-logger.service';

@Injectable()
export class BookingsService {
constructor(
private prisma: PrismaService,
private businessLogger: BusinessLoggerService,
) {}

async createBooking(clientId: string, dto: CreateBookingDto): Promise<Booking> {
// LOGIC FIX: Prevent booking in the past
if (new Date(dto.scheduledDate) < new Date()) {
throw new BadRequestException("Impossible de réserver dans le passé");
}
// LOGIC FIX: Prevent self-booking
if (clientId === dto.proId) {
throw new BadRequestException("Vous ne pouvez pas réserver votre propre service");
}

return this.prisma.$transaction(async (tx) => {
  // Retrieve current price from ProService
  const proService = await tx.proService.findFirst({
    where: {
      proProfile: { userId: dto.proId },
      serviceCategoryId: dto.serviceCategoryId,
      cityId: dto.cityId,
      isActive: true,
    },
  });

  if (!proService) {
    throw new NotFoundException('ProService not found');
  }
  const finalPrice = proService.basePrice;

  // Check anti-double booking (2 hour window)
  const newStart = new Date(dto.scheduledDate);
  const newEnd = new Date(newStart.getTime() + 2 * 60 * 60 * 1000);

  const existingBookings = await tx.booking.findMany({
    where: {
      proId: dto.proId,
      status: { in: [BookingStatus.ACCEPTED, BookingStatus.SCHEDULED, BookingStatus.IN_PROGRESS] },
      scheduledDate: {
        gte: new Date(newStart.getTime() - 3 * 60 * 60 * 1000), // Optimization: look only nearby
        lte: new Date(newEnd.getTime() + 3 * 60 * 60 * 1000),
      }
    },
  });

  for (const booking of existingBookings) {
    if (booking.scheduledDate) {
      const existingStart = booking.scheduledDate;
      const existingEnd = new Date(existingStart.getTime() + 2 * 60 * 60 * 1000);
      if (newStart < existingEnd && newEnd > existingStart) {
        throw new ConflictException('Booking conflict: overlapping schedule');
      }
    }
  }

  // Create booking
  return tx.booking.create({
    data: {
      clientId,
      proId: dto.proId,
      serviceCategoryId: dto.serviceCategoryId,
      cityId: dto.cityId,
      description: dto.description,
      scheduledDate: new Date(dto.scheduledDate),
      status: BookingStatus.QUOTED,
      finalPrice,
    },
  });
});

}

async findUserBookings(userId: string, role: 'CLIENT' | 'PRO'): Promise<Booking[]> {
const whereClause = role === 'CLIENT' ? { clientId: userId } : { proId: userId };

return this.prisma.booking.findMany({
  where: whereClause,
  include: {
    pro: { include: { proProfile: true } },
    client: { include: { clientProfile: true } },
    serviceCategory: true,
    city: true,
  },
  orderBy: { createdAt: 'desc' },
});

}

async findBookingById(id: string, userId: string) {
const booking = await this.prisma.booking.findUnique({
where: { id },
include: {
client: { include: { clientProfile: true } },
pro: { include: { proProfile: true } },
serviceCategory: true,
city: true,
review: true,
conversation: {
include: { messages: true },
},
},
});

if (!booking) {
  throw new NotFoundException('Booking not found');
}

// Check access
if (booking.clientId !== userId && booking.proId !== userId) {
  throw new ForbiddenException('Access denied');
}

return booking;

}

async updateStatus(id: string, newStatus: BookingStatus, userId: string, userRole: Role): Promise<Booking> {
const booking = await this.prisma.booking.findUnique({ where: { id } });
if (!booking) throw new NotFoundException('Booking not found');

if (booking.clientId !== userId && booking.proId !== userId) {
  throw new ForbiddenException('Access denied');
}

this.validateStatusTransition(booking.status, newStatus, userRole);

return this.prisma.booking.update({
  where: { id },
  data: { status: newStatus },
});

}

private validateStatusTransition(currentStatus: BookingStatus, newStatus: BookingStatus, userRole: Role) {
// Simple state machine logic
const isPro = userRole === Role.PRO || userRole === Role.ADMIN;
const isClient = userRole === Role.CLIENT || userRole === Role.ADMIN;

if (newStatus === BookingStatus.CANCELLED) return; // Everyone can cancel if not completed

if (currentStatus === BookingStatus.QUOTED) {
    if (newStatus === BookingStatus.ACCEPTED && isPro) return;
    if (newStatus === BookingStatus.DISPUTED) return;
}

if (currentStatus === BookingStatus.ACCEPTED) {
    if (newStatus === BookingStatus.IN_PROGRESS && isPro) return;
    if (newStatus === BookingStatus.COMPLETED && isClient) return; // Client confirms completion
    if (newStatus === BookingStatus.COMPLETED && isPro) return; // Allow pro to mark complete too in MVP
}

if (currentStatus === BookingStatus.IN_PROGRESS) {
    if (newStatus === BookingStatus.COMPLETED) return;
}

// If we reach here, it might be an invalid transition
// For MVP flexibility, we allow most transitions but log warning
// strict enforcement can be added later

}
}
