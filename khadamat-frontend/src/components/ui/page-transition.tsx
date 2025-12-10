'use client';

import React, { useContext, useEffect } from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion as motionTokens } from '@/lib/design-tokens/motion';

export type TransitionType =
  | 'fade'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'scale'
  | 'rotate'
  | 'flip'
  | 'zoom'
  | 'blur'
  // Moroccan-inspired transitions
  | 'moroccan-fade'
  | 'moroccan-slide'
  | 'moroccan-scale'
  | 'moroccan-spiral'
  | 'moroccan-wave';

interface PageTransitionProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
  children: React.ReactNode;
  type?: TransitionType;
  duration?: number;
  delay?: number;
  className?: string;
}

const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  'slide-left': {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  },
  'slide-right': {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  },
  'slide-up': {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  },
  'slide-down': {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  },
  rotate: {
    initial: { opacity: 0, rotate: -5 },
    animate: { opacity: 1, rotate: 0 },
    exit: { opacity: 0, rotate: 5 }
  },
  flip: {
    initial: { opacity: 0, rotateY: -90 },
    animate: { opacity: 1, rotateY: 0 },
    exit: { opacity: 0, rotateY: 90 }
  },
  zoom: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.2 }
  },
  blur: {
    initial: { opacity: 0, filter: 'blur(10px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
    exit: { opacity: 0, filter: 'blur(10px)' }
  },
  // Moroccan-inspired transitions
  'moroccan-fade': {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 }
  },
  'moroccan-slide': {
    initial: { opacity: 0, x: 30, rotateY: 15 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    exit: { opacity: 0, x: -30, rotateY: -15 }
  },
  'moroccan-scale': {
    initial: { opacity: 0, scale: 0.9, rotate: -2 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 1.1, rotate: 2 }
  },
  'moroccan-spiral': {
    initial: { opacity: 0, scale: 0.8, rotate: 180 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 1.2, rotate: -180 }
  },
  'moroccan-wave': {
    initial: { opacity: 0, y: 20, rotateX: 10 },
    animate: { opacity: 1, y: 0, rotateX: 0 },
    exit: { opacity: 0, y: -20, rotateX: -10 }
  }
};

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  type = 'fade',
  duration = 0.5,
  delay = 0,
  className,
  ...motionProps
}) => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={transitionVariants[type]}
      transition={{
        duration: duration || 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={cn('w-full h-full', className)}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

// Context for managing page transitions globally
interface PageTransitionContextType {
  transitionType: TransitionType;
  setTransitionType: (type: TransitionType) => void;
  duration: number;
  setDuration: (duration: number) => void;
}

const PageTransitionContext = React.createContext<PageTransitionContextType | undefined>(undefined);

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider');
  }
  return context;
};

interface PageTransitionProviderProps {
  children: React.ReactNode;
  defaultType?: TransitionType;
  defaultDuration?: number;
}

export const PageTransitionProvider: React.FC<PageTransitionProviderProps> = ({
  children,
  defaultType = 'moroccan-fade',
  defaultDuration = 0.3
}) => {
  const [transitionType, setTransitionType] = React.useState<TransitionType>(defaultType);
  const [duration, setDuration] = React.useState<number>(defaultDuration);

  return (
    <PageTransitionContext.Provider
      value={{
        transitionType,
        setTransitionType,
        duration,
        setDuration
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};

// Smart transition wrapper that adapts based on route changes
interface SmartPageTransitionProps extends Omit<PageTransitionProps, 'type'> {
  children: React.ReactNode;
  routeTransitions?: Record<string, TransitionType>;
}

export const SmartPageTransition: React.FC<SmartPageTransitionProps> = ({
  children,
  routeTransitions = {},
  ...props
}) => {
  const pathname = usePathname();
  const context = useContext(PageTransitionContext);

  // Determine transition type based on route or context
  const getTransitionType = (): TransitionType => {
    if (routeTransitions[pathname]) {
      return routeTransitions[pathname];
    }
    return context?.transitionType || 'fade';
  };

  const transitionType = getTransitionType();
  const duration = context?.duration || 0.5;

  return (
    <PageTransition
      type={transitionType}
      duration={duration}
      {...props}
    >
      {children}
    </PageTransition>
  );
};

// Staggered children animation for complex layouts
interface StaggeredTransitionProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
  children: React.ReactNode;
  staggerDelay?: number;
  childAnimation?: TransitionType;
}

export const StaggeredTransition: React.FC<StaggeredTransitionProps> = ({
  children,
  staggerDelay = 0.1,
  childAnimation = 'fade',
  className,
  ...motionProps
}) => {
  const pathname = usePathname();

  const containerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerDelay
      }
    },
    exit: {}
  };

  return (
    <motion.div
      key={pathname}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
      {...motionProps}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={transitionVariants[childAnimation]}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Loading transition for async content
interface LoadingTransitionProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
  children: React.ReactNode;
  isLoading: boolean;
  loadingComponent?: React.ReactNode;
  type?: TransitionType;
}

export const LoadingTransition: React.FC<LoadingTransitionProps> = ({
  children,
  isLoading,
  loadingComponent,
  type = 'fade',
  className,
  ...motionProps
}) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={className}
          {...motionProps}
        >
          {loadingComponent || (
            <div className="flex items-center justify-center p-8">
              <motion.div
                className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={transitionVariants[type]}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className={className}
          {...motionProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Preset transitions for common use cases
export const transitions = {
  page: (type: TransitionType = 'fade') => ({
    type,
    duration: 0.5
  }),

  modal: (type: TransitionType = 'scale') => ({
    type,
    duration: 0.3
  }),

  card: (type: TransitionType = 'slide-up') => ({
    type,
    duration: 0.4,
    delay: 0.1
  }),

  list: (type: TransitionType = 'fade') => ({
    type,
    duration: 0.3,
    staggerDelay: 0.05
  })
} as const;