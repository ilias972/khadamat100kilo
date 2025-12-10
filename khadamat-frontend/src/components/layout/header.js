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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const framer_motion_1 = require("framer-motion");
const button_1 = require("@/components/ui/button");
const language_toggle_1 = require("@/components/ui/language-toggle");
const lucide_react_1 = require("lucide-react");
const auth_context_1 = require("@/lib/auth-context");
const Header = () => {
    const router = (0, navigation_1.useRouter)();
    const { user, logout } = (0, auth_context_1.useAuth)();
    const roles = (0, auth_context_1.useUserRole)();
    const isClient = (0, auth_context_1.useIsClient)();
    const isPro = (0, auth_context_1.useIsPro)();
    const isAdmin = (0, auth_context_1.useIsAdmin)();
    const isAuthenticated = !!user;
    const [isScrolled, setIsScrolled] = (0, react_1.useState)(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, react_1.useState)(false);
    const [isSearchOpen, setIsSearchOpen] = (0, react_1.useState)(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = (0, react_1.useState)(false);
    const { scrollY } = (0, framer_motion_1.useScroll)();
    const headerOpacity = (0, framer_motion_1.useTransform)(scrollY, [0, 50, 100], [0.9, 0.95, 0.98]);
    const headerBlur = (0, framer_motion_1.useTransform)(scrollY, [0, 50, 100], [10, 12, 15]);
    const headerScale = (0, framer_motion_1.useTransform)(scrollY, [0, 50], [1, 0.995]);
    const headerY = (0, framer_motion_1.useTransform)(scrollY, [0, 50], [0, -2]);
    const logoRotation = (0, framer_motion_1.useTransform)(scrollY, [0, 100], [0, 1]);
    const navItemsStagger = (0, framer_motion_1.useTransform)(scrollY, [0, 50], [0, 0.05]);
    const arabesqueParallax = (0, framer_motion_1.useTransform)(scrollY, [0, 500], [0, -50]);
    const geometricParallax = (0, framer_motion_1.useTransform)(scrollY, [0, 500], [0, 30]);
    const starPatternParallax = (0, framer_motion_1.useTransform)(scrollY, [0, 500], [0, -20]);
    const handleLogout = () => {
        logout();
        router.push('/');
    };
    const handleSettings = () => {
        router.push('/profile');
    };
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
            router.push('/dashboard/pro');
        }
        else if (isClient) {
            router.push('/dashboard/client');
        }
        else {
            router.push('/dashboard');
        }
    };
    const handleProfileRedirect = () => {
        router.push('/profile');
    };
    (0, react_1.useEffect)(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            const target = event.target;
            if (!target.closest('.user-dropdown-container')) {
                setIsUserDropdownOpen(false);
            }
        };
        if (isUserDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserDropdownOpen]);
    const navigation = [
        { name: 'Accueil', href: '/' },
        { name: 'Services', href: '/services' },
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Contact', href: '/contact' },
    ];
    return (<framer_motion_1.motion.header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
            : 'bg-transparent'}`} style={{
            backdropFilter: `blur(${headerBlur}px)`,
            backgroundColor: headerOpacity,
            scale: headerScale,
            y: headerY
        }} initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 100,
            damping: 20
        }}>
      
      <div className="absolute inset-0 pointer-events-none">
        
        <framer_motion_1.motion.div className="absolute top-2 right-20 opacity-5" style={{ y: arabesqueParallax }}>
          <svg width="60" height="60" viewBox="0 0 100 100" className="text-primary-600">
            <path d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
            <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.5"/>
          </svg>
        </framer_motion_1.motion.div>

        
        <framer_motion_1.motion.div className="absolute top-4 left-32 opacity-5" style={{ y: geometricParallax }}>
          <svg width="40" height="40" viewBox="0 0 100 100" className="text-secondary-600">
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
            <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.6"/>
          </svg>
        </framer_motion_1.motion.div>

        
        <framer_motion_1.motion.div className="absolute bottom-2 right-40 opacity-5" style={{ y: starPatternParallax }}>
          <svg width="30" height="30" viewBox="0 0 100 100" className="text-primary-500">
            <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
          </svg>
        </framer_motion_1.motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          <framer_motion_1.motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
            <link_1.default href="/" className="flex items-center space-x-3 group relative">
              <framer_motion_1.motion.img src="/logoSITE.png" alt="Khadamat Logo" className="h-16 w-auto" style={{ rotate: logoRotation }} whileHover={{
            rotate: [logoRotation.get(), -3, 3, logoRotation.get()],
            scale: 1.05
        }} transition={{
            duration: 0.6,
            ease: [0.68, -0.55, 0.265, 1.55],
            type: "spring",
            stiffness: 300,
            damping: 20
        }}/>
              <div className="flex flex-col">
                <framer_motion_1.motion.span className="text-h3 lg:text-h2 font-black bg-gradient-to-r from-text-primary via-primary-800 to-primary-900 bg-clip-text text-transparent font-heading" whileHover={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }} transition={{ duration: 2, ease: "easeInOut" }} style={{ backgroundSize: "200% 200%" }}>
                  Khadamat
                </framer_motion_1.motion.span>
                <framer_motion_1.motion.span className="text-caption text-text-muted hidden sm:block font-medium font-body" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }}>
                  Plateforme #1 au Maroc
                </framer_motion_1.motion.span>
              </div>
            </link_1.default>
          </framer_motion_1.motion.div>

          
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (<framer_motion_1.motion.div key={item.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{
                delay: index * 0.1,
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}>
                <link_1.default href={item.href} className="text-text-secondary hover:text-primary-600 transition-colors font-medium relative group font-body">
                  <framer_motion_1.motion.span whileHover={{
                scale: 1.05,
                y: -1,
                rotateX: 5,
                rotateY: 2
            }} transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 0.8
            }} className="inline-block">
                    {item.name}
                  </framer_motion_1.motion.span>
                  <framer_motion_1.motion.span className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 rounded-full" initial={{ width: 0, scaleX: 0 }} whileHover={{
                width: "100%",
                scaleX: 1
            }} transition={{
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1]
            }}/>
                  
                  <framer_motion_1.motion.div className="absolute -top-1 -right-1 w-1 h-1 bg-primary-500 rounded-full opacity-0" whileHover={{ opacity: 1, scale: 1.5 }} transition={{ duration: 0.2 }}/>
                </link_1.default>
              </framer_motion_1.motion.div>))}
          </nav>

          
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated && user ? (<>
                
                <div className="relative user-dropdown-container">
                  <button onClick={(e) => {
                e.stopPropagation();
                setIsUserDropdownOpen(!isUserDropdownOpen);
            }} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface transition-colors duration-200 relative">
                    <div className="w-8 h-8 bg-[#F97B22] rounded-full flex items-center justify-center">
                      <lucide_react_1.User className="h-4 w-4 text-white"/>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-text-primary">
                      {getUserDisplayName()}
                    </span>
                    <lucide_react_1.ChevronDown className={`h-4 w-4 transition-transform duration-200 ml-1 ${isUserDropdownOpen ? 'rotate-180' : ''}`}/>
                  </button>

                  
                  {isUserDropdownOpen && (<div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-[9999]">
                      <div className="py-1">
                        <button onClick={(e) => {
                    e.stopPropagation();
                    setIsUserDropdownOpen(false);
                    handleDashboardRedirect();
                }} className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-text-primary transition-colors duration-150">
                          Mon Tableau de Bord
                        </button>
                        <button onClick={(e) => {
                    e.stopPropagation();
                    setIsUserDropdownOpen(false);
                    handleProfileRedirect();
                }} className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-text-primary transition-colors duration-150">
                          Mon Profil
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button onClick={(e) => {
                    e.stopPropagation();
                    setIsUserDropdownOpen(false);
                    handleLogout();
                }} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150">
                          Se déconnecter
                        </button>
                      </div>
                    </div>)}
                </div>

                
                <framer_motion_1.motion.button className="relative p-2 rounded-xl text-text-secondary hover:text-primary-600 hover:bg-primary-50/80 transition-all duration-300 overflow-hidden group" whileHover={{
                scale: 1.1,
                boxShadow: "0 0 25px rgba(249, 123, 34, 0.5)"
            }} whileTap={{ scale: 0.95 }} aria-label="Notifications">
                  <framer_motion_1.motion.div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={{ scale: 0 }} whileHover={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}/>
                  <framer_motion_1.motion.div className="absolute inset-0 rounded-xl border border-primary-500/40 opacity-0 group-hover:opacity-100" initial={{ scale: 0.8 }} whileHover={{ scale: 1 }} transition={{ duration: 0.2 }}/>
                  <lucide_react_1.Bell className="w-5 h-5 relative z-10"/>
                  <framer_motion_1.motion.div className="absolute inset-0 bg-primary-500/10 rounded-xl" initial={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1.3, opacity: 1 }} transition={{ duration: 0.3, ease: "easeOut" }}/>
                  
                  <framer_motion_1.motion.span className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full flex items-center justify-center relative z-20" initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{
                scale: 1.2,
                boxShadow: "0 0 10px rgba(239, 68, 68, 0.8)"
            }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
                    <span className="text-xs text-white font-bold">3</span>
                  </framer_motion_1.motion.span>
                </framer_motion_1.motion.button>
              </>) : (<>
                
                <framer_motion_1.motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button_1.Button size="sm" onClick={() => router.push('/auth/signup')} className="!flex !flex-row !items-center !justify-start gap-2 bg-[#F97B22] hover:bg-[#ea580c] text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                    <lucide_react_1.UserPlus className="w-4 h-4"/>
                    <span>S'inscrire</span>
                  </button_1.Button>
                </framer_motion_1.motion.div>

                
                <framer_motion_1.motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button_1.Button variant="ghost" size="sm" onClick={() => router.push('/auth/login')} className="!flex !flex-row !items-center !justify-start gap-2 text-text-secondary hover:text-primary-600 hover:bg-primary-50/80 font-medium px-6 py-2 rounded-xl transition-all duration-300">
                    <lucide_react_1.LogIn className="w-4 h-4"/>
                    <span>Connexion</span>
                  </button_1.Button>
                </framer_motion_1.motion.div>

                
                <framer_motion_1.motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <button_1.Button variant="outline" size="sm" onClick={() => router.push('/devenir-pro')} className="!flex !flex-row !items-center !justify-start gap-2 border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-400 font-medium px-6 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                    <lucide_react_1.User className="w-4 h-4"/>
                    <span>Devenir Pro</span>
                  </button_1.Button>
                </framer_motion_1.motion.div>
              </>)}

            
            <language_toggle_1.LanguageToggle />

            
            <framer_motion_1.motion.button onClick={() => setIsSearchOpen(!isSearchOpen)} className="relative p-2 rounded-xl text-text-secondary hover:text-primary-600 hover:bg-primary-50/80 transition-all duration-300 overflow-hidden group" whileHover={{
            scale: 1.1,
            boxShadow: "0 0 20px rgba(249, 123, 34, 0.4)"
        }} whileTap={{ scale: 0.95 }} aria-label="Rechercher">
              <framer_motion_1.motion.div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={{ scale: 0 }} whileHover={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}/>
              <framer_motion_1.motion.div className="absolute inset-0 rounded-xl border border-primary-500/30 opacity-0 group-hover:opacity-100" initial={{ scale: 0.8 }} whileHover={{ scale: 1 }} transition={{ duration: 0.2 }}/>
              <lucide_react_1.Search className="w-5 h-5 relative z-10"/>
              <framer_motion_1.motion.div className="absolute inset-0 bg-primary-500/10 rounded-xl" initial={{ scale: 0, opacity: 0 }} whileHover={{ scale: 1.2, opacity: 1 }} transition={{ duration: 0.3, ease: "easeOut" }}/>
            </framer_motion_1.motion.button>
          </div>

          
          <framer_motion_1.motion.button className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-surface-secondary transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle mobile menu" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
            <framer_motion_1.motion.div animate={{ rotate: isMobileMenuOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
              {isMobileMenuOpen ? <lucide_react_1.X size={24}/> : <lucide_react_1.Menu size={24}/>}
            </framer_motion_1.motion.div>
          </framer_motion_1.motion.button>
        </div>

        
        <framer_motion_1.AnimatePresence>
          {isMobileMenuOpen && (<framer_motion_1.motion.div className="lg:hidden border-t border-border-light bg-surface/95 backdrop-blur-md overflow-hidden" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
              <framer_motion_1.motion.nav className="px-4 py-6 space-y-4" initial={{ y: -20 }} animate={{ y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
                <framer_motion_1.motion.div className="flex justify-center pb-4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.3 }}>
                  <language_toggle_1.LanguageToggle />
                </framer_motion_1.motion.div>
                {navigation.map((item, index) => (<framer_motion_1.motion.div key={item.name} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 * index, duration: 0.3 }}>
                    <link_1.default href={item.href} className="block text-text-secondary hover:text-primary-600 transition-colors font-medium py-3 px-2 rounded-lg hover:bg-primary-50/50 font-body" onClick={() => setIsMobileMenuOpen(false)}>
                      <framer_motion_1.motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
                        {item.name}
                      </framer_motion_1.motion.span>
                    </link_1.default>
                  </framer_motion_1.motion.div>))}
              <div className="pt-4 space-y-3 border-t border-border-light">
                {isAuthenticated && user ? (<>
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <lucide_react_1.User className="w-5 h-5 text-primary-600"/>
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{getUserDisplayName()}</p>
                          <p className="text-sm text-text-secondary capitalize">
                            {JSON.parse(user.roles).includes('pro') ? 'Professionnel' : 'Client'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button_1.Button variant="ghost" size="sm" fullWidth onClick={() => {
                    handleDashboardRedirect();
                    setIsMobileMenuOpen(false);
                }} className="justify-start text-text-secondary hover:text-primary-600 hover:bg-primary-50">
                      <lucide_react_1.User className="w-4 h-4 mr-2"/>
                      Mon tableau de bord
                    </button_1.Button>
                    <button_1.Button variant="ghost" size="sm" fullWidth onClick={() => {
                    handleSettings();
                    setIsMobileMenuOpen(false);
                }} className="justify-start text-text-secondary hover:text-primary-600 hover:bg-primary-50">
                      <lucide_react_1.Settings className="w-4 h-4 mr-2"/>
                      Paramètres
                    </button_1.Button>
                    <button_1.Button variant="ghost" size="sm" fullWidth onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                }} className="justify-start text-red-600 hover:bg-red-50">
                      <lucide_react_1.LogOut className="w-4 h-4 mr-2"/>
                      Déconnexion
                    </button_1.Button>
                  </>) : (<>
                    <button_1.Button variant="ghost" size="sm" fullWidth onClick={() => {
                    router.push('/auth/login');
                    setIsMobileMenuOpen(false);
                }} className="justify-start text-text-secondary hover:text-primary-600 hover:bg-primary-50">
                      <lucide_react_1.LogIn className="w-4 h-4 mr-2"/>
                      Se connecter
                    </button_1.Button>
                    <button_1.Button size="sm" fullWidth onClick={() => {
                    router.push('/auth/signup');
                    setIsMobileMenuOpen(false);
                }} className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white">
                      <lucide_react_1.UserPlus className="w-4 h-4 mr-2"/>
                      S'inscrire
                    </button_1.Button>
                    <button_1.Button variant="outline" size="sm" fullWidth onClick={() => {
                    router.push('/devenir-pro');
                    setIsMobileMenuOpen(false);
                }} className="border-secondary-200 text-secondary-700 hover:bg-secondary-50 hover:border-secondary-300">
                      <lucide_react_1.User className="w-4 h-4 mr-2"/>
                      Devenir Pro
                    </button_1.Button>
                  </>)}
              </div>
              </framer_motion_1.motion.nav>
            </framer_motion_1.motion.div>)}
        </framer_motion_1.AnimatePresence>
      </div>
    </framer_motion_1.motion.header>);
};
exports.Header = Header;
//# sourceMappingURL=header.js.map