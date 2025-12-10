'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useResponsive } from '@/hooks/use-responsive';
import { MobileBottomNav } from './mobile-bottom-nav';
import { EnhancedErrorBoundary } from './error-boundary-enhanced';
import { EnhancedStatsCard, MobileKPICard } from './enhanced-stats-card';
import { EnhancedBookingCard } from './enhanced-booking-card';
import { MobileChart, MobileRevenueChart, MobileBookingsChart } from './mobile-chart';
import { DashboardSkeleton, ProDashboardSkeleton, ClientDashboardSkeleton, MobileDashboardSkeleton } from './loading-skeletons';
import { AccessibleButton, SkipNav } from './accessible-components';
import { 
  Calendar, 
  MessageSquare, 
  Heart, 
  User,
  Bell,
  Settings,
  Plus,
  TrendingUp,
  DollarSign,
  Users,
  Star,
  BarChart3,
  ChevronRight,
  Menu,
  Search
} from 'lucide-react';

// Modern Dashboard Layout Component
interface ModernDashboardProps {
  type: 'client' | 'pro';
  children?: React.ReactNode;
}

export function ModernDashboardLayout({ type, children }: ModernDashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile, isDesktop, shouldShowMobileNav, shouldShowDesktopSidebar } = useResponsive();

  return (
    <EnhancedErrorBoundary level="page">
      <div className="min-h-screen bg-background">
        <SkipNav />
        
        {/* Mobile Header */}
        {isMobile && (
          <header className="lg:hidden bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.9)] backdrop-blur-sm border-b border-border-light sticky top-0 z-40">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AccessibleButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(true)}
                    aria-label="Ouvrir le menu"
                  >
                    <Menu className="w-5 h-5" />
                  </AccessibleButton>
                  <h1 className="text-lg font-bold text-text-primary">
                    {type === 'client' ? 'Tableau de bord client' : 'Tableau de bord pro'}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-2">
                  <AccessibleButton variant="ghost" size="sm" aria-label="Notifications">
                    <Bell className="w-5 h-5" />
                  </AccessibleButton>
                  <AccessibleButton variant="ghost" size="sm" aria-label="Rechercher">
                    <Search className="w-5 h-5" />
                  </AccessibleButton>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <div className={cn(
          'flex h-screen pt-16',
          isMobile ? 'pb-20' : '' // Space for mobile bottom nav
        )}>
          {/* Desktop Sidebar - would be the existing DashboardSidebar component */}
          {shouldShowDesktopSidebar && (
            <div className="hidden lg:flex lg:flex-shrink-0">
              {/* Existing sidebar component would go here */}
              <div className="w-64 bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.9)] backdrop-blur-sm border-r border-border-light">
                {/* Sidebar content */}
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6">
                {children}
              </div>
            </main>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        {shouldShowMobileNav && <MobileBottomNav />}
      </div>
    </EnhancedErrorBoundary>
  );
}

// Example Client Dashboard using new components
export function ExampleClientDashboard() {
  const [loading, setLoading] = useState(false);
  const { isMobile } = useResponsive();

  // Mock data
  const stats = [
    { label: 'Réservations', value: 127, trend: { value: 12, isPositive: true } },
    { label: 'Dépenses', value: 18500, trend: { value: 8, isPositive: true } },
    { label: 'Favoris', value: 23, trend: { value: 15, isPositive: true } },
    { label: 'Note moyenne', value: 4.8, trend: { value: 5, isPositive: true } },
  ];

  const recentBookings = [
    {
      id: '1',
      clientId: '1',
      professionalName: 'Ahmed El Mansouri',
      professionalAvatar: '',
      serviceName: 'Réparation plomberie',
      serviceCategory: 'Plomberie',
      status: 'confirmed' as const,
      scheduledDate: '2024-11-20',
      scheduledTime: '14:00',
      duration: '2h',
      price: 250,
      location: 'Casablanca',
      createdAt: '2024-11-19T10:00:00Z',
      updatedAt: '2024-11-19T10:00:00Z'
    }
  ];

  const chartData = [
    { label: 'Jan', value: 15000, change: 5 },
    { label: 'Fév', value: 16200, change: 8 },
    { label: 'Mar', value: 15800, change: -2 },
    { label: 'Avr', value: 17100, change: 8 },
    { label: 'Mai', value: 18500, change: 8 },
    { label: 'Jun', value: 19200, change: 4 },
  ];

  if (loading) {
    return (
      <ModernDashboardLayout type="client">
        {isMobile ? <MobileDashboardSkeleton /> : <ClientDashboardSkeleton />}
      </ModernDashboardLayout>
    );
  }

  return (
    <ModernDashboardLayout type="client">
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Bonjour, Sarah ! 👋
              </h1>
              <p className="text-text-secondary">
                Voici un aperçu de vos réservations récentes
              </p>
            </div>
            <AccessibleButton className="bg-[#F97B22] hover:bg-[#e66a1f] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle réservation
            </AccessibleButton>
          </div>
        </motion.div>

        {/* Stats Grid */}
        {isMobile ? (
          <div className="grid grid-cols-2 gap-4">
            <MobileKPICard
              title="Réservations"
              value={stats[0].value}
              trend={stats[0].trend}
              variant="bookings"
            />
            <MobileKPICard
              title="Dépenses"
              value={stats[1].value}
              trend={stats[1].trend}
              variant="revenue"
            />
            <MobileKPICard
              title="Favoris"
              value={stats[2].value}
              trend={stats[2].trend}
              variant="growth"
            />
            <MobileKPICard
              title="Note"
              value={stats[3].value}
              trend={stats[3].trend}
              variant="rating"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <EnhancedStatsCard
                key={index}
                title={stat.label}
                value={stat.value}
                icon={index === 0 ? Calendar : index === 1 ? DollarSign : index === 2 ? Heart : Star}
                trend={stat.trend}
                variant="default"
                size="md"
                interactive
                actions={[
                  {
                    label: 'Voir détail',
                    onClick: () => console.log(`View ${stat.label} details`)
                  }
                ]}
              />
            ))}
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            {isMobile ? (
              <MobileRevenueChart data={chartData} height={160} />
            ) : (
              <MobileChart
                title="Évolution des dépenses"
                subtitle="6 derniers mois"
                data={chartData}
                type="area"
                variant="revenue"
                height={256}
                interactive
              />
            )}
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4 font-heading">
                Actions rapides
              </h3>
              <div className="space-y-3">
                <AccessibleButton 
                  variant="outline" 
                  className="w-full justify-start border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Réserver un service
                </AccessibleButton>
                <AccessibleButton 
                  variant="outline" 
                  className="w-full justify-start border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Mes messages
                </AccessibleButton>
                <AccessibleButton 
                  variant="outline" 
                  className="w-full justify-start border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Mes favoris
                </AccessibleButton>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary font-heading">
              Réservations récentes
            </h2>
            <AccessibleButton variant="ghost" className="text-[#F97B22] hover:bg-[#F97B22]/10">
              Voir tout
              <ChevronRight className="w-4 h-4 ml-1" />
            </AccessibleButton>
          </div>

          <div className={cn(
            'grid gap-4',
            isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          )}>
            {recentBookings.map((booking) => (
              <EnhancedBookingCard
                key={booking.id}
                booking={booking}
                variant={isMobile ? 'mobile' : 'default'}
                size="md"
                onClick={() => console.log('View booking:', booking.id)}
                onContact={() => console.log('Contact pro')}
                onMessage={() => console.log('Message pro')}
                interactive
                showPaymentInfo
              />
            ))}
          </div>
        </div>
      </div>
    </ModernDashboardLayout>
  );
}

// Example Professional Dashboard using new components
export function ExampleProDashboard() {
  const { isMobile } = useResponsive();

  // Mock data for professional dashboard
  const proStats = [
    { label: 'Revenus', value: 18500, trend: { value: 15.2, isPositive: true } },
    { label: 'Réservations', value: 127, trend: { value: 8.3, isPositive: true } },
    { label: 'Taux réponse', value: 95, trend: { value: -2.1, isPositive: false } },
    { label: 'Note clients', value: 4.8, trend: { value: 5.2, isPositive: true } },
  ];

  const proBookings = [
    {
      id: '1',
      clientId: '1',
      clientName: 'Sarah Benali',
      clientAvatar: '',
      serviceName: 'Réparation plomberie',
      serviceCategory: 'Plomberie',
      status: 'confirmed' as const,
      scheduledDate: '2024-11-20',
      scheduledTime: '14:00',
      duration: '2h',
      price: 250,
      location: 'Casablanca',
      createdAt: '2024-11-19T10:00:00Z',
      updatedAt: '2024-11-19T10:00:00Z',
      unreadMessages: 2,
      isUrgent: false
    }
  ];

  if (isMobile) {
    return (
      <ModernDashboardLayout type="pro">
        <div className="space-y-6">
          {/* Pro KPI Cards */}
          <div className="grid grid-cols-2 gap-4">
            <MobileKPICard
              title="Revenus"
              value={18500}
              trend={{ value: 15.2, isPositive: true }}
              variant="revenue"
            />
            <MobileKPICard
              title="Réservations"
              value={127}
              trend={{ value: 8.3, isPositive: true }}
              variant="bookings"
            />
          </div>

          {/* Mobile Revenue Chart */}
          <MobileRevenueChart
            data={[
              { label: 'Jan', value: 15000, change: 5 },
              { label: 'Fév', value: 16200, change: 8 },
              { label: 'Mar', value: 15800, change: -2 },
              { label: 'Avr', value: 17100, change: 8 },
              { label: 'Mai', value: 18500, change: 8 },
            ]}
            height={160}
          />

          {/* Mobile Booking Card */}
          <EnhancedBookingCard
            booking={{
              id: '1',
              clientId: '1',
              professionalName: 'Sarah Benali',
              serviceName: 'Réparation plomberie',
              serviceCategory: 'Plomberie',
              status: 'confirmed' as const,
              scheduledDate: '2024-11-20',
              scheduledTime: '14:00',
              duration: '2h',
              price: 250,
              location: 'Casablanca',
              createdAt: '2024-11-19T10:00:00Z',
              updatedAt: '2024-11-19T10:00:00Z'
            }}
            variant="mobile"
            onClick={() => console.log('View booking')}
            interactive
            showPaymentInfo
          />
        </div>
      </ModernDashboardLayout>
    );
  }

  return (
    <ModernDashboardLayout type="pro">
      <div className="space-y-6">
        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-8 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <BarChart3 className="w-full h-full text-[#F97B22]" />
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-[#EDEEEF] rounded-full flex items-center justify-center relative">
                  <div className="w-10 h-10 bg-[#F97B22] rounded-full" />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Settings className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary mb-2">
                    Bonjour, Ahmed ! 👋
                  </h1>
                  <p className="text-text-secondary mb-3 text-lg">
                    Professionnel • Analytics en temps réel
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">4.8</span>
                      <span className="text-sm text-text-secondary">(127 avis)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm text-green-600 font-medium">En ligne</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-[#F97B22] mb-1">
                  18,500 DH
                </div>
                <p className="text-sm text-text-secondary">
                  Ce mois-ci • +15.2% vs mois dernier
                </p>
                <div className="mt-2 flex items-center justify-end space-x-1 text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Croissance continue</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proStats.map((stat, index) => (
            <EnhancedStatsCard
              key={index}
              title={stat.label}
              value={stat.value}
              icon={index === 0 ? DollarSign : index === 1 ? Calendar : index === 2 ? Users : Star}
              trend={stat.trend}
              variant="default"
              size="md"
              interactive
              showProgress={index < 2}
              progress={index === 0 ? { current: 18500, target: 20000, label: 'Objectif mensuel' } : undefined}
              actions={[
                {
                  label: 'Détails',
                  onClick: () => console.log(`View ${stat.label} details`)
                }
              ]}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-6">
            <MobileChart
              title="Revenus mensuels"
              subtitle="Évolution sur 6 mois"
              data={[
                { label: 'Jan', value: 15000, change: 5 },
                { label: 'Fév', value: 16200, change: 8 },
                { label: 'Mar', value: 15800, change: -2 },
                { label: 'Avr', value: 17100, change: 8 },
                { label: 'Mai', value: 18500, change: 8 },
                { label: 'Jun', value: 19200, change: 4 },
              ]}
              type="area"
              variant="revenue"
              height={300}
              interactive
            />

            <MobileBookingsChart
              data={[
                { label: 'Jan', value: 23, change: 5 },
                { label: 'Fév', value: 28, change: 22 },
                { label: 'Mar', value: 25, change: -11 },
                { label: 'Avr', value: 32, change: 28 },
                { label: 'Mai', value: 35, change: 9 },
              ]}
              height={240}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Bookings */}
            <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-primary font-heading">
                  Réservations récentes
                </h3>
                <AccessibleButton variant="ghost" className="text-[#F97B22] hover:bg-[#F97B22]/10">
                  Voir tout
                  <ChevronRight className="w-4 h-4 ml-1" />
                </AccessibleButton>
              </div>
              
              <div className="space-y-4">
                {proBookings.map((booking) => (
                  <EnhancedBookingCard
                    key={booking.id}
                    booking={{
                      id: booking.id,
                      clientId: booking.clientId,
                      professionalName: booking.clientName,
                      serviceName: booking.serviceName,
                      serviceCategory: booking.serviceCategory,
                      status: booking.status,
                      scheduledDate: booking.scheduledDate,
                      scheduledTime: booking.scheduledTime,
                      duration: booking.duration,
                      price: booking.price,
                      location: booking.location,
                      createdAt: booking.createdAt,
                      updatedAt: booking.updatedAt
                    }}
                    variant="compact"
                    onClick={() => console.log('View booking')}
                    interactive
                  />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4 font-heading">
                Actions rapides
              </h3>
              <div className="space-y-3">
                <AccessibleButton className="w-full justify-start bg-[#F97B22] hover:bg-[#e66a1f] text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un service
                </AccessibleButton>
                <AccessibleButton 
                  variant="outline" 
                  className="w-full justify-start border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Voir planning
                </AccessibleButton>
                <AccessibleButton 
                  variant="outline" 
                  className="w-full justify-start border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics détaillées
                </AccessibleButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernDashboardLayout>
  );
}

// Responsive component that shows different layouts based on screen size
export function ResponsiveDashboardExample() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [userType, setUserType] = useState<'client' | 'pro'>('pro');

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Demo Controls */}
      <div className="mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-xl border">
        <h2 className="text-lg font-bold mb-4">Responsive Dashboard Demo</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">Current breakpoint:</span>
          <span className="px-2 py-1 bg-[#F97B22] text-white rounded text-sm font-medium">
            {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
          </span>
          <div className="flex space-x-2">
            <AccessibleButton
              variant={userType === 'client' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setUserType('client')}
            >
              Client
            </AccessibleButton>
            <AccessibleButton
              variant={userType === 'pro' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setUserType('pro')}
            >
              Professional
            </AccessibleButton>
          </div>
        </div>
      </div>

      {/* Dynamic Dashboard */}
      {userType === 'client' ? <ExampleClientDashboard /> : <ExampleProDashboard />}
    </div>
  );
}