'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { Dropdown, DropdownItem, DropdownDivider } from '@/components/ui/dropdown';
import { Menu, X, User, LogIn, UserPlus, Settings, LogOut, Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth, useUserRole, useIsClient, useIsPro, useIsAdmin } from '@/lib/auth-context';
import { componentAnimations, entranceAnimations } from '@/lib/animations';

export const Header: React.FC = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const roles = useUserRole();
  const isClient = useIsClient();
  const isPro = useIsPro();
  const isAdmin = useIsAdmin();
  const isAuthenticated = !!user;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Enhanced scroll-based animations with Moroccan inspiration
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50, 100], [0.9, 0.95, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 50, 100], [10, 12, 15]);
  const headerScale = useTransform(scrollY, [0, 50], [1, 0.995]);
  const headerY = useTransform(scrollY, [0, 50], [0, -2]);
  const logoRotation = useTransform(scrollY, [0, 100], [0, 1]);
  const navItemsStagger = useTransform(scrollY, [0, 50], [0, 0.05]);

  // New Moroccan-inspired parallax effects
  const arabesqueParallax = useTransform(scrollY, [0, 500], [0, -50]);
  const geometricParallax = useTransform(scrollY, [0, 500], [0, 30]);
  const starPatternParallax = useTransform(scrollY, [0, 500], [0, -20]);

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
    } else if (isPro) {
      router.push('/dashboard/pro');
    } else if (isClient) {
      router.push('/dashboard/client');
    } else {
      router.push('/dashboard');
    }
  };

  const handleProfileRedirect = () => {
    router.push('/profile');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
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
    { name: 'Services', href: '/services', dataTestId: 'nav-services-link' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact', dataTestId: 'nav-contact-link' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : 'bg-transparent'
      }`}
      style={{
        backdropFilter: `blur(${headerBlur}px)`,
        backgroundColor: headerOpacity,
        scale: headerScale,
        y: headerY
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Moroccan easing
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
    >
      {/* Moroccan Parallax Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Arabesque pattern - slow parallax */}
        <motion.div
          className="absolute top-2 right-20 opacity-5"
          style={{ y: arabesqueParallax }}
        >
          <svg width="60" height="60" viewBox="0 0 100 100" className="text-primary-600">
            <path
              d="M50 10 C70 10, 90 30, 90 50 C90 70, 70 90, 50 90 C30 90, 10 70, 10 50 C10 30, 30 10, 50 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.3"
            />
            <circle cx="50" cy="50" r="3" fill="currentColor" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Geometric pattern - medium parallax */}
        <motion.div
          className="absolute top-4 left-32 opacity-5"
          style={{ y: geometricParallax }}
        >
          <svg width="40" height="40" viewBox="0 0 100 100" className="text-secondary-600">
            <polygon
              points="50,5 90,25 90,75 50,95 10,75 10,25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.4"
            />
            <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Star pattern - fast parallax */}
        <motion.div
          className="absolute bottom-2 right-40 opacity-5"
          style={{ y: starPatternParallax }}
        >
          <svg width="30" height="30" viewBox="0 0 100 100" className="text-primary-500">
            <polygon
              points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
          </svg>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Link href="/" className="flex items-center space-x-3 group relative">
              <motion.img
                src="/logoSITE.png"
                alt="Khadamat Logo"
                className="h-16 w-auto"
                style={{ rotate: logoRotation }}
                whileHover={{
                  rotate: [logoRotation.get(), -3, 3, logoRotation.get()],
                  scale: 1.05
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.68, -0.55, 0.265, 1.55], // Moroccan bounce
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              />
              <div className="flex flex-col">
                <motion.span
                  className="text-h3 lg:text-h2 font-black bg-gradient-to-r from-text-primary via-primary-800 to-primary-900 bg-clip-text text-transparent font-heading"
                  whileHover={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Khadamat
                </motion.span>
                <motion.span
                  className="text-caption text-text-muted hidden sm:block font-medium font-body"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  Plateforme #1 au Maroc
                </motion.span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94] // Moroccan easing
                }}
              >
                <Link
                  href={item.href}
                  className="text-text-secondary hover:text-primary-600 transition-colors font-medium relative group font-body"
                  data-testid={item.dataTestId}
                >
                  <motion.span
                    whileHover={{
                      scale: 1.05,
                      y: -1,
                      rotateX: 5,
                      rotateY: 2
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      mass: 0.8
                    }}
                    className="inline-block"
                  >
                    {item.name}
                  </motion.span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 rounded-full"
                    initial={{ width: 0, scaleX: 0 }}
                    whileHover={{
                      width: "100%",
                      scaleX: 1
                    }}
                    transition={{
                      duration: 0.4,
                      ease: [0.23, 1, 0.32, 1] // Moroccan flow
                    }}
                  />
                  {/* Moroccan accent dot */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-1 h-1 bg-primary-500 rounded-full opacity-0"
                    whileHover={{ opacity: 1, scale: 1.5 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated && user ? (
              <>
                {/* User dropdown - Custom implementation for maximum visibility */}
                <div className="relative user-dropdown-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsUserDropdownOpen(!isUserDropdownOpen);
                    }}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-surface transition-colors duration-200 relative"
                  >
                    <div className="w-8 h-8 bg-[#F97B22] rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-text-primary">
                      {getUserDisplayName()}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ml-1 ${
                        isUserDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Force visible dropdown menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-[9999]">
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsUserDropdownOpen(false);
                            handleDashboardRedirect();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-text-primary transition-colors duration-150"
                          data-testid="nav-dashboard-link"
                        >
                          Mon Tableau de Bord
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsUserDropdownOpen(false);
                            handleProfileRedirect();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-text-primary transition-colors duration-150"
                          data-testid="nav-profile-link"
                        >
                          Mon Profil
                        </button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsUserDropdownOpen(false);
                            handleLogout();
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                          data-testid="nav-logout-button"
                        >
                          Se déconnecter
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications (for authenticated users) */}
                <motion.button
                  className="relative p-2 rounded-xl text-text-secondary hover:text-primary-600 hover:bg-primary-50/80 transition-all duration-300 overflow-hidden group"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 25px rgba(249, 123, 34, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Notifications"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-primary-500/40 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <Bell className="w-5 h-5 relative z-10" />
                  <motion.div
                    className="absolute inset-0 bg-primary-500/10 rounded-xl"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.3, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  {/* Notification badge */}
                  <motion.span
                    className="absolute -top-1 -right-1 w-3 h-3 bg-error-500 rounded-full flex items-center justify-center relative z-20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{
                      scale: 1.2,
                      boxShadow: "0 0 10px rgba(239, 68, 68, 0.8)"
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <span className="text-xs text-white font-bold">3</span>
                  </motion.span>
                </motion.button>
              </>
            ) : (
              <>
                {/* Signup Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="sm"
                    onClick={() => router.push('/auth/signup')}
                    className="!flex !flex-row !items-center !justify-start gap-2 bg-[#F97B22] hover:bg-[#ea580c] text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>S'inscrire</span>
                  </Button>
                </motion.div>

                {/* Login Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push('/auth/login')}
                    className="!flex !flex-row !items-center !justify-start gap-2 text-text-secondary hover:text-primary-600 hover:bg-primary-50/80 font-medium px-6 py-2 rounded-xl transition-all duration-300"
                    data-testid="nav-login-link"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Connexion</span>
                  </Button>
                </motion.div>

                {/* Devenir Pro Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push('/devenir-pro')}
                    className="!flex !flex-row !items-center !justify-start gap-2 border-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-400 font-medium px-6 py-2 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <User className="w-4 h-4" />
                    <span>Devenir Pro</span>
                  </Button>
                </motion.div>
              </>
            )}

            {/* Language Toggle */}
            <LanguageToggle />

            {/* Search Button */}
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative p-2 rounded-xl text-text-secondary hover:text-primary-600 hover:bg-primary-50/80 transition-all duration-300 overflow-hidden group"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(249, 123, 34, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Rechercher"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              />
              <motion.div
                className="absolute inset-0 rounded-xl border border-primary-500/30 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <Search className="w-5 h-5 relative z-10" />
              <motion.div
                className="absolute inset-0 bg-primary-500/10 rounded-xl"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.2, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:bg-surface-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-border-light bg-surface/95 backdrop-blur-md overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.nav
                className="px-4 py-6 space-y-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <motion.div
                  className="flex justify-center pb-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <LanguageToggle />
                </motion.div>
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-text-secondary hover:text-primary-600 transition-colors font-medium py-3 px-2 rounded-lg hover:bg-primary-50/50 font-body"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.span
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      >
                        {item.name}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
              <div className="pt-4 space-y-3 border-t border-border-light">
                {isAuthenticated && user ? (
                  <>
                    <div className="px-4 py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{getUserDisplayName()}</p>
                          <p className="text-sm text-text-secondary capitalize">
                            {user.role === 'PRO' ? 'Professionnel' : 'Client'}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        handleDashboardRedirect();
                        setIsMobileMenuOpen(false);
                      }}
                      className="justify-start text-text-secondary hover:text-primary-600 hover:bg-primary-50"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Mon tableau de bord
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        handleSettings();
                        setIsMobileMenuOpen(false);
                      }}
                      className="justify-start text-text-secondary hover:text-primary-600 hover:bg-primary-50"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Paramètres
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="justify-start text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        router.push('/auth/login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="justify-start text-text-secondary hover:text-primary-600 hover:bg-primary-50"
                      data-testid="nav-login-link"
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Se connecter
                    </Button>
                    <Button
                      size="sm"
                      fullWidth
                      onClick={() => {
                        router.push('/auth/signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      S'inscrire
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => {
                        router.push('/devenir-pro');
                        setIsMobileMenuOpen(false);
                      }}
                      className="border-secondary-200 text-secondary-700 hover:bg-secondary-50 hover:border-secondary-300"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Devenir Pro
                    </Button>
                  </>
                )}
              </div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};