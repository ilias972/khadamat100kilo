import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {  User } from '../types/api';
import { authManager } from '../lib/auth';
import { authService } from '../services/auth.service';

// Query keys
export const AUTH_QUERY_KEYS = {
  user: ['auth', 'user'] as const,
};

// Login mutation
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: any) => {
      const response = await authService.login(credentials);
      // Store tokens and user in auth manager
      authManager.setTokens({
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      });
      authManager.setUser(response.user);
      return response;
    },
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.setQueryData(AUTH_QUERY_KEYS.user, data.user);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};

// Register mutation
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await authService.register(userData);
      // Store tokens and user in auth manager
      authManager.setTokens({
        access_token: response.access_token,
        refresh_token: response.refresh_token,
      });
      authManager.setUser(response.user);
      return response;
    },
    onSuccess: (data) => {
      // Invalidate and refetch user data
      queryClient.setQueryData(AUTH_QUERY_KEYS.user, data.user);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

// Get current user query
export const useMe = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.user,
    queryFn: async (): Promise<User> => {
      return authService.getMe();
    },
    enabled: authManager.isAuthenticated(), // Only run if authenticated
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401 (unauthorized)
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
};

// Logout function (not a hook, but utility)
export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    authManager.logout();
    queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.user });
    queryClient.clear();
  };
};

// Check authentication status
export const useAuthStatus = () => {
  const { data: user, isLoading, error } = useMe();

  return {
    isAuthenticated: !!user && authManager.isAuthenticated(),
    user,
    isLoading,
    error,
  };
};
