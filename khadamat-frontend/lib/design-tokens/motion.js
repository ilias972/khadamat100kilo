"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.motion = void 0;
exports.motion = {
    duration: {
        instant: 0,
        fast: 150,
        normal: 300,
        slow: 500,
        slower: 700,
        slowest: 1000,
    },
    easing: {
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        moroccanEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        moroccanFlow: 'cubic-bezier(0.23, 1, 0.32, 1)',
        moroccanGrace: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        bounceIn: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        bounceOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    spring: {
        gentle: {
            type: 'spring',
            damping: 25,
            stiffness: 120,
        },
        bouncy: {
            type: 'spring',
            damping: 15,
            stiffness: 200,
        },
        smooth: {
            type: 'spring',
            damping: 30,
            stiffness: 100,
        },
        moroccan: {
            type: 'spring',
            damping: 20,
            stiffness: 150,
            mass: 0.8,
        },
    },
    presets: {
        fadeIn: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 300, ease: 'easeOut' },
        },
        slideUp: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 400, ease: 'moroccanEase' },
        },
        scaleIn: {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 350, ease: 'moroccanFlow' },
        },
        staggerChildren: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
        headerScroll: {
            initial: { y: -100, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            transition: {
                duration: 0.8,
                ease: 'moroccanEase',
                type: 'spring',
                stiffness: 100,
                damping: 20
            },
        },
        navItemScroll: {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: {
                duration: 0.4,
                ease: 'moroccanFlow'
            },
        },
        logoScrollRotate: {
            whileHover: {
                rotate: [0, -3, 3, 0],
                scale: 1.05
            },
            transition: {
                duration: 0.6,
                ease: 'bounceOut',
                type: 'spring',
                stiffness: 300,
                damping: 20
            },
        },
    },
};
//# sourceMappingURL=motion.js.map