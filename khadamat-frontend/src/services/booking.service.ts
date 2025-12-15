import { apiClient } from '@/lib/api/client';

export const bookingService = {
  // Récupérer mes réservations
  // Appelle GET http://localhost:4000/api/bookings
  async getMyBookings() {
    const response = await apiClient.get('/bookings');
    return response.data;
  },

  // Créer une réservation
  async create(data: any) {
    const response = await apiClient.post('/bookings', data);
    return response.data;
  },

  // Mettre à jour un statut (pour les pros)
  async updateStatus(id: string, status: string) {
    const response = await apiClient.patch(`/bookings/${id}/status`, { status });
    return response.data;
  }
};