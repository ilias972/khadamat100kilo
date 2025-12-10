'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { entranceAnimations, microInteractions } from '@/lib/animations';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Info,
  X,
  Loader2
} from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastAdvancedProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
  toast: Toast;
  onRemove: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
  loading: Loader2
};

const toastColors = {
  success: {
    bg: 'bg-green-50 border-green-200',
    icon: 'text-green-600',
    title: 'text-green-800',
    description: 'text-green-700',
    progress: 'bg-green-500'
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    icon: 'text-red-600',
    title: 'text-red-800',
    description: 'text-red-700',
    progress: 'bg-red-500'
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-600',
    title: 'text-yellow-800',
    description: 'text-yellow-700',
    progress: 'bg-yellow-500'
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    title: 'text-blue-800',
    description: 'text-blue-700',
    progress: 'bg-blue-500'
  },
  loading: {
    bg: 'bg-gray-50 border-gray-200',
    icon: 'text-gray-600',
    title: 'text-gray-800',
    description: 'text-gray-700',
    progress: 'bg-gray-500'
  }
};

export const ToastAdvanced: React.FC<ToastAdvancedProps> = ({
  toast,
  onRemove,
  position = 'top-right',
  className,
  ...motionProps
}) => {
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  const Icon = toastIcons[toast.type];
  const colors = toastColors[toast.type];
  const duration = toast.duration || 5000;

  useEffect(() => {
    if (toast.type === 'loading' || isHovered) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, ((duration - elapsed) / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        onRemove(toast.id);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [toast.id, duration, toast.type, isHovered, onRemove]);

  const handleAction = useCallback(() => {
    if (toast.action) {
      toast.action.onClick();
      onRemove(toast.id);
    }
  }, [toast.action, onRemove, toast.id]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        layout: { duration: 0.3 }
      }}
      className={cn(
        'relative max-w-sm w-full bg-white rounded-2xl shadow-lg border backdrop-blur-sm overflow-hidden',
        colors.bg,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...motionProps}
    >
      {/* Progress bar */}
      {toast.type !== 'loading' && (
        <motion.div
          className={cn('absolute top-0 left-0 h-1', colors.progress)}
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      )}

      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
            className={cn('flex-shrink-0 w-6 h-6', colors.icon)}
          >
            {toast.type === 'loading' ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Icon className="w-6 h-6" />
            )}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.h4
              className={cn('text-sm font-semibold', colors.title)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {toast.title}
            </motion.h4>

            {toast.description && (
              <motion.p
                className={cn('text-sm mt-1', colors.description)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {toast.description}
              </motion.p>
            )}

            {/* Action button */}
            {toast.action && (
              <motion.button
                onClick={handleAction}
                className={cn(
                  'mt-3 text-sm font-medium underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded',
                  colors.icon,
                  'focus:ring-current'
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {toast.action.label}
              </motion.button>
            )}
          </div>

          {/* Close button */}
          <motion.button
            onClick={() => onRemove(toast.id)}
            className={cn(
              'flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors',
              'hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2',
              colors.icon,
              'focus:ring-current'
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Fermer la notification"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Toast Container Component
interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  className?: string;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
  position = 'top-right',
  className
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  return (
    <div
      className={cn(
        'fixed z-50 pointer-events-none',
        positionClasses[position],
        className
      )}
      role="region"
      aria-label="Notifications"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto mb-3">
            <ToastAdvanced
              toast={toast}
              onRemove={onRemove}
              position={position}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Toast Hook
export const useToastAdvanced = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { ...toast, id };

    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration (except for loading toasts)
    if (toast.type !== 'loading' && toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    return addToast({ type: 'success', title, description, ...options });
  }, [addToast]);

  const error = useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    return addToast({ type: 'error', title, description, ...options });
  }, [addToast]);

  const warning = useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    return addToast({ type: 'warning', title, description, ...options });
  }, [addToast]);

  const info = useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    return addToast({ type: 'info', title, description, ...options });
  }, [addToast]);

  const loading = useCallback((title: string, description?: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title' | 'description'>>) => {
    return addToast({ type: 'loading', title, description, ...options });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    clearAll,
    success,
    error,
    warning,
    info,
    loading
  };
};