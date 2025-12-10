'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlassContainer = void 0;
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const utils_1 = require("@/lib/utils");
const animations_1 = require("@/lib/animations");
const GlassContainer = ({ children, className, padding = 'lg', intensity = 'medium', animated = false, reveal = false, ...motionProps }) => {
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-12'
    };
    const intensityClasses = {
        light: 'bg-[rgba(250,247,242,0.6)] backdrop-blur-sm',
        medium: 'bg-[rgba(250,247,242,0.8)] backdrop-blur-md',
        strong: 'bg-[rgba(255,255,255,0.9)] backdrop-blur-lg'
    };
    const getAnimationProps = () => {
        if (reveal) {
            return animations_1.scrollAnimations.reveal;
        }
        if (animated) {
            return animations_1.entranceAnimations.scaleIn;
        }
        return {};
    };
    return (<framer_motion_1.motion.div className={(0, utils_1.cn)('rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06),0_0_40px_rgba(249,123,34,0.1)] border border-white/20 relative overflow-hidden', intensityClasses[intensity], paddingClasses[padding], className)} {...getAnimationProps()} {...motionProps}>
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 rounded-[24px]"/>

      
      <framer_motion_1.motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0" whileHover={{ opacity: 1 }} initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}/>

      
      <div className="relative z-10">
        {children}
      </div>
    </framer_motion_1.motion.div>);
};
exports.GlassContainer = GlassContainer;
//# sourceMappingURL=glass-container.js.map