'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const utils_1 = require("@/lib/utils");
const animations_1 = require("@/lib/animations");
const Button = ({ variant = 'primary', size = 'md', loading = false, fullWidth = false, premium = false, children, className, ...props }) => {
    const [ripples, setRipples] = react_1.default.useState([]);
    const handleClick = (event) => {
        if (loading || props.disabled)
            return;
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const newRipple = { id: Date.now(), x, y };
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 600);
        props.onClick?.(event);
    };
    const getAccessibleLabel = () => {
        if (props['aria-label'])
            return props['aria-label'];
        if (typeof children === 'string')
            return children;
        return 'Button';
    };
    const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';
    const variantClasses = {
        primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 shadow-sm hover:shadow-md',
        secondary: 'bg-secondary-500 hover:bg-secondary-600 text-text-primary focus:ring-secondary-500 shadow-sm hover:shadow-md',
        ghost: 'bg-transparent hover:bg-surface text-text-primary focus:ring-border-medium',
        danger: 'bg-error-500 hover:bg-error-600 text-white focus:ring-error-500 shadow-sm hover:shadow-md',
        outline: 'border border-border-light bg-transparent hover:bg-surface text-text-primary focus:ring-border-medium hover:border-primary-300',
        premium: 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-lg hover:shadow-xl focus:ring-primary-500 cta-premium',
    };
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm rounded-2xl',
        md: 'px-4 py-2 text-base rounded-2xl',
        lg: 'px-6 py-3 text-lg rounded-2xl',
    };
    const animationProps = premium
        ? animations_1.microInteractions.ctaBounce
        : animations_1.componentAnimations.button.hover;
    return (<framer_motion_1.motion.button className={(0, utils_1.cn)(baseClasses, variantClasses[variant], sizeClasses[size], fullWidth && 'w-full', premium && 'font-semibold tracking-wide', className)} disabled={loading || props.disabled} onClick={handleClick} {...animationProps} aria-label={getAccessibleLabel()} aria-disabled={loading || props.disabled} aria-describedby={loading ? 'button-loading' : undefined} role="button" tabIndex={props.disabled ? -1 : 0} onFocus={(e) => {
            e.currentTarget.style.outline = '2px solid #F97B22';
            e.currentTarget.style.outlineOffset = '2px';
        }} onBlur={(e) => {
            e.currentTarget.style.outline = '';
            e.currentTarget.style.outlineOffset = '';
        }} {...props}>
      
      {ripples.map(ripple => (<framer_motion_1.motion.span key={ripple.id} className="absolute bg-white/40 rounded-full" style={{
                left: ripple.x - 10,
                top: ripple.y - 10,
                width: 20,
                height: 20,
            }} initial={{ scale: 0, opacity: 1 }} animate={{ scale: 4, opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}/>))}

      
      {premium && !loading && (<framer_motion_1.motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6, ease: "easeInOut" }}/>)}

      
      {loading && (<>
          <framer_motion_1.motion.svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </framer_motion_1.motion.svg>
          
          <span id="button-loading" className="sr-only" aria-live="polite">
            Chargement en cours
          </span>
        </>)}

      
      <framer_motion_1.motion.span initial={{ opacity: 1 }} animate={{ opacity: loading ? 0.7 : 1 }} transition={{ duration: 0.2 }}>
        {children}
      </framer_motion_1.motion.span>
    </framer_motion_1.motion.button>);
};
exports.Button = Button;
//# sourceMappingURL=button.js.map