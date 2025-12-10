'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presets = exports.respectReducedMotion = exports.generateStaggerDelay = exports.componentAnimations = exports.loadingAnimations = exports.microInteractions = exports.scrollAnimations = exports.entranceAnimations = exports.hoverAnimations = exports.transitions = void 0;
exports.transitions = {
    fast: { duration: 0.15, ease: [0.4, 0.0, 0.2, 1] },
    normal: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
    slow: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
    bounce: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] },
    spring: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1
    },
    springGentle: {
        type: "spring",
        stiffness: 300,
        damping: 40,
        mass: 1
    }
};
exports.hoverAnimations = {
    lift: {
        scale: 1.02,
        y: -2,
        transition: exports.transitions.springGentle
    },
    glow: {
        boxShadow: "0 8px 25px rgba(249, 123, 34, 0.15)",
        transition: exports.transitions.normal
    },
    scale: {
        scale: 1.05,
        transition: exports.transitions.springGentle
    },
    borderGlow: {
        borderColor: "rgba(249, 123, 34, 0.3)",
        boxShadow: "0 0 20px rgba(249, 123, 34, 0.1)",
        transition: exports.transitions.normal
    }
};
exports.entranceAnimations = {
    fadeInUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: exports.transitions.normal
    },
    fadeInLeft: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: exports.transitions.normal
    },
    fadeInRight: {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
        transition: exports.transitions.normal
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: exports.transitions.springGentle
    },
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
        transition: exports.transitions.normal
    }
};
exports.scrollAnimations = {
    reveal: {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: exports.transitions.normal
    },
    scaleReveal: {
        initial: { opacity: 0, scale: 0.9 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, margin: "-50px" },
        transition: exports.transitions.springGentle
    },
    slideInLeft: {
        initial: { opacity: 0, x: -50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: exports.transitions.normal
    },
    slideInRight: {
        initial: { opacity: 0, x: 50 },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: exports.transitions.normal
    }
};
exports.microInteractions = {
    ctaBounce: {
        whileHover: { scale: 1.02, y: -1 },
        whileTap: { scale: 0.98 },
        transition: exports.transitions.spring
    },
    cardTilt: {
        whileHover: {
            rotateY: 2,
            rotateX: 1,
            scale: 1.02,
            transition: exports.transitions.springGentle
        }
    },
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
    statusTransition: {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
        transition: exports.transitions.spring
    }
};
exports.loadingAnimations = {
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
};
exports.componentAnimations = {
    button: {
        hover: exports.hoverAnimations.lift,
        tap: { scale: 0.98, transition: exports.transitions.fast },
        loading: {
            animate: { scale: [1, 0.95, 1] },
            transition: { duration: 1, repeat: Infinity }
        }
    },
    card: {
        hover: {
            ...exports.hoverAnimations.lift,
            ...exports.hoverAnimations.glow
        },
        tap: { scale: 0.98, transition: exports.transitions.fast }
    },
    modal: {
        overlay: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: exports.transitions.normal
        },
        content: {
            initial: { opacity: 0, scale: 0.95, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: 20 },
            transition: exports.transitions.springGentle
        }
    },
    nav: {
        item: {
            hover: { scale: 1.05, transition: exports.transitions.springGentle },
            active: { scale: 1.1, transition: exports.transitions.spring }
        },
        dropdown: {
            initial: { opacity: 0, y: -10, scale: 0.95 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: -10, scale: 0.95 },
            transition: exports.transitions.springGentle
        }
    },
    form: {
        input: {
            focus: {
                scale: 1.02,
                borderColor: "rgba(249, 123, 34, 0.3)",
                boxShadow: "0 0 0 3px rgba(249, 123, 34, 0.1)",
                transition: exports.transitions.normal
            }
        },
        error: {
            initial: { opacity: 0, x: -10 },
            animate: { opacity: 1, x: 0 },
            transition: exports.transitions.normal
        }
    }
};
const generateStaggerDelay = (index, baseDelay = 0.1) => {
    return baseDelay * index;
};
exports.generateStaggerDelay = generateStaggerDelay;
const respectReducedMotion = (animation) => {
    if (typeof window === 'undefined') {
        return animation;
    }
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        return {
            ...animation,
            transition: {
                duration: 0.1,
                ease: 'linear'
            }
        };
    }
    return animation;
};
exports.respectReducedMotion = respectReducedMotion;
exports.presets = {
    pageEntrance: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: exports.transitions.slow
    },
    sectionReveal: exports.scrollAnimations.reveal,
    interactive: {
        whileHover: exports.hoverAnimations.lift,
        whileTap: { scale: 0.98 },
        transition: exports.transitions.springGentle
    },
    premiumCTA: {
        whileHover: {
            scale: 1.02,
            y: -2,
            boxShadow: "0 10px 25px rgba(249, 123, 34, 0.2)"
        },
        whileTap: { scale: 0.98 },
        transition: exports.transitions.spring
    }
};
//# sourceMappingURL=animations.js.map