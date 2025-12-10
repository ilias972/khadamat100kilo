import { User, AuthTokens } from './api';
declare class AuthManager {
    private refreshPromise;
    setTokens(tokens: AuthTokens): void;
    getAccessToken(): string | null;
    getRefreshToken(): string | null;
    clearTokens(): void;
    setUser(user: User): void;
    getUser(): User | null;
    isTokenExpired(token: string): boolean;
    refreshAccessToken(): Promise<string | null>;
    getValidAccessToken(): Promise<string | null>;
    isAuthenticated(): boolean;
    login(emailOrPhone: string, password: string): Promise<User>;
    signup(userData: any): Promise<User>;
    logout(): void;
}
export declare const authManager: AuthManager;
export declare const isAuthenticated: () => boolean;
export declare const getCurrentUser: () => any;
export declare const logout: () => void;
export {};
