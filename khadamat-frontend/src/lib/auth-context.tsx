'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// 👇 On importe notre client centralisé au lieu d'axios direct
import apiClientInstance from '@/lib/api-client'; 
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
    const initializeAuth = async () => {
      const storedUser = authManager.getUser();
      const accessToken = authManager.getAccessToken();

      if (storedUser && accessToken) {
        if (!authManager.isTokenExpired(accessToken)) {
          setUser(storedUser);
        } else {
           // Logique de refresh token (simplifiée pour l'exemple)
           authManager.clearTokens();
           setUser(null);
        }
      } else {
        authManager.clearTokens();
        setUser(null);
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // ✅ FONCTION LOGIN CORRIGÉE
  const login = async (emailOrPhone: string, password: string): Promise<User> => {
    setIsLoading(true);
    try {
      // 👇 On utilise apiClientInstance.client.post pour bénéficier de la config centralisée
      const response = await apiClientInstance.client.post('/auth/login', { 
        email: emailOrPhone, 
        password 
      });

      const payload = response.data || {};
      // Gestion flexible du format de réponse (accessToken ou access_token)
      const accessToken = payload.accessToken || payload.access_token;
      const refreshToken = payload.refreshToken || payload.refresh_token;
      const loggedInUser = payload.user || null;

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('khadamat_access_token', accessToken);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      // Important : Sauvegarder aussi l'user dans le localStorage via authManager
      if (loggedInUser) {
          localStorage.setItem('user', JSON.stringify(loggedInUser));
      }

      setUser(loggedInUser);
      return loggedInUser as User;
    } catch (error) {
        console.error("Erreur Login:", error);
        throw error;
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
    // Redirection optionnelle vers l'accueil
    window.location.href = '/';
  };

  const refreshUser = () => {
    const currentUser = authManager.getUser();
    setUser(currentUser);
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user, // Simplifié : si user existe, on est auth
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

// Helpers
export function useUserRole(): string[] {
  const { user } = useAuth();
  return user?.role ? [user.role.toLowerCase()] : []; // Sécurité null check
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