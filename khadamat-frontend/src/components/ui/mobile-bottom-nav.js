'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileBottomNav = MobileBottomNav;
exports.useMobileLayout = useMobileLayout;
exports.SafeAreaPadding = SafeAreaPadding;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
const lucide_react_1 = require("lucide-react");
const navItems = [
    {
        id: 'home',
        label: 'Accueil',
        href: '/dashboard',
        icon: lucide_react_1.Home,
        badge: 0
    },
    {
        id: 'bookings',
        label: 'Réservations',
        href: '/dashboard/bookings',
        icon: lucide_react_1.Calendar,
        badge: 3
    },
    {
        id: 'messages',
        label: 'Messages',
        href: '/dashboard/messages',
        icon: lucide_react_1.MessageSquare,
        badge: 2
    },
    {
        id: 'favorites',
        label: 'Favoris',
        href: '/dashboard/favorites',
        icon: lucide_react_1.Heart,
        badge: 0
    },
    {
        id: 'profile',
        label: 'Profil',
        href: '/dashboard/profile',
        icon: lucide_react_1.User,
        badge: 0
    }
];
function MobileBottomNav({ className }) {
    const pathname = (0, navigation_1.usePathname)();
    const isClientDashboard = pathname.includes('/dashboard/client') || pathname === '/dashboard/client';
    const isProDashboard = pathname.includes('/dashboard/pro') || pathname === '/dashboard/pro';
    const getHref = (item) => {
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
            if (pathname === '/dashboard/client')
                return 'home';
            if (pathname.includes('/dashboard/client/bookings') || pathname.includes('/dashboard/client/history'))
                return 'bookings';
            if (pathname.includes('/dashboard/client/messages'))
                return 'messages';
            if (pathname.includes('/dashboard/client/favorites'))
                return 'favorites';
            if (pathname.includes('/dashboard/client/profile'))
                return 'profile';
        }
        if (isProDashboard) {
            if (pathname === '/dashboard/pro')
                return 'home';
            if (pathname.includes('/dashboard/pro/bookings'))
                return 'bookings';
            if (pathname.includes('/dashboard/pro/messages'))
                return 'messages';
            if (pathname.includes('/dashboard/pro/earnings'))
                return 'home';
            if (pathname.includes('/dashboard/pro/services'))
                return 'home';
            if (pathname.includes('/dashboard/pro/profile'))
                return 'profile';
        }
        return 'home';
    };
    const activeItem = getActiveItem();
    return (<nav className={(0, utils_1.cn)('fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-br from-[rgba(250,247,242,0.95)] to-[rgba(255,255,255,0.9)] backdrop-blur-lg border-t border-border-light', 'safe-area-inset-bottom', className)} role="navigation" aria-label="Navigation principale">
      <div className="flex items-center justify-around px-2 py-1">
        {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const href = getHref(item);
            const badge = item.badge || 0;
            return (<link_1.default key={item.id} href={href} className={(0, utils_1.cn)('relative flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1', 'transition-all duration-200 ease-out', 'focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:ring-offset-2', 'active:scale-95', 'min-h-[56px] min-w-[44px]', isActive
                    ? 'text-[#F97B22]'
                    : 'text-text-secondary hover:text-text-primary')} aria-label={item.label} aria-current={isActive ? 'page' : undefined}>
              
              <div className="relative mb-1">
                <Icon className={(0, utils_1.cn)('w-6 h-6 transition-all duration-200', isActive ? 'scale-110' : 'scale-100')} aria-hidden="true"/>
                
                
                {badge > 0 && (<div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {badge > 9 ? '9+' : badge}
                  </div>)}
                
                
                {isActive && (<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#F97B22] rounded-full"/>)}
              </div>
              
              
              <span className={(0, utils_1.cn)('text-xs font-medium leading-tight text-center', 'transition-all duration-200', isActive
                    ? 'text-[#F97B22] font-semibold'
                    : 'text-text-secondary')}>
                {item.label}
              </span>
            </link_1.default>);
        })}
      </div>
    </nav>);
}
function useMobileLayout() {
    const [isMobile, setIsMobile] = react_1.default.useState(false);
    const [isLandscape, setIsLandscape] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
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
function SafeAreaPadding({ children }) {
    return (<div className="pb-safe">
      {children}
    </div>);
}
//# sourceMappingURL=mobile-bottom-nav.js.map