'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Calendar, 
  MessageSquare, 
  Heart, 
  User,
  Bell
} from 'lucide-react';

interface MobileBottomNavProps {
  className?: string;
}

const navItems = [
  {
    id: 'home',
    label: 'Accueil',
    href: '/dashboard',
    icon: Home,
    badge: 0
  },
  {
    id: 'bookings',
    label: 'Réservations',
    href: '/dashboard/bookings',
    icon: Calendar,
    badge: 3 // Example notification count
  },
  {
    id: 'messages',
    label: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
    badge: 2
  },
  {
    id: 'favorites',
    label: 'Favoris',
    href: '/dashboard/favorites',
    icon: Heart,
    badge: 0
  },
  {
    id: 'profile',
    label: 'Profil',
    href: '/dashboard/profile',
    icon: User,
    badge: 0
  }
];

export function MobileBottomNav({ className }: MobileBottomNavProps) {
  const pathname = usePathname();
  
  // Determine if we're on client dashboard or pro dashboard
  const isClientDashboard = pathname.includes('/dashboard/client') || pathname === '/dashboard/client';
  const isProDashboard = pathname.includes('/dashboard/pro') || pathname === '/dashboard/pro';
  
  // Generate appropriate hrefs based on user type
  const getHref = (item: typeof navItems[0]) => {
    if (isClientDashboard) {
      return item.href.replace('/dashboard', '/dashboard/client');
    }
    if (isProDashboard) {
      return item.href.replace('/dashboard', '/dashboard/pro');
    }
    return item.href;
  };
  
  const getActiveItem = () => {
    if (isClientDashboard) {
      if (pathname === '/dashboard/client') return 'home';
      if (pathname.includes('/dashboard/client/bookings') || pathname.includes('/dashboard/client/history')) return 'bookings';
      if (pathname.includes('/dashboard/client/messages')) return 'messages';
      if (pathname.includes('/dashboard/client/favorites')) return 'favorites';
      if (pathname.includes('/dashboard/client/profile')) return 'profile';
    }
    if (isProDashboard) {
      if (pathname === '/dashboard/pro') return 'home';
      if (pathname.includes('/dashboard/pro/bookings')) return 'bookings';
      if (pathname.includes('/dashboard/pro/messages')) return 'messages';
      if (pathname.includes('/dashboard/pro/earnings')) return 'home';
      if (pathname.includes('/dashboard/pro/services')) return 'home';
      if (pathname.includes('/dashboard/pro/profile')) return 'profile';
    }
    return 'home';
  };
  
  const activeItem = getActiveItem();
  
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.9)] backdrop-blur-lg border-t border-border-light',
        'safe-area-inset-bottom',
        className
      )}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const href = getHref(item);
          const badge = item.badge || 0;
          
          return (
            <Link
              key={item.id}
              href={href}
              className={cn(
                'relative flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1',
                'transition-all duration-200 ease-out',
                'focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:ring-offset-2',
                'active:scale-95',
                // Touch target optimization
                'min-h-[56px] min-w-[44px]',
                // Interactive states
                isActive
                  ? 'text-[#F97B22]'
                  : 'text-text-secondary hover:text-text-primary'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Icon Container */}
              <div className="relative mb-1">
                <Icon 
                  className={cn(
                    'w-6 h-6 transition-all duration-200',
                    isActive ? 'scale-110' : 'scale-100'
                  )}
                  aria-hidden="true"
                />
                
                {/* Badge for notifications */}
                {badge > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {badge > 9 ? '9+' : badge}
                  </div>
                )}
                
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#F97B22] rounded-full" />
                )}
              </div>
              
              {/* Label */}
              <span 
                className={cn(
                  'text-xs font-medium leading-tight text-center',
                  'transition-all duration-200',
                  isActive 
                    ? 'text-[#F97B22] font-semibold' 
                    : 'text-text-secondary'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// Hook for detecting mobile devices and adjusting layout
export function useMobileLayout() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLandscape, setIsLandscape] = React.useState(false);
  
  React.useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width < 768);
      setIsLandscape(width > height && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return { isMobile, isLandscape, isDesktop: !isMobile };
}

// Safe area padding component for devices with notches
export function SafeAreaPadding({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-safe">
      {children}
    </div>
  );
}