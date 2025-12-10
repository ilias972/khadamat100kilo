'use client';
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
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
exports.useUserRole = useUserRole;
exports.useIsClient = useIsClient;
exports.useIsPro = useIsPro;
exports.useIsAdmin = useIsAdmin;
const react_1 = __importStar(require("react"));
const auth_1 = require("./auth");
const AuthContext = (0, react_1.createContext)(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const initializeAuth = async () => {
            const storedUser = auth_1.authManager.getUser();
            const accessToken = auth_1.authManager.getAccessToken();
            if (storedUser && accessToken) {
                if (!auth_1.authManager.isTokenExpired(accessToken)) {
                    setUser(storedUser);
                }
                else {
                    const refreshToken = auth_1.authManager.getRefreshToken();
                    if (refreshToken && !auth_1.authManager.isTokenExpired(refreshToken)) {
                        try {
                            const newAccessToken = await auth_1.authManager.refreshAccessToken();
                            if (newAccessToken) {
                                setUser(storedUser);
                            }
                            else {
                                auth_1.authManager.clearTokens();
                                setUser(null);
                            }
                        }
                        catch (error) {
                            console.error('Token refresh failed during initialization:', error);
                            auth_1.authManager.clearTokens();
                            setUser(null);
                        }
                    }
                    else {
                        auth_1.authManager.clearTokens();
                        setUser(null);
                    }
                }
            }
            else {
                auth_1.authManager.clearTokens();
                setUser(null);
            }
            setIsLoading(false);
        };
        initializeAuth();
    }, []);
    const login = async (emailOrPhone, password) => {
        setIsLoading(true);
        try {
            const loggedInUser = await auth_1.authManager.login(emailOrPhone, password);
            setUser(loggedInUser);
            return loggedInUser;
        }
        finally {
            setIsLoading(false);
        }
    };
    const signup = async (userData) => {
        setIsLoading(true);
        try {
            const newUser = await auth_1.authManager.signup(userData);
            setUser(newUser);
            return newUser;
        }
        finally {
            setIsLoading(false);
        }
    };
    const logout = () => {
        auth_1.authManager.logout();
        setUser(null);
    };
    const refreshUser = () => {
        const currentUser = auth_1.authManager.getUser();
        setUser(currentUser);
    };
    const value = {
        user,
        isLoading,
        isAuthenticated: !!user && auth_1.authManager.isAuthenticated(),
        login,
        signup,
        logout,
        refreshUser,
    };
    return (<AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>);
}
function useAuth() {
    const context = (0, react_1.useContext)(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
function useUserRole() {
    const { user } = useAuth();
    return user ? [user.role.toLowerCase()] : [];
}
function useIsClient() {
    const roles = useUserRole();
    return roles.includes('client');
}
function useIsPro() {
    const roles = useUserRole();
    return roles.includes('pro');
}
function useIsAdmin() {
    const roles = useUserRole();
    return roles.includes('admin');
}
//# sourceMappingURL=auth-context.js.map