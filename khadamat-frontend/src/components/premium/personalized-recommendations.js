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
exports.PersonalizedRecommendations = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const utils_1 = require("@/lib/utils");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const PersonalizedRecommendations = ({ userId, location = 'Casablanca', preferences = ['plomberie', 'electricite'], maxItems = 6, className, onItemClick, onRefresh }) => {
    const [recommendations, setRecommendations] = (0, react_1.useState)([]);
    const [isLoading, setIsLoading] = (0, react_1.useState)(true);
    const [lastRefresh, setLastRefresh] = (0, react_1.useState)(new Date());
    const mockRecommendations = [
        {
            id: '1',
            type: 'professional',
            title: 'Ahmed Bennani',
            subtitle: 'Plombier expert - 8 ans d\'expérience',
            image: '/api/placeholder/120/120',
            rating: 4.9,
            price: 120,
            distance: 1.2,
            availability: 'Disponible aujourd\'hui',
            reason: 'Basé sur vos recherches récentes en plomberie',
            tags: ['certifié', 'urgence', 'expérimenté'],
            urgency: 'high',
            matchScore: 95
        },
        {
            id: '2',
            type: 'deal',
            title: 'Nettoyage complet appartement',
            subtitle: 'Offre spéciale -20%',
            rating: 4.7,
            price: 240,
            originalPrice: 300,
            discount: 20,
            distance: 0.8,
            availability: 'Cette semaine',
            reason: 'Promotion populaire dans votre quartier',
            tags: ['promotion', 'ménage', 'appartement'],
            urgency: 'medium',
            popularity: 85
        },
        {
            id: '3',
            type: 'service',
            title: 'Dépannage électrique 24/7',
            subtitle: 'Intervention rapide garantie',
            rating: 4.8,
            price: 150,
            distance: 2.1,
            availability: 'Sous 2h',
            reason: 'Service fréquemment demandé près de chez vous',
            tags: ['urgence', 'électricité', '24/7'],
            urgency: 'high',
            matchScore: 88
        },
        {
            id: '4',
            type: 'trending',
            title: 'Jardinage saisonnier',
            subtitle: 'Préparation pour l\'automne',
            rating: 4.6,
            price: 180,
            distance: 3.5,
            availability: 'Ce weekend',
            reason: 'Tendance actuelle dans votre région',
            tags: ['saisonnier', 'jardinage', 'automne'],
            urgency: 'low',
            popularity: 92
        },
        {
            id: '5',
            type: 'professional',
            title: 'Fatima Alaoui',
            subtitle: 'Femme de ménage professionnelle',
            image: '/api/placeholder/120/120',
            rating: 4.9,
            price: 90,
            distance: 0.5,
            availability: 'Disponible demain',
            reason: 'Recommandée par vos contacts',
            tags: ['vérifiée', 'expérience', 'flexible'],
            urgency: 'medium',
            matchScore: 91
        },
        {
            id: '6',
            type: 'deal',
            title: 'Pack entretien complet',
            subtitle: 'Électricité + Plomberie -15%',
            price: 350,
            originalPrice: 420,
            discount: 15,
            distance: 1.8,
            availability: 'Cette semaine',
            reason: 'Forfait adapté à vos besoins',
            tags: ['pack', 'entretien', 'économique'],
            urgency: 'medium',
            matchScore: 87
        }
    ];
    (0, react_1.useEffect)(() => {
        const loadRecommendations = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            const personalized = mockRecommendations
                .filter(item => {
                if (preferences.length === 0)
                    return true;
                return item.tags?.some(tag => preferences.some(pref => tag.toLowerCase().includes(pref.toLowerCase())));
            })
                .sort((a, b) => {
                const scoreA = a.matchScore || a.popularity || 0;
                const scoreB = b.matchScore || b.popularity || 0;
                if (scoreA !== scoreB)
                    return scoreB - scoreA;
                const urgencyOrder = { high: 3, medium: 2, low: 1 };
                const urgencyA = urgencyOrder[a.urgency || 'low'];
                const urgencyB = urgencyOrder[b.urgency || 'low'];
                if (urgencyA !== urgencyB)
                    return urgencyB - urgencyA;
                return (a.distance || 0) - (b.distance || 0);
            })
                .slice(0, maxItems);
            setRecommendations(personalized);
            setIsLoading(false);
        };
        loadRecommendations();
    }, [userId, location, preferences, maxItems]);
    const handleRefresh = () => {
        setLastRefresh(new Date());
        onRefresh?.();
    };
    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };
    const getTypeIcon = (type) => {
        switch (type) {
            case 'professional': return lucide_react_1.Users;
            case 'deal': return lucide_react_1.TrendingUp;
            case 'service': return lucide_react_1.Zap;
            case 'trending': return lucide_react_1.Sparkles;
            default: return lucide_react_1.Sparkles;
        }
    };
    if (isLoading) {
        return (<div className={(0, utils_1.cn)('space-y-6', className)}>
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"/>
          <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: maxItems }).map((_, i) => (<div key={i} className="h-48 bg-gray-200 rounded-2xl animate-pulse"/>))}
        </div>
      </div>);
    }
    return (<div className={(0, utils_1.cn)('space-y-6', className)}>
      
      <framer_motion_1.motion.div className="flex items-center justify-between" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-100 rounded-xl">
            <lucide_react_1.Sparkles className="w-5 h-5 text-primary-600"/>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Recommandations personnalisées
            </h3>
            <p className="text-sm text-gray-600">
              Adaptées à vos préférences à {location}
            </p>
          </div>
        </div>

        <button_1.Button variant="outline" size="sm" onClick={handleRefresh} className="flex items-center space-x-2">
          <lucide_react_1.RefreshCw className="w-4 h-4"/>
          <span>Actualiser</span>
        </button_1.Button>
      </framer_motion_1.motion.div>

      
      <framer_motion_1.motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1
                }
            }
        }} initial="hidden" animate="visible">
        <framer_motion_1.AnimatePresence>
          {recommendations.map((item, index) => {
            const TypeIcon = getTypeIcon(item.type);
            return (<framer_motion_1.motion.div key={item.id} variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }} transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }} whileHover={{ y: -4 }} className="relative">
                <card_1.Card className="h-full cursor-pointer group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300" onClick={() => onItemClick?.(item)} interactive premium>
                  
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                    <TypeIcon className="w-full h-full"/>
                  </div>

                  <div className="relative p-4 space-y-3">
                    
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={(0, utils_1.cn)('p-1.5 rounded-lg', item.type === 'deal' && 'bg-green-100 text-green-600', item.type === 'professional' && 'bg-blue-100 text-blue-600', item.type === 'service' && 'bg-purple-100 text-purple-600', item.type === 'trending' && 'bg-orange-100 text-orange-600')}>
                          <TypeIcon className="w-4 h-4"/>
                        </div>
                        {item.urgency && (<badge_1.Badge variant="default" className={(0, utils_1.cn)('text-xs', getUrgencyColor(item.urgency))}>
                            {item.urgency === 'high' && 'Urgent'}
                            {item.urgency === 'medium' && 'Bientôt'}
                            {item.urgency === 'low' && 'Disponible'}
                          </badge_1.Badge>)}
                      </div>

                      {item.matchScore && (<div className="flex items-center space-x-1 text-xs text-gray-500">
                          <lucide_react_1.Award className="w-3 h-3"/>
                          <span>{item.matchScore}%</span>
                        </div>)}
                    </div>

                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h4>

                      {item.subtitle && (<p className="text-sm text-gray-600 line-clamp-2">
                          {item.subtitle}
                        </p>)}

                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {item.rating && (<div className="flex items-center space-x-1">
                              <lucide_react_1.Star className="w-4 h-4 text-yellow-400 fill-current"/>
                              <span className="text-sm font-medium text-gray-900">
                                {item.rating}
                              </span>
                            </div>)}

                          {item.distance && (<div className="flex items-center space-x-1 text-xs text-gray-500">
                              <lucide_react_1.MapPin className="w-3 h-3"/>
                              <span>{item.distance} km</span>
                            </div>)}
                        </div>

                        <div className="text-right">
                          {item.discount ? (<div className="space-y-1">
                              <div className="flex items-center space-x-1">
                                <span className="text-lg font-bold text-green-600">
                                  {item.price} DH
                                </span>
                                <badge_1.Badge variant="error" className="text-xs">
                                  -{item.discount}%
                                </badge_1.Badge>
                              </div>
                              <span className="text-xs text-gray-500 line-through">
                                {item.originalPrice} DH
                              </span>
                            </div>) : item.price ? (<span className="text-lg font-bold text-gray-900">
                              {item.price} DH
                            </span>) : null}
                        </div>
                      </div>

                      
                      {item.availability && (<div className="flex items-center space-x-1 text-xs text-gray-600">
                          <lucide_react_1.Clock className="w-3 h-3"/>
                          <span>{item.availability}</span>
                        </div>)}

                      
                      <p className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-md">
                        {item.reason}
                      </p>

                      
                      {item.tags && item.tags.length > 0 && (<div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 3).map((tag, tagIndex) => (<badge_1.Badge key={tagIndex} variant="secondary" className="text-xs px-2 py-0.5">
                              {tag}
                            </badge_1.Badge>))}
                        </div>)}
                    </div>

                    
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button_1.Button size="sm" variant="ghost" className="w-8 h-8 p-0 bg-white/80 backdrop-blur-sm hover:bg-white" onClick={(e) => {
                    e.stopPropagation();
                }}>
                        <lucide_react_1.Heart className="w-4 h-4"/>
                      </button_1.Button>
                    </div>

                    
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <lucide_react_1.ChevronRight className="w-5 h-5 text-primary-600"/>
                    </div>
                  </div>
                </card_1.Card>
              </framer_motion_1.motion.div>);
        })}
        </framer_motion_1.AnimatePresence>
      </framer_motion_1.motion.div>

      
      <framer_motion_1.motion.div className="text-center text-xs text-gray-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        Dernière mise à jour: {lastRefresh.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        })}
      </framer_motion_1.motion.div>
    </div>);
};
exports.PersonalizedRecommendations = PersonalizedRecommendations;
//# sourceMappingURL=personalized-recommendations.js.map