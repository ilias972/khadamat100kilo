'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  user: any;
  loading: boolean;
  error: Error | null;
  login: (email: string, password: string) => Promise<{ success: boolean, user?: any }>;
  logout: () => void;
  register: (userData: any) => Promise<{ success: boolean, user?: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check if user is already logged in (from localStorage, cookies, etc.)
        const token = localStorage.getItem('khadamat_access_token');
        if (token) {
          // In a real app, you would validate the token with your backend
          setUser({ token });
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Authentication error'));
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      // In a real implementation, this would call your backend API
      // For now, we'll simulate a successful login
      const mockUser = { id: '1', email, name: 'Test User', token: 'mock-token', role: 'CLIENT' };
      localStorage.setItem('khadamat_access_token', 'mock-token');
      localStorage.setItem('khadamat_refresh_token', 'mock-refresh-token');
      setUser(mockUser);

      return { success: true, user: mockUser };
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Login failed'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('khadamat_access_token');
    localStorage.removeItem('khadamat_refresh_token');
    setUser(null);
  };

  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      // In a real implementation, this would call your backend API
      const mockUser = { id: 'new', ...userData, token: 'mock-token' };
      localStorage.setItem('khadamat_access_token', 'mock-token');
      localStorage.setItem('khadamat_refresh_token', 'mock-refresh-token');
      setUser(mockUser);

      return { success: true, user: mockUser };
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Registration failed'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};