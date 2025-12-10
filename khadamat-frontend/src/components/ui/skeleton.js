'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingOverlay = exports.SkeletonGrid = exports.SkeletonList = exports.SkeletonCard = exports.Skeleton = void 0;
const react_1 = __importDefault(require("react"));
const framer_motion_1 = require("framer-motion");
const utils_1 = require("@/lib/utils");
const Skeleton = ({ className, variant = 'default', animated = true, lines = 1 }) => {
    const baseClasses = 'bg-gradient-to-r from-surface via-surface/50 to-surface';
    const variantClasses = {
        default: 'h-4 w-full rounded-lg',
        card: 'h-32 w-full rounded-3xl',
        text: 'h-4 rounded',
        avatar: 'h-10 w-10 rounded-full',
        button: 'h-10 w-24 rounded-2xl'
    };
    if (variant === 'text' && lines > 1) {
        return (<div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (<framer_motion_1.motion.div key={index} className={(0, utils_1.cn)(baseClasses, variantClasses.text, index === lines - 1 ? 'w-3/4' : 'w-full', className)} animate={animated ? {
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                } : undefined} transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.1
                }} style={{
                    backgroundSize: '200% 100%'
                }}/>))}
      </div>);
    }
    return (<framer_motion_1.motion.div className={(0, utils_1.cn)(baseClasses, variantClasses[variant], className)} animate={animated ? {
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        } : undefined} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }} style={{
            backgroundSize: '200% 100%'
        }}/>);
};
exports.Skeleton = Skeleton;
const SkeletonCard = ({ className }) => (<div className={(0, utils_1.cn)('p-6 bg-surface rounded-3xl space-y-4', className)}>
    <exports.Skeleton variant="avatar" className="w-12 h-12"/>
    <div className="space-y-2">
      <exports.Skeleton variant="text" className="w-3/4"/>
      <exports.Skeleton variant="text" className="w-1/2"/>
    </div>
    <exports.Skeleton variant="button"/>
  </div>);
exports.SkeletonCard = SkeletonCard;
const SkeletonList = ({ count = 3, className }) => (<div className={(0, utils_1.cn)('space-y-4', className)}>
    {Array.from({ length: count }).map((_, index) => (<framer_motion_1.motion.div key={index} className="flex items-center space-x-4 p-4 bg-surface rounded-2xl" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
        <exports.Skeleton variant="avatar"/>
        <div className="flex-1 space-y-2">
          <exports.Skeleton variant="text" className="w-3/4"/>
          <exports.Skeleton variant="text" className="w-1/2"/>
        </div>
      </framer_motion_1.motion.div>))}
  </div>);
exports.SkeletonList = SkeletonList;
const SkeletonGrid = ({ count = 6, className }) => (<div className={(0, utils_1.cn)('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
    {Array.from({ length: count }).map((_, index) => (<framer_motion_1.motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }}>
        <exports.SkeletonCard />
      </framer_motion_1.motion.div>))}
  </div>);
exports.SkeletonGrid = SkeletonGrid;
const LoadingOverlay = ({ children, loading = false, className }) => (<div className={(0, utils_1.cn)('relative', className)}>
    {children}
    {loading && (<framer_motion_1.motion.div className="absolute inset-0 bg-surface/80 backdrop-blur-sm rounded-3xl flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <framer_motion_1.motion.div className="flex flex-col items-center space-y-4" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
          <framer_motion_1.motion.div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}/>
          <p className="text-sm text-text-secondary">Chargement...</p>
        </framer_motion_1.motion.div>
      </framer_motion_1.motion.div>)}
  </div>);
exports.LoadingOverlay = LoadingOverlay;
//# sourceMappingURL=skeleton.js.map