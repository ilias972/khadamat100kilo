"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
const react_1 = __importDefault(require("react"));
const utils_1 = require("@/lib/utils");
const Badge = ({ variant = 'default', size = 'md', className, children, ...props }) => {
    const variantClasses = {
        default: 'bg-surface text-text-primary border border-border-light',
        primary: 'bg-primary-500 text-white',
        secondary: 'bg-secondary-500 text-white',
        success: 'bg-success-500 text-white',
        warning: 'bg-warning-500 text-white',
        error: 'bg-error-500 text-white',
        info: 'bg-info-500 text-white',
        verified: 'bg-success-500 text-white',
        'pro-verified': 'bg-warning-500 text-text-primary',
        'client-verified': 'bg-success-100 text-success-700',
    };
    const sizeClasses = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-2.5 py-1 text-sm',
        lg: 'px-3 py-1.5 text-base',
    };
    return (<span className={(0, utils_1.cn)('inline-flex items-center font-medium rounded-full', variantClasses[variant], sizeClasses[size], className)} {...props}>
      {children}
    </span>);
};
exports.Badge = Badge;
//# sourceMappingURL=badge.js.map