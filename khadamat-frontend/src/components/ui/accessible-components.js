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
exports.AccessibleModal = exports.AccessibleInput = exports.AccessibleButton = void 0;
exports.useEnhancedFocus = useEnhancedFocus;
exports.SkipNav = SkipNav;
exports.useScreenReader = useScreenReader;
const react_1 = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
exports.AccessibleButton = react_1.default.forwardRef(({ className, variant = 'default', size = 'md', loading = false, children, leftIcon, rightIcon, tooltip, id, disabled, ...props }, ref) => {
    const [isFocused, setIsFocused] = (0, react_1.useState)(false);
    const buttonRef = (0, react_1.useRef)(null);
    const variants = {
        default: 'bg-[#F97B22] hover:bg-[#e66a1f] text-white focus:bg-[#e66a1f]',
        outline: 'border border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10 focus:bg-[#F97B22]/20',
        ghost: 'text-text-secondary hover:text-text-primary hover:bg-[#F97B22]/10 focus:bg-[#F97B22]/20',
        destructive: 'bg-red-500 hover:bg-red-600 text-white focus:bg-red-600'
    };
    const sizes = {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base'
    };
    const handleFocus = () => {
        setIsFocused(true);
        if (buttonRef.current) {
            buttonRef.current.style.outline = '2px solid #F97B22';
            buttonRef.current.style.outlineOffset = '2px';
        }
    };
    const handleBlur = () => {
        setIsFocused(false);
        if (buttonRef.current) {
            buttonRef.current.style.outline = 'none';
        }
    };
    const baseClasses = (0, utils_1.cn)('relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200', 'focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:ring-offset-2', 'disabled:opacity-50 disabled:cursor-not-allowed', 'active:scale-95', 'min-h-[44px] min-w-[44px]', variants[variant], sizes[size], className);
    return (<button ref={buttonRef} id={id} className={baseClasses} disabled={disabled || loading} onFocus={handleFocus} onBlur={handleBlur} aria-label={props['aria-label']} aria-describedby={tooltip ? `${id}-tooltip` : undefined} aria-expanded={props['aria-expanded']} aria-haspopup={props['aria-haspopup']} data-loading={loading} {...props}>
        {loading && (<div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"/>
          </div>)}
        
        <span className={(0, utils_1.cn)('flex items-center space-x-2', loading && 'opacity-0')}>
          {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </span>

        {tooltip && (<div id={`${id}-tooltip`} role="tooltip" className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap" aria-hidden="true">
            {tooltip}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"/>
          </div>)}
      </button>);
});
exports.AccessibleButton.displayName = 'AccessibleButton';
function useEnhancedFocus() {
    const [focusedElement, setFocusedElement] = (0, react_1.useState)(null);
    const [focusHistory, setFocusHistory] = (0, react_1.useState)([]);
    const focusElement = (element) => {
        if (element) {
            setFocusedElement(element);
            element.focus({ preventScroll: true });
            setFocusHistory(prev => {
                const newHistory = prev.filter(el => el !== element);
                newHistory.push(element);
                return newHistory.slice(-5);
            });
        }
    };
    const restoreFocus = () => {
        if (focusHistory.length > 1) {
            const previousElement = focusHistory[focusHistory.length - 2];
            focusElement(previousElement);
            setFocusHistory(prev => prev.slice(0, -1));
        }
    };
    const trapFocus = (container) => {
        const focusableElements = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const handleKeyDown = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                }
                else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
            if (e.key === 'Escape') {
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        if (firstElement) {
            firstElement.focus();
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    };
    return {
        focusedElement,
        focusElement,
        restoreFocus,
        trapFocus
    };
}
function SkipNav() {
    return (<a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#F97B22] text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:ring-offset-2">
      Aller au contenu principal
    </a>);
}
exports.AccessibleInput = react_1.default.forwardRef(({ label, error, helperText, leftIcon, rightIcon, required, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const handleFocus = (e) => {
        e.target.style.outline = '2px solid #F97B22';
        e.target.style.outlineOffset = '2px';
    };
    const handleBlur = (e) => {
        e.target.style.outline = 'none';
    };
    return (<div className="space-y-2">
        {label && (<label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
            {label}
            {required && (<span className="text-red-500 ml-1" aria-label="obligatoire">*</span>)}
          </label>)}
        
        <div className="relative">
          {leftIcon && (<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-text-muted" aria-hidden="true">{leftIcon}</span>
            </div>)}
          
          <input ref={ref} id={inputId} className={(0, utils_1.cn)('w-full px-3 py-2 border rounded-lg bg-white text-text-primary placeholder-text-muted', 'focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-[#F97B22]', 'disabled:opacity-50 disabled:cursor-not-allowed', 'min-h-[44px]', leftIcon && 'pl-10', rightIcon && 'pr-10', error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-border-light focus:ring-[#F97B22] focus:border-[#F97B22]', className)} aria-invalid={error ? 'true' : 'false'} aria-describedby={(0, utils_1.cn)(errorId, helperId)} aria-required={required} onFocus={handleFocus} onBlur={handleBlur} {...props}/>
          
          {rightIcon && (<div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-text-muted" aria-hidden="true">{rightIcon}</span>
            </div>)}
        </div>
        
        {error && (<p id={errorId} className="text-sm text-red-600" role="alert" aria-live="polite">
            {error}
          </p>)}
        
        {helperText && !error && (<p id={helperId} className="text-sm text-text-secondary">
            {helperText}
          </p>)}
      </div>);
});
exports.AccessibleInput.displayName = 'AccessibleInput';
const AccessibleModal = ({ isOpen, onClose, title, children, size = 'md', ariaLabel }) => {
    const modalRef = (0, react_1.useRef)(null);
    const { trapFocus, restoreFocus } = useEnhancedFocus();
    (0, react_1.useEffect)(() => {
        if (isOpen && modalRef.current) {
            const cleanup = trapFocus(modalRef.current);
            const firstFocusable = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (firstFocusable) {
                firstFocusable.focus();
            }
            return cleanup;
        }
    }, [isOpen, trapFocus]);
    (0, react_1.useEffect)(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description">
      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true"/>
      
      
      <div ref={modalRef} className={(0, utils_1.cn)('relative bg-white rounded-[24px] shadow-xl max-h-[90vh] overflow-auto', 'focus:outline-none', sizes[size])} tabIndex={-1}>
        
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 id="modal-title" className="text-xl font-bold text-text-primary">
            {title}
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#F97B22]/10 focus:outline-none focus:ring-2 focus:ring-[#F97B22]" aria-label="Fermer la modale">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        
        <div id="modal-description" className="p-6">
          {children}
        </div>
      </div>
    </div>);
};
exports.AccessibleModal = AccessibleModal;
function useScreenReader() {
    const announce = (message, priority = 'polite') => {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', priority);
        announcement.setAttribute('aria-atomic', 'true');
        announcement.setAttribute('class', 'sr-only');
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    };
    return { announce };
}
//# sourceMappingURL=accessible-components.js.map