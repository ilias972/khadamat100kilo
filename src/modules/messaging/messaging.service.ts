import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { SendMessageDto, CreateConversationDto } from './dtos/send-message.dto';
import { RateLimiterService } from '../../common/rate-limiter/rate-limiter.service';

@Injectable()
export class MessagingService {
  constructor(
    private prisma: PrismaService,
    private rateLimiter: RateLimiterService,
  ) {}

  // Conversation management
  async createConversation(userId: string, dto: CreateConversationDto) {
    // Verify participant2 exists
    const participant2 = await this.prisma.user.findUnique({
      where: { id: dto.participant2Id },
    });

    if (!participant2) {
      throw new NotFoundException('Participant not found');
    }

    // If bookingId is provided, verify it exists and user is part of it
    if (dto.bookingId) {
      const booking = await this.prisma.booking.findUnique({
        where: { id: dto.bookingId },
      });

      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      if (booking.clientId !== userId && booking.proId !== userId) {
        throw new ForbiddenException('Access denied to this booking');
      }

      // Check if conversation already exists for this booking
      const existingConversation = await this.prisma.conversation.findUnique({
        where: { bookingId: dto.bookingId },
      });

      if (existingConversation) {
        return existingConversation;
      }
    }

    // Create conversation
    return this.prisma.conversation.create({
      data: {
        participant1Id: userId,
        participant2Id: dto.participant2Id,
        bookingId: dto.bookingId,
      },
      include: {
        messages: {
          include: { sender: true },
          orderBy: { createdAt: 'asc' },
        },
        booking: true,
      },
    });
  }

  async getUserConversations(userId: string) {
    return this.prisma.conversation.findMany({
      where: {
        OR: [{ participant1Id: userId }, { participant2Id: userId }],
      },
      include: {
        messages: {
          include: { sender: true },
          orderBy: { createdAt: 'desc' },
          take: 1, // Only latest message
        },
        booking: {
          include: {
            serviceCategory: true,
            city: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getConversation(conversationId: string, userId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          include: { sender: true },
          orderBy: { createdAt: 'asc' },
        },
        booking: {
          include: {
            serviceCategory: true,
            city: true,
          },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Check if user is participant
    if (
      conversation.participant1Id !== userId &&
      conversation.participant2Id !== userId
    ) {
      throw new ForbiddenException('Access denied');
    }

    return conversation;
  }

  // Message management
  async sendMessage(
    conversationId: string,
    senderId: string,
    dto: SendMessageDto,
  ) {
    // Check rate limit
    this.rateLimiter.checkMessageRateLimit(senderId);

    // Verify conversation exists and user is participant
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    if (
      conversation.participant1Id !== senderId &&
      conversation.participant2Id !== senderId
    ) {
      throw new ForbiddenException('Access denied');
    }

    // Create message
    const message = await this.prisma.message.create({
      data: {
        conversationId,
        senderId,
        content: dto.content,
        attachments: JSON.stringify(dto.attachments || []),
      },
      include: {
        sender: {
          select: {
            id: true,
            email: true,
            clientProfile: true,
            proProfile: true,
          },
        },
      },
    });

    return message;
  }

  async markMessagesAsRead(conversationId: string, userId: string) {
    // Verify user is participant
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    if (
      conversation.participant1Id !== userId &&
      conversation.participant2Id !== userId
    ) {
      throw new ForbiddenException('Access denied');
    }

    // Mark messages as read (where sender is not the current user)
    const otherParticipantId =
      conversation.participant1Id === userId
        ? conversation.participant2Id
        : conversation.participant1Id;

    await this.prisma.message.updateMany({
      where: {
        conversationId,
        senderId: otherParticipantId,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });

    return { success: true };
  }

  // Get unread messages count
  async getUnreadCount(userId: string) {
    const result = await this.prisma.message.groupBy({
      by: ['conversationId'],
      where: {
        conversation: {
          OR: [{ participant1Id: userId }, { participant2Id: userId }],
        },
        senderId: {
          not: userId,
        },
        readAt: null,
      },
      _count: {
        id: true,
      },
    });

    return result.reduce((total, conv) => total + conv._count.id, 0);
  }
}
