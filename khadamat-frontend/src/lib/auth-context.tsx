'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, SignupDto } from '../types/api';
import { authManager } from './auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password: string) => Promise<User>;
  signup: (userData: SignupDto) => Promise<User>;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state from localStorage
    const initializeAuth = async () => {
      const storedUser = authManager.getUser();
      const accessToken = authManager.getAccessToken();

      if (storedUser && accessToken) {
        // Check if access token is still valid
        if (!authManager.isTokenExpired(accessToken)) {
          // Token is valid, set user
          setUser(storedUser);
        } else {
          // Access token expired, check if we can refresh
          const refreshToken = authManager.getRefreshToken();
          if (refreshToken && !authManager.isTokenExpired(refreshToken)) {
            try {
              // Attempt to refresh token
              const newAccessToken = await authManager.refreshAccessToken();
              if (newAccessToken) {
                // Refresh successful, keep the stored user
                setUser(storedUser);
              } else {
                // Refresh failed, clear state
                authManager.clearTokens();
                setUser(null);
              }
            } catch (error) {
              // Refresh failed, clear state
              console.error('Token refresh failed during initialization:', error);
              authManager.clearTokens();
              setUser(null);
            }
          } else {
            // No valid refresh token, clear state
            authManager.clearTokens();
            setUser(null);
          }
        }
      } else {
        // No stored user or token, clear any invalid state
        authManager.clearTokens();
        setUser(null);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (emailOrPhone: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      const loggedInUser = await authManager.login(emailOrPhone, password);
      setUser(loggedInUser);
      return loggedInUser;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignupDto): Promise<User> => {
    setIsLoading(true);
    try {
      const newUser = await authManager.signup(userData);
      setUser(newUser);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authManager.logout();
    setUser(null);
  };

  const refreshUser = () => {
    const currentUser = authManager.getUser();
    setUser(currentUser);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user && authManager.isAuthenticated(),
    login,
    signup,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Helper hook for role checking
export function useUserRole(): string[] {
  const { user } = useAuth();
  return user ? [user.role.toLowerCase()] : [];
}

export function useIsClient(): boolean {
  const roles = useUserRole();
  return roles.includes('client');
}

export function useIsPro(): boolean {
  const roles = useUserRole();
  return roles.includes('pro');
}

export function useIsAdmin(): boolean {
  const roles = useUserRole();
  return roles.includes('admin');
}