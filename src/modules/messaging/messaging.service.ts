import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';

@Injectable()
export class MessagingService {
  constructor(private prisma: PrismaService) {}

  // --- GESTION DES CONVERSATIONS ---

  async createConversation(userId: string, participant2Id: string, bookingId?: string) {
    // Vérifier si le participant 2 existe
    const participant2 = await this.prisma.user.findUnique({
      where: { id: participant2Id },
    });

    if (!participant2) throw new NotFoundException('Participant introuvable');

    // Logique si lié à une réservation
    if (bookingId) {
      const booking = await this.prisma.booking.findUnique({
        where: { id: bookingId },
      });

      if (!booking) throw new NotFoundException('Réservation introuvable');

      if (booking.clientId !== userId && booking.proId !== userId) {
        throw new ForbiddenException('Accès refusé à cette réservation');
      }

      // Vérifier si une conversation existe déjà pour cette réservation
      const existingConversation = await this.prisma.conversation.findUnique({
        where: { bookingId },
      });

      if (existingConversation) return existingConversation;
    }

    // Création
    return this.prisma.conversation.create({
      data: {
        participant1Id: userId,
        participant2Id: participant2Id,
        bookingId: bookingId,
      },
      include: {
        messages: { include: { sender: true }, orderBy: { createdAt: 'asc' } },
        booking: true,
      },
    });
  }

  // ✅ C'est cette méthode que le Dashboard appelle
  async getUserConversations(userId: string) {
    return this.prisma.conversation.findMany({
      where: {
        OR: [{ participant1Id: userId }, { participant2Id: userId }],
      },
      include: {
        messages: {
          include: { sender: true },
          orderBy: { createdAt: 'desc' },
          take: 1, // Dernier message pour l'aperçu
        },
        booking: {
          include: {
            // serviceCategory: true, // Décommente si ton Prisma Schema a ces relations
            // city: true,
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
        messages: { include: { sender: true }, orderBy: { createdAt: 'asc' } },
        booking: true,
      },
    });

    if (!conversation) throw new NotFoundException('Conversation introuvable');

    if (conversation.participant1Id !== userId && conversation.participant2Id !== userId) {
      throw new ForbiddenException('Accès refusé');
    }

    return conversation;
  }

  // --- GESTION DES MESSAGES ---

  async sendMessage(conversationId: string, senderId: string, content: string, attachments: any[] = []) {
    // Vérification droits
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) throw new NotFoundException('Conversation introuvable');

    if (conversation.participant1Id !== senderId && conversation.participant2Id !== senderId) {
      throw new ForbiddenException('Accès refusé');
    }

    // Création message
    return this.prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
        attachments: JSON.stringify(attachments),
      },
      include: {
        sender: {
          select: { id: true, email: true, clientProfile: true, proProfile: true },
        },
      },
    });
  }

  // ✅ Pour le badge de notifications
  async getUnreadCount(userId: string) {
    // On utilise un try/catch au cas où la table Message n'existe pas encore
    try {
      const result = await this.prisma.message.groupBy({
        by: ['conversationId'],
        where: {
          conversation: { OR: [{ participant1Id: userId }, { participant2Id: userId }] },
          senderId: { not: userId },
          readAt: null,
        },
        _count: { id: true },
      });
      return { count: result.reduce((total, conv) => total + conv._count.id, 0) };
    } catch (e) {
      return { count: 0 }; // Sécurité anti-crash
    }
  }
}