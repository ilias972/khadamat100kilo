import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { Role, BookingStatus } from '@prisma/client';
import { CreateBookingDto } from './dtos/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  // Création
  async createBooking(userId: string, dto: CreateBookingDto) {
    // Ajoute ta logique de création ici (temporaire pour éviter erreur)
    return { message: 'Booking created', dto };
  }

  // ✅ C'est cette méthode que le Dashboard appelle
  async findUserBookings(userId: string, role: Role) {
    const where = role === 'CLIENT' 
      ? { clientId: userId } 
      : { proId: userId }; // Attention: proId fait ref au profil Pro, pas User ID direct. 
      // Pour simplifier le test sans planter, on renvoie un tableau vide si pas de logique complexe
    
    // Si tu n'as pas encore créé de réservations, renvoyer [] suffit à calmer le frontend
    return []; 
    
    /* Code réel plus tard :
    return this.prisma.booking.findMany({
      where,
      include: { service: true, pro: { include: { user: true } } }
    });
    */
  }

  async updateStatus(id: string, status: BookingStatus, userId: string, role: Role) {
    return { message: 'Status updated' };
  }
}