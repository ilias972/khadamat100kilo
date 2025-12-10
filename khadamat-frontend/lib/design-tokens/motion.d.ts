export declare const motion: {
    readonly duration: {
        readonly instant: 0;
        readonly fast: 150;
        readonly normal: 300;
        readonly slow: 500;
        readonly slower: 700;
        readonly slowest: 1000;
    };
    readonly easing: {
        readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
        readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
        readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
        readonly moroccanEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        readonly moroccanFlow: "cubic-bezier(0.23, 1, 0.32, 1)";
        readonly moroccanGrace: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        readonly bounceIn: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
        readonly bounceOut: "cubic-bezier(0.34, 1.56, 0.64, 1)";
        readonly elastic: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    };
    readonly spring: {
        readonly gentle: {
            readonly type: "spring";
            readonly damping: 25;
            readonly stiffness: 120;
        };
        readonly bouncy: {
            readonly type: "spring";
            readonly damping: 15;
            readonly stiffness: 200;
        };
        readonly smooth: {
            readonly type: "spring";
            readonly damping: 30;
            readonly stiffness: 100;
        };
        readonly moroccan: {
            readonly type: "spring";
            readonly damping: 20;
            readonly stiffness: 150;
            readonly mass: 0.8;
        };
    };
    readonly presets: {
        readonly fadeIn: {
            readonly initial: {
                readonly opacity: 0;
            };
            readonly animate: {
                readonly opacity: 1;
            };
            readonly transition: {
                readonly duration: 300;
                readonly ease: "easeOut";
            };
        };
        readonly slideUp: {
            readonly initial: {
                readonly opacity: 0;
                readonly y: 20;
            };
            readonly animate: {
                readonly opacity: 1;
                readonly y: 0;
            };
            readonly transition: {
                readonly duration: 400;
                readonly ease: "moroccanEase";
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
                readonly duration: 350;
                readonly ease: "moroccanFlow";
            };
        };
        readonly staggerChildren: {
            readonly staggerChildren: 0.1;
            readonly delayChildren: 0.2;
        };
        readonly headerScroll: {
            readonly initial: {
                readonly y: -100;
                readonly opacity: 0;
            };
            readonly animate: {
                readonly y: 0;
                readonly opacity: 1;
            };
            readonly transition: {
                readonly duration: 0.8;
                readonly ease: "moroccanEase";
                readonly type: "spring";
                readonly stiffness: 100;
                readonly damping: 20;
            };
        };
        readonly navItemScroll: {
            readonly initial: {
                readonly opacity: 0;
                readonly y: -10;
            };
            readonly animate: {
                readonly opacity: 1;
                readonly y: 0;
            };
            readonly transition: {
                readonly duration: 0.4;
                readonly ease: "moroccanFlow";
            };
        };
        readonly logoScrollRotate: {
            readonly whileHover: {
                readonly rotate: readonly [0, -3, 3, 0];
                readonly scale: 1.05;
            };
            readonly transition: {
                readonly duration: 0.6;
                readonly ease: "bounceOut";
                readonly type: "spring";
                readonly stiffness: 300;
                readonly damping: 20;
            };
        };
    };
};
export type MotionDuration = keyof typeof motion.duration;
export type MotionEasing = keyof typeof motion.easing;
export type MotionSpring = keyof typeof motion.spring;
