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
exports.useFeedback = exports.PulseIndicator = exports.LoadingSpinner = exports.SuccessCheckmark = exports.InlineFeedback = exports.FeedbackSystem = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const utils_1 = require("@/lib/utils");
const lucide_react_1 = require("lucide-react");
const FeedbackMessage = ({ message, onRemove, position }) => {
    const [progress, setProgress] = (0, react_1.useState)(100);
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const icons = {
        success: lucide_react_1.CheckCircle,
        error: lucide_react_1.XCircle,
        warning: lucide_react_1.AlertTriangle,
        info: lucide_react_1.Info,
        loading: lucide_react_1.Loader2
    };
    const colors = {
        success: {
            bg: 'bg-green-50 border-green-200',
            icon: 'text-green-600',
            title: 'text-green-800',
            message: 'text-green-700',
            progress: 'bg-green-500'
        },
        error: {
            bg: 'bg-red-50 border-red-200',
            icon: 'text-red-600',
            title: 'text-red-800',
            message: 'text-red-700',
            progress: 'bg-red-500'
        },
        warning: {
            bg: 'bg-yellow-50 border-yellow-200',
            icon: 'text-yellow-600',
            title: 'text-yellow-800',
            message: 'text-yellow-700',
            progress: 'bg-yellow-500'
        },
        info: {
            bg: 'bg-blue-50 border-blue-200',
            icon: 'text-blue-600',
            title: 'text-blue-800',
            message: 'text-blue-700',
            progress: 'bg-blue-500'
        },
        loading: {
            bg: 'bg-gray-50 border-gray-200',
            icon: 'text-gray-600',
            title: 'text-gray-800',
            message: 'text-gray-700',
            progress: 'bg-gray-500'
        }
    };
    const Icon = icons[message.type];
    const colorScheme = colors[message.type];
    (0, react_1.useEffect)(() => {
        if (message.type === 'loading' || isHovered || message.duration === 0)
            return;
        const startTime = Date.now();
        const duration = message.duration || 4000;
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, ((duration - elapsed) / duration) * 100);
            setProgress(remaining);
            if (remaining <= 0) {
                onRemove(message.id);
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, [message.id, message.type, message.duration, isHovered, onRemove]);
    const handleAction = () => {
        if (message.action) {
            message.action.onClick();
            onRemove(message.id);
        }
    };
    const isInline = position === 'inline';
    return (<framer_motion_1.motion.div layout initial={{ opacity: 0, y: isInline ? 0 : -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: 300, scale: 0.95 }} transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            layout: { duration: 0.3 }
        }} className={(0, utils_1.cn)('relative rounded-2xl border backdrop-blur-sm shadow-lg overflow-hidden', colorScheme.bg, isInline ? 'w-full' : 'max-w-sm w-full')} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      
      {message.type !== 'loading' && message.duration !== 0 && (<framer_motion_1.motion.div className={(0, utils_1.cn)('absolute top-0 left-0 h-1', colorScheme.progress)} initial={{ width: '100%' }} animate={{ width: `${progress}%` }} transition={{ ease: 'linear' }}/>)}

      <div className="p-4">
        <div className="flex items-start space-x-3">
          
          <framer_motion_1.motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 500 }} className={(0, utils_1.cn)('flex-shrink-0', colorScheme.icon)}>
            {message.type === 'loading' ? (<lucide_react_1.Loader2 className="w-5 h-5 animate-spin"/>) : (<Icon className="w-5 h-5"/>)}
          </framer_motion_1.motion.div>

          
          <div className="flex-1 min-w-0">
            <framer_motion_1.motion.h4 className={(0, utils_1.cn)('text-sm font-semibold', colorScheme.title)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              {message.title}
            </framer_motion_1.motion.h4>

            {message.message && (<framer_motion_1.motion.p className={(0, utils_1.cn)('text-sm mt-1', colorScheme.message)} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                {message.message}
              </framer_motion_1.motion.p>)}

            
            {message.action && (<framer_motion_1.motion.button onClick={handleAction} className={(0, utils_1.cn)('mt-3 text-sm font-medium underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded', colorScheme.icon, 'focus:ring-current')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                {message.action.label}
              </framer_motion_1.motion.button>)}
          </div>

          
          <framer_motion_1.motion.button onClick={() => onRemove(message.id)} className={(0, utils_1.cn)('flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-colors', 'hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2', colorScheme.icon, 'focus:ring-current')} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Fermer la notification">
            <lucide_react_1.X className="w-4 h-4"/>
          </framer_motion_1.motion.button>
        </div>
      </div>
    </framer_motion_1.motion.div>);
};
const FeedbackSystem = ({ messages, onRemove, position = 'top', maxMessages = 5, className }) => {
    const displayMessages = messages.slice(0, maxMessages);
    const positionClasses = {
        top: 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
        bottom: 'fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50',
        inline: 'relative w-full space-y-3'
    };
    if (position === 'inline') {
        return (<div className={(0, utils_1.cn)('w-full', className)}>
        <framer_motion_1.AnimatePresence mode="popLayout">
          {displayMessages.map((message) => (<div key={message.id} className="w-full">
              <FeedbackMessage message={message} onRemove={onRemove} position={position}/>
            </div>))}
        </framer_motion_1.AnimatePresence>
      </div>);
    }
    return (<div className={(0, utils_1.cn)(positionClasses[position], className)}>
      <div className="flex flex-col space-y-3 items-center">
        <framer_motion_1.AnimatePresence mode="popLayout">
          {displayMessages.map((message) => (<FeedbackMessage key={message.id} message={message} onRemove={onRemove} position={position}/>))}
        </framer_motion_1.AnimatePresence>
      </div>
    </div>);
};
exports.FeedbackSystem = FeedbackSystem;
const InlineFeedback = ({ type, message, show, className, ...motionProps }) => {
    const icons = {
        success: lucide_react_1.CheckCircle,
        error: lucide_react_1.XCircle,
        warning: lucide_react_1.AlertTriangle,
        info: lucide_react_1.Info,
        loading: lucide_react_1.Loader2
    };
    const colors = {
        success: 'text-green-600 bg-green-50 border-green-200',
        error: 'text-red-600 bg-red-50 border-red-200',
        warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
        info: 'text-blue-600 bg-blue-50 border-blue-200',
        loading: 'text-gray-600 bg-gray-50 border-gray-200'
    };
    const Icon = icons[type];
    return (<framer_motion_1.AnimatePresence>
      {show && (<framer_motion_1.motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 8 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.2, ease: "easeOut" }} className={(0, utils_1.cn)('flex items-center space-x-2 px-3 py-2 rounded-lg border text-sm', colors[type], className)} {...motionProps}>
          {type === 'loading' ? (<lucide_react_1.Loader2 className="w-4 h-4 animate-spin flex-shrink-0"/>) : (<Icon className="w-4 h-4 flex-shrink-0"/>)}
          <span>{message}</span>
        </framer_motion_1.motion.div>)}
    </framer_motion_1.AnimatePresence>);
};
exports.InlineFeedback = InlineFeedback;
const SuccessCheckmark = ({ size = 24, className }) => (<framer_motion_1.motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className={(0, utils_1.cn)('rounded-full bg-green-500 p-1', className)}>
    <framer_motion_1.motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
      <lucide_react_1.Check className="w-4 h-4 text-white"/>
    </framer_motion_1.motion.div>
  </framer_motion_1.motion.div>);
