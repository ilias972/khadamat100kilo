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
exports.BenchmarkComparison = BenchmarkComparison;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const SkeletonCard = () => (<div className="animate-pulse bg-gray-100 rounded-xl p-6">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-8 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>);
const PerformanceCard = ({ benchmark, index, enableAnimations }) => {
    const [isVisible, setIsVisible] = (0, react_1.useState)(false);
    const [animatedPercentile, setAnimatedPercentile] = (0, react_1.useState)(0);
    const cardRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (enableAnimations) {
                    setTimeout(() => {
                        let start = 0;
                        const end = benchmark.percentile;
                        const duration = 1000 + (index * 200);
                        const animate = () => {
                            start += 2;
                            setAnimatedPercentile(Math.min(start, end));
                            if (start < end) {
                                requestAnimationFrame(animate);
                            }
                        };
                        animate();
                    }, 500);
                }
            }
        }, { threshold: 0.1 });
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
        return () => observer.disconnect();
    }, [benchmark.percentile, index, enableAnimations]);
    const IconComponent = benchmark.icon;
    const isAboveAverage = benchmark.userValue >= benchmark.averageValue;
    const isTopPerformer = benchmark.userValue >= benchmark.topPerformersValue * 0.9;
    const getBadgeColor = () => {
        if (isTopPerformer)
            return 'from-yellow-400 to-orange-500';
        if (isAboveAverage)
            return 'from-green-400 to-emerald-500';
        return 'from-blue-400 to-indigo-500';
    };
    const getBadgeIcon = () => {
        if (isTopPerformer)
            return lucide_react_1.Trophy;
        if (isAboveAverage)
            return lucide_react_1.Medal;
        return lucide_react_1.Target;
    };
    const BadgeIcon = getBadgeIcon();
    return (<div ref={cardRef} className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 transition-all duration-500 hover:shadow-xl hover:scale-105 relative overflow-hidden group ${enableAnimations ? 'opacity-0 translate-y-8' : ''} ${isVisible && enableAnimations ? 'opacity-100 translate-y-0' : ''}`}>
      
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12">
        <IconComponent className="w-full h-full"/>
      </div>

      
      {(isTopPerformer || isAboveAverage) && (<div className={`absolute top-4 right-4 px-3 py-1 bg-gradient-to-r ${getBadgeColor()} text-white rounded-full text-xs font-bold flex items-center space-x-1`}>
          <BadgeIcon className="w-3 h-3"/>
          <span>{isTopPerformer ? 'Top 10%' : 'Above Average'}</span>
        </div>)}

      <div className="relative">
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-3 bg-gradient-to-br from-[#F97B22]/10 to-[#F97B22]/20 rounded-xl">
            <IconComponent className="w-6 h-6 text-[#F97B22]"/>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-1">{benchmark.category}</h3>
            <p className="text-sm text-gray-600">{benchmark.description}</p>
          </div>
        </div>

        
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {typeof benchmark.userValue === 'number' ?
            benchmark.userValue.toLocaleString('fr-FR') : benchmark.userValue}
          </div>
          <div className="text-sm text-gray-600">Votre performance</div>
        </div>

        
        <div className="space-y-4 mb-6">
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Vous</span>
              <span className="font-semibold text-gray-900">
                {typeof benchmark.userValue === 'number' ?
            benchmark.userValue.toFixed(1) : benchmark.userValue}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
              <div className={`h-full bg-gradient-to-r from-[#F97B22] to-orange-400 rounded-full transition-all duration-1000 ease-out ${isVisible && enableAnimations ? '' : 'w-0'}`} style={{
            width: isVisible && enableAnimations ?
                `${Math.min((benchmark.userValue / benchmark.topPerformersValue) * 100, 100)}%` : '0%',
            transitionDelay: `${index * 100}ms`
        }}/>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                {Math.round((benchmark.userValue / benchmark.topPerformersValue) * 100)}%
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>Objectif: {benchmark.topPerformersValue}</span>
            </div>
          </div>

          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Moyenne</span>
              <span className="font-semibold text-gray-700">
                {benchmark.averageValue.toFixed(1)}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 relative">
              <div className="h-full bg-gray-400 rounded-full" style={{
            width: `${(benchmark.averageValue / benchmark.topPerformersValue) * 100}%`
        }}/>
            </div>
          </div>

          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600 flex items-center">
                <lucide_react_1.Crown className="w-3 h-3 mr-1 text-yellow-500"/>
                Top performers
              </span>
              <span className="font-semibold text-yellow-600">
                {benchmark.topPerformersValue.toFixed(1)}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 relative">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full" style={{
            width: '100%'
        }}/>
            </div>
          </div>
        </div>

        
        <div className="text-center mb-4">
          <div className="relative w-24 h-24 mx-auto">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle cx="48" cy="48" r="40" stroke="#E5E7EB" strokeWidth="8" fill="transparent"/>
              <circle cx="48" cy="48" r="40" stroke={isTopPerformer ? "#F59E0B" : isAboveAverage ? "#10B981" : "#3B82F6"} strokeWidth="8" fill="transparent" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 40}`} strokeDashoffset={`${2 * Math.PI * 40 * (1 - (animatedPercentile / 100))}`} className="transition-all duration-1000 ease-out" style={{
            transitionDelay: `${index * 200}ms`
        }}/>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-900">
                {animatedPercentile}%
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {benchmark.percentile >= 90 ? '🥇 Excellent' :
            benchmark.percentile >= 75 ? '🥈 Très bien' :
                benchmark.percentile >= 50 ? '🥉 Bien' : '📈 À améliorer'}
          </div>
        </div>

        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            {benchmark.trend === 'up' ? (<lucide_react_1.TrendingUp className="w-4 h-4 text-green-500"/>) : benchmark.trend === 'down' ? (<lucide_react_1.TrendingDown className="w-4 h-4 text-red-500"/>) : (<lucide_react_1.Activity className="w-4 h-4 text-gray-500"/>)}
            <span className={`text-sm font-medium ${benchmark.trend === 'up' ? 'text-green-600' :
            benchmark.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
              {benchmark.improvement > 0 ? '+' : ''}{benchmark.improvement.toFixed(1)}%
            </span>
          </div>
          
          {benchmark.monthlyChange !== undefined && (<div className={`text-xs px-2 py-1 rounded-full ${benchmark.monthlyChange > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {benchmark.monthlyChange > 0 ? '+' : ''}{benchmark.monthlyChange.toFixed(1)}% ce mois
            </div>)}
        </div>
      </div>
    </div>);
};
function BenchmarkComparison({ data = [], loading = false, error = null, className = "", title = "Comparaisons avec les Professionnels", showImprovements = true, enableAnimations = true, category = "all", maxItems = 6 }) {
    const [selectedCategory, setSelectedCategory] = (0, react_1.useState)(category);
    const [sortBy, setSortBy] = (0, react_1.useState)('percentile');
    const filteredData = data
        .filter(item => selectedCategory === 'all' || item.category.toLowerCase().includes(selectedCategory.toLowerCase()))
        .sort((a, b) => {
        switch (sortBy) {
            case 'percentile':
                return b.percentile - a.percentile;
            case 'improvement':
                return b.improvement - a.improvement;
            case 'category':
                return a.category.localeCompare(b.category);
            default:
                return 0;
        }
    })
        .slice(0, maxItems);
    const averagePercentile = data.length > 0 ?
        data.reduce((sum, item) => sum + item.percentile, 0) / data.length : 0;
    const topPerformersCount = data.filter(item => item.percentile >= 90).length;
    if (loading) {
        return (<div className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-border-light p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-text-primary font-heading">{title}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i}/>)}
        </div>
      </div>);
    }
    if (error) {
        return (<div className={`bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-[24px] p-6 ${className}`}>
        <div className="flex items-center space-x-3">
          <lucide_react_1.AlertTriangle className="w-6 h-6 text-red-600"/>
          <div>
            <h3 className="text-lg font-semibold text-red-800">Erreur de chargement</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>);
    }
    if (data.length === 0) {
        return (<div className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-border-light p-6 ${className}`}>
        <div className="text-center py-12">
          <lucide_react_1.Users className="w-12 h-12 text-text-muted mx-auto mb-4"/>
          <p className="text-text-secondary">Aucune donnée de benchmark disponible</p>
        </div>
      </div>);
    }
    return (<div className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-border-light p-6 ${className}`}>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#F97B22]/10 rounded-lg">
            <lucide_react_1.Award className="w-6 h-6 text-[#F97B22]"/>
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary font-heading">{title}</h3>
            <p className="text-sm text-text-secondary">
              Performance vs autres professionnels ({data.length} catégories)
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1 text-sm border border-border-light rounded-lg bg-white/50 backdrop-blur-sm">
            <option value="percentile">Par percentile</option>
            <option value="improvement">Par amélioration</option>
            <option value="category">Par catégorie</option>
          </select>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-900">
            {averagePercentile.toFixed(0)}%
          </div>
          <div className="text-sm text-blue-700">Percentile moyen</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-900">
            {topPerformersCount}
          </div>
          <div className="text-sm text-green-700">Catégories top 10%</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-900">
            {data.filter(item => item.trend === 'up').length}
          </div>
          <div className="text-sm text-purple-700">En amélioration</div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((benchmark, index) => (<PerformanceCard key={benchmark.category} benchmark={benchmark} index={index} enableAnimations={enableAnimations}/>))}
      </div>

      
      {showImprovements && data.length > 0 && (<div className="mt-8 pt-6 border-t border-border-light">
          <h4 className="text-lg font-bold text-text-primary mb-4 flex items-center">
            <lucide_react_1.Zap className="w-5 h-5 mr-2 text-[#F97B22]"/>
            Recommandations d'amélioration
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data
                .filter(item => item.percentile < 50)
                .slice(0, 2)
                .map((item, index) => (<div key={index} className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <lucide_react_1.AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0"/>
                    <div>
                      <h5 className="font-semibold text-orange-900 mb-1">
                        Opportunité: {item.category}
                      </h5>
                      <p className="text-sm text-orange-800 mb-2">
                        {item.description}
                      </p>
                      <div className="text-xs text-orange-700">
                        💡 Conseil: Améliorer votre performance pour atteindre la moyenne ({item.averageValue.toFixed(1)})
                      </div>
                    </div>
                  </div>
                </div>))}
          </div>
        </div>)}
    </div>);
}
//# sourceMappingURL=BenchmarkComparison.js.map