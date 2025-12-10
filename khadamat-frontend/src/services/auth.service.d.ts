import { User, LoginRequest, SignupRequest, AuthResponse } from '../types/api';
declare class AuthService {
    login(credentials: LoginRequest): Promise<AuthResponse>;
    register(userData: SignupRequest): Promise<AuthResponse>;
    getMe(): Promise<User>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendVerification(email: string): Promise<{
        message: string;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
}
export declare const authService: AuthService;
export default authService;