exports.SuccessCheckmark = SuccessCheckmark;
const LoadingSpinner = ({ size = 'md', color = 'text-primary-500', className }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };
    return (<framer_motion_1.motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className={(0, utils_1.cn)('border-2 border-t-transparent rounded-full', color, sizes[size], className)}/>);
};
exports.LoadingSpinner = LoadingSpinner;
const PulseIndicator = ({ color = 'bg-red-500', size = 'md', className }) => {
    const sizes = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    };
    return (<framer_motion_1.motion.div animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1]
        }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }} className={(0, utils_1.cn)('rounded-full', color, sizes[size], className)}/>);
};
exports.PulseIndicator = PulseIndicator;
const useFeedback = () => {
    const [messages, setMessages] = (0, react_1.useState)([]);
    const addMessage = (0, react_1.useCallback)((message) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newMessage = { ...message, id };
        setMessages(prev => [newMessage, ...prev]);
        if (message.type !== 'loading' && message.duration !== 0) {
            setTimeout(() => {
                removeMessage(id);
            }, message.duration || 4000);
        }
        return id;
    }, []);
    const removeMessage = (0, react_1.useCallback)((id) => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
    }, []);
    const clearAll = (0, react_1.useCallback)(() => {
        setMessages([]);
    }, []);
    const success = (0, react_1.useCallback)((title, message, options) => {
        return addMessage({ type: 'success', title, message, ...options });
    }, [addMessage]);
    const error = (0, react_1.useCallback)((title, message, options) => {
        return addMessage({ type: 'error', title, message, ...options });
    }, [addMessage]);
    const warning = (0, react_1.useCallback)((title, message, options) => {
        return addMessage({ type: 'warning', title, message, ...options });
    }, [addMessage]);
    const info = (0, react_1.useCallback)((title, message, options) => {
        return addMessage({ type: 'info', title, message, ...options });
    }, [addMessage]);
    const loading = (0, react_1.useCallback)((title, message, options) => {
        return addMessage({ type: 'loading', title, message, ...options });
    }, [addMessage]);
    return {
        messages,
        addMessage,
        removeMessage,
        clearAll,
        success,
        error,
        warning,
        info,
        loading
    };
};
exports.useFeedback = useFeedback;
//# sourceMappingURL=feedback-system.js.map