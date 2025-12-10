'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Loading } from '@/components/ui/loading';

export default function DashboardRedirect() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // If not authenticated, redirect to login
        router.push('/login');
      } else if (user.role === 'CLIENT') {
        // Redirect client users to client dashboard
        router.push('/dashboard/client');
      } else if (user.role === 'PRO') {
        // Redirect pro users to pro dashboard
        router.push('/dashboard/pro');
      } else {
        // Redirect admin users to admin dashboard
        router.push('/dashboard/admin');
      }
    }
  }, [user, isLoading, router]);

  // Show loading spinner while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loading size="lg" text="Redirection en cours..." />
    </div>
  );
}