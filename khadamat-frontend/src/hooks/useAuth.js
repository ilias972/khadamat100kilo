"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthStatus = exports.useLogout = exports.useMe = exports.useRegister = exports.useLogin = exports.AUTH_QUERY_KEYS = void 0;
const react_query_1 = require("@tanstack/react-query");
const axios_1 = require("axios");
const auth_1 = require("../lib/auth");
const auth_service_1 = require("../services/auth.service");
exports.AUTH_QUERY_KEYS = {
    user: ['auth', 'user'],
};
const useLogin = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (credentials) => {
            const response = await auth_service_1.authService.login(credentials);
            auth_1.authManager.setTokens({
                access_token: response.access_token,
                refresh_token: response.refresh_token,
            });
            auth_1.authManager.setUser(response.user);
            return response;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(exports.AUTH_QUERY_KEYS.user, data.user);
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });
};
exports.useLogin = useLogin;
const useRegister = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)({
        mutationFn: async (userData) => {
            const response = await auth_service_1.authService.register(userData);
            auth_1.authManager.setTokens({
                access_token: response.access_token,
                refresh_token: response.refresh_token,
            });
            auth_1.authManager.setUser(response.user);
            return response;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(exports.AUTH_QUERY_KEYS.user, data.user);
        },
        onError: (error) => {
            console.error('Registration failed:', error);
        },
    });
};
exports.useRegister = useRegister;
const useMe = () => {
    return (0, react_query_1.useQuery)({
        queryKey: exports.AUTH_QUERY_KEYS.user,
        queryFn: async () => {
            return auth_service_1.authService.getMe();
        },
        enabled: auth_1.authManager.isAuthenticated(),
        staleTime: 5 * 60 * 1000,
        retry: (failureCount, error) => {
            if (error instanceof axios_1.AxiosError && error.response?.status === 401) {
                return false;
            }
            return failureCount < 3;
        },
    });
};
exports.useMe = useMe;
const useLogout = () => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return () => {
        auth_1.authManager.logout();
        queryClient.removeQueries({ queryKey: exports.AUTH_QUERY_KEYS.user });
        queryClient.clear();
    };
};
exports.useLogout = useLogout;
const useAuthStatus = () => {
    const { data: user, isLoading, error } = (0, exports.useMe)();
    return {
        isAuthenticated: !!user && auth_1.authManager.isAuthenticated(),
        user,
        isLoading,
        error,
    };
};
exports.useAuthStatus = useAuthStatus;
//# sourceMappingURL=useAuth.js.map