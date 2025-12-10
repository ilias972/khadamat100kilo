// Motion and Animation Tokens for Khadamat
// Consistent animation system for micro-interactions and transitions

export const motion = {
  // Duration tokens
  durations: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
    slowest: '1000ms'
  },

  // Easing curves
  easing: {
    // Standard easing for most interactions
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Accelerate curve for entering animations
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',

    // Decelerate curve for exiting animations
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)',

    // Spring curve for bouncy interactions
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

    // Custom curves for specific interactions
    enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
    exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
    slide: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    fade: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Moroccan-inspired custom curves (smooth, flowing)
    moroccanEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth S-curve
    moroccanFlow: 'cubic-bezier(0.23, 1, 0.32, 1)',       // Gentle bounce-like
    moroccanGrace: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Elegant overshoot
  },

  // Micro-interactions
  microInteractions: {
    // Button press feedback
    buttonPress: {
      scale: 0.95,
      duration: '100ms',
      easing: 'accelerate'
    },

    // Card hover effects
    cardHover: {
      transform: 'translateY(-2px)',
      shadow: '0 12px 32px rgba(0,0,0,0.12)',
      duration: '200ms',
      easing: 'standard'
    },

    // Notification slide-in
    notificationSlide: {
      transform: 'translateX(0)',
      opacity: 1,
      duration: '300ms',
      easing: 'decelerate'
    },

    // Loading spinner
    loadingSpin: {
      transform: 'rotate(360deg)',
      duration: '1000ms',
      easing: 'linear',
      repeat: 'infinite'
    },

    // Focus ring pulse
    focusRing: {
      boxShadow: '0 0 0 2px rgba(249, 123, 34, 0.2)',
      duration: '200ms',
      easing: 'standard'
    },

    // Tab switch
    tabSwitch: {
      transform: 'translateX(0)',
      opacity: 1,
      duration: '250ms',
      easing: 'enter'
    },

    // Modal open/close
    modalOpen: {
      transform: 'scale(1)',
      opacity: 1,
      duration: '300ms',
      easing: 'spring'
    },

    modalClose: {
      transform: 'scale(0.95)',
      opacity: 0,
      duration: '200ms',
      easing: 'exit'
    },

    // Dropdown menu
    dropdownOpen: {
      transform: 'translateY(0)',
      opacity: 1,
      duration: '200ms',
      easing: 'decelerate'
    },

    dropdownClose: {
      transform: 'translateY(-10px)',
      opacity: 0,
      duration: '150ms',
      easing: 'accelerate'
    },

    // Chart animations
    chartBarGrow: {
      transform: 'scaleY(1)',
      transformOrigin: 'bottom',
      duration: '500ms',
      easing: 'spring',
      delay: '100ms'
    },

    chartLineDraw: {
      strokeDashoffset: 0,
      duration: '800ms',
      easing: 'enter'
    },

    // Mobile bottom nav
    bottomNavSlide: {
      transform: 'translateY(0)',
      duration: '300ms',
      easing: 'decelerate'
    },

    // Touch feedback
    touchFeedback: {
      scale: 0.98,
      duration: '100ms',
      easing: 'accelerate'
    }
  },

  // Page transitions
  pageTransitions: {
    // Slide between pages
    slide: {
      duration: '300ms',
      easing: 'slide'
    },

    // Fade between pages
    fade: {
      duration: '250ms',
      easing: 'fade'
    },

    // Scale transition for modal pages
    scale: {
      duration: '300ms',
      easing: 'spring'
    }
  },

  // Component entrance animations
  entrance: {
    // Fade in with slight upward movement
    fadeUp: {
      transform: 'translateY(20px)',
      opacity: 0,
      duration: '400ms',
      easing: 'enter',
      delay: '0ms'
    },

    // Fade in with scale
    fadeScale: {
      transform: 'scale(0.95)',
      opacity: 0,
      duration: '300ms',
      easing: 'enter',
      delay: '0ms'
    },

    // Staggered children animation
    staggerChildren: {
      staggerDelay: '100ms',
      duration: '300ms',
      easing: 'enter'
    },

    // Slide in from left
    slideInLeft: {
      transform: 'translateX(-30px)',
      opacity: 0,
      duration: '400ms',
      easing: 'decelerate'
    },

    // Slide in from right
    slideInRight: {
      transform: 'translateX(30px)',
      opacity: 0,
      duration: '400ms',
      easing: 'decelerate'
    }
  },

  // Reduced motion preferences
  reduceMotion: {
    enabled: true, // Respect user's motion preferences
    fallbackDuration: '0ms',
    fallbackEasing: 'linear'
  },

  // Animation constraints
  constraints: {
    // Maximum number of concurrent animations
    maxConcurrentAnimations: 5,

    // Minimum duration to prevent flicker
    minDuration: '50ms',

    // Maximum duration for complex animations
    maxDuration: '2000ms'
  }
} as const;

// Type definitions for better TypeScript support
export type MotionDuration = keyof typeof motion.durations;
export type MotionEasing = keyof typeof motion.easing;
export type MicroInteraction = keyof typeof motion.microInteractions;
export type PageTransition = keyof typeof motion.pageTransitions;
export type EntranceAnimation = keyof typeof motion.entrance;

// Utility functions for creating consistent animations
export const createAnimation = (
  property: string,
  value: string,
  options: {
    duration?: MotionDuration;
    easing?: MotionEasing;
    delay?: string;
  } = {}
) => {
  const {
    duration = 'normal',
    easing = 'standard',
    delay = '0ms'
  } = options;

  return {
    property,
    value,
    duration: motion.durations[duration],
    easing: motion.easing[easing],
    delay
  };
};

// Create micro-interaction animation
export const createMicroInteraction = (
  interaction: MicroInteraction,
  customOptions: Partial<typeof motion.microInteractions[MicroInteraction]> = {}
) => {
  const baseInteraction = motion.microInteractions[interaction];

  return {
    ...baseInteraction,
    ...customOptions,
    duration: motion.durations[baseInteraction.duration as MotionDuration] || baseInteraction.duration,
    easing: motion.easing[baseInteraction.easing as MotionEasing] || baseInteraction.easing
  };
};

// Create entrance animation for components
export const createEntranceAnimation = (
  animation: EntranceAnimation,
  options: {
    stagger?: boolean;
    staggerDelay?: number;
  } = {}
) => {
  const baseAnimation = motion.entrance[animation];
  const { stagger = false, staggerDelay = 100 } = options;

  return {
    ...baseAnimation,
    staggerChildren: stagger,
    staggerDelay: `${staggerDelay}ms`
  };
};

// CSS-in-JS helper for creating transition strings
export const createTransitionString = (
  animations: ReturnType<typeof createAnimation>[]
): string => {
  return animations
    .map(({ property, value, duration, easing, delay }) =>
      `${property} ${duration} ${easing} ${delay}`
    )
    .join(', ');
};