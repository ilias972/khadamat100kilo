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
exports.PremiumTooltip = exports.HelpTooltip = exports.InfoTooltip = exports.TooltipGroup = exports.TooltipAdvanced = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const utils_1 = require("@/lib/utils");
const TooltipAdvanced = ({ content, children, position = 'auto', delay = 300, disabled = false, maxWidth = 200, variant = 'default', showArrow = true, interactive = false, className, ...motionProps }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const [actualPosition, setActualPosition] = (0, react_1.useState)('top');
    const [coords, setCoords] = (0, react_1.useState)({ x: 0, y: 0 });
    const triggerRef = (0, react_1.useRef)(null);
    const tooltipRef = (0, react_1.useRef)(null);
    const timeoutRef = (0, react_1.useRef)(null);
    const calculatePosition = () => {
        if (!triggerRef.current || !tooltipRef.current)
            return;
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        let finalPosition = position;
        if (position === 'auto') {
            const spaceTop = triggerRect.top;
            const spaceBottom = viewport.height - triggerRect.bottom;
            const spaceLeft = triggerRect.left;
            const spaceRight = viewport.width - triggerRect.right;
            const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight);
            if (maxSpace === spaceTop)
                finalPosition = 'top';
            else if (maxSpace === spaceBottom)
                finalPosition = 'bottom';
            else if (maxSpace === spaceLeft)
                finalPosition = 'left';
            else
                finalPosition = 'right';
        }
        let x = 0;
        let y = 0;
        switch (finalPosition) {
            case 'top':
                x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
                y = triggerRect.top - tooltipRect.height - 8;
                break;
            case 'bottom':
                x = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
                y = triggerRect.bottom + 8;
                break;
            case 'left':
                x = triggerRect.left - tooltipRect.width - 8;
                y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
                break;
            case 'right':
                x = triggerRect.right + 8;
                y = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
                break;
        }
        x = Math.max(8, Math.min(x, viewport.width - tooltipRect.width - 8));
        y = Math.max(8, Math.min(y, viewport.height - tooltipRect.height - 8));
        setCoords({ x, y });
        setActualPosition(finalPosition);
    };
    const showTooltip = () => {
        if (disabled)
            return;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            setTimeout(calculatePosition, 0);
        }, delay);
    };
    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (interactive) {
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 150);
        }
        else {
            setIsVisible(false);
        }
    };
    const handleTooltipMouseEnter = () => {
        if (interactive && timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };
    const handleTooltipMouseLeave = () => {
        if (interactive) {
            hideTooltip();
        }
    };
    (0, react_1.useEffect)(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    (0, react_1.useEffect)(() => {
        if (!isVisible)
            return;
        const handleResize = () => calculatePosition();
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleResize);
        };
    }, [isVisible]);
    const variantClasses = {
        default: 'bg-gray-900 text-white border-gray-700',
        premium: 'bg-white text-gray-900 border-gray-200 shadow-xl',
        minimal: 'bg-gray-800 text-white border-gray-600'
    };
    const arrowVariants = {
        top: 'bottom-[-4px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
        bottom: 'top-[-4px] left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
        left: 'right-[-4px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
        right: 'left-[-4px] top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent'
    };
    return (<>
      
      <div ref={triggerRef} onMouseEnter={showTooltip} onMouseLeave={hideTooltip} onFocus={showTooltip} onBlur={hideTooltip} className="inline-block">
        {children}
      </div>

      
      <framer_motion_1.AnimatePresence>
        {isVisible && (<framer_motion_1.motion.div ref={tooltipRef} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.15, ease: "easeOut" }} className={(0, utils_1.cn)('fixed z-50 px-3 py-2 text-sm rounded-lg border pointer-events-auto', 'font-medium shadow-lg backdrop-blur-sm', variantClasses[variant], className)} style={{
                left: coords.x,
                top: coords.y,
                maxWidth: maxWidth
            }} onMouseEnter={handleTooltipMouseEnter} onMouseLeave={handleTooltipMouseLeave} role="tooltip" {...motionProps}>
            {content}

            
            {showArrow && (<div className={(0, utils_1.cn)('absolute w-0 h-0 border-4', arrowVariants[actualPosition], variant === 'premium'
                    ? 'border-gray-200'
                    : variant === 'minimal'
                        ? 'border-gray-600'
                        : 'border-gray-700')} style={{
                    [actualPosition]: '-4px'
                }}/>)}
          </framer_motion_1.motion.div>)}
      </framer_motion_1.AnimatePresence>
    </>);
};
exports.TooltipAdvanced = TooltipAdvanced;
const TooltipGroup = ({ children, delay = 300 }) => {
    return (<div className="tooltip-group">
      {react_1.default.Children.map(children, (child) => {
            if (react_1.default.isValidElement(child) && child.type === exports.TooltipAdvanced) {
                return react_1.default.cloneElement(child, {
                    delay: delay
                });
            }
            return child;
        })}
    </div>);
};
exports.TooltipGroup = TooltipGroup;
const InfoTooltip = (props) => (<exports.TooltipAdvanced {...props} content="ℹ️ Cliquez pour plus d'informations" variant="minimal"/>);
exports.InfoTooltip = InfoTooltip;
const HelpTooltip = (props) => (<exports.TooltipAdvanced {...props} content="❓ Aide et assistance" variant="premium" interactive/>);
exports.HelpTooltip = HelpTooltip;
const PremiumTooltip = (props) => (<exports.TooltipAdvanced {...props} content="⭐ Fonctionnalité premium" variant="premium" position="top"/>);
exports.PremiumTooltip = PremiumTooltip;
//# sourceMappingURL=tooltip-advanced.js.map