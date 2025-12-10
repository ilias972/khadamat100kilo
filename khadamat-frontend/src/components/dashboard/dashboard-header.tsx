'use client';

import React from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dropdown, DropdownItem, DropdownDivider } from '@/components/ui/dropdown';
import { useAuth, useUserRole, useIsClient, useIsPro, useIsAdmin } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
  unreadNotifications?: number;
}

export function DashboardHeader({ title, subtitle, onMenuClick, unreadNotifications = 0 }: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const roles = useUserRole();
  const isClient = useIsClient();
  const isPro = useIsPro();
  const isAdmin = useIsAdmin();

  const getUserDisplayName = () => {
    if (user?.clientProfile) {
      return `${user.clientProfile.firstName} ${user.clientProfile.lastName}`;
    }
    if (user?.proProfile) {
      return `${user.proProfile.firstName} ${user.proProfile.lastName}`;
    }
    return user?.email || 'Utilisateur';
  };

  const handleDashboardRedirect = () => {
    if (isAdmin) {
      router.push('/admin/dashboard');
    } else if (isPro) {
      router.push('/pro/dashboard');
    } else if (isClient) {
      router.push('/client/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  const handleProfileRedirect = () => {
    router.push('/profile');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.9)] backdrop-blur-sm border-b border-border-light lg:border-b-0">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden -ml-2 mr-2 p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F97B22]"
              onClick={onMenuClick}
            >
              <span className="sr-only">Ouvrir le menu</span>
              <Menu className="h-6 w-6" />
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-text-primary font-heading">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-1 text-sm text-text-secondary">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-text-muted" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="block w-full pl-10 pr-3 py-2 border border-border-light rounded-lg bg-white/50 backdrop-blur-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-[#F97B22]/20 focus:border-[#F97B22] text-sm"
                />
              </div>
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="sm"
              className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
              )}
            </Button>

            {/* Mobile search button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-surface"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* User dropdown */}
            <Dropdown
              trigger={
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#F97B22] rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-text-primary">
                    {getUserDisplayName()}
                  </span>
                </div>
              }
            >
              <DropdownItem onClick={handleDashboardRedirect}>
                Mon Tableau de Bord
              </DropdownItem>
              <DropdownItem onClick={handleProfileRedirect}>
                Mon Profil
              </DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={handleLogout}>
                Se déconnecter
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
}