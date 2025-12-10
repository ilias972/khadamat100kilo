"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getCurrentUser = exports.isAuthenticated = exports.authManager = void 0;
const ACCESS_TOKEN_KEY = 'khadamat_access_token';
const REFRESH_TOKEN_KEY = 'khadamat_refresh_token';
const USER_KEY = 'khadamat_user';
class AuthManager {
    refreshPromise = null;
    setTokens(tokens) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
            localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
        }
    }
    getAccessToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(ACCESS_TOKEN_KEY);
        }
        return null;
    }
    getRefreshToken() {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(REFRESH_TOKEN_KEY);
        }
        return null;
    }
    clearTokens() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(ACCESS_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        }
    }
    setUser(user) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        }
    }
    getUser() {
        if (typeof window !== 'undefined') {
            const userStr = localStorage.getItem(USER_KEY);
            return userStr ? JSON.parse(userStr) : null;
        }
        return null;
    }
    isTokenExpired(token) {
        try {
            const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            const padded = base64 + '==='.slice(0, (4 - base64.length % 4) % 4);
            const payload = JSON.parse(atob(padded));
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        }
        catch {
            return true;
        }
    }
    async refreshAccessToken() {
        if (this.refreshPromise) {
            const tokens = await this.refreshPromise;
            return tokens.access_token;
        }
        const refreshToken = this.getRefreshToken();
        if (!refreshToken || this.isTokenExpired(refreshToken)) {
            this.clearTokens();
            return null;
        }
        try {
            this.refreshPromise = Promise.resolve().then(() => __importStar(require('../services/auth.service'))).then(({ authService }) => authService.refreshToken(refreshToken));
            const tokens = await this.refreshPromise;
            this.setTokens(tokens);
            return tokens.access_token;
        }
        catch (error) {
            this.clearTokens();
            throw error;
        }
        finally {
            this.refreshPromise = null;
        }
    }
    async getValidAccessToken() {
        let accessToken = this.getAccessToken();
        if (!accessToken) {
            return null;
        }
        if (this.isTokenExpired(accessToken)) {
            accessToken = await this.refreshAccessToken();
        }
        return accessToken;
    }
    isAuthenticated() {
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
        }
        catch (error) {
            console.log('isAuthenticated: Error decoding token:', error);
            console.log('isAuthenticated: Final result: false');
            return false;
        }
    }
    async login(emailOrPhone, password) {
        const { authService } = await Promise.resolve().then(() => __importStar(require('../services/auth.service')));
        const response = await authService.login({ emailOrPhone, password });
        this.setTokens({ access_token: response.access_token, refresh_token: response.refresh_token });
        this.setUser(response.user);
        return response.user;
    }
    async signup(userData) {
        const { authService } = await Promise.resolve().then(() => __importStar(require('../services/auth.service')));
        const response = await authService.register(userData);
        this.setTokens({ access_token: response.access_token, refresh_token: response.refresh_token });
        this.setUser(response.user);
        return response.user;
    }
    logout() {
        this.clearTokens();
    }
}
exports.authManager = new AuthManager();
const isAuthenticated = () => exports.authManager.isAuthenticated();
exports.isAuthenticated = isAuthenticated;
const getCurrentUser = () => exports.authManager.getUser();
exports.getCurrentUser = getCurrentUser;
const logout = () => exports.authManager.logout();
exports.logout = logout;
//# sourceMappingURL=auth.js.map