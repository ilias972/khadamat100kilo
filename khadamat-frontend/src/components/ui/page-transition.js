'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.transitions = exports.LoadingTransition = exports.StaggeredTransition = exports.SmartPageTransition = exports.PageTransitionProvider = exports.usePageTransition = exports.PageTransition = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const navigation_1 = require("next/navigation");
const utils_1 = require("@/lib/utils");
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
const PageTransition = ({ children, type = 'fade', duration = 0.5, delay = 0, className, ...motionProps }) => {
    const pathname = (0, navigation_1.usePathname)();
    return (<framer_motion_1.motion.div key={pathname} initial="initial" animate="animate" exit="exit" variants={transitionVariants[type]} transition={{
            duration: duration || 0.5,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94]
        }} className={(0, utils_1.cn)('w-full h-full', className)} {...motionProps}>
      {children}
    </framer_motion_1.motion.div>);
};
exports.PageTransition = PageTransition;
const PageTransitionContext = react_1.default.createContext(undefined);
const usePageTransition = () => {
    const context = (0, react_1.useContext)(PageTransitionContext);
    if (!context) {
        throw new Error('usePageTransition must be used within a PageTransitionProvider');
    }
    return context;
};
exports.usePageTransition = usePageTransition;
const PageTransitionProvider = ({ children, defaultType = 'moroccan-fade', defaultDuration = 0.3 }) => {
    const [transitionType, setTransitionType] = react_1.default.useState(defaultType);
    const [duration, setDuration] = react_1.default.useState(defaultDuration);
    return (<PageTransitionContext.Provider value={{
            transitionType,
            setTransitionType,
            duration,
            setDuration
        }}>
      {children}
    </PageTransitionContext.Provider>);
};
exports.PageTransitionProvider = PageTransitionProvider;
const SmartPageTransition = ({ children, routeTransitions = {}, ...props }) => {
    const pathname = (0, navigation_1.usePathname)();
    const context = (0, react_1.useContext)(PageTransitionContext);
    const getTransitionType = () => {
        if (routeTransitions[pathname]) {
            return routeTransitions[pathname];
        }
        return context?.transitionType || 'fade';
    };
    const transitionType = getTransitionType();
    const duration = context?.duration || 0.5;
    return (<exports.PageTransition type={transitionType} duration={duration} {...props}>
      {children}
    </exports.PageTransition>);
};
exports.SmartPageTransition = SmartPageTransition;
const StaggeredTransition = ({ children, staggerDelay = 0.1, childAnimation = 'fade', className, ...motionProps }) => {
    const pathname = (0, navigation_1.usePathname)();
    const containerVariants = {
        initial: {},
        animate: {
            transition: {
                staggerChildren: staggerDelay
            }
        },
        exit: {}
    };
    return (<framer_motion_1.motion.div key={pathname} variants={containerVariants} initial="initial" animate="animate" exit="exit" className={className} {...motionProps}>
      {react_1.default.Children.map(children, (child, index) => (<framer_motion_1.motion.div key={index} variants={transitionVariants[childAnimation]} transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}>
          {child}
        </framer_motion_1.motion.div>))}
    </framer_motion_1.motion.div>);
};
exports.StaggeredTransition = StaggeredTransition;
const LoadingTransition = ({ children, isLoading, loadingComponent, type = 'fade', className, ...motionProps }) => {
    return (<framer_motion_1.AnimatePresence mode="wait">
      {isLoading ? (<framer_motion_1.motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className={className} {...motionProps}>
          {loadingComponent || (<div className="flex items-center justify-center p-8">
              <framer_motion_1.motion.div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}/>
            </div>)}
        </framer_motion_1.motion.div>) : (<framer_motion_1.motion.div key="content" initial="initial" animate="animate" exit="exit" variants={transitionVariants[type]} transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
            }} className={className} {...motionProps}>
          {children}
        </framer_motion_1.motion.div>)}
    </framer_motion_1.AnimatePresence>);
};
exports.LoadingTransition = LoadingTransition;
exports.transitions = {
    page: (type = 'fade') => ({
        type,
        duration: 0.5
    }),
    modal: (type = 'scale') => ({
        type,
        duration: 0.3
    }),
    card: (type = 'slide-up') => ({
        type,
        duration: 0.4,
        delay: 0.1
    }),
    list: (type = 'fade') => ({
        type,
        duration: 0.3,
        staggerDelay: 0.05
    })
};
//# sourceMappingURL=page-transition.js.map