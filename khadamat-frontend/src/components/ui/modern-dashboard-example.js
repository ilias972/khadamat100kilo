'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModernDashboardLayout = ModernDashboardLayout;
exports.ExampleClientDashboard = ExampleClientDashboard;
exports.ExampleProDashboard = ExampleProDashboard;
exports.ResponsiveDashboardExample = ResponsiveDashboardExample;
const react_1 = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
const framer_motion_1 = require("framer-motion");
const use_responsive_1 = require("@/hooks/use-responsive");
const mobile_bottom_nav_1 = require("./mobile-bottom-nav");
const error_boundary_enhanced_1 = require("./error-boundary-enhanced");
const enhanced_stats_card_1 = require("./enhanced-stats-card");
const enhanced_booking_card_1 = require("./enhanced-booking-card");
const mobile_chart_1 = require("./mobile-chart");
const loading_skeletons_1 = require("./loading-skeletons");
const accessible_components_1 = require("./accessible-components");
const lucide_react_1 = require("lucide-react");
function ModernDashboardLayout({ type, children }) {
    const [sidebarOpen, setSidebarOpen] = (0, react_1.useState)(false);
    const { isMobile, isDesktop, shouldShowMobileNav, shouldShowDesktopSidebar } = (0, use_responsive_1.useResponsive)();
    return (<error_boundary_enhanced_1.EnhancedErrorBoundary level="page">
      <div className="min-h-screen bg-background">
        <accessible_components_1.SkipNav />
        
        
        {isMobile && (<header className="lg:hidden bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.9)] backdrop-blur-sm border-b border-border-light sticky top-0 z-40">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <accessible_components_1.AccessibleButton variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} aria-label="Ouvrir le menu">
                    <lucide_react_1.Menu className="w-5 h-5"/>
                  </accessible_components_1.AccessibleButton>
                  <h1 className="text-lg font-bold text-text-primary">
                    {type === 'client' ? 'Tableau de bord client' : 'Tableau de bord pro'}
                  </h1>
                </div>
                
                <div className="flex items-center space-x-2">
                  <accessible_components_1.AccessibleButton variant="ghost" size="sm" aria-label="Notifications">
                    <lucide_react_1.Bell className="w-5 h-5"/>
                  </accessible_components_1.AccessibleButton>
                  <accessible_components_1.AccessibleButton variant="ghost" size="sm" aria-label="Rechercher">
                    <lucide_react_1.Search className="w-5 h-5"/>
                  </accessible_components_1.AccessibleButton>
                </div>
              </div>
            </div>
          </header>)}

        
        <div className={(0, utils_1.cn)('flex h-screen pt-16', isMobile ? 'pb-20' : '')}>
          
          {shouldShowDesktopSidebar && (<div className="hidden lg:flex lg:flex-shrink-0">
              
              <div className="w-64 bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.9)] backdrop-blur-sm border-r border-border-light">
                
              </div>
            </div>)}

          
          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6">
                {children}
              </div>
            </main>
          </div>
        </div>

        
        {shouldShowMobileNav && <mobile_bottom_nav_1.MobileBottomNav />}
      </div>
    </error_boundary_enhanced_1.EnhancedErrorBoundary>);
}
function ExampleClientDashboard() {
    const [loading, setLoading] = (0, react_1.useState)(false);
    const { isMobile } = (0, use_responsive_1.useResponsive)();
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
            status: 'confirmed',
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
        return (<ModernDashboardLayout type="client">
        {isMobile ? <loading_skeletons_1.MobileDashboardSkeleton /> : <loading_skeletons_1.ClientDashboardSkeleton />}
      </ModernDashboardLayout>);
    }
    return (<ModernDashboardLayout type="client">
      <div className="space-y-6">
        
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-2">
                Bonjour, Sarah ! 👋
              </h1>
              <p className="text-text-secondary">
                Voici un aperçu de vos réservations récentes
              </p>
            </div>
            <accessible_components_1.AccessibleButton className="bg-[#F97B22] hover:bg-[#e66a1f] text-white">
              <lucide_react_1.Plus className="w-4 h-4 mr-2"/>
              Nouvelle réservation
            </accessible_components_1.AccessibleButton>
          </div>
        </framer_motion_1.motion.div>

        
        {isMobile ? (<div className="grid grid-cols-2 gap-4">
            <enhanced_stats_card_1.MobileKPICard title="Réservations" value={stats[0].value} trend={stats[0].trend} variant="bookings"/>
            <enhanced_stats_card_1.MobileKPICard title="Dépenses" value={stats[1].value} trend={stats[1].trend} variant="revenue"/>
            <enhanced_stats_card_1.MobileKPICard title="Favoris" value={stats[2].value} trend={stats[2].trend} variant="growth"/>
            <enhanced_stats_card_1.MobileKPICard title="Note" value={stats[3].value} trend={stats[3].trend} variant="rating"/>
          </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (<enhanced_stats_card_1.EnhancedStatsCard key={index} title={stat.label} value={stat.value} icon={index === 0 ? lucide_react_1.Calendar : index === 1 ? lucide_react_1.DollarSign : index === 2 ? lucide_react_1.Heart : lucide_react_1.Star} trend={stat.trend} variant="default" size="md" interactive actions={[
                    {
                        label: 'Voir détail',
                        onClick: () => console.log(`View ${stat.label} details`)
                    }
                ]}/>))}
          </div>)}

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2">
            {isMobile ? (<mobile_chart_1.MobileRevenueChart data={chartData} height={160}/>) : (<mobile_chart_1.MobileChart title="Évolution des dépenses" subtitle="6 derniers mois" data={chartData} type="area" variant="revenue" height={256} interactive/>)}
          </div>

          
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4 font-heading">
                Actions rapides
              </h3>
              <div className="space-y-3">
                <accessible_components_1.AccessibleButton variant="outline" className="w-full justify-start border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10">
                  <lucide_react_1.Calendar className="w-4 h-4 mr-2"/>
                  Réserver un service
                </accessible_components_1.AccessibleButton>
                <accessible_components_1.AccessibleButton variant="outline" className="w-full justify-start border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10">
                  <lucide_react_1.MessageSquare className="w-4 h-4 mr-2"/>
                  Mes messages
                </accessible_components_1.AccessibleButton>
                <accessible_components_1.AccessibleButton variant="outline" className="w-full justify-start border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10">
                  <lucide_react_1.Heart className="w-4 h-4 mr-2"/>
                  Mes favoris
                </accessible_components_1.AccessibleButton>
              </div>
            </div>
          </div>
        </div>

        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary font-heading">
              Réservations récentes
            </h2>
            <accessible_components_1.AccessibleButton variant="ghost" className="text-[#F97B22] hover:bg-[#F97B22]/10">
              Voir tout
              <lucide_react_1.ChevronRight className="w-4 h-4 ml-1"/>
            </accessible_components_1.AccessibleButton>
          </div>

          <div className={(0, utils_1.cn)('grid gap-4', isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3')}>
            {recentBookings.map((booking) => (<enhanced_booking_card_1.EnhancedBookingCard key={booking.id} booking={booking} variant={isMobile ? 'mobile' : 'default'} size="md" onClick={() => console.log('View booking:', booking.id)} onContact={() => console.log('Contact pro')} onMessage={() => console.log('Message pro')} interactive showPaymentInfo/>))}
          </div>
        </div>
      </div>
    </ModernDashboardLayout>);
}
function ExampleProDashboard() {
    const { isMobile } = (0, use_responsive_1.useResponsive)();
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
            status: 'confirmed',
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
        return (<ModernDashboardLayout type="pro">
        <div className="space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <enhanced_stats_card_1.MobileKPICard title="Revenus" value={18500} trend={{ value: 15.2, isPositive: true }} variant="revenue"/>
            <enhanced_stats_card_1.MobileKPICard title="Réservations" value={127} trend={{ value: 8.3, isPositive: true }} variant="bookings"/>
          </div>

          
          <mobile_chart_1.MobileRevenueChart data={[
                { label: 'Jan', value: 15000, change: 5 },
                { label: 'Fév', value: 16200, change: 8 },
                { label: 'Mar', value: 15800, change: -2 },
                { label: 'Avr', value: 17100, change: 8 },
                { label: 'Mai', value: 18500, change: 8 },
            ]} height={160}/>

          
          <enhanced_booking_card_1.EnhancedBookingCard booking={{
                id: '1',
                clientId: '1',
                professionalName: 'Sarah Benali',
                serviceName: 'Réparation plomberie',
                serviceCategory: 'Plomberie',
                status: 'confirmed',
                scheduledDate: '2024-11-20',
                scheduledTime: '14:00',
                duration: '2h',
                price: 250,
                location: 'Casablanca',
                createdAt: '2024-11-19T10:00:00Z',
                updatedAt: '2024-11-19T10:00:00Z'
            }} variant="mobile" onClick={() => console.log('View booking')} interactive showPaymentInfo/>
        </div>
      </ModernDashboardLayout>);
    }
    return (<ModernDashboardLayout type="pro">
      <div className="space-y-6">
        
        <framer_motion_1.motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-8 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <lucide_react_1.BarChart3 className="w-full h-full text-[#F97B22]"/>
          </div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-[#EDEEEF] rounded-full flex items-center justify-center relative">
                  <div className="w-10 h-10 bg-[#F97B22] rounded-full"/>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <lucide_react_1.Settings className="w-3 h-3 text-white"/>
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
                      <lucide_react_1.Star className="w-5 h-5 text-yellow-400 fill-current"/>
                      <span className="font-semibold">4.8</span>
                      <span className="text-sm text-text-secondary">(127 avis)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
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
                  <lucide_react_1.TrendingUp className="w-4 h-4"/>
                  <span className="text-sm font-medium">Croissance continue</span>
                </div>
              </div>
            </div>
          </div>
        </framer_motion_1.motion.div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proStats.map((stat, index) => (<enhanced_stats_card_1.EnhancedStatsCard key={index} title={stat.label} value={stat.value} icon={index === 0 ? lucide_react_1.DollarSign : index === 1 ? lucide_react_1.Calendar : index === 2 ? lucide_react_1.Users : lucide_react_1.Star} trend={stat.trend} variant="default" size="md" interactive showProgress={index < 2} progress={index === 0 ? { current: 18500, target: 20000, label: 'Objectif mensuel' } : undefined} actions={[
                {
                    label: 'Détails',
                    onClick: () => console.log(`View ${stat.label} details`)
                }
            ]}/>))}
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            <mobile_chart_1.MobileChart title="Revenus mensuels" subtitle="Évolution sur 6 mois" data={[
            { label: 'Jan', value: 15000, change: 5 },
            { label: 'Fév', value: 16200, change: 8 },
            { label: 'Mar', value: 15800, change: -2 },
            { label: 'Avr', value: 17100, change: 8 },
            { label: 'Mai', value: 18500, change: 8 },
            { label: 'Jun', value: 19200, change: 4 },
        ]} type="area" variant="revenue" height={300} interactive/>

            <mobile_chart_1.MobileBookingsChart data={[
            { label: 'Jan', value: 23, change: 5 },
            { label: 'Fév', value: 28, change: 22 },
            { label: 'Mar', value: 25, change: -11 },
            { label: 'Avr', value: 32, change: 28 },
            { label: 'Mai', value: 35, change: 9 },
        ]} height={240}/>
          </div>

          
          <div className="space-y-6">
            
            <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-primary font-heading">
                  Réservations récentes
                </h3>
                <accessible_components_1.AccessibleButton variant="ghost" className="text-[#F97B22] hover:bg-[#F97B22]/10">
                  Voir tout
                  <lucide_react_1.ChevronRight className="w-4 h-4 ml-1"/>
                </accessible_components_1.AccessibleButton>
              </div>
              
              <div className="space-y-4">
                {proBookings.map((booking) => (<enhanced_booking_card_1.EnhancedBookingCard key={booking.id} booking={{
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
            }} variant="compact" onClick={() => console.log('View booking')} interactive/>))}
              </div>
            </div>

            
            <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6">
              <h3 className="text-lg font-bold text-text-primary mb-4 font-heading">
                Actions rapides
              </h3>
              <div className="space-y-3">
                <accessible_components_1.AccessibleButton className="w-full justify-start bg-[#F97B22] hover:bg-[#e66a1f] text-white">
                  <lucide_react_1.Plus className="w-4 h-4 mr-2"/>
                  Ajouter un service
                </accessible_components_1.AccessibleButton>
                <accessible_components_1.AccessibleButton variant="outline" className="w-full justify-start border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10">
                  <lucide_react_1.Calendar className="w-4 h-4 mr-2"/>
                  Voir planning
                </accessible_components_1.AccessibleButton>
                <accessible_components_1.AccessibleButton variant="outline" className="w-full justify-start border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10">
                  <lucide_react_1.BarChart3 className="w-4 h-4 mr-2"/>
                  Analytics détaillées
                </accessible_components_1.AccessibleButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModernDashboardLayout>);
}
function ResponsiveDashboardExample() {
    const { isMobile, isTablet, isDesktop } = (0, use_responsive_1.useResponsive)();
    const [userType, setUserType] = (0, react_1.useState)('pro');
    return (<div className="min-h-screen bg-background p-4">
      
      <div className="mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-xl border">
        <h2 className="text-lg font-bold mb-4">Responsive Dashboard Demo</h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-text-secondary">Current breakpoint:</span>
          <span className="px-2 py-1 bg-[#F97B22] text-white rounded text-sm font-medium">
            {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
          </span>
          <div className="flex space-x-2">
            <accessible_components_1.AccessibleButton variant={userType === 'client' ? 'default' : 'outline'} size="sm" onClick={() => setUserType('client')}>
              Client
            </accessible_components_1.AccessibleButton>
            <accessible_components_1.AccessibleButton variant={userType === 'pro' ? 'default' : 'outline'} size="sm" onClick={() => setUserType('pro')}>
              Professional
            </accessible_components_1.AccessibleButton>
          </div>
        </div>
      </div>

      
      {userType === 'client' ? <ExampleClientDashboard /> : <ExampleProDashboard />}
    </div>);
}
//# sourceMappingURL=modern-dashboard-example.js.map