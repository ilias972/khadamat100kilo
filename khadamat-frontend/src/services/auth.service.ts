import { apiClient } from '@/lib/api-client';
import { AuthResponse, User } from '../types/api';

interface LoginCredentials {
  emailOrPhone: string;
  password: string;
}

interface RegistrationData {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'CLIENT' | 'PRO';
  cityId?: string;
  profession?: string;
}

class AuthService {
  /**
   * Login user with email/phone and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  }

  /**
   * Register a new user
   */
  async register(userData: RegistrationData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', userData);
    return response.data;
  }

  /**
   * Get current authenticated user profile
   */
  async getMe(): Promise<User> {
    const response = await apiClient.get<User>('/user/profile');
    return response.data;
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<{ access_token: string; refresh_token: string }> {
    const response = await apiClient.post<{ access_token: string; refresh_token: string }>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  }

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/verify-email', { token });
    return response.data;
  }

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/resend-verification', { email });
    return response.data;
  }

  /**
   * Request password reset
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  }

  /**
   * Reset password with token
   */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', {
      token,
      newPassword,
    });
    return response.data;
  }
}

export const authService = new AuthService();
export default authService;