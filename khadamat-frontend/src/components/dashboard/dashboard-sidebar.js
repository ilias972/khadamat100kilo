'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardSidebar = DashboardSidebar;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const auth_context_1 = require("@/lib/auth-context");
const lucide_react_1 = require("lucide-react");
const clientNavigation = [
    { name: 'Aperçu', href: '/dashboard/client', icon: lucide_react_1.LayoutDashboard },
    { name: 'Historique', href: '/dashboard/client/history', icon: lucide_react_1.History },
    { name: 'Messages', href: '/dashboard/client/messages', icon: lucide_react_1.MessageSquare },
    { name: 'Favoris', href: '/dashboard/client/favorites', icon: lucide_react_1.Heart },
];
const proNavigation = [
    { name: 'Tableau de bord', href: '/dashboard/pro', icon: lucide_react_1.LayoutDashboard },
    { name: 'Mes Réservations', href: '/dashboard/pro/bookings', icon: lucide_react_1.Calendar },
    { name: 'Mes Services', href: '/dashboard/pro/services', icon: lucide_react_1.Settings },
    { name: 'Revenus', href: '/dashboard/pro/earnings', icon: lucide_react_1.LayoutDashboard },
    { name: 'Messages', href: '/dashboard/pro/messages', icon: lucide_react_1.MessageSquare },
];
function DashboardSidebar({ userType, userName, userAvatar, unreadMessages = 0, onClose }) {
    const pathname = (0, navigation_1.usePathname)();
    const router = (0, navigation_1.useRouter)();
    const { logout } = (0, auth_context_1.useAuth)();
    const navigation = userType === 'client' ? clientNavigation : proNavigation;
    const handleSettingsClick = () => {
        alert('Page paramètres en développement');
    };
    const handleLogoutClick = () => {
        logout();
        router.push('/');
    };
    return (<div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.9)] backdrop-blur-sm border-r border-border-light">
          
          {onClose && (<div className="lg:hidden flex justify-end p-4 border-b border-border-light">
              <button onClick={onClose} className="p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface transition-colors">
                <lucide_react_1.X className="h-5 w-5"/>
                <span className="sr-only">Fermer le menu</span>
              </button>
            </div>)}

          
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#EDEEEF] rounded-full flex items-center justify-center">
                  {userAvatar ? (<img className="w-10 h-10 rounded-full" src={userAvatar} alt={userName}/>) : (<lucide_react_1.User className="w-6 h-6 text-text-muted"/>)}
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

            
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (<link_1.default key={item.name} href={item.href} onClick={onClose} className={(0, utils_1.cn)('group flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-all duration-200', isActive
                    ? 'bg-[#F97B22] text-white shadow-lg'
                    : 'text-text-secondary hover:bg-[#F97B22]/10 hover:text-[#F97B22]')}>
                    <item.icon className={(0, utils_1.cn)('mr-3 flex-shrink-0 h-5 w-5', isActive ? 'text-white' : 'text-text-muted group-hover:text-[#F97B22]')}/>
                    <span className="flex-1">{item.name}</span>
                    {item.name === 'Messages' && unreadMessages > 0 && (<span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                        {unreadMessages}
                      </span>)}
                  </link_1.default>);
        })}
            </nav>
          </div>

          
          <div className="flex-shrink-0 flex border-t border-border-light p-4">
            <div className="flex items-center space-x-3 w-full">
              <button onClick={handleSettingsClick} className="flex items-center space-x-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
                <lucide_react_1.Settings className="w-4 h-4"/>
                <span>Paramètres</span>
              </button>
              <div className="flex-1"/>
              <button onClick={handleLogoutClick} className="flex items-center space-x-2 text-sm text-text-secondary hover:text-red-600 transition-colors">
                <lucide_react_1.LogOut className="w-4 h-4"/>
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=dashboard-sidebar.js.map