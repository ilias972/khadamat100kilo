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
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const PersonalizedRecommendations = ({ userId, bookingHistory = [], maxRecommendations = 6 }) => {
    const [recommendations, setRecommendations] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockRecommendations = [
                {
                    id: '1',
                    serviceId: 's1',
                    serviceName: 'Nettoyage complet appartement',
                    serviceCategory: 'Ménage',
                    professionalName: 'Fatima Z.',
                    professionalId: 'p1',
                    rating: 4.9,
                    reviewCount: 127,
                    price: 250,
                    location: 'Casablanca',
                    distance: '2.3 km',
                    availability: 'Disponible demain',
                    confidence: 95,
                    reason: 'Basé sur vos réservations précédentes de ménage',
                    imageUrl: '/menageICONE.png',
                    tags: ['Vérifié', 'Top Rated', 'Réactif']
                },
                {
                    id: '2',
                    serviceId: 's2',
                    serviceName: 'Réparation plomberie',
                    serviceCategory: 'Plomberie',
                    professionalName: 'Ahmed M.',
                    professionalId: 'p2',
                    rating: 4.8,
                    reviewCount: 89,
                    price: 180,
                    location: 'Casablanca',
                    distance: '1.8 km',
                    availability: 'Disponible aujourd\'hui',
                    confidence: 88,
                    reason: 'Populaire dans votre quartier',
                    imageUrl: '/plomberieICONE.png',
                    tags: ['Vérifié', 'Expérimenté']
                },
                {
                    id: '3',
                    serviceId: 's3',
                    serviceName: 'Installation électrique',
                    serviceCategory: 'Électricité',
                    professionalName: 'Youssef K.',
                    professionalId: 'p3',
                    rating: 4.7,
                    reviewCount: 156,
                    price: 300,
                    location: 'Casablanca',
                    distance: '3.1 km',
                    availability: 'Disponible cette semaine',
                    confidence: 82,
                    reason: 'Souvent réservé avec vos services habituels',
                    imageUrl: '/electricitéICONE.png',
                    tags: ['Vérifié', 'Top Rated']
                }
            ];
            setRecommendations(mockRecommendations.slice(0, maxRecommendations));
            setLoading(false);
        };
        fetchRecommendations();
    }, [userId, bookingHistory, maxRecommendations]);
    if (loading) {
        return (<div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-64 bg-[#EDEEEF] rounded-lg animate-pulse"/>
          <div className="h-6 w-32 bg-[#EDEEEF] rounded-lg animate-pulse"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (<div key={i} className="h-80 bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] animate-pulse"/>))}
        </div>
      </div>);
    }
    return (<div className="space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#3B3B3B] font-heading mb-2">
            Recommandé pour vous
          </h2>
          <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
            <lucide_react_1.Brain className="w-4 h-4 text-[#F97B22]"/>
            <span>Basé sur vos préférences et votre historique</span>
          </div>
        </div>
        <button_1.Button variant="outline" size="sm">
          Voir tout
          <lucide_react_1.ChevronRight className="w-4 h-4 ml-1"/>
        </button_1.Button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec) => (<RecommendationCard key={rec.id} recommendation={rec} onAccept={() => console.log('Accept recommendation:', rec.id)}/>))}
      </div>
    </div>);
};
exports.PersonalizedRecommendations = PersonalizedRecommendations;
const RecommendationCard = ({ recommendation, onAccept }) => {
    return (<card_1.Card className="group relative overflow-hidden bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center space-x-1 bg-[#F97B22] text-white px-2 py-1 rounded-full text-xs font-medium">
          <lucide_react_1.TrendingUp className="w-3 h-3"/>
          <span>{recommendation.confidence}% match</span>
        </div>
      </div>

      
      <div className="relative h-40 bg-[#EDEEEF] rounded-t-[24px] overflow-hidden">
        {recommendation.imageUrl ? (<img src={recommendation.imageUrl} alt={recommendation.serviceName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>) : (<div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🔧</span>
          </div>)}
      </div>

      <div className="p-6">
        
        <div className="mb-4">
          <badge_1.Badge variant="secondary" className="mb-2">
            {recommendation.serviceCategory}
          </badge_1.Badge>
          <h3 className="text-lg font-semibold text-[#3B3B3B] mb-1 line-clamp-2">
            {recommendation.serviceName}
          </h3>
          <p className="text-sm text-[#6B7280]">
            par {recommendation.professionalName}
          </p>
        </div>

        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            <lucide_react_1.Star className="w-4 h-4 text-yellow-400 fill-current"/>
            <span className="text-sm font-medium text-[#3B3B3B]">
              {recommendation.rating}
            </span>
            <span className="text-sm text-[#6B7280]">
              ({recommendation.reviewCount})
            </span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-[#6B7280]">
            <lucide_react_1.MapPin className="w-4 h-4"/>
            <span>{recommendation.distance}</span>
          </div>
        </div>

        
        <div className="flex flex-wrap gap-2 mb-4">
          {recommendation.tags.map((tag, index) => (<span key={index} className="px-2 py-1 bg-white/50 text-[#6B7280] rounded-full text-xs font-medium">
              {tag}
            </span>))}
        </div>

        
        <div className="flex items-center space-x-2 mb-4 text-sm">
          <lucide_react_1.Clock className="w-4 h-4 text-[#F97B22]"/>
          <span className="text-[#6B7280]">{recommendation.availability}</span>
        </div>

        
        <div className="mb-4 p-3 bg-[#F97B22]/10 rounded-lg">
          <p className="text-xs text-[#6B7280] italic">
            💡 {recommendation.reason}
          </p>
        </div>

        
        <div className="flex items-center justify-between pt-4 border-t border-[#EDEEEF]">
          <div>
            <span className="text-sm text-[#6B7280]">À partir de</span>
            <p className="text-xl font-bold text-[#F97B22]">
              {recommendation.price} DH
            </p>
          </div>
          <button_1.Button onClick={onAccept} className="bg-[#F97B22] hover:bg-[#e66a1f] text-white">
            Réserver
          </button_1.Button>
        </div>
      </div>
    </card_1.Card>);
};
//# sourceMappingURL=personalized-recommendations.js.map