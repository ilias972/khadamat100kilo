import { Variants } from 'framer-motion';
export declare const transitions: {
    readonly fast: {
        readonly duration: 0.15;
        readonly ease: readonly [0.4, 0, 0.2, 1];
    };
    readonly normal: {
        readonly duration: 0.3;
        readonly ease: readonly [0.4, 0, 0.2, 1];
    };
    readonly slow: {
        readonly duration: 0.5;
        readonly ease: readonly [0.4, 0, 0.2, 1];
    };
    readonly bounce: {
        readonly duration: 0.6;
        readonly ease: readonly [0.68, -0.55, 0.265, 1.55];
    };
    readonly spring: {
        readonly type: "spring";
        readonly stiffness: 400;
        readonly damping: 30;
        readonly mass: 1;
    };
    readonly springGentle: {
        readonly type: "spring";
        readonly stiffness: 300;
        readonly damping: 40;
        readonly mass: 1;
    };
};
export declare const hoverAnimations: {
    readonly lift: {
        readonly scale: 1.02;
        readonly y: -2;
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 300;
            readonly damping: 40;
            readonly mass: 1;
        };
    };
    readonly glow: {
        readonly boxShadow: "0 8px 25px rgba(249, 123, 34, 0.15)";
        readonly transition: {
            readonly duration: 0.3;
            readonly ease: readonly [0.4, 0, 0.2, 1];
        };
    };
    readonly scale: {
        readonly scale: 1.05;
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 300;
            readonly damping: 40;
            readonly mass: 1;
        };
    };
    readonly borderGlow: {
        readonly borderColor: "rgba(249, 123, 34, 0.3)";
        readonly boxShadow: "0 0 20px rgba(249, 123, 34, 0.1)";
        readonly transition: {
            readonly duration: 0.3;
            readonly ease: readonly [0.4, 0, 0.2, 1];
        };
    };
};
export declare const entranceAnimations: {
    readonly fadeInUp: {
        readonly initial: {
            readonly opacity: 0;
            readonly y: 20;
        };
        readonly animate: {
            readonly opacity: 1;
            readonly y: 0;
        };
        readonly transition: {
            readonly duration: 0.3;
            readonly ease: readonly [0.4, 0, 0.2, 1];
        };
    };
    readonly fadeInLeft: {
        readonly initial: {
            readonly opacity: 0;
            readonly x: -20;
        };
        readonly animate: {
            readonly opacity: 1;
            readonly x: 0;
        };
        readonly transition: {
            readonly duration: 0.3;
            readonly ease: readonly [0.4, 0, 0.2, 1];
        };
    };
    readonly fadeInRight: {
        readonly initial: {
            readonly opacity: 0;
            readonly x: 20;
        };
        readonly animate: {
            readonly opacity: 1;
            readonly x: 0;
        };
        readonly transition: {
            readonly duration: 0.3;
            readonly ease: readonly [0.4, 0, 0.2, 1];
        };
    };
    readonly scaleIn: {
        readonly initial: {
            readonly opacity: 0;
            readonly scale: 0.95;
        };
        readonly animate: {
            readonly opacity: 1;
            readonly scale: 1;
        };
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 300;
            readonly damping: 40;
            readonly mass: 1;
        };
    };
    readonly staggerContainer: {
        readonly animate: {
            readonly transition: {
                readonly staggerChildren: 0.1;
                readonly delayChildren: 0.2;
            };
        };
    };
    readonly staggerItem: {
        readonly initial: {
            readonly opacity: 0;
            readonly y: 20;
        };
        readonly animate: {
            readonly opacity: 1;
            readonly y: 0;
        };
        readonly transition: {
            readonly duration: 0.3;
            readonly ease: readonly [0.4, 0, 0.2, 1];
        };
    };
};
export declare const scrollAnimations: {
    readonly reveal: {
        readonly initial: {
            readonly opacity: 0;
            readonly y: 30;
        };
        readonly whileInView: {
            readonly opacity: 1;
            readonly y: 0;
        };
        readonly viewport: {
            readonly once: true;
            readonly margin: "-100px";
        };
        readonly transition: {
            readonly duration: 0.3;
            readonly ease: readonly [0.4, 0, 0.2, 1];
        };
    };
    readonly scaleReveal: {
        readonly initial: {
            readonly opacity: 0;
            readonly scale: 0.9;
        };
        readonly whileInView: {
            readonly opacity: 1;
            readonly scale: 1;
        };
        readonly viewport: {
            readonly once: true;
            readonly margin: "-50px";
        };
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 300;
            readonly damping: 40;
            readonly mass: 1;
        };
    };
    readonly slideInLeft: {
        readonly initial: {
            readonly opacity: 0;
            readonly x: -50;
        };
        readonly whileInView: {
            readonly opacity: 1;
            readonly x: 0;
        };
        readonly viewport: {
            readonly once: true;
            readonly margin: "-100px";
        };
        readonly transition: {
            readonly duration: 0.3;
            readonly ease: readonly [0.4, 0, 0.2, 1];
        };
    };
    readonly slideInRight: {
        readonly initial: {
            readonly opacity: 0;
            readonly x: 50;
        };
        readonly whileInView: {
            readonly opacity: 1;
            readonly x: 0;
        };
        readonly viewport: {
            readonly once: true;
            readonly margin: "-100px";
        };
        readonly transition: {
            readonly duration: 0.3;
            readonly ease: readonly [0.4, 0, 0.2, 1];
        };
    };
};
export declare const microInteractions: {
    readonly ctaBounce: {
        readonly whileHover: {
            readonly scale: 1.02;
            readonly y: -1;
        };
        readonly whileTap: {
            readonly scale: 0.98;
        };
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 400;
            readonly damping: 30;
            readonly mass: 1;
        };
    };
    readonly cardTilt: {
        readonly whileHover: {
            readonly rotateY: 2;
            readonly rotateX: 1;
            readonly scale: 1.02;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 40;
                readonly mass: 1;
            };
        };
    };
    readonly pulse: {
        readonly animate: {
            readonly scale: readonly [1, 1.05, 1];
            readonly transition: {
                readonly duration: 2;
                readonly repeat: number;
                readonly ease: "easeInOut";
            };
        };
    };
    readonly glowPulse: {
        readonly animate: {
            readonly boxShadow: readonly ["0 0 20px rgba(249, 123, 34, 0.1)", "0 0 30px rgba(249, 123, 34, 0.2)", "0 0 20px rgba(249, 123, 34, 0.1)"];
            readonly transition: {
                readonly duration: 3;
                readonly repeat: number;
                readonly ease: "easeInOut";
            };
        };
    };
    readonly statusTransition: {
        readonly initial: {
            readonly scale: 0.8;
            readonly opacity: 0;
        };
        readonly animate: {
            readonly scale: 1;
            readonly opacity: 1;
        };
        readonly exit: {
            readonly scale: 0.8;
            readonly opacity: 0;
        };
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 400;
            readonly damping: 30;
            readonly mass: 1;
        };
    };
};
export declare const loadingAnimations: {
    readonly shimmer: {
        readonly animate: {
            readonly backgroundPosition: readonly ["-200% 0", "200% 0"];
            readonly transition: {
                readonly duration: 1.5;
                readonly repeat: number;
                readonly ease: "linear";
            };
        };
    };
    readonly pulse: {
        readonly animate: {
            readonly opacity: readonly [0.5, 1, 0.5];
            readonly transition: {
                readonly duration: 1.5;
                readonly repeat: number;
                readonly ease: "easeInOut";
            };
        };
    };
    readonly scalePulse: {
        readonly animate: {
            readonly scale: readonly [1, 1.1, 1];
            readonly transition: {
                readonly duration: 2;
                readonly repeat: number;
                readonly ease: "easeInOut";
            };
        };
    };
};
export declare const componentAnimations: {
    readonly button: {
        readonly hover: {
            readonly scale: 1.02;
            readonly y: -2;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 40;
                readonly mass: 1;
            };
        };
        readonly tap: {
            readonly scale: 0.98;
            readonly transition: {
                readonly duration: 0.15;
                readonly ease: readonly [0.4, 0, 0.2, 1];
            };
        };
        readonly loading: {
            readonly animate: {
                readonly scale: readonly [1, 0.95, 1];
            };
            readonly transition: {
                readonly duration: 1;
                readonly repeat: number;
            };
        };
    };
    readonly card: {
        readonly hover: {
            readonly boxShadow: "0 8px 25px rgba(249, 123, 34, 0.15)";
            readonly transition: {
                readonly duration: 0.3;
                readonly ease: readonly [0.4, 0, 0.2, 1];
            };
            readonly scale: 1.02;
            readonly y: -2;
        };
        readonly tap: {
            readonly scale: 0.98;
            readonly transition: {
                readonly duration: 0.15;
                readonly ease: readonly [0.4, 0, 0.2, 1];
            };
        };
    };
    readonly modal: {
        readonly overlay: {
            readonly initial: {
                readonly opacity: 0;
            };
            readonly animate: {
                readonly opacity: 1;
            };
            readonly exit: {
                readonly opacity: 0;
            };
            readonly transition: {
                readonly duration: 0.3;
                readonly ease: readonly [0.4, 0, 0.2, 1];
            };
        };
        readonly content: {
            readonly initial: {
                readonly opacity: 0;
                readonly scale: 0.95;
                readonly y: 20;
            };
            readonly animate: {
                readonly opacity: 1;
                readonly scale: 1;
                readonly y: 0;
            };
            readonly exit: {
                readonly opacity: 0;
                readonly scale: 0.95;
                readonly y: 20;
            };
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 40;
                readonly mass: 1;
            };
        };
    };
    readonly nav: {
        readonly item: {
            readonly hover: {
                readonly scale: 1.05;
                readonly transition: {
                    readonly type: "spring";
                    readonly stiffness: 300;
                    readonly damping: 40;
                    readonly mass: 1;
                };
            };
            readonly active: {
                readonly scale: 1.1;
                readonly transition: {
                    readonly type: "spring";
                    readonly stiffness: 400;
                    readonly damping: 30;
                    readonly mass: 1;
                };
            };
        };
        readonly dropdown: {
            readonly initial: {
                readonly opacity: 0;
                readonly y: -10;
                readonly scale: 0.95;
            };
            readonly animate: {
                readonly opacity: 1;
                readonly y: 0;
                readonly scale: 1;
            };
            readonly exit: {
                readonly opacity: 0;
                readonly y: -10;
                readonly scale: 0.95;
            };
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 40;
                readonly mass: 1;
            };
        };
    };
    readonly form: {
        readonly input: {
            readonly focus: {
                readonly scale: 1.02;
                readonly borderColor: "rgba(249, 123, 34, 0.3)";
                readonly boxShadow: "0 0 0 3px rgba(249, 123, 34, 0.1)";
                readonly transition: {
                    readonly duration: 0.3;
                    readonly ease: readonly [0.4, 0, 0.2, 1];
                };
            };
        };
        readonly error: {
            readonly initial: {
                readonly opacity: 0;
                readonly x: -10;
            };
            readonly animate: {
                readonly opacity: 1;
                readonly x: 0;
            };
            readonly transition: {
                readonly duration: 0.3;
                readonly ease: readonly [0.4, 0, 0.2, 1];
            };
        };
    };
};
export declare const generateStaggerDelay: (index: number, baseDelay?: number) => number;
export declare const respectReducedMotion: (animation: Variants) => Variants;
export declare const presets: {
    readonly pageEntrance: {
        readonly initial: {
            readonly opacity: 0;
        };
        readonly animate: {
            readonly opacity: 1;
        };
        readonly transition: {
            readonly duration: 0.5;
            readonly ease: readonly [0.4, 0, 0.2, 1];
        };
    };
    readonly sectionReveal: {
        readonly initial: {
            readonly opacity: 0;
            readonly y: 30;
        };
        readonly whileInView: {
            readonly opacity: 1;
            readonly y: 0;
        };
        readonly viewport: {
            readonly once: true;
            readonly margin: "-100px";
        };
        readonly transition: {
            readonly duration: 0.3;
            readonly ease: readonly [0.4, 0, 0.2, 1];
        };
    };
    readonly interactive: {
        readonly whileHover: {
            readonly scale: 1.02;
            readonly y: -2;
            readonly transition: {
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 40;
                readonly mass: 1;
            };
        };
        readonly whileTap: {
            readonly scale: 0.98;
        };
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 300;
            readonly damping: 40;
            readonly mass: 1;
        };
    };
    readonly premiumCTA: {
        readonly whileHover: {
            readonly scale: 1.02;
            readonly y: -2;
            readonly boxShadow: "0 10px 25px rgba(249, 123, 34, 0.2)";
        };
        readonly whileTap: {
            readonly scale: 0.98;
        };
        readonly transition: {
            readonly type: "spring";
            readonly stiffness: 400;
            readonly damping: 30;
            readonly mass: 1;
        };
    };
};
export type AnimationType = keyof typeof presets;
export type HoverAnimationType = keyof typeof hoverAnimations;
export type EntranceAnimationType = keyof typeof entranceAnimations;
export type ScrollAnimationType = keyof typeof scrollAnimations;
export type MicroInteractionType = keyof typeof microInteractions;
