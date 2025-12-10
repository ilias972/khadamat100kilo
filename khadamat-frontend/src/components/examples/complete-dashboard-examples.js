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
exports.CompleteProfessionalDashboard = exports.CompleteClientDashboard = void 0;
const react_1 = __importStar(require("react"));
const personalized_recommendations_1 = require("@/components/client/personalized-recommendations");
const advanced_booking_manager_1 = require("@/components/client/advanced-booking-manager");
const trust_badge_system_1 = require("@/components/client/trust-badge-system");
const customizable_dashboard_1 = require("@/components/pro/customizable-dashboard");
const ai_business_insights_1 = require("@/components/pro/ai-business-insights");
const advanced_reporting_1 = require("@/components/pro/advanced-reporting");
const mobile_bottom_nav_1 = require("@/components/ui/mobile-bottom-nav");
const use_responsive_1 = require("@/hooks/use-responsive");
const usePerformanceMonitoring_1 = require("@/hooks/usePerformanceMonitoring");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const CompleteClientDashboard = () => {
    const { isMobile, isTablet } = (0, use_responsive_1.useResponsive)();
    const { metrics, getOverallScore } = (0, usePerformanceMonitoring_1.usePerformanceMonitoring)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('home');
    const userId = 'client-123';
    const bookingHistory = [];
    const handleBookingAction = (action, bookingId) => {
        console.log(`Action: ${action} on booking: ${bookingId}`);
    };
    return (<div className="min-h-screen bg-[#FAF7F2]">
      
      <header className="bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.8)] backdrop-blur-sm border-b border-[#EDEEEF] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#3B3B3B] font-heading">
                Tableau de bord Client
              </h1>
              <p className="text-sm text-[#6B7280]">
                Bienvenue, Sarah M.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button_1.Button variant="ghost" size="sm">
                <lucide_react_1.Bell className="w-5 h-5"/>
              </button_1.Button>
              <button_1.Button variant="ghost" size="sm">
                <lucide_react_1.Settings className="w-5 h-5"/>
              </button_1.Button>
            </div>
          </div>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <div className="space-y-8">
          
          {process.env.NODE_ENV === 'development' && (<card_1.Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Performance Score
                  </p>
                  <p className="text-xs text-blue-700">
                    LCP: {metrics.lcp.toFixed(0)}ms | FID: {metrics.fid.toFixed(0)}ms
                  </p>
                </div>
                <badge_1.Badge className="bg-blue-600 text-white">
                  {getOverallScore()}/100
                </badge_1.Badge>
              </div>
            </card_1.Card>)}

          
          <section>
            <personalized_recommendations_1.PersonalizedRecommendations userId={userId} bookingHistory={bookingHistory} maxRecommendations={6}/>
          </section>

          
          <section>
            <advanced_booking_manager_1.AdvancedBookingManager onBookingAction={handleBookingAction}/>
          </section>

          
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <trust_badge_system_1.ClientSuccessStories maxStories={3}/>
            
            <card_1.Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] p-6">
              <h3 className="text-lg font-bold text-[#3B3B3B] mb-4 font-heading">
                Professionnel en vedette
              </h3>
              <trust_badge_system_1.TrustBadgeSystem professional={{
            id: 'pro-1',
            name: 'Fatima Z.',
            rating: 4.9,
            reviewCount: 127,
            completedProjects: 156,
            responseTime: 1.5,
            verified: true,
            joinedDate: '2022-01-15'
        }} showDescription={true}/>
              <div className="mt-6">
                <trust_badge_system_1.TrustIndicators professional={{
            id: 'pro-1',
            name: 'Fatima Z.',
            rating: 4.9,
            reviewCount: 127,
            completedProjects: 156,
            responseTime: 1.5,
            verified: true,
            joinedDate: '2022-01-15'
        }}/>
              </div>
            </card_1.Card>
          </section>
        </div>
      </main>

      
      {isMobile && (<mobile_bottom_nav_1.MobileBottomNav />)}
    </div>);
};
exports.CompleteClientDashboard = CompleteClientDashboard;
const CompleteProfessionalDashboard = () => {
    const { isMobile } = (0, use_responsive_1.useResponsive)();
    const { metrics, getOverallScore } = (0, usePerformanceMonitoring_1.usePerformanceMonitoring)();
    const [activeTab, setActiveTab] = (0, react_1.useState)('home');
    const businessData = {
        revenue: 18500,
        bookings: 127,
        averageRating: 4.9,
        completionRate: 98
    };
    const handleImplementInsight = (insight) => {
        console.log('Implementing insight:', insight);
    };
    const handleGenerateReport = async (config) => {
        console.log('Generating report with config:', config);
    };
    const handleScheduleReport = async (config) => {
        console.log('Schedule:', config);
    };
    return (<div className="min-h-screen bg-[#FAF7F2]">
      
      <header className="bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.8)] backdrop-blur-sm border-b border-[#EDEEEF] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#3B3B3B] font-heading">
                Tableau de bord Professionnel
              </h1>
              <p className="text-sm text-[#6B7280]">
                Bienvenue, Ahmed M.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <badge_1.Badge className="bg-green-100 text-green-700">
                <lucide_react_1.TrendingUp className="w-3 h-3 mr-1"/>
                +15.2% ce mois
              </badge_1.Badge>
              <button_1.Button variant="ghost" size="sm">
                <lucide_react_1.Bell className="w-5 h-5"/>
              </button_1.Button>
              <button_1.Button variant="ghost" size="sm">
                <lucide_react_1.Settings className="w-5 h-5"/>
              </button_1.Button>
            </div>
          </div>
        </div>
      </header>

      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
        <div className="space-y-8">
          
          {process.env.NODE_ENV === 'development' && (<card_1.Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Performance Score
                  </p>
                  <p className="text-xs text-green-700">
                    Page optimized for {isMobile ? 'mobile' : 'desktop'}
                  </p>
                </div>
                <badge_1.Badge className="bg-green-600 text-white">
                  {getOverallScore()}/100
                </badge_1.Badge>
              </div>
            </card_1.Card>)}

          
          <section>
            <customizable_dashboard_1.CustomizableDashboard />
          </section>

          
          <section>
            <ai_business_insights_1.AIBusinessInsights businessData={businessData} onImplement={handleImplementInsight} onLearnMore={(insight) => console.log('Learn more:', insight)}/>
          </section>

          
          <section>
            <advanced_reporting_1.AdvancedReporting onGenerateReport={handleGenerateReport} onScheduleReport={handleScheduleReport}/>
          </section>
        </div>
      </main>

      
      {isMobile && (<mobile_bottom_nav_1.MobileBottomNav />)}
    </div>);
};
exports.CompleteProfessionalDashboard = CompleteProfessionalDashboard;
//# sourceMappingURL=complete-dashboard-examples.js.map