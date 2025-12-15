import { apiClient } from '@/lib/api-client';

export const AuthService = {
  updateClientProfile: async (data: any) => {
    // Placeholder implementation to satisfy build
    const response = await apiClient.patch('/users/profile', data);
    return response.data;
  },
};

export default AuthService;
