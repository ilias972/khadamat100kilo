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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuickActions = exports.QuickActions = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const link_1 = __importDefault(require("next/link"));
const lucide_react_1 = require("lucide-react");
const QuickActions = ({ context = 'home', user, className }) => {
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(false);
    const [visibleActions, setVisibleActions] = (0, react_1.useState)([]);
    const [isMinimized, setIsMinimized] = (0, react_1.useState)(false);
    const mouseX = (0, framer_motion_1.useMotionValue)(0);
    const mouseY = (0, framer_motion_1.useMotionValue)(0);
    const rotateX = (0, framer_motion_1.useTransform)(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = (0, framer_motion_1.useTransform)(mouseX, [-0.5, 0.5], [-10, 10]);
    const allActions = [
        {
            id: 'search',
            label: 'Rechercher',
            icon: lucide_react_1.Search,
            href: '/services',
            color: 'text-primary-600',
            bgColor: 'bg-primary-500',
            priority: 10,
            context: 'home'
        },
        {
            id: 'book',
            label: 'Réserver',
            icon: lucide_react_1.Plus,
            href: '/services',
            color: 'text-white',
            bgColor: 'bg-primary-500',
            priority: 9,
            context: 'services'
        },
        {
            id: 'favorites',
            label: 'Favoris',
            icon: lucide_react_1.Heart,
            href: user ? '/dashboard/client/favorites' : '/auth/login',
            color: 'text-error-600',
            bgColor: 'bg-error-500',
            priority: 8,
            context: 'dashboard'
        },
        {
            id: 'messages',
            label: 'Messages',
            icon: lucide_react_1.MessageSquare,
            href: user ? '/dashboard/client/messages' : '/auth/login',
            color: 'text-success-600',
            bgColor: 'bg-success-500',
            priority: 7,
            context: 'dashboard'
        },
        {
            id: 'location',
            label: 'Carte',
            icon: lucide_react_1.MapPin,
            href: '/services?view=map',
            color: 'text-info-600',
            bgColor: 'bg-info-500',
            priority: 6,
            context: 'services'
        },
        {
            id: 'support',
            label: 'Support',
            icon: lucide_react_1.Phone,
            href: '/contact',
            color: 'text-warning-600',
            bgColor: 'bg-warning-500',
            priority: 5
        }
    ];
    (0, react_1.useEffect)(() => {
        const contextActions = allActions.filter(action => !action.context || action.context === context);
        const sortedActions = contextActions
            .sort((a, b) => b.priority - a.priority)
            .slice(0, 4);
        setVisibleActions(sortedActions);
    }, [context, user]);
    (0, react_1.useEffect)(() => {
        const timer = setTimeout(() => {
            if (isExpanded) {
                setIsExpanded(false);
                setTimeout(() => setIsMinimized(true), 300);
            }
        }, 10000);
        return () => clearTimeout(timer);
    }, [isExpanded]);
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };
    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };
    if (visibleActions.length === 0)
        return null;
    return (<framer_motion_1.motion.div className={`fixed bottom-6 right-6 z-50 ${className}`} initial={{ scale: 0, opacity: 0 }} animate={{
            scale: isMinimized ? 0.8 : 1,
            opacity: isMinimized ? 0.7 : 1
        }} transition={{ type: "spring", stiffness: 300, damping: 30 }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{
            perspective: 1000,
            transformStyle: "preserve-3d"
        }}>
      <framer_motion_1.AnimatePresence>
        {isExpanded && (<framer_motion_1.motion.div className="absolute bottom-16 right-0 flex flex-col space-y-3" initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
            {visibleActions.map((action, index) => (<QuickActionButton key={action.id} action={action} index={index} onClick={() => setIsExpanded(false)}/>))}
          </framer_motion_1.motion.div>)}
      </framer_motion_1.AnimatePresence>

      
      <framer_motion_1.motion.div style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
        }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
        <framer_motion_1.motion.button className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-2xl flex items-center justify-center text-white relative overflow-hidden group" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => {
            setIsExpanded(!isExpanded);
            setIsMinimized(false);
        }} animate={{
            boxShadow: isExpanded
                ? "0 20px 40px rgba(249, 123, 34, 0.3)"
                : "0 10px 25px rgba(249, 123, 34, 0.2)"
        }}>
          
          <framer_motion_1.motion.div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-700" animate={{
            scale: isExpanded ? [1, 1.2, 1] : 1,
            rotate: isExpanded ? [0, 180, 360] : 0
        }} transition={{ duration: 0.6 }}/>

          
          <framer_motion_1.motion.div className="absolute inset-0 flex items-center justify-center" animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 10, -10, 0]
        }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }}>
            <lucide_react_1.Sparkles className="w-5 h-5 text-white/80"/>
          </framer_motion_1.motion.div>

          
          <framer_motion_1.motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.3 }}>
            {isExpanded ? (<lucide_react_1.X className="w-6 h-6"/>) : (<lucide_react_1.Plus className="w-6 h-6"/>)}
          </framer_motion_1.motion.div>

          
          <framer_motion_1.motion.div className="absolute inset-0 rounded-full border-2 border-primary-300" animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5]
        }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }}/>
        </framer_motion_1.motion.button>
      </framer_motion_1.motion.div>

      
      <framer_motion_1.AnimatePresence>
        {isMinimized && (<framer_motion_1.motion.button className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsMinimized(false)}>
            <lucide_react_1.ChevronUp className="w-3 h-3 text-text-secondary"/>
          </framer_motion_1.motion.button>)}
      </framer_motion_1.AnimatePresence>
    </framer_motion_1.motion.div>);
};
exports.QuickActions = QuickActions;
const QuickActionButton = ({ action, index, onClick }) => {
    const Icon = action.icon;
    return (<framer_motion_1.motion.div initial={{ opacity: 0, x: 20, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 20, scale: 0.8 }} transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 400,
            damping: 30
        }} whileHover={{ scale: 1.05, x: -5 }} whileTap={{ scale: 0.95 }}>
      <link_1.default href={action.href} onClick={onClick}>
        <div className="flex items-center space-x-3 bg-white rounded-2xl shadow-lg p-3 pr-4 min-w-[160px] group">
          
          <framer_motion_1.motion.div className={`w-10 h-10 ${action.bgColor} rounded-xl flex items-center justify-center shadow-sm`} whileHover={{ rotate: 5, scale: 1.1 }} transition={{ type: "spring", stiffness: 400 }}>
            <Icon className={`w-5 h-5 text-white`}/>
          </framer_motion_1.motion.div>

          
          <div className="flex-1">
            <framer_motion_1.motion.span className="font-medium text-text-primary text-sm group-hover:text-primary-600 transition-colors" whileHover={{ scale: 1.02 }}>
              {action.label}
            </framer_motion_1.motion.span>
          </div>

          
          <framer_motion_1.motion.div className="w-1 h-8 bg-primary-500 rounded-full scale-y-0 group-hover:scale-y-100" transition={{ duration: 0.2 }}/>
        </div>
      </link_1.default>
    </framer_motion_1.motion.div>);
};
const useQuickActions = () => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const shouldShow = scrollY > 300;
            setIsVisible(shouldShow);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return { isVisible };
};
exports.useQuickActions = useQuickActions;
//# sourceMappingURL=quick-actions.js.map