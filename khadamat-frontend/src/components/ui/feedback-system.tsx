'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { microInteractions } from '@/lib/animations';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Loader2,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

export type FeedbackType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface FeedbackMessage {
  id: string;
  type: FeedbackType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface FeedbackSystemProps {
  messages: FeedbackMessage[];
  onRemove: (id: string) => void;
  position?: 'top' | 'bottom' | 'inline';
  maxMessages?: number;
  className?: string;
}

// Individual feedback message component
const FeedbackMessage: React.FC<{
  message: FeedbackMessage;
  onRemove: (id: string) => void;
  position: 'top' | 'bottom' | 'inline';
}> = ({ message, onRemove, position }) => {
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
    loading: Loader2
  };

  const colors = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: 'text-green-600',
      title: 'text-green-800',
      message: 'text-green-700',
      progress: 'bg-green-500'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: 'text-red-600',
      title: 'text-red-800',
      message: 'text-red-700',
      progress: 'bg-red-500'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-600',
      title: 'text-yellow-800',
      message: 'text-yellow-700',
      progress: 'bg-yellow-500'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-600',
      title: 'text-blue-800',
      message: 'text-blue-700',
      progress: 'bg-blue-500'
    },
    loading: {
      bg: 'bg-gray-50 border-gray-200',
      icon: 'text-gray-600',
      title: 'text-gray-800',
      message: 'text-gray-700',
      progress: 'bg-gray-500'
    }
  };

  const Icon = icons[message.type];
  const colorScheme = colors[message.type];

  useEffect(() => {
    if (message.type === 'loading' || isHovered || message.duration === 0) return;

    const startTime = Date.now();
    const duration = message.duration || 4000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, ((duration - elapsed) / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        onRemove(message.id);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [message.id, message.type, message.duration, isHovered, onRemove]);

  const handleAction = () => {
    if (message.action) {
      message.action.onClick();
      onRemove(message.id);
    }
  };

  const isInline = position === 'inline';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: isInline ? 0 : -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        layout: { duration: 0.3 }
      }}
      className={cn(
        'relative rounded-2xl border backdrop-blur-sm shadow-lg overflow-hidden',
        colorScheme.bg,
        isInline ? 'w-full' : 'max-w-sm w-full'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress bar for non-loading messages */}
      {message.type !== 'loading' && message.duration !== 0 && (
        <motion.div
          className={cn('absolute top-0 left-0 h-1', colorScheme.progress)}
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
            className={cn('flex-shrink-0', colorScheme.icon)}
          >
            {message.type === 'loading' ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Icon className="w-5 h-5" />
            )}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.h4
              className={cn('text-sm font-semibold', colorScheme.title)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {message.title}
            </motion.h4>

            {message.message && (
              <motion.p
                className={cn('text-sm mt-1', colorScheme.message)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {message.message}
              </motion.p>
            )}

            {/* Action button */}
            {message.action && (
              <motion.button
                onClick={handleAction}
                className={cn(
                  'mt-3 text-sm font-medium underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded',
                  colorScheme.icon,
                  'focus:ring-current'
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {message.action.label}
              </motion.button>
            )}
          </div>

          {/* Close button */}
          <motion.button
            onClick={() => onRemove(message.id)}
            className={cn(
              'flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors',
              'hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2',
              colorScheme.icon,
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

// Main feedback system component
export const FeedbackSystem: React.FC<FeedbackSystemProps> = ({
  messages,
  onRemove,
  position = 'top',
  maxMessages = 5,
  className
}) => {
  const displayMessages = messages.slice(0, maxMessages);

  const positionClasses = {
    top: 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
    bottom: 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50',
    inline: 'relative w-full space-y-3'
  };

  if (position === 'inline') {
    return (
      <div className={cn('w-full', className)}>
        <AnimatePresence mode="popLayout">
          {displayMessages.map((message) => (
            <div key={message.id} className="w-full">
              <FeedbackMessage
                message={message}
                onRemove={onRemove}
                position={position}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={cn(positionClasses[position], className)}>
      <div className="flex flex-col space-y-3 items-center">
        <AnimatePresence mode="popLayout">
          {displayMessages.map((message) => (
            <FeedbackMessage
              key={message.id}
              message={message}
              onRemove={onRemove}
              position={position}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Inline feedback for forms and actions
interface InlineFeedbackProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
  type: FeedbackType;
  message: string;
  show: boolean;
  className?: string;
}

export const InlineFeedback: React.FC<InlineFeedbackProps> = ({
  type,
  message,
  show,
  className,
  ...motionProps
}) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
    loading: Loader2
  };

  const colors = {
    success: 'text-green-600 bg-green-50 border-green-200',
    error: 'text-red-600 bg-red-50 border-red-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    info: 'text-blue-600 bg-blue-50 border-blue-200',
    loading: 'text-gray-600 bg-gray-50 border-gray-200'
  };

  const Icon = icons[type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={cn(
            'flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm',
            colors[type],
            className
          )}
          {...motionProps}
        >
          {type === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
          ) : (
            <Icon className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Success checkmark animation
export const SuccessCheckmark: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className
}) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 500, damping: 30 }}
    className={cn('rounded-full bg-green-500 p-1', className)}
  >
    <motion.div
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Check className="w-4 h-4 text-white" />
    </motion.div>
  </motion.div>
);

// Loading states
export const LoadingSpinner: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}> = ({ size = 'md', color = 'text-primary-500', className }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={cn('border-2 border-t-transparent rounded-full', color, sizes[size], className)}
    />
  );
};

// Pulse indicator for attention
export const PulseIndicator: React.FC<{
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ color = 'bg-red-500', size = 'md', className }) => {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.5, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={cn('rounded-full', color, sizes[size], className)}
    />
  );
};

// Hook for managing feedback messages
export const useFeedback = () => {
  const [messages, setMessages] = useState<FeedbackMessage[]>([]);

  const addMessage = useCallback((message: Omit<FeedbackMessage, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newMessage: FeedbackMessage = { ...message, id };

    setMessages(prev => [newMessage, ...prev]);

    // Auto remove after duration (except for loading)
    if (message.type !== 'loading' && message.duration !== 0) {
      setTimeout(() => {
        removeMessage(id);
      }, message.duration || 4000);
    }

    return id;
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setMessages([]);
  }, []);

  // Convenience methods
  const success = useCallback((title: string, message?: string, options?: Partial<Omit<FeedbackMessage, 'id' | 'type' | 'title' | 'message'>>) => {
    return addMessage({ type: 'success', title, message, ...options });
  }, [addMessage]);

  const error = useCallback((title: string, message?: string, options?: Partial<Omit<FeedbackMessage, 'id' | 'type' | 'title' | 'message'>>) => {
    return addMessage({ type: 'error', title, message, ...options });
  }, [addMessage]);

  const warning = useCallback((title: string, message?: string, options?: Partial<Omit<FeedbackMessage, 'id' | 'type' | 'title' | 'message'>>) => {
    return addMessage({ type: 'warning', title, message, ...options });
  }, [addMessage]);

  const info = useCallback((title: string, message?: string, options?: Partial<Omit<FeedbackMessage, 'id' | 'type' | 'title' | 'message'>>) => {
    return addMessage({ type: 'info', title, message, ...options });
  }, [addMessage]);

  const loading = useCallback((title: string, message?: string, options?: Partial<Omit<FeedbackMessage, 'id' | 'type' | 'title' | 'message'>>) => {
    return addMessage({ type: 'loading', title, message, ...options });
  }, [addMessage]);

  return {
    messages,
    addMessage,
    removeMessage,
    clearAll,
    success,
    error,
    warning,
    info,
    loading
  };
};