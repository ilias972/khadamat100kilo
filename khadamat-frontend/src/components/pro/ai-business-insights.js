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
exports.AIBusinessInsights = void 0;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const badge_1 = require("@/components/ui/badge");
const utils_1 = require("@/lib/utils");
const AIBusinessInsights = ({ businessData, onImplement, onLearnMore }) => {
    const [insights, setInsights] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)('all');
    (0, react_1.useEffect)(() => {
        const generateInsights = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            const generatedInsights = [
                {
                    id: '1',
                    category: 'revenue',
                    priority: 'high',
                    title: 'Optimisez vos tarifs pour augmenter vos revenus',
                    description: 'Nos données montrent que vos prix sont 15% inférieurs à la moyenne du marché pour des services similaires. Une augmentation progressive pourrait générer des revenus supplémentaires sans affecter la demande.',
                    icon: lucide_react_1.DollarSign,
                    predictedImpact: {
                        revenue: 2800,
                        percentage: 18
                    },
                    confidence: 87,
                    actionItems: [
                        'Augmenter les prix de 10% sur les services premium',
                        'Créer des forfaits groupés à valeur ajoutée',
                        'Tester les nouveaux prix pendant 2 semaines'
                    ],
                    timeframe: '2-4 semaines'
                },
                {
                    id: '2',
                    category: 'client-acquisition',
                    priority: 'high',
                    title: 'Ciblez les nouveaux clients dans votre quartier',
                    description: 'Il y a une augmentation de 35% de la demande pour vos services dans un rayon de 3km. Concentrez vos efforts marketing sur cette zone pour maximiser les conversions.',
                    icon: lucide_react_1.Users,
                    predictedImpact: {
                        revenue: 3200,
                        percentage: 22
                    },
                    confidence: 92,
                    actionItems: [
                        'Activer la publicité locale ciblée',
                        'Offrir une réduction de 10% aux nouveaux clients du quartier',
                        'Optimiser votre profil pour les recherches locales'
                    ],
                    timeframe: '1-2 semaines'
                },
                {
                    id: '3',
                    category: 'seasonal',
                    priority: 'medium',
                    title: 'Préparez-vous pour la haute saison',
                    description: 'Historiquement, la demande augmente de 45% dans les 3 prochaines semaines. Ajustez votre disponibilité et vos prix pour capitaliser sur cette période.',
                    icon: lucide_react_1.TrendingUp,
                    predictedImpact: {
                        revenue: 4500,
                        percentage: 28
                    },
                    confidence: 95,
                    actionItems: [
                        'Augmenter votre disponibilité de 30%',
                        'Créer des offres spéciales saisonnières',
                        'Préparer du matériel marketing pour la haute saison'
                    ],
                    timeframe: '3-6 semaines'
                },
                {
                    id: '4',
                    category: 'pricing',
                    priority: 'medium',
                    title: 'Créez des forfaits pour augmenter la valeur moyenne',
                    description: 'Les clients qui réservent des forfaits dépensent en moyenne 40% de plus. Créez 2-3 forfaits attractifs pour augmenter votre revenu par client.',
                    icon: lucide_react_1.Target,
                    predictedImpact: {
                        revenue: 1800,
                        percentage: 12
                    },
                    confidence: 78,
                    actionItems: [
                        'Créer un forfait "Essentiel" à 500 DH',
                        'Créer un forfait "Premium" à 900 DH',
                        'Promouvoir les forfaits sur votre profil'
                    ],
                    timeframe: '1-3 semaines'
                },
                {
                    id: '5',
                    category: 'competitor',
                    priority: 'low',
                    title: 'Différenciez-vous de la concurrence',
                    description: 'Vos concurrents directs offrent des garanties de satisfaction. Ajouter une garantie pourrait augmenter votre taux de conversion de 25%.',
                    icon: lucide_react_1.Sparkles,
                    predictedImpact: {
                        revenue: 1200,
                        percentage: 8
                    },
                    confidence: 72,
                    actionItems: [
                        'Créer une garantie "Satisfait ou remboursé"',
                        'Mettre en avant vos certifications',
                        'Collecter plus de témoignages clients'
                    ],
                    timeframe: '2-4 semaines'
                }
            ];
            setInsights(generatedInsights);
            setLoading(false);
        };
        generateInsights();
    }, [businessData]);
    const categories = [
        { id: 'all', label: 'Tous', icon: lucide_react_1.Brain },
        { id: 'revenue', label: 'Revenus', icon: lucide_react_1.DollarSign },
        { id: 'client-acquisition', label: 'Acquisition', icon: lucide_react_1.Users },
        { id: 'seasonal', label: 'Saisonnier', icon: lucide_react_1.TrendingUp },
        { id: 'pricing', label: 'Tarification', icon: lucide_react_1.Target }
    ];
    const filteredInsights = selectedCategory === 'all'
        ? insights
        : insights.filter(i => i.category === selectedCategory);
    if (loading) {
        return (<div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-64 bg-[#EDEEEF] rounded-lg animate-pulse"/>
          <div className="h-6 w-32 bg-[#EDEEEF] rounded-lg animate-pulse"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (<div key={i} className="h-64 bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] animate-pulse"/>))}
        </div>
      </div>);
    }
    return (<div className="space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F97B22] to-[#e66a1f] rounded-xl flex items-center justify-center">
              <lucide_react_1.Brain className="w-5 h-5 text-white"/>
            </div>
            <h2 className="text-2xl font-bold text-[#3B3B3B] font-heading">
              💡 Insights IA personnalisés
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
            <lucide_react_1.Sparkles className="w-4 h-4 text-[#F97B22]"/>
            <span>Mis à jour il y a 2h • {insights.length} recommandations</span>
          </div>
        </div>
      </div>

      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
            const Icon = category.icon;
            const count = category.id === 'all'
                ? insights.length
                : insights.filter(i => i.category === category.id).length;
            return (<button key={category.id} onClick={() => setSelectedCategory(category.id)} className={(0, utils_1.cn)('flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all', selectedCategory === category.id
                    ? 'bg-[#F97B22] text-white border-[#F97B22]'
                    : 'bg-white text-[#6B7280] border-[#EDEEEF] hover:border-[#F97B22]')}>
              <Icon className="w-4 h-4"/>
              <span className="text-sm font-medium">{category.label}</span>
              <badge_1.Badge variant="secondary" className={(0, utils_1.cn)('ml-1', selectedCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#EDEEEF] text-[#6B7280]')}>
                {count}
              </badge_1.Badge>
            </button>);
        })}
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredInsights.map((insight) => (<InsightCard key={insight.id} insight={insight} onImplement={() => onImplement?.(insight)} onLearnMore={() => onLearnMore?.(insight)}/>))}
      </div>

      {filteredInsights.length === 0 && (<card_1.Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] p-12 text-center">
          <lucide_react_1.Lightbulb className="w-16 h-16 text-[#6B7280] mx-auto mb-4"/>
          <h3 className="text-xl font-semibold text-[#3B3B3B] mb-2">
            Aucun insight dans cette catégorie
          </h3>
          <p className="text-[#6B7280]">
            Essayez une autre catégorie pour voir plus de recommandations.
          </p>
        </card_1.Card>)}
    </div>);
};
exports.AIBusinessInsights = AIBusinessInsights;
const InsightCard = ({ insight, onImplement, onLearnMore }) => {
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const priorityConfig = {
        high: {
            color: 'bg-red-100 text-red-700 border-red-200',
            label: 'Priorité haute',
            borderColor: 'border-l-red-500'
        },
        medium: {
            color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            label: 'Priorité moyenne',
            borderColor: 'border-l-yellow-500'
        },
        low: {
            color: 'bg-green-100 text-green-700 border-green-200',
            label: 'Priorité basse',
            borderColor: 'border-l-green-500'
        }
    };
    const config = priorityConfig[insight.priority];
    const Icon = insight.icon;
    return (<card_1.Card className={(0, utils_1.cn)('bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] p-6 border-l-4 hover:shadow-lg transition-all', config.borderColor)}>
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#F97B22]/10 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#F97B22]"/>
          </div>
          <div>
            <badge_1.Badge className={(0, utils_1.cn)('mb-1', config.color)}>
              {config.label}
            </badge_1.Badge>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-xs text-[#6B7280]">
          <lucide_react_1.AlertCircle className="w-3 h-3"/>
          <span>{insight.timeframe}</span>
        </div>
      </div>

      
      <h3 className="text-lg font-semibold text-[#3B3B3B] mb-2">
        {insight.title}
      </h3>
      <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
        {insight.description}
      </p>

      
      <div className="mb-4 p-4 bg-gradient-to-r from-[#F97B22]/10 to-transparent rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-[#3B3B3B]">Impact prédit</span>
          <div className="text-right">
            <p className="text-lg font-bold text-[#F97B22]">
              +{insight.predictedImpact.revenue.toLocaleString()} DH
            </p>
            <p className="text-xs text-green-600">
              +{insight.predictedImpact.percentage}% de revenus
            </p>
          </div>
        </div>
        
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#6B7280]">Niveau de confiance</span>
            <span className="font-medium text-[#3B3B3B]">{insight.confidence}%</span>
          </div>
          <div className="w-full bg-[#EDEEEF] rounded-full h-2">
            <div className="bg-gradient-to-r from-[#F97B22] to-[#e66a1f] h-2 rounded-full transition-all" style={{ width: `${insight.confidence}%` }}/>
          </div>
        </div>
      </div>

      
      {expanded && (<div className="mb-4 p-4 bg-white/50 rounded-xl border border-[#EDEEEF]">
          <h4 className="text-sm font-semibold text-[#3B3B3B] mb-3 flex items-center">
            <lucide_react_1.CheckCircle className="w-4 h-4 mr-2 text-[#F97B22]"/>
            Plan d'action recommandé
          </h4>
          <ul className="space-y-2">
            {insight.actionItems.map((item, index) => (<li key={index} className="flex items-start space-x-2 text-sm text-[#6B7280]">
                <span className="flex-shrink-0 w-5 h-5 bg-[#F97B22] text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>))}
          </ul>
        </div>)}

      
      <div className="flex flex-col sm:flex-row gap-2">
        <button_1.Button onClick={onImplement} className="flex-1 bg-[#F97B22] hover:bg-[#e66a1f] text-white">
          Implémenter
          <lucide_react_1.ArrowRight className="w-4 h-4 ml-2"/>
        </button_1.Button>
        <button_1.Button variant="outline" onClick={() => setExpanded(!expanded)} className="flex-1">
          {expanded ? 'Masquer' : 'Voir le plan'}
        </button_1.Button>
      </div>
    </card_1.Card>);
};
//# sourceMappingURL=ai-business-insights.js.map