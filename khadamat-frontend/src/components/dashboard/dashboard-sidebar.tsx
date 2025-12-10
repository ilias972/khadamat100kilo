'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Heart,
  History,
  Settings,
  LogOut,
  User,
  Bell,
  X
} from 'lucide-react';

interface DashboardSidebarProps {
  userType: 'client' | 'pro';
  userName: string;
  userAvatar?: string;
  unreadMessages?: number;
  onClose?: () => void;
}

const clientNavigation = [
  { name: 'Aperçu', href: '/dashboard/client', icon: LayoutDashboard },
  { name: 'Historique', href: '/dashboard/client/history', icon: History },
  { name: 'Messages', href: '/dashboard/client/messages', icon: MessageSquare },
  { name: 'Favoris', href: '/dashboard/client/favorites', icon: Heart },
];

const proNavigation = [
  { name: 'Tableau de bord', href: '/dashboard/pro', icon: LayoutDashboard },
  { name: 'Mes Réservations', href: '/dashboard/pro/bookings', icon: Calendar },
  { name: 'Mes Services', href: '/dashboard/pro/services', icon: Settings },
  { name: 'Revenus', href: '/dashboard/pro/earnings', icon: LayoutDashboard },
  { name: 'Messages', href: '/dashboard/pro/messages', icon: MessageSquare },
];

export function DashboardSidebar({ userType, userName, userAvatar, unreadMessages = 0, onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const navigation = userType === 'client' ? clientNavigation : proNavigation;

  const handleSettingsClick = () => {
    // TODO: Implement settings page
    alert('Page paramètres en développement');
  };

  const handleLogoutClick = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.9)] backdrop-blur-sm border-r border-border-light">
          {/* Mobile Close Button */}
          {onClose && (
            <div className="lg:hidden flex justify-end p-4 border-b border-border-light">
              <button
                onClick={onClose}
                className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-colors"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Fermer le menu</span>
              </button>
            </div>
          )}

          {/* User Profile Section */}
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#EDEEEF] rounded-full flex items-center justify-center">
                  {userAvatar ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={userAvatar}
                      alt={userName}
                    />
                  ) : (
                    <User className="w-6 h-6 text-text-muted" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-text-secondary capitalize">
                    {userType === 'client' ? 'Client' : 'Professionnel'}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-[#F97B22] text-white shadow-lg'
                        : 'text-text-secondary hover:bg-[#F97B22]/10 hover:text-[#F97B22]'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-3 flex-shrink-0 h-5 w-5',
                        isActive ? 'text-white' : 'text-text-muted group-hover:text-[#F97B22]'
                      )}
                    />
                    <span className="flex-1">{item.name}</span>
                    {item.name === 'Messages' && unreadMessages > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                        {unreadMessages}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="flex-shrink-0 flex border-t border-border-light p-4">
            <div className="flex items-center space-x-3 w-full">
              <button
                onClick={handleSettingsClick}
                className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Paramètres</span>
              </button>
              <div className="flex-1" />
              <button
                onClick={handleLogoutClick}
                className="flex items-center space-x-2 text-sm text-text-secondary hover:text-red-600 transition-colors"
                data-testid="nav-logout-button"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}