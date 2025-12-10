import React, { ReactNode } from 'react';
import { User } from '../types/api';
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (emailOrPhone: string, password: string) => Promise<User>;
    signup: (userData: any) => Promise<User>;
    logout: () => void;
    refreshUser: () => void;
}
interface AuthProviderProps {
    children: ReactNode;
}
export declare function AuthProvider({ children }: AuthProviderProps): React.JSX.Element;
export declare function useAuth(): AuthContextType;
export declare function useUserRole(): string[];
export declare function useIsClient(): boolean;
export declare function useIsPro(): boolean;
export declare function useIsAdmin(): boolean;
export {};
