'use client';

import React from 'react';
import { AuthProvider } from './auth-context';
import { ToastProvider } from './toast-context';
import { PageTransitionProvider } from '@/components/ui/page-transition';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <PageTransitionProvider defaultType="moroccan-fade">
          {children}
        </PageTransitionProvider>
      </ToastProvider>
    </AuthProvider>
  );
};