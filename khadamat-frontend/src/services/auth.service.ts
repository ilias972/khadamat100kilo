import { apiClient } from '@/lib/api/client';
// On utilise 'any' pour l'instant pour éviter les erreurs de build TypeScript, on peaufinera après
import { AuthResponse } from '@/types/api'; 

export const authService = {
  async register(userData: any) {
    // ⚠️ ATTENTION : Ici on met juste '/auth/signup'.
    // Axios va combiner : http://localhost:4000/api + /auth/signup
    // Si tu rajoutes /api ici, ça plantera.
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  },

  async login(credentials: any) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  async getMe() {
    const response = await apiClient.get('/auth/me'); // Ou /users/profile selon ton back
    return response.data;
  }
};