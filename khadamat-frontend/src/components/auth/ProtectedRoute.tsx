'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Loading } from '@/components/ui/loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRoles = [],
  redirectTo = '/auth/login'
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (!isLoading && isAuthenticated && user && requiredRoles.length > 0) {
      // Fix: user.role is singular, not user.roles
      const userRole = user.role ? user.role.toLowerCase() : null;
      const hasRequiredRole = requiredRoles.some(role => userRole === role.toLowerCase());

      if (!hasRequiredRole) {
        router.push('/dashboard/client'); // Default redirect for unauthorized users
        return;
      }
    }
  }, [isAuthenticated, isLoading, user, requiredRoles, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (requiredRoles.length > 0 && user) {
    // Fix: user.role is singular, not user.roles
    const userRole = user.role ? user.role.toLowerCase() : null;
    const hasRequiredRole = requiredRoles.some(role => userRole === role.toLowerCase());

    if (!hasRequiredRole) {
      return null; // Will redirect
    }
  }

  return <>{children}</>;
}

// Helper components for specific roles
export function ClientRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRoles={['client']}>
      {children}
    </ProtectedRoute>
  );
}

export function ProRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRoles={['pro']}>
      {children}
    </ProtectedRoute>
  );
}

export function AdminRoute({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRoles={['admin']}>
      {children}
    </ProtectedRoute>
  );
}