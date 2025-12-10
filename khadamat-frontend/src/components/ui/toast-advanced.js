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
exports.useToastAdvanced = exports.ToastContainer = exports.ToastAdvanced = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const utils_1 = require("@/lib/utils");
const lucide_react_1 = require("lucide-react");
const toastIcons = {
    success: lucide_react_1.CheckCircle,
    error: lucide_react_1.XCircle,
    warning: lucide_react_1.AlertCircle,
    info: lucide_react_1.Info,
    loading: lucide_react_1.Loader2
};
const toastColors = {
    success: {
        bg: 'bg-green-50 border-green-200',
        icon: 'text-green-600',
        title: 'text-green-800',
        description: 'text-green-700',
        progress: 'bg-green-500'
    },
    error: {
        bg: 'bg-red-50 border-red-200',
        icon: 'text-red-600',
        title: 'text-red-800',
        description: 'text-red-700',
        progress: 'bg-red-500'
    },
    warning: {
        bg: 'bg-yellow-50 border-yellow-200',
        icon: 'text-yellow-600',
        title: 'text-yellow-800',
        description: 'text-yellow-700',
        progress: 'bg-yellow-500'
    },
    info: {
        bg: 'bg-blue-50 border-blue-200',
        icon: 'text-blue-600',
        title: 'text-blue-800',
        description: 'text-blue-700',
        progress: 'bg-blue-500'
    },
    loading: {
        bg: 'bg-gray-50 border-gray-200',
        icon: 'text-gray-600',
        title: 'text-gray-800',
        description: 'text-gray-700',
        progress: 'bg-gray-500'
    }
};
const ToastAdvanced = ({ toast, onRemove, position = 'top-right', className, ...motionProps }) => {
    const [progress, setProgress] = (0, react_1.useState)(100);
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const Icon = toastIcons[toast.type];
    const colors = toastColors[toast.type];
    const duration = toast.duration || 5000;
    (0, react_1.useEffect)(() => {
        if (toast.type === 'loading' || isHovered)
            return;
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, ((duration - elapsed) / duration) * 100);
            setProgress(remaining);
            if (remaining <= 0) {
                onRemove(toast.id);
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, [toast.id, duration, toast.type, isHovered, onRemove]);
    const handleAction = (0, react_1.useCallback)(() => {
        if (toast.action) {
            toast.action.onClick();
            onRemove(toast.id);
        }
    }, [toast.action, onRemove, toast.id]);
    return (<framer_motion_1.motion.div layout initial={{ opacity: 0, y: -50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: 300, scale: 0.95 }} transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            layout: { duration: 0.3 }
        }} className={(0, utils_1.cn)('relative max-w-sm w-full bg-white rounded-2xl shadow-lg border backdrop-blur-sm overflow-hidden', colors.bg, className)} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} {...motionProps}>
      
      {toast.type !== 'loading' && (<framer_motion_1.motion.div className={(0, utils_1.cn)('absolute top-0 left-0 h-1', colors.progress)} initial={{ width: '100%' }} animate={{ width: `${progress}%` }} transition={{ ease: 'linear' }}/>)}

      <div className="p-4">
        <div className="flex items-start space-x-3">
          
          <framer_motion_1.motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 500 }} className={(0, utils_1.cn)('flex-shrink-0 w-6 h-6', colors.icon)}>
            {toast.type === 'loading' ? (<lucide_react_1.Loader2 className="w-6 h-6 animate-spin"/>) : (<Icon className="w-6 h-6"/>)}
          </framer_motion_1.motion.div>

          
          <div className="flex-1 min-w-0">
            <framer_motion_1.motion.h4 className={(0, utils_1.cn)('text-sm font-semibold', colors.title)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              {toast.title}
            </framer_motion_1.motion.h4>

            {toast.description && (<framer_motion_1.motion.p className={(0, utils_1.cn)('text-sm mt-1', colors.description)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                {toast.description}
              </framer_motion_1.motion.p>)}

            
            {toast.action && (<framer_motion_1.motion.button onClick={handleAction} className={(0, utils_1.cn)('mt-3 text-sm font-medium underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded', colors.icon, 'focus:ring-current')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {toast.action.label}
              </framer_motion_1.motion.button>)}
          </div>

          
          <framer_motion_1.motion.button onClick={() => onRemove(toast.id)} className={(0, utils_1.cn)('flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors', 'hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2', colors.icon, 'focus:ring-current')} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Fermer la notification">
            <lucide_react_1.X className="w-4 h-4"/>
          </framer_motion_1.motion.button>
        </div>
      </div>
    </framer_motion_1.motion.div>);
};
exports.ToastAdvanced = ToastAdvanced;
const ToastContainer = ({ toasts, onRemove, position = 'top-right', className }) => {
    const positionClasses = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
        'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
        'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
    };
    return (<div className={(0, utils_1.cn)('fixed z-50 pointer-events-none', positionClasses[position], className)} role="region" aria-label="Notifications">
      <framer_motion_1.AnimatePresence mode="popLayout">
        {toasts.map((toast) => (<div key={toast.id} className="pointer-events-auto mb-3">
            <exports.ToastAdvanced toast={toast} onRemove={onRemove} position={position}/>
          </div>))}
      </framer_motion_1.AnimatePresence>
    </div>);
};
exports.ToastContainer = ToastContainer;
const useToastAdvanced = () => {
    const [toasts, setToasts] = (0, react_1.useState)([]);
    const addToast = (0, react_1.useCallback)((toast) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newToast = { ...toast, id };
        setToasts(prev => [...prev, newToast]);
        if (toast.type !== 'loading' && toast.duration !== 0) {
            setTimeout(() => {
                removeToast(id);
            }, toast.duration || 5000);
        }
        return id;
    }, []);
    const removeToast = (0, react_1.useCallback)((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);
    const clearAll = (0, react_1.useCallback)(() => {
        setToasts([]);
    }, []);
    const success = (0, react_1.useCallback)((title, description, options) => {
        return addToast({ type: 'success', title, description, ...options });
    }, [addToast]);
    const error = (0, react_1.useCallback)((title, description, options) => {
        return addToast({ type: 'error', title, description, ...options });
    }, [addToast]);
    const warning = (0, react_1.useCallback)((title, description, options) => {
        return addToast({ type: 'warning', title, description, ...options });
    }, [addToast]);
    const info = (0, react_1.useCallback)((title, description, options) => {
        return addToast({ type: 'info', title, description, ...options });
    }, [addToast]);
    const loading = (0, react_1.useCallback)((title, description, options) => {
        return addToast({ type: 'loading', title, description, ...options });
    }, [addToast]);
    return {
        toasts,
        addToast,
        removeToast,
        clearAll,
        success,
        error,
        warning,
        info,
        loading
    };
};
exports.useToastAdvanced = useToastAdvanced;
//# sourceMappingURL=toast-advanced.js.map