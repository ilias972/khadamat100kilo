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
exports.generateMockMetrics = exports.AnalyticsDashboard = void 0;
const react_1 = __importStar(require("react"));
const framer_motion_1 = require("framer-motion");
const utils_1 = require("@/lib/utils");
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const badge_1 = require("@/components/ui/badge");
const lucide_react_1 = require("lucide-react");
const AnalyticsDashboard = ({ userType, metrics, charts = [], timeRange = '30d', onTimeRangeChange, onExport, onRefresh, className }) => {
    const [selectedPeriod, setSelectedPeriod] = (0, react_1.useState)(timeRange);
    const [isRefreshing, setIsRefreshing] = (0, react_1.useState)(false);
    const [expandedCharts, setExpandedCharts] = (0, react_1.useState)(new Set());
    const handleRefresh = async () => {
        setIsRefreshing(true);
        await onRefresh?.();
        setTimeout(() => setIsRefreshing(false), 1000);
    };
    const toggleChartExpansion = (chartId) => {
        const newExpanded = new Set(expandedCharts);
        if (newExpanded.has(chartId)) {
            newExpanded.delete(chartId);
        }
        else {
            newExpanded.add(chartId);
        }
        setExpandedCharts(newExpanded);
    };
    const formatValue = (value, format) => {
        if (typeof value === 'string')
            return value;
        switch (format) {
            case 'currency':
                return `${value.toLocaleString('fr-MA')} DH`;
            case 'percentage':
                return `${value}%`;
            case 'time':
                return `${value}h`;
            case 'rating':
                return `${value}/5`;
            default:
                return value.toLocaleString('fr-MA');
        }
    };
    const getChangeColor = (change, changeType) => {
        if (!change)
            return 'text-gray-500';
        if (changeType === 'increase' || change > 0)
            return 'text-green-600';
        if (changeType === 'decrease' || change < 0)
            return 'text-red-600';
        return 'text-gray-500';
    };
    const getChangeIcon = (change, changeType) => {
        if (!change)
            return null;
        if (changeType === 'increase' || change > 0)
            return lucide_react_1.TrendingUp;
        if (changeType === 'decrease' || change < 0)
            return lucide_react_1.TrendingDown;
        return null;
    };
    const timeRangeOptions = [
        { value: '7d', label: '7 jours' },
        { value: '30d', label: '30 jours' },
        { value: '90d', label: '90 jours' },
        { value: '1y', label: '1 an' }
    ];
    return (<div className={(0, utils_1.cn)('space-y-6', className)}>
      
      <framer_motion_1.motion.div className="flex items-center justify-between" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Analytics & Performances
          </h2>
          <p className="text-gray-600 mt-1">
            Suivez vos statistiques et tendances
          </p>
        </div>

        <div className="flex items-center space-x-3">
          
          <div className="relative">
            <select value={selectedPeriod} onChange={(e) => {
            setSelectedPeriod(e.target.value);
            onTimeRangeChange?.(e.target.value);
        }} className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              {timeRangeOptions.map(option => (<option key={option.value} value={option.value}>
                  {option.label}
                </option>))}
            </select>
            <lucide_react_1.ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"/>
          </div>

          
          <button_1.Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing} className="flex items-center space-x-2">
            <lucide_react_1.RefreshCw className={(0, utils_1.cn)('w-4 h-4', isRefreshing && 'animate-spin')}/>
            <span>Actualiser</span>
          </button_1.Button>

          {onExport && (<button_1.Button variant="outline" size="sm" onClick={onExport} className="flex items-center space-x-2">
              <lucide_react_1.Download className="w-4 h-4"/>
              <span>Exporter</span>
            </button_1.Button>)}
        </div>
      </framer_motion_1.motion.div>

      
      <framer_motion_1.motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" variants={{
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1
                }
            }
        }} initial="hidden" animate="visible">
        {metrics.map((metric, index) => {
            const ChangeIcon = getChangeIcon(metric.change, metric.changeType);
            const changeColor = getChangeColor(metric.change, metric.changeType);
            return (<framer_motion_1.motion.div key={metric.id} variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }} whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
              <card_1.Card className="p-4 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {metric.icon && (<div className={(0, utils_1.cn)('p-2 rounded-lg', metric.color || 'bg-primary-100 text-primary-600')}>
                        <metric.icon className="w-5 h-5"/>
                      </div>)}
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatValue(metric.value, metric.format)}
                      </p>
                    </div>
                  </div>

                  
                  {metric.change !== undefined && (<div className={(0, utils_1.cn)('flex items-center space-x-1 text-sm', changeColor)}>
                      {ChangeIcon && <ChangeIcon className="w-4 h-4"/>}
                      <span className="font-medium">
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>)}
                </div>

                
                {metric.trend && (<div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Tendance</span>
                      <span className={(0, utils_1.cn)(metric.trend === 'up' && 'text-green-600', metric.trend === 'down' && 'text-red-600', metric.trend === 'stable' && 'text-gray-600')}>
                        {metric.trend === 'up' && '↗️ Augmentation'}
                        {metric.trend === 'down' && '↘️ Diminution'}
                        {metric.trend === 'stable' && '→ Stable'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <framer_motion_1.motion.div className={(0, utils_1.cn)('h-2 rounded-full', metric.trend === 'up' && 'bg-green-500', metric.trend === 'down' && 'bg-red-500', metric.trend === 'stable' && 'bg-gray-500')} initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 1, delay: index * 0.1 }}/>
                    </div>
                  </div>)}
              </card_1.Card>
            </framer_motion_1.motion.div>);
        })}
      </framer_motion_1.motion.div>

      
      {charts.length > 0 && (<framer_motion_1.motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Analyses détaillées
            </h3>
            <badge_1.Badge variant="secondary" className="flex items-center space-x-1">
              <lucide_react_1.Activity className="w-3 h-3"/>
              <span>Temps réel</span>
            </badge_1.Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {charts.map((chart, index) => (<framer_motion_1.motion.div key={chart.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -2 }}>
                <card_1.Card className="overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">
                        {chart.title}
                      </h4>
                      <button_1.Button variant="ghost" size="sm" onClick={() => toggleChartExpansion(chart.id)} className="p-1">
                        {expandedCharts.has(chart.id) ? (<lucide_react_1.ChevronUp className="w-4 h-4"/>) : (<lucide_react_1.ChevronDown className="w-4 h-4"/>)}
                      </button_1.Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Période: {chart.period === 'day' ? 'Aujourd\'hui' :
                    chart.period === 'week' ? 'Cette semaine' :
                        chart.period === 'month' ? 'Ce mois' : 'Cette année'}
                    </p>
                  </div>

                  <framer_motion_1.AnimatePresence>
                    {expandedCharts.has(chart.id) && (<framer_motion_1.motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="p-4">
                        
                        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <lucide_react_1.BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50"/>
                            <p className="text-sm">Graphique {chart.type}</p>
                            <p className="text-xs">Intégration en cours</p>
                          </div>
                        </div>

                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Tendance générale:</span>
                            <badge_1.Badge variant="success" className="flex items-center space-x-1">
                              <lucide_react_1.TrendingUp className="w-3 h-3"/>
                              <span>+12%</span>
                            </badge_1.Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Pic d'activité:</span>
                            <span className="font-medium">14h-16h</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Prévision:</span>
                            <span className="font-medium text-green-600">↗️ +8%</span>
                          </div>
                        </div>
                      </framer_motion_1.motion.div>)}
                  </framer_motion_1.AnimatePresence>
                </card_1.Card>
              </framer_motion_1.motion.div>))}
          </div>
        </framer_motion_1.motion.div>)}

      
      <framer_motion_1.motion.div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary-100 rounded-lg">
            <lucide_react_1.Zap className="w-5 h-5 text-primary-600"/>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              Insights intelligents
            </h3>
            <p className="text-sm text-gray-600">
              Analyse automatique de vos performances
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <lucide_react_1.Target className="w-4 h-4 text-green-600"/>
              <span className="text-sm font-medium text-gray-900">Objectif atteint</span>
            </div>
            <p className="text-sm text-gray-600">
              Vous avez dépassé votre objectif de réservations de 15% ce mois-ci.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <lucide_react_1.TrendingUp className="w-4 h-4 text-blue-600"/>
              <span className="text-sm font-medium text-gray-900">Tendance positive</span>
            </div>
            <p className="text-sm text-gray-600">
              Vos avis clients ont augmenté de 0.3 points en moyenne.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <lucide_react_1.Award className="w-4 h-4 text-purple-600"/>
              <span className="text-sm font-medium text-gray-900">Recommandation</span>
            </div>
            <p className="text-sm text-gray-600">
              Augmentez vos tarifs de 5-10% pour optimiser vos revenus.
            </p>
          </div>
        </div>
      </framer_motion_1.motion.div>
    </div>);
};
exports.AnalyticsDashboard = AnalyticsDashboard;
const generateMockMetrics = (userType) => {
    if (userType === 'client') {
        return [
            {
                id: 'bookings',
                label: 'Réservations',
                value: 24,
                previousValue: 18,
                change: 33,
                changeType: 'increase',
                format: 'number',
                icon: lucide_react_1.Calendar,
                color: 'bg-blue-100 text-blue-600',
                trend: 'up'
            },
            {
                id: 'spent',
                label: 'Dépensé',
                value: 4850,
                previousValue: 4200,
                change: 15,
                changeType: 'increase',
                format: 'currency',
                icon: lucide_react_1.DollarSign,
                color: 'bg-green-100 text-green-600',
                trend: 'up'
            },
            {
                id: 'rating',
                label: 'Note moyenne',
                value: 4.7,
                previousValue: 4.5,
                change: 4,
                changeType: 'increase',
                format: 'rating',
                icon: lucide_react_1.Star,
                color: 'bg-yellow-100 text-yellow-600',
                trend: 'up'
            },
            {
                id: 'messages',
                label: 'Messages',
                value: 156,
                previousValue: 142,
                change: 11,
                changeType: 'increase',
                format: 'number',
                icon: lucide_react_1.MessageSquare,
                color: 'bg-purple-100 text-purple-600',
                trend: 'stable'
            }
        ];
    }
    return [
        {
            id: 'earnings',
            label: 'Revenus',
            value: 12500,
            previousValue: 11800,
            change: 6,
            changeType: 'increase',
            format: 'currency',
            icon: lucide_react_1.DollarSign,
            color: 'bg-green-100 text-green-600',
            trend: 'up'
        },
        {
            id: 'bookings',
            label: 'Réservations',
            value: 38,
            previousValue: 42,
            change: -10,
            changeType: 'decrease',
            format: 'number',
            icon: lucide_react_1.Calendar,
            color: 'bg-blue-100 text-blue-600',
            trend: 'down'
        },
        {
            id: 'rating',
            label: 'Note clients',
            value: 4.8,
            previousValue: 4.7,
            change: 2,
            changeType: 'increase',
            format: 'rating',
            icon: lucide_react_1.Star,
            color: 'bg-yellow-100 text-yellow-600',
            trend: 'up'
        },
        {
            id: 'views',
            label: 'Vues profil',
            value: 1247,
            previousValue: 1156,
            change: 8,
            changeType: 'increase',
            format: 'number',
            icon: lucide_react_1.Eye,
            color: 'bg-indigo-100 text-indigo-600',
            trend: 'up'
        }
    ];
};
exports.generateMockMetrics = generateMockMetrics;
//# sourceMappingURL=analytics-dashboard.js.map