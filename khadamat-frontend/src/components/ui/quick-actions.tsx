'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { microInteractions, entranceAnimations } from '@/lib/animations';
import {
  Plus,
  MessageSquare,
  Heart,
  Search,
  Phone,
  MapPin,
  Sparkles,
  X,
  ChevronUp
} from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  color: string;
  bgColor: string;
  priority: number; // Higher = more important
  context?: 'home' | 'dashboard' | 'services' | 'booking';
}

interface QuickActionsProps {
  context?: 'home' | 'dashboard' | 'services' | 'booking';
  user?: any;
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  context = 'home',
  user,
  className
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleActions, setVisibleActions] = useState<QuickAction[]>([]);
  const [isMinimized, setIsMinimized] = useState(false);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  // Define all available actions
  const allActions: QuickAction[] = [
    {
      id: 'search',
      label: 'Rechercher',
      icon: Search,
      href: '/services',
      color: 'text-primary-600',
      bgColor: 'bg-primary-500',
      priority: 10,
      context: 'home'
    },
    {
      id: 'book',
      label: 'Réserver',
      icon: Plus,
      href: '/services',
      color: 'text-white',
      bgColor: 'bg-primary-500',
      priority: 9,
      context: 'services'
    },
    {
      id: 'favorites',
      label: 'Favoris',
      icon: Heart,
      href: user ? '/dashboard/client/favorites' : '/auth/login',
      color: 'text-error-600',
      bgColor: 'bg-error-500',
      priority: 8,
      context: 'dashboard'
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: MessageSquare,
      href: user ? '/dashboard/client/messages' : '/auth/login',
      color: 'text-success-600',
      bgColor: 'bg-success-500',
      priority: 7,
      context: 'dashboard'
    },
    {
      id: 'location',
      label: 'Carte',
      icon: MapPin,
      href: '/services?view=map',
      color: 'text-info-600',
      bgColor: 'bg-info-500',
      priority: 6,
      context: 'services'
    },
    {
      id: 'support',
      label: 'Support',
      icon: Phone,
      href: '/contact',
      color: 'text-warning-600',
      bgColor: 'bg-warning-500',
      priority: 5
    }
  ];

  // Filter actions based on context and user state
  useEffect(() => {
    const contextActions = allActions.filter(action =>
      !action.context || action.context === context
    );

    // Sort by priority and take top 4
    const sortedActions = contextActions
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 4);

    setVisibleActions(sortedActions);
  }, [context, user]);

  // Auto-minimize after 10 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isExpanded) {
        setIsExpanded(false);
        setTimeout(() => setIsMinimized(true), 300);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isExpanded]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (visibleActions.length === 0) return null;

  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-50 ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isMinimized ? 0.8 : 1,
        opacity: isMinimized ? 0.7 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-16 right-0 flex flex-col space-y-3"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {visibleActions.map((action, index) => (
              <QuickActionButton
                key={action.id}
                action={action}
                index={index}
                onClick={() => setIsExpanded(false)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <motion.button
          className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-2xl flex items-center justify-center text-white relative overflow-hidden group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsExpanded(!isExpanded);
            setIsMinimized(false);
          }}
          animate={{
            boxShadow: isExpanded
              ? "0 20px 40px rgba(249, 123, 34, 0.3)"
              : "0 10px 25px rgba(249, 123, 34, 0.2)"
          }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-700"
            animate={{
              scale: isExpanded ? [1, 1.2, 1] : 1,
              rotate: isExpanded ? [0, 180, 360] : 0
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Sparkle effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-5 h-5 text-white/80" />
          </motion.div>

          {/* Main icon */}
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <Plus className="w-6 h-6" />
            )}
          </motion.div>

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary-300"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.button>
      </motion.div>

      {/* Minimize indicator */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMinimized(false)}
          >
            <ChevronUp className="w-3 h-3 text-text-secondary" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Individual action button component
interface QuickActionButtonProps {
  action: QuickAction;
  index: number;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  action,
  index,
  onClick
}) => {
  const Icon = action.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.8 }}
      transition={{
        delay: index * 0.1,
        type: "spring",
        stiffness: 400,
        damping: 30
      }}
      whileHover={{ scale: 1.05, x: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={action.href} onClick={onClick}>
        <div className="flex items-center space-x-3 bg-white rounded-2xl shadow-lg p-3 pr-4 min-w-[160px] group">
          {/* Icon */}
          <motion.div
            className={`w-10 h-10 ${action.bgColor} rounded-xl flex items-center justify-center shadow-sm`}
            whileHover={{ rotate: 5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon className={`w-5 h-5 text-white`} />
          </motion.div>

          {/* Label */}
          <div className="flex-1">
            <motion.span
              className="font-medium text-text-primary text-sm group-hover:text-primary-600 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              {action.label}
            </motion.span>
          </div>

          {/* Hover indicator */}
          <motion.div
            className="w-1 h-8 bg-primary-500 rounded-full scale-y-0 group-hover:scale-y-100"
            transition={{ duration: 0.2 }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

// Hook for managing quick actions state
export const useQuickActions = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 300;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isVisible };
};