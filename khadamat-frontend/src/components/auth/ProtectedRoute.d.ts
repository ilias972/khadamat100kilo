interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRoles?: string[];
    redirectTo?: string;
}
export declare function ProtectedRoute({ children, requiredRoles, redirectTo }: ProtectedRouteProps): import("react").JSX.Element | null;
export declare function ClientRoute({ children }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function ProRoute({ children }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
export declare function AdminRoute({ children }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
export {};
