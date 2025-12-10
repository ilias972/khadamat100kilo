"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const client_1 = require("../../lib/api/client");
class AuthService {
    async login(credentials) {
        const response = await client_1.apiClient.post('/auth/login', credentials);
        return response.data;
    }
    async register(userData) {
        const response = await client_1.apiClient.post('/auth/signup', userData);
        return response.data;
    }
    async getMe() {
        const response = await client_1.apiClient.get('/user/profile');
        return response.data;
    }
    async refreshToken(refreshToken) {
        const response = await client_1.apiClient.post('/auth/refresh', {
            refreshToken,
        });
        return response.data;
    }
    async verifyEmail(token) {
        const response = await client_1.apiClient.post('/auth/verify-email', { token });
        return response.data;
    }
    async resendVerification(email) {
        const response = await client_1.apiClient.post('/auth/resend-verification', { email });
        return response.data;
    }
    async forgotPassword(email) {
        const response = await client_1.apiClient.post('/auth/forgot-password', { email });
        return response.data;
    }
    async resetPassword(token, newPassword) {
        const response = await client_1.apiClient.post('/auth/reset-password', {
            token,
            newPassword,
        });
        return response.data;
    }
}
exports.authService = new AuthService();
exports.default = exports.authService;
//# sourceMappingURL=auth.service.js.map