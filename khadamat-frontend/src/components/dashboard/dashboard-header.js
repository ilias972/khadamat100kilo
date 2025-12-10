'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardHeader = DashboardHeader;
const react_1 = __importDefault(require("react"));
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const dropdown_1 = require("@/components/ui/dropdown");
const auth_context_1 = require("@/lib/auth-context");
const navigation_1 = require("next/navigation");
function DashboardHeader({ title, subtitle, onMenuClick, unreadNotifications = 0 }) {
    const { user, logout } = (0, auth_context_1.useAuth)();
    const router = (0, navigation_1.useRouter)();
    const roles = (0, auth_context_1.useUserRole)();
    const isClient = (0, auth_context_1.useIsClient)();
    const isPro = (0, auth_context_1.useIsPro)();
    const isAdmin = (0, auth_context_1.useIsAdmin)();
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
        }
        else if (isPro) {
            router.push('/pro/dashboard');
        }
        else if (isClient) {
            router.push('/client/dashboard');
        }
        else {
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
    return (<div className="bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.9)] backdrop-blur-sm border-b border-border-light lg:border-b-0">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            
            <button type="button" className="lg:hidden -ml-2 mr-2 p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#F97B22]" onClick={onMenuClick}>
              <span className="sr-only">Ouvrir le menu</span>
              <lucide_react_1.Menu className="h-6 w-6"/>
            </button>

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-text-primary font-heading">
                {title}
              </h1>
              {subtitle && (<p className="mt-1 text-sm text-text-secondary">
                  {subtitle}
                </p>)}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <lucide_react_1.Search className="h-5 w-5 text-text-muted"/>
                </div>
                <input type="text" placeholder="Rechercher..." className="block w-full pl-10 pr-3 py-2 border border-border-light rounded-lg bg-white/50 backdrop-blur-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-[#F97B22]/20 focus:border-[#F97B22] text-sm"/>
              </div>
            </div>

            
            <button_1.Button variant="ghost" size="sm" className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-surface">
              <lucide_react_1.Bell className="h-5 w-5"/>
              {unreadNotifications > 0 && (<span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>)}
            </button_1.Button>

            
            <button_1.Button variant="ghost" size="sm" className="md:hidden p-2 text-text-secondary hover:text-text-primary hover:bg-surface">
              <lucide_react_1.Search className="h-5 w-5"/>
            </button_1.Button>

            
            <dropdown_1.Dropdown trigger={<div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#F97B22] rounded-full flex items-center justify-center">
                    <lucide_react_1.User className="h-4 w-4 text-white"/>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-text-primary">
                    {getUserDisplayName()}
                  </span>
                </div>}>
              <dropdown_1.DropdownItem onClick={handleDashboardRedirect}>
                Mon Tableau de Bord
              </dropdown_1.DropdownItem>
              <dropdown_1.DropdownItem onClick={handleProfileRedirect}>
                Mon Profil
              </dropdown_1.DropdownItem>
              <dropdown_1.DropdownDivider />
              <dropdown_1.DropdownItem onClick={handleLogout}>
                Se déconnecter
              </dropdown_1.DropdownItem>
            </dropdown_1.Dropdown>
          </div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=dashboard-header.js.map