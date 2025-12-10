// Auth utilities for Khadamat frontend
// Handles token storage, user state, and automatic token refresh

import { User, SignupDto, AuthTokens } from '../types/api';

const ACCESS_TOKEN_KEY = 'khadamat_access_token';
const REFRESH_TOKEN_KEY = 'khadamat_refresh_token';
const USER_KEY = 'khadamat_user';

class AuthManager {
  private refreshPromise: Promise<AuthTokens> | null = null;

  // Token storage
  setTokens(tokens: AuthTokens): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
    }
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    return null;
  }

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }

  // User storage
  setUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  getUser(): User | null {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  // Token validation
  isTokenExpired(token: string): boolean {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '==='.slice(0, (4 - base64.length % 4) % 4);
      const payload = JSON.parse(atob(padded));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  // Auto refresh token
  async refreshAccessToken(): Promise<string | null> {
    if (this.refreshPromise) {
      // If refresh is already in progress, wait for it
      const tokens = await this.refreshPromise;
      return tokens.access_token;
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken || this.isTokenExpired(refreshToken)) {
      this.clearTokens();
      return null;
    }

    try {
      this.refreshPromise = import('../services/auth.service').then(({ authService }) => authService.refreshToken(refreshToken));

      const tokens = await this.refreshPromise;
      this.setTokens(tokens);
      return tokens.access_token;
    } catch (error) {
      this.clearTokens();
      throw error;
    } finally {
      this.refreshPromise = null;
    }
  }

  // Get valid access token (refresh if needed)
  async getValidAccessToken(): Promise<string | null> {
    let accessToken = this.getAccessToken();

    if (!accessToken) {
      return null;
    }

    if (this.isTokenExpired(accessToken)) {
      accessToken = await this.refreshAccessToken();
    }

    return accessToken;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    console.log('isAuthenticated: Checking authentication status');
    const token = this.getAccessToken();
    console.log('isAuthenticated: Token retrieved:', token);
    if (!token) {
      console.log('isAuthenticated: No token found, returning false');
      return false;
    }
    try {
      console.log('isAuthenticated: Decoding token...');
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '==='.slice(0, (4 - base64.length % 4) % 4);
      const payload = JSON.parse(atob(padded));
      console.log('isAuthenticated: Decoded payload:', payload);
      const isValid = payload.exp > Date.now() / 1000;
      console.log('isAuthenticated: Token valid (exp check):', isValid);
      console.log('isAuthenticated: Final result:', isValid);
      return isValid;
    } catch (error) {
      console.log('isAuthenticated: Error decoding token:', error);
      console.log('isAuthenticated: Final result: false');
      return false;
    }
  }

  // Login helper
  async login(emailOrPhone: string, password: string): Promise<User> {
    const { authService } = await import('../services/auth.service');
    const response = await authService.login({ emailOrPhone, password });

    this.setTokens({ access_token: response.access_token, refresh_token: response.refresh_token });
    this.setUser(response.user);

    return response.user;
  }

  // Signup helper
  async signup(userData: SignupDto): Promise<User> {
    const { authService } = await import('../services/auth.service');
    const response = await authService.register(userData);

    this.setTokens({ access_token: response.access_token, refresh_token: response.refresh_token });
    this.setUser(response.user);

    return response.user;
  }

  // Logout
  logout(): void {
    this.clearTokens();
  }
}

export const authManager = new AuthManager();

// Helper functions
export const isAuthenticated = () => authManager.isAuthenticated();
export const getCurrentUser = (): User | null => authManager.getUser();
export const logout = () => authManager.logout();