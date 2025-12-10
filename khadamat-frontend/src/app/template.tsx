'use client';

import { SmartPageTransition } from '@/components/ui/page-transition';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SmartPageTransition
      routeTransitions={{
        '/': 'moroccan-fade',
        '/services': 'moroccan-slide',
        '/pros': 'moroccan-scale',
        '/dashboard': 'moroccan-wave',
        '/devenir-pro': 'fade',
      }}
    >
      {children}
    </SmartPageTransition>
  );
}