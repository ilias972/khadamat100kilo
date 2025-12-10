import { User } from '../types/api';
export declare const AUTH_QUERY_KEYS: {
    user: readonly ["auth", "user"];
};
export declare const useLogin: () => import("@tanstack/react-query").UseMutationResult<import("../types/api").AuthResponse, Error, LoginRequest, unknown>;
export declare const useRegister: () => import("@tanstack/react-query").UseMutationResult<import("../types/api").AuthResponse, Error, SignupRequest, unknown>;
export declare const useMe: () => import("@tanstack/react-query").UseQueryResult<User, Error>;
export declare const useLogout: () => () => void;
export declare const useAuthStatus: () => {
    isAuthenticated: boolean;
    user: User | undefined;
    isLoading: boolean;
    error: Error | null;
};
