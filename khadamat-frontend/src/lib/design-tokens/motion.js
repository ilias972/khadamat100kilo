"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransitionString = exports.createEntranceAnimation = exports.createMicroInteraction = exports.createAnimation = exports.motion = void 0;
exports.motion = {
    durations: {
        instant: '0ms',
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
        slower: '700ms',
        slowest: '1000ms'
    },
    easing: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
        decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        enter: 'cubic-bezier(0.16, 1, 0.3, 1)',
        exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
        slide: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fade: 'cubic-bezier(0.4, 0, 0.2, 1)',
        moroccanEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        moroccanFlow: 'cubic-bezier(0.23, 1, 0.32, 1)',
        moroccanGrace: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    microInteractions: {
        buttonPress: {
            scale: 0.95,
            duration: '100ms',
            easing: 'accelerate'
        },
        cardHover: {
            transform: 'translateY(-2px)',
            shadow: '0 12px 32px rgba(0,0,0,0.12)',
            duration: '200ms',
            easing: 'standard'
        },
        notificationSlide: {
            transform: 'translateX(0)',
            opacity: 1,
            duration: '300ms',
            easing: 'decelerate'
        },
        loadingSpin: {
            transform: 'rotate(360deg)',
            duration: '1000ms',
            easing: 'linear',
            repeat: 'infinite'
        },
        focusRing: {
            boxShadow: '0 0 0 2px rgba(249, 123, 34, 0.2)',
            duration: '200ms',
            easing: 'standard'
        },
        tabSwitch: {
            transform: 'translateX(0)',
            opacity: 1,
            duration: '250ms',
            easing: 'enter'
        },
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
        bottomNavSlide: {
            transform: 'translateY(0)',
            duration: '300ms',
            easing: 'decelerate'
        },
        touchFeedback: {
            scale: 0.98,
            duration: '100ms',
            easing: 'accelerate'
        }
    },
    pageTransitions: {
        slide: {
            duration: '300ms',
            easing: 'slide'
        },
        fade: {
            duration: '250ms',
            easing: 'fade'
        },
        scale: {
            duration: '300ms',
            easing: 'spring'
        }
    },
    entrance: {
        fadeUp: {
            transform: 'translateY(20px)',
            opacity: 0,
            duration: '400ms',
            easing: 'enter',
            delay: '0ms'
        },
        fadeScale: {
            transform: 'scale(0.95)',
            opacity: 0,
            duration: '300ms',
            easing: 'enter',
            delay: '0ms'
        },
        staggerChildren: {
            staggerDelay: '100ms',
            duration: '300ms',
            easing: 'enter'
        },
        slideInLeft: {
            transform: 'translateX(-30px)',
            opacity: 0,
            duration: '400ms',
            easing: 'decelerate'
        },
        slideInRight: {
            transform: 'translateX(30px)',
            opacity: 0,
            duration: '400ms',
            easing: 'decelerate'
        }
    },
    reduceMotion: {
        enabled: true,
        fallbackDuration: '0ms',
        fallbackEasing: 'linear'
    },
    constraints: {
        maxConcurrentAnimations: 5,
        minDuration: '50ms',
        maxDuration: '2000ms'
    }
};
const createAnimation = (property, value, options = {}) => {
    const { duration = 'normal', easing = 'standard', delay = '0ms' } = options;
    return {
        property,
        value,
        duration: exports.motion.durations[duration],
        easing: exports.motion.easing[easing],
        delay
    };
};
exports.createAnimation = createAnimation;
const createMicroInteraction = (interaction, customOptions = {}) => {
    const baseInteraction = exports.motion.microInteractions[interaction];
    return {
        ...baseInteraction,
        ...customOptions,
        duration: exports.motion.durations[baseInteraction.duration] || baseInteraction.duration,
        easing: exports.motion.easing[baseInteraction.easing] || baseInteraction.easing
    };
};
exports.createMicroInteraction = createMicroInteraction;
const createEntranceAnimation = (animation, options = {}) => {
    const baseAnimation = exports.motion.entrance[animation];
    const { stagger = false, staggerDelay = 100 } = options;
    return {
        ...baseAnimation,
        staggerChildren: stagger,
        staggerDelay: `${staggerDelay}ms`
    };
};
exports.createEntranceAnimation = createEntranceAnimation;
const createTransitionString = (animations) => {
    return animations
        .map(({ property, value, duration, easing, delay }) => `${property} ${duration} ${easing} ${delay}`)
        .join(', ');
};
exports.createTransitionString = createTransitionString;
//# sourceMappingURL=motion.js.map