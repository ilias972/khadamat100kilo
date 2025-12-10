'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollSmootherProvider = void 0;
const react_1 = require("react");
const gsap_1 = require("gsap");
const ScrollSmoother_1 = require("gsap/ScrollSmoother");
const ScrollTrigger_1 = require("gsap/ScrollTrigger");
gsap_1.gsap.registerPlugin(ScrollSmoother_1.ScrollSmoother, ScrollTrigger_1.ScrollTrigger);
const ScrollSmootherProvider = ({ children }) => {
    const smootherRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const ctx = gsap_1.gsap.context(() => {
            smootherRef.current = ScrollSmoother_1.ScrollSmoother.create({
                wrapper: '#smooth-wrapper',
                content: '#smooth-content',
                smooth: 1.5,
                effects: true,
                normalizeScroll: true,
                ignoreMobileResize: true,
            });
        });
        return () => {
            if (smootherRef.current) {
                smootherRef.current.kill();
            }
            ctx.revert();
        };
    }, []);
    return (<div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>);
};
exports.ScrollSmootherProvider = ScrollSmootherProvider;
exports.default = exports.ScrollSmootherProvider;
//# sourceMappingURL=scroll-smoother.js.map