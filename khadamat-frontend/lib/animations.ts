'use client';

// =============================================================================
// PREMIUM ANIMATION SYSTEM FOR KHADAMAT - WARM-TECH MOROCCAN AESTHETIC
// =============================================================================

import { Variants } from 'framer-motion';

// Base transition configurations
export const transitions = {
  fast: { duration: 0.15, ease: [0.4, 0.0, 0.2, 1] },
  normal: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
  slow: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
  bounce: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] },
  spring: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 1
  },
  springGentle: {
    type: "spring" as const,
    stiffness: 300,
    damping: 40,
    mass: 1
  }
} as const;

// =============================================================================
// HOVER ANIMATIONS - Premium micro-interactions
// =============================================================================

export const hoverAnimations = {
  // 3D léger hover (comme spécifié)
  lift: {
    scale: 1.02,
    y: -2,
    transition: transitions.springGentle
  },

  // Glow doux orange
  glow: {
    boxShadow: "0 8px 25px rgba(249, 123, 34, 0.15)",
    transition: transitions.normal
  },

  // Scale subtil
  scale: {
    scale: 1.05,
    transition: transitions.springGentle
  },

  // Border glow
  borderGlow: {
    borderColor: "rgba(249, 123, 34, 0.3)",
    boxShadow: "0 0 20px rgba(249, 123, 34, 0.1)",
    transition: transitions.normal
  }
} as const;

// =============================================================================
// ENTRANCE ANIMATIONS - Fade + translate élégant
// =============================================================================

export const entranceAnimations = {
  // Fade in from bottom
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: transitions.normal
  },

  // Fade in from left
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: transitions.normal
  },

  // Fade in from right
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: transitions.normal
  },

  // Scale fade in
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: transitions.springGentle
  },

  // Stagger animation for lists
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: transitions.normal
  }
} as const;

// =============================================================================
// SCROLL-BASED ANIMATIONS - Reveal élégant
// =============================================================================

export const scrollAnimations = {
  // Viewport reveal
  reveal: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: transitions.normal
  },

  // Scale reveal
  scaleReveal: {
    initial: { opacity: 0, scale: 0.9 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: transitions.springGentle
  },

  // Slide in from sides
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: transitions.normal
  },

  slideInRight: {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: transitions.normal
  }
} as const;

// =============================================================================
// MICRO-INTERACTIONS - Interactions premium
// =============================================================================

export const microInteractions = {
  // CTA bounce subtil
  ctaBounce: {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: transitions.spring
  },

  // Card 3D tilt léger
  cardTilt: {
    whileHover: {
      rotateY: 2,
      rotateX: 1,
      scale: 1.02,
      transition: transitions.springGentle
    }
  },

  // Pulsation douce pour badges
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // Glow pulsation
  glowPulse: {
    animate: {
      boxShadow: [
        "0 0 20px rgba(249, 123, 34, 0.1)",
        "0 0 30px rgba(249, 123, 34, 0.2)",
        "0 0 20px rgba(249, 123, 34, 0.1)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // Status transitions
  statusTransition: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: transitions.spring
  }
} as const;

// =============================================================================
// LOADING ANIMATIONS - Skeleton loaders élégants
// =============================================================================

export const loadingAnimations = {
  // Shimmer effect
  shimmer: {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // Pulse loading
  pulse: {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // Scale pulse
  scalePulse: {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
} as const;

// =============================================================================
// COMPONENT-SPECIFIC ANIMATIONS
// =============================================================================

export const componentAnimations = {
  // Button animations
  button: {
    hover: hoverAnimations.lift,
    tap: { scale: 0.98, transition: transitions.fast },
    loading: {
      animate: { scale: [1, 0.95, 1] },
      transition: { duration: 1, repeat: Infinity }
    }
  },

  // Card animations
  card: {
    hover: {
      ...hoverAnimations.lift,
      ...hoverAnimations.glow
    },
    tap: { scale: 0.98, transition: transitions.fast }
  },

  // Modal animations
  modal: {
    overlay: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: transitions.normal
    },
    content: {
      initial: { opacity: 0, scale: 0.95, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 20 },
      transition: transitions.springGentle
    }
  },

  // Navigation animations
  nav: {
    item: {
      hover: { scale: 1.05, transition: transitions.springGentle },
      active: { scale: 1.1, transition: transitions.spring }
    },
    dropdown: {
      initial: { opacity: 0, y: -10, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -10, scale: 0.95 },
      transition: transitions.springGentle
    }
  },

  // Form animations
  form: {
    input: {
      focus: {
        scale: 1.02,
        borderColor: "rgba(249, 123, 34, 0.3)",
        boxShadow: "0 0 0 3px rgba(249, 123, 34, 0.1)",
        transition: transitions.normal
      }
    },
    error: {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: transitions.normal
    }
  }
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

// Generate staggered animation delays
export const generateStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
  return baseDelay * index;
};

// =============================================================================
// PRESETS FOR COMMON USE CASES
// =============================================================================

export const presets = {
  // Page entrance
  pageEntrance: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: transitions.slow
  },

  // Section reveal
  sectionReveal: scrollAnimations.reveal,

  // Interactive elements
  interactive: {
    whileHover: hoverAnimations.lift,
    whileTap: { scale: 0.98 },
    transition: transitions.springGentle
  },

  // Premium CTA
  premiumCTA: {
    whileHover: {
      scale: 1.02,
      y: -2,
      boxShadow: "0 10px 25px rgba(249, 123, 34, 0.2)"
    },
    whileTap: { scale: 0.98 },
    transition: transitions.spring
  }
} as const;

export type AnimationType = keyof typeof presets;
export type HoverAnimationType = keyof typeof hoverAnimations;
export type EntranceAnimationType = keyof typeof entranceAnimations;
export type ScrollAnimationType = keyof typeof scrollAnimations;
export type MicroInteractionType = keyof typeof microInteractions;