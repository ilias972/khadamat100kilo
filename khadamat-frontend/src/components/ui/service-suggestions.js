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
exports.ServiceSuggestions = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const link_1 = __importDefault(require("next/link"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const glass_container_1 = require("@/components/ui/glass-container");
const lucide_react_1 = require("lucide-react");
const ServiceSuggestions = ({ userId, location = 'Casablanca', maxSuggestions = 3, className }) => {
    const [suggestions, setSuggestions] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [dismissedSuggestions, setDismissedSuggestions] = (0, react_1.useState)(new Set());
    (0, react_1.useEffect)(() => {
        const generateSuggestions = () => {
            const mockSuggestions = [
                {
                    id: '1',
                    name: 'Nettoyage complet',
                    category: 'ménage',
                    reason: 'Basé sur vos réservations précédentes',
                    confidence: 0.85,
                    estimatedPrice: 250,
                    estimatedDuration: '3h',
                    popularity: 92,
                    icon: '/menageICONE.png'
                },
                {
                    id: '2',
                    name: 'Réparation électrique',
                    category: 'électricité',
                    reason: 'Service populaire dans votre quartier',
                    confidence: 0.72,
                    estimatedPrice: 180,
                    estimatedDuration: '2h',
                    popularity: 88,
                    icon: '/electricitéICONE.png'
                },
                {
                    id: '3',
                    name: 'Jardinage saisonnier',
                    category: 'jardinage',
                    reason: 'Saison idéale pour ce service',
                    confidence: 0.68,
                    estimatedPrice: 320,
                    estimatedDuration: '4h',
                    popularity: 76,
                    icon: '/jardinageICONE.png'
                }
            ];
            setSuggestions(mockSuggestions.slice(0, maxSuggestions));
            setLoading(false);
        };
        setTimeout(generateSuggestions, 1000);
    }, [userId, location, maxSuggestions]);
    const handleDismiss = (suggestionId) => {
        setDismissedSuggestions(prev => new Set([...prev, suggestionId]));
    };
    const visibleSuggestions = suggestions.filter(s => !dismissedSuggestions.has(s.id));
    if (loading) {
        return (<glass_container_1.GlassContainer className={`p-6 ${className}`} animated>
        <div className="flex items-center space-x-3 mb-4">
          <framer_motion_1.motion.div className="w-8 h-8 bg-primary-500/20 rounded-full flex items-center justify-center" animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
            <lucide_react_1.Sparkles className="w-4 h-4 text-primary-600"/>
          </framer_motion_1.motion.div>
          <div>
            <h3 className="font-semibold text-text-primary">Suggestions personnalisées</h3>
            <p className="text-sm text-text-secondary">Analyse de vos besoins...</p>
          </div>
        </div>

        <div className="space-y-3">
          {[...Array(maxSuggestions)].map((_, i) => (<framer_motion_1.motion.div key={i} className="h-16 bg-surface/50 rounded-lg animate-pulse" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}/>))}
        </div>
      </glass_container_1.GlassContainer>);
    }
    if (visibleSuggestions.length === 0) {
        return null;
    }
    return (<framer_motion_1.motion.div className={className} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <glass_container_1.GlassContainer className="p-6" animated>
        
        <framer_motion_1.motion.div className="flex items-center justify-between mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center space-x-3">
            <framer_motion_1.motion.div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <lucide_react_1.Sparkles className="w-5 h-5 text-white"/>
            </framer_motion_1.motion.div>
            <div>
              <h3 className="font-bold text-lg text-text-primary">Suggestions pour vous</h3>
              <p className="text-sm text-text-secondary">Services adaptés à vos besoins</p>
            </div>
          </div>

          <framer_motion_1.motion.div className="flex items-center space-x-1 text-sm text-primary-600 bg-primary-50 px-2 py-1 rounded-full" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring", stiffness: 500 }}>
            <lucide_react_1.TrendingUp className="w-3 h-3"/>
            <span className="font-medium">IA</span>
          </framer_motion_1.motion.div>
        </framer_motion_1.motion.div>

        
        <framer_motion_1.AnimatePresence>
          <framer_motion_1.motion.div className="space-y-3" variants={{
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                }
            }
        }} initial="hidden" animate="show">
            {visibleSuggestions.map((suggestion, index) => (<SuggestionCard key={suggestion.id} suggestion={suggestion} index={index} onDismiss={handleDismiss}/>))}
          </framer_motion_1.motion.div>
        </framer_motion_1.AnimatePresence>

        
        {visibleSuggestions.length >= 2 && (<framer_motion_1.motion.div className="mt-4 pt-4 border-t border-border-light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <link_1.default href="/services">
              <button_1.Button variant="ghost" className="w-full text-primary-600 hover:text-primary-700 hover:bg-primary-50" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Voir tous les services
                <lucide_react_1.ChevronRight className="w-4 h-4 ml-2"/>
              </button_1.Button>
            </link_1.default>
          </framer_motion_1.motion.div>)}
      </glass_container_1.GlassContainer>
    </framer_motion_1.motion.div>);
};
exports.ServiceSuggestions = ServiceSuggestions;
const SuggestionCard = ({ suggestion, index, onDismiss }) => {
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    return (<framer_motion_1.motion.div layout initial={{ opacity: 0, x: -20, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{
            opacity: 0,
            x: 20,
            scale: 0.95,
            transition: { duration: 0.3 }
        }} transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 30
        }} whileHover={{ scale: 1.02 }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
      <card_1.Card className="relative overflow-hidden cursor-pointer group">
        
        <framer_motion_1.motion.div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-primary-500/5" initial={{ x: '-100%' }} animate={{ x: isHovered ? '100%' : '-100%' }} transition={{ duration: 1.5, ease: "easeInOut" }}/>

        
        <framer_motion_1.motion.button className="absolute top-2 right-2 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={(e) => {
            e.stopPropagation();
            onDismiss(suggestion.id);
        }}>
          <lucide_react_1.X className="w-3 h-3 text-text-secondary"/>
        </framer_motion_1.motion.button>

        <div className="p-4">
          <div className="flex items-start space-x-3">
            
            <framer_motion_1.motion.div className="relative flex-shrink-0" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl flex items-center justify-center shadow-sm">
                <img src={suggestion.icon} alt={suggestion.name} className="w-7 h-7 object-cover"/>
              </div>

              
              <framer_motion_1.motion.div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 500 }}>
                {Math.round(suggestion.confidence * 100)}
              </framer_motion_1.motion.div>
            </framer_motion_1.motion.div>

            
            <div className="flex-1 min-w-0">
              <framer_motion_1.motion.h4 className="font-semibold text-text-primary truncate" whileHover={{ scale: 1.02 }}>
                {suggestion.name}
              </framer_motion_1.motion.h4>

              <p className="text-sm text-text-secondary mb-2">
                {suggestion.reason}
              </p>

              
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <lucide_react_1.Clock className="w-3 h-3"/>
                    <span>{suggestion.estimatedDuration}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <lucide_react_1.Star className="w-3 h-3 text-warning-500 fill-current"/>
                    <span>{suggestion.popularity}%</span>
                  </div>
                </div>

                <framer_motion_1.motion.div className="font-bold text-primary-600" whileHover={{ scale: 1.05 }}>
                  {suggestion.estimatedPrice} DH
                </framer_motion_1.motion.div>
              </div>
            </div>
          </div>

          
          <framer_motion_1.motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 scale-x-0 group-hover:scale-x-100" transition={{ duration: 0.3 }}/>
        </div>
      </card_1.Card>
    </framer_motion_1.motion.div>);
};
//# sourceMappingURL=service-suggestions.js.map