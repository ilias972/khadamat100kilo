'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtectedRoute = ProtectedRoute;
exports.ClientRoute = ClientRoute;
exports.ProRoute = ProRoute;
exports.AdminRoute = AdminRoute;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const auth_context_1 = require("@/lib/auth-context");
const loading_1 = require("@/components/ui/loading");
function ProtectedRoute({ children, requiredRoles = [], redirectTo = '/auth/login' }) {
    const { user, isAuthenticated, isLoading } = (0, auth_context_1.useAuth)();
    const router = (0, navigation_1.useRouter)();
    (0, react_1.useEffect)(() => {
        if (!isLoading && !isAuthenticated) {
            router.push(redirectTo);
            return;
        }
        if (!isLoading && isAuthenticated && user && requiredRoles.length > 0) {
            const userRoles = JSON.parse(user.roles);
            const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
            if (!hasRequiredRole) {
                router.push('/dashboard/client');
                return;
            }
        }
    }, [isAuthenticated, isLoading, user, requiredRoles, router, redirectTo]);
    if (isLoading) {
        return (<div className="min-h-screen flex items-center justify-center">
        <loading_1.Loading size="lg"/>
      </div>);
    }
    if (!isAuthenticated) {
        return null;
    }
    if (requiredRoles.length > 0 && user) {
        const userRoles = JSON.parse(user.roles);
        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
        if (!hasRequiredRole) {
            return null;
        }
    }
    return <>{children}</>;
}
function ClientRoute({ children }) {
    return (<ProtectedRoute requiredRoles={['client']}>
      {children}
    </ProtectedRoute>);
}
function ProRoute({ children }) {
    return (<ProtectedRoute requiredRoles={['pro']}>
      {children}
    </ProtectedRoute>);
}
function AdminRoute({ children }) {
    return (<ProtectedRoute requiredRoles={['admin']}>
      {children}
    </ProtectedRoute>);
}
//# sourceMappingURL=ProtectedRoute.js.map