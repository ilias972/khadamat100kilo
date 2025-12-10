import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

export interface CreateNotificationData {
  userId: string;
  type: string;
  title: string;
  message: string;
  payload?: any;
  channel?: 'email' | 'push' | 'in-app';
}

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async createNotification(data: CreateNotificationData) {
    return this.prisma.notification.create({
      data: {
        userId: data.userId,
        type: data.type,
        title: data.title,
        message: data.message,
        payload: data.payload,
        channel: data.channel || 'in-app',
      },
    });
  }

  async getUserNotifications(
    userId: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const skip = (page - 1) * limit;

    const [notifications, total] = await Promise.all([
      this.prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.notification.count({
        where: { userId },
      }),
    ]);

    return {
      notifications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.userId !== userId) {
      throw new Error('Notification not found');
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { readAt: new Date() },
    });
  }

  async markAllAsRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: {
        userId,
        readAt: null,
      },
      data: { readAt: new Date() },
    });
  }

  async getUnreadCount(userId: string) {
    return this.prisma.notification.count({
      where: {
        userId,
        readAt: null,
      },
    });
  }

  // Helper methods for common notifications
  async notifyBookingCreated(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        client: { include: { clientProfile: true } },
        pro: { include: { proProfile: true } },
        serviceCategory: true,
      },
    });

    if (!booking) return;

    // Notify pro of new booking request
    await this.createNotification({
      userId: booking.proId,
      type: 'booking_request',
      title: 'Nouvelle demande de réservation',
      message: `Nouvelle demande de réservation pour ${booking.serviceCategory.name}`,
      payload: {
        bookingId: booking.id,
        clientName: `${booking.client.clientProfile?.firstName} ${booking.client.clientProfile?.lastName}`,
        service: booking.serviceCategory.name,
      },
    });
  }

  async notifyBookingStatusChanged(
    bookingId: string,
    oldStatus: string,
    newStatus: string,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        client: { include: { clientProfile: true } },
        pro: { include: { proProfile: true } },
        serviceCategory: true,
      },
    });

    if (!booking) return;

    const statusMessages = {
      accepted: 'acceptée',
      rejected: 'refusée',
      completed: 'terminée',
      canceled: 'annulée',
    };

    // Notify client of status change
    await this.createNotification({
      userId: booking.clientId,
      type: 'booking_status_update',
      title: 'Mise à jour de réservation',
      message: `Votre réservation pour ${booking.serviceCategory.name} a été ${statusMessages[newStatus as keyof typeof statusMessages]}`,
      payload: {
        bookingId: booking.id,
        proName: `${booking.pro.proProfile?.firstName} ${booking.pro.proProfile?.lastName}`,
        service: booking.serviceCategory.name,
        oldStatus,
        newStatus,
      },
    });

    // Notify pro of status change (except for initial acceptance)
    if (newStatus !== 'accepted' || oldStatus !== 'requested') {
      await this.createNotification({
        userId: booking.proId,
        type: 'booking_status_update',
        title: 'Mise à jour de réservation',
        message: `La réservation pour ${booking.serviceCategory.name} a été ${statusMessages[newStatus as keyof typeof statusMessages]}`,
        payload: {
          bookingId: booking.id,
          clientName: `${booking.client.clientProfile?.firstName} ${booking.client.clientProfile?.lastName}`,
          service: booking.serviceCategory.name,
          oldStatus,
          newStatus,
        },
      });
    }
  }

  async notifyNewMessage(
    conversationId: string,
    senderId: string,
    message: string,
  ) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) return;

    const recipientId =
      conversation.participant1Id === senderId
        ? conversation.participant2Id
        : conversation.participant1Id;

    // Get sender profile
    const sender = await this.prisma.user.findUnique({
      where: { id: senderId },
      include: {
        clientProfile: true,
        proProfile: true,
      },
    });

    if (!sender) return;

    const senderName = sender.clientProfile
      ? `${sender.clientProfile.firstName} ${sender.clientProfile.lastName}`
      : `${sender.proProfile?.firstName} ${sender.proProfile?.lastName}`;

    await this.createNotification({
      userId: recipientId,
      type: 'new_message',
      title: 'Nouveau message',
      message: `Nouveau message de ${senderName}`,
      payload: {
        conversationId,
        senderId,
        senderName,
        message:
          message.length > 50 ? message.substring(0, 50) + '...' : message,
      },
    });
  }

  async notifyNewReview(reviewId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
      include: {
        booking: {
          include: {
            pro: true,
            serviceCategory: true,
          },
        },
      },
    });

    if (!review) return;

    await this.createNotification({
      userId: review.proId,
      type: 'new_review',
      title: 'Nouvel avis client',
      message: `Vous avez reçu un nouvel avis (${review.rating}/5 étoiles)`,
      payload: {
        reviewId,
        bookingId: review.bookingId,
        rating: review.rating,
        service: review.booking.serviceCategory.name,
      },
    });
  }
}
