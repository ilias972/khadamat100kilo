'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const utils_1 = require("@/lib/utils");
const animations_1 = require("@/lib/animations");
const Card = ({ children, className, hover = false, padding = 'md', interactive = false, premium = false, glow = false, ...motionProps }) => {
    const paddingClasses = {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };
    const getAnimationProps = () => {
        if (premium) {
            return {
                whileHover: {
                    scale: 1.02,
                    y: -4,
                    rotateX: 2,
                    rotateY: 1,
                    boxShadow: "0 20px 40px rgba(249, 123, 34, 0.15), 0 0 20px rgba(249, 123, 34, 0.1)"
                },
                whileTap: { scale: 0.98 },
                transition: { type: "spring", stiffness: 300, damping: 30 }
            };
        }
        if (interactive) {
            return animations_1.microInteractions.cardTilt;
        }
        if (hover) {
            return animations_1.componentAnimations.card;
        }
        return {};
    };
    const cardClasses = (0, utils_1.cn)('bg-surface rounded-3xl shadow-card relative overflow-hidden', hover && 'cursor-pointer', premium && 'border border-primary-100/50', glow && 'hover-glow', paddingClasses[padding], className);
    return (<framer_motion_1.motion.div className={cardClasses} {...getAnimationProps()} {...motionProps}>
      
      {premium && (<framer_motion_1.motion.div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/20 via-transparent to-primary-500/20 opacity-0" whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }}/>)}

      
      {premium && (<framer_motion_1.motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full" animate={{
                translateX: ['0%', '200%'],
            }} transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut"
            }}/>)}

      
      <framer_motion_1.motion.div className="relative z-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
        {children}
      </framer_motion_1.motion.div>
    </framer_motion_1.motion.div>);
};
exports.Card = Card;
//# sourceMappingURL=card.js.map