'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipLinks = exports.SkipLink = void 0;
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const SkipLink = ({ href, children, className, style }) => {
    return (<framer_motion_1.motion.a href={href} className={`skip-link ${className || ''}`} style={style} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} onFocus={(e) => {
            e.currentTarget.style.top = '6px';
        }} onBlur={(e) => {
            e.currentTarget.style.top = '-40px';
        }}>
      {children}
    </framer_motion_1.motion.a>);
};
exports.SkipLink = SkipLink;
const SkipLinks = ({ targets = [
    { href: '#main-content', label: 'Aller au contenu principal' },
    { href: '#navigation', label: 'Aller à la navigation' },
    { href: '#search', label: 'Aller à la recherche' }
] }) => {
    return (<>
      {targets.map((target, index) => (<exports.SkipLink key={target.href} href={target.href} style={{
                top: '-40px',
                left: '6px',
                transform: `translateY(${index * 4}px)`
            }}>
          {target.label}
        </exports.SkipLink>))}
    </>);
};
exports.SkipLinks = SkipLinks;
//# sourceMappingURL=skip-link.js.map