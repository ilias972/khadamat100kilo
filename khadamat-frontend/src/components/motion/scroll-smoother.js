'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToElement = exports.useLenis = exports.ScrollSmoother = void 0;
const react_1 = require("react");
const lenis_1 = __importDefault(require("lenis"));
const LenisContext = (0, react_1.createContext)(null);
const ScrollSmoother = ({ children, options = {} }) => {
    const lenisRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const lenis = new lenis_1.default({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
            ...options,
        });
        lenisRef.current = lenis;
        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [options]);
    (0, react_1.useEffect)(() => {
        if (lenisRef.current) {
            window.lenis = lenisRef.current;
        }
    }, []);
    return (<LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>);
};
exports.ScrollSmoother = ScrollSmoother;
const useLenis = () => {
    const lenis = (0, react_1.useContext)(LenisContext);
    return lenis;
};
exports.useLenis = useLenis;
const scrollToElement = (target, options) => {
    const lenis = (0, react_1.useContext)(LenisContext);
    if (lenis) {
        lenis.scrollTo(target, {
            offset: options?.offset || 0,
            duration: options?.duration || 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
    }
};
exports.scrollToElement = scrollToElement;
//# sourceMappingURL=scroll-smoother.js.map