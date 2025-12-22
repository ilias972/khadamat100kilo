export type Role = 'CLIENT' | 'PRO' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: Role;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  phone?: string;
}

// ✅ CORRECTION : L'enum manquant (Indispensable pour le dashboard)
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED'
}

export interface SignupDto {
  email: string;
  password: string;
  role: Role;
  firstName: string;
  lastName: string;
  phone: string;
  profession?: string;
}

// Type pour les statistiques (pour corriger le +0 Pros)
export interface PlatformStats {
  totalPros: number;
  totalClients: number;
  totalBookings: number;
  averageRating: number;
}