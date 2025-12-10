export declare const motion: {
    readonly durations: {
        readonly instant: "0ms";
        readonly fast: "150ms";
        readonly normal: "300ms";
        readonly slow: "500ms";
        readonly slower: "700ms";
        readonly slowest: "1000ms";
    };
    readonly easing: {
        readonly standard: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly accelerate: "cubic-bezier(0.4, 0, 1, 1)";
        readonly decelerate: "cubic-bezier(0, 0, 0.2, 1)";
        readonly spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        readonly enter: "cubic-bezier(0.16, 1, 0.3, 1)";
        readonly exit: "cubic-bezier(0.7, 0, 0.84, 0)";
        readonly slide: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        readonly fade: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly moroccanEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        readonly moroccanFlow: "cubic-bezier(0.23, 1, 0.32, 1)";
        readonly moroccanGrace: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    };
    readonly microInteractions: {
        readonly buttonPress: {
            readonly scale: 0.95;
            readonly duration: "100ms";
            readonly easing: "accelerate";
        };
        readonly cardHover: {
            readonly transform: "translateY(-2px)";
            readonly shadow: "0 12px 32px rgba(0,0,0,0.12)";
            readonly duration: "200ms";
            readonly easing: "standard";
        };
        readonly notificationSlide: {
            readonly transform: "translateX(0)";
            readonly opacity: 1;
            readonly duration: "300ms";
            readonly easing: "decelerate";
        };
        readonly loadingSpin: {
            readonly transform: "rotate(360deg)";
            readonly duration: "1000ms";
            readonly easing: "linear";
            readonly repeat: "infinite";
        };
        readonly focusRing: {
            readonly boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
            readonly duration: "200ms";
            readonly easing: "standard";
        };
        readonly tabSwitch: {
            readonly transform: "translateX(0)";
            readonly opacity: 1;
            readonly duration: "250ms";
            readonly easing: "enter";
        };
        readonly modalOpen: {
            readonly transform: "scale(1)";
            readonly opacity: 1;
            readonly duration: "300ms";
            readonly easing: "spring";
        };
        readonly modalClose: {
            readonly transform: "scale(0.95)";
            readonly opacity: 0;
            readonly duration: "200ms";
            readonly easing: "exit";
        };
        readonly dropdownOpen: {
            readonly transform: "translateY(0)";
            readonly opacity: 1;
            readonly duration: "200ms";
            readonly easing: "decelerate";
        };
        readonly dropdownClose: {
            readonly transform: "translateY(-10px)";
            readonly opacity: 0;
            readonly duration: "150ms";
            readonly easing: "accelerate";
        };
        readonly chartBarGrow: {
            readonly transform: "scaleY(1)";
            readonly transformOrigin: "bottom";
            readonly duration: "500ms";
            readonly easing: "spring";
            readonly delay: "100ms";
        };
        readonly chartLineDraw: {
            readonly strokeDashoffset: 0;
            readonly duration: "800ms";
            readonly easing: "enter";
        };
        readonly bottomNavSlide: {
            readonly transform: "translateY(0)";
            readonly duration: "300ms";
            readonly easing: "decelerate";
        };
        readonly touchFeedback: {
            readonly scale: 0.98;
            readonly duration: "100ms";
            readonly easing: "accelerate";
        };
    };
    readonly pageTransitions: {
        readonly slide: {
            readonly duration: "300ms";
            readonly easing: "slide";
        };
        readonly fade: {
            readonly duration: "250ms";
            readonly easing: "fade";
        };
        readonly scale: {
            readonly duration: "300ms";
            readonly easing: "spring";
        };
    };
    readonly entrance: {
        readonly fadeUp: {
            readonly transform: "translateY(20px)";
            readonly opacity: 0;
            readonly duration: "400ms";
            readonly easing: "enter";
            readonly delay: "0ms";
        };
        readonly fadeScale: {
            readonly transform: "scale(0.95)";
            readonly opacity: 0;
            readonly duration: "300ms";
            readonly easing: "enter";
            readonly delay: "0ms";
        };
        readonly staggerChildren: {
            readonly staggerDelay: "100ms";
            readonly duration: "300ms";
            readonly easing: "enter";
        };
        readonly slideInLeft: {
            readonly transform: "translateX(-30px)";
            readonly opacity: 0;
            readonly duration: "400ms";
            readonly easing: "decelerate";
        };
        readonly slideInRight: {
            readonly transform: "translateX(30px)";
            readonly opacity: 0;
            readonly duration: "400ms";
            readonly easing: "decelerate";
        };
    };
    readonly reduceMotion: {
        readonly enabled: true;
        readonly fallbackDuration: "0ms";
        readonly fallbackEasing: "linear";
    };
    readonly constraints: {
        readonly maxConcurrentAnimations: 5;
        readonly minDuration: "50ms";
        readonly maxDuration: "2000ms";
    };
};
export type MotionDuration = keyof typeof motion.durations;
export type MotionEasing = keyof typeof motion.easing;
export type MicroInteraction = keyof typeof motion.microInteractions;
export type PageTransition = keyof typeof motion.pageTransitions;
export type EntranceAnimation = keyof typeof motion.entrance;
export declare const createAnimation: (property: string, value: string, options?: {
    duration?: MotionDuration;
    easing?: MotionEasing;
    delay?: string;
}) => {
    property: string;
    value: string;
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    delay: string;
};
export declare const createMicroInteraction: (interaction: MicroInteraction, customOptions?: Partial<(typeof motion.microInteractions)[MicroInteraction]>) => {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(-2px)" | undefined;
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateX(0)" | undefined;
    opacity?: 1 | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "rotate(360deg)" | undefined;
    repeat?: "infinite" | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateX(0)" | undefined;
    opacity?: 1 | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scale(1)" | undefined;
    opacity?: 1 | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scale(0.95)" | undefined;
    opacity?: 0 | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(0)" | undefined;
    opacity?: 1 | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(-10px)" | undefined;
    opacity?: 0 | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scaleY(1)" | undefined;
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(0)" | undefined;
    scale: 0.95;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale: 0.95 | 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    transform: "translateY(-2px)";
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-2px)";
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-2px)" | "translateX(0)";
    opacity?: 1 | undefined;
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-2px)" | "rotate(360deg)";
    repeat?: "infinite" | undefined;
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    transform: "translateY(-2px)";
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-2px)" | "translateX(0)";
    opacity?: 1 | undefined;
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(1)" | "translateY(-2px)";
    opacity?: 1 | undefined;
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "translateY(-2px)";
    opacity?: 0 | undefined;
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateY(-2px)";
    opacity?: 1 | undefined;
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "translateY(-2px)";
    opacity?: 0 | undefined;
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-2px)" | "scaleY(1)";
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    transform: "translateY(-2px)";
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateY(-2px)";
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    transform: "translateY(-2px)";
    shadow: "0 12px 32px rgba(0,0,0,0.12)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-2px)" | "translateX(0)";
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)" | "rotate(360deg)";
    repeat?: "infinite" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(1)" | "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "translateX(0)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "translateX(0)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)" | "scaleY(1)";
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    transform: "rotate(360deg)";
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-2px)" | "rotate(360deg)";
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)" | "rotate(360deg)";
    opacity?: 1 | undefined;
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "rotate(360deg)";
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    transform: "rotate(360deg)";
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)" | "rotate(360deg)";
    opacity?: 1 | undefined;
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(1)" | "rotate(360deg)";
    opacity?: 1 | undefined;
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "rotate(360deg)";
    opacity?: 0 | undefined;
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "rotate(360deg)";
    opacity?: 1 | undefined;
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "rotate(360deg)";
    opacity?: 0 | undefined;
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "rotate(360deg)" | "scaleY(1)";
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    transform: "rotate(360deg)";
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "rotate(360deg)";
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    transform: "rotate(360deg)";
    repeat: "infinite";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(-2px)" | undefined;
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateX(0)" | undefined;
    opacity?: 1 | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "rotate(360deg)" | undefined;
    repeat?: "infinite" | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateX(0)" | undefined;
    opacity?: 1 | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scale(1)" | undefined;
    opacity?: 1 | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scale(0.95)" | undefined;
    opacity?: 0 | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(0)" | undefined;
    opacity?: 1 | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(-10px)" | undefined;
    opacity?: 0 | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scaleY(1)" | undefined;
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(0)" | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    boxShadow: "0 0 0 2px rgba(249, 123, 34, 0.2)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-2px)" | "translateX(0)";
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)" | "rotate(360deg)";
    repeat?: "infinite" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(1)" | "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "translateX(0)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "translateX(0)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)" | "scaleY(1)";
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    transform: "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    transform: "scale(1)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(1)" | "translateY(-2px)";
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(1)" | "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(1)" | "rotate(360deg)";
    repeat?: "infinite" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    transform: "scale(1)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(1)" | "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(1)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "scale(1)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scale(1)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "scale(1)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(1)" | "scaleY(1)";
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    transform: "scale(1)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scale(1)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    transform: "scale(1)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    transform: "scale(0.95)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "translateY(-2px)";
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "translateX(0)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "rotate(360deg)";
    repeat?: "infinite" | undefined;
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    transform: "scale(0.95)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "translateX(0)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "scale(1)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scale(0.95)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "scale(0.95)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "scaleY(1)";
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    transform: "scale(0.95)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scale(0.95)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    transform: "scale(0.95)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    transform: "translateY(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateY(-2px)";
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "rotate(360deg)";
    repeat?: "infinite" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    transform: "translateY(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateX(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scale(1)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scale(0.95)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "translateY(0)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scaleY(1)";
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    transform: "translateY(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    transform: "translateY(0)";
    opacity: 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    transform: "translateY(-10px)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "translateY(-2px)";
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "translateX(0)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "rotate(360deg)";
    repeat?: "infinite" | undefined;
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    transform: "translateY(-10px)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "translateX(0)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "scale(1)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "scale(0.95)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "translateY(0)";
    opacity: 0 | 1;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "scaleY(1)";
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    transform: "translateY(-10px)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "translateY(0)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    transform: "translateY(-10px)";
    opacity: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    transform: "scaleY(1)";
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-2px)" | "scaleY(1)";
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)" | "scaleY(1)";
    opacity?: 1 | undefined;
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "rotate(360deg)" | "scaleY(1)";
    repeat?: "infinite" | undefined;
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    transform: "scaleY(1)";
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateX(0)" | "scaleY(1)";
    opacity?: 1 | undefined;
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(1)" | "scaleY(1)";
    opacity?: 1 | undefined;
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scale(0.95)" | "scaleY(1)";
    opacity?: 0 | undefined;
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scaleY(1)";
    opacity?: 1 | undefined;
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "scaleY(1)";
    opacity?: 0 | undefined;
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "scaleY(1)";
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    transform: "scaleY(1)";
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scaleY(1)";
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    transform: "scaleY(1)";
    transformOrigin: "bottom";
    delay: "100ms";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(-2px)" | undefined;
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateX(0)" | undefined;
    opacity?: 1 | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "rotate(360deg)" | undefined;
    repeat?: "infinite" | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateX(0)" | undefined;
    opacity?: 1 | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scale(1)" | undefined;
    opacity?: 1 | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scale(0.95)" | undefined;
    opacity?: 0 | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(0)" | undefined;
    opacity?: 1 | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(-10px)" | undefined;
    opacity?: 0 | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scaleY(1)" | undefined;
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(0)" | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    strokeDashoffset: 0;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.95 | undefined;
    transform: "translateY(0)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateY(-2px)";
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateX(0)";
    opacity?: 1 | undefined;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "rotate(360deg)";
    repeat?: "infinite" | undefined;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    transform: "translateY(0)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "translateX(0)";
    opacity?: 1 | undefined;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scale(1)";
    opacity?: 1 | undefined;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scale(0.95)";
    opacity?: 0 | undefined;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)";
    opacity?: 1 | undefined;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(-10px)" | "translateY(0)";
    opacity?: 0 | undefined;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)" | "scaleY(1)";
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    transform: "translateY(0)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform: "translateY(0)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale?: 0.98 | undefined;
    transform: "translateY(0)";
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale: 0.95 | 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(-2px)" | undefined;
    shadow?: "0 12px 32px rgba(0,0,0,0.12)" | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateX(0)" | undefined;
    opacity?: 1 | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "rotate(360deg)" | undefined;
    repeat?: "infinite" | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    boxShadow?: "0 0 0 2px rgba(249, 123, 34, 0.2)" | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateX(0)" | undefined;
    opacity?: 1 | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scale(1)" | undefined;
    opacity?: 1 | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scale(0.95)" | undefined;
    opacity?: 0 | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(0)" | undefined;
    opacity?: 1 | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(-10px)" | undefined;
    opacity?: 0 | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "scaleY(1)" | undefined;
    transformOrigin?: "bottom" | undefined;
    delay?: "100ms" | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    strokeDashoffset?: 0 | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    transform?: "translateY(0)" | undefined;
    scale: 0.98;
} | {
    duration: "0ms" | "150ms" | "300ms" | "500ms" | "700ms" | "1000ms";
    easing: "cubic-bezier(0.4, 0, 1, 1)" | "cubic-bezier(0, 0, 0.2, 1)" | "cubic-bezier(0.4, 0, 0.2, 1)" | "cubic-bezier(0.25, 0.46, 0.45, 0.94)" | "cubic-bezier(0.23, 1, 0.32, 1)" | "cubic-bezier(0.68, -0.55, 0.265, 1.55)" | "cubic-bezier(0.175, 0.885, 0.32, 1.275)" | "cubic-bezier(0.16, 1, 0.3, 1)" | "cubic-bezier(0.7, 0, 0.84, 0)";
    scale: 0.98;
};
export declare const createEntranceAnimation: (animation: EntranceAnimation, options?: {
    stagger?: boolean;
    staggerDelay?: number;
}) => {
    staggerChildren: boolean;
    staggerDelay: string;
    transform: "translateY(20px)";
    opacity: 0;
    duration: "400ms";
    easing: "enter";
    delay: "0ms";
} | {
    staggerChildren: boolean;
    staggerDelay: string;
    transform: "scale(0.95)";
    opacity: 0;
    duration: "300ms";
    easing: "enter";
    delay: "0ms";
} | {
    staggerChildren: boolean;
    staggerDelay: string;
    duration: "300ms";
    easing: "enter";
} | {
    staggerChildren: boolean;
    staggerDelay: string;
    transform: "translateX(-30px)";
    opacity: 0;
    duration: "400ms";
    easing: "decelerate";
} | {
    staggerChildren: boolean;
    staggerDelay: string;
    transform: "translateX(30px)";
    opacity: 0;
    duration: "400ms";
    easing: "decelerate";
};
export declare const createTransitionString: (animations: ReturnType<typeof createAnimation>[]) => string;
