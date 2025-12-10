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
exports.ForecastingChart = ForecastingChart;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const SkeletonChart = () => (<div className="w-full h-full animate-pulse">
    <div className="flex items-end space-x-2 h-48">
      {[...Array(12)].map((_, i) => (<div key={i} className="bg-gray-200 rounded-t" style={{ height: `${Math.random() * 100}%`, width: '100%' }}></div>))}
    </div>
  </div>);
function ForecastingChart({ data = [], title = "Prévisions de performance", loading = false, error = null, className = "", showConfidence = true, showTarget = false, target = 100, enableAnimations = true, height = 300, type = 'area', period = 'monthly' }) {
    const [hoveredIndex, setHoveredIndex] = (0, react_1.useState)(null);
    const [tooltip, setTooltip] = (0, react_1.useState)(null);
    const [mousePosition, setMousePosition] = (0, react_1.useState)({ x: 0, y: 0 });
    const svgRef = (0, react_1.useRef)(null);
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const chartWidth = 600 - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    const allValues = data.flatMap(d => [
        d.actual || d.forecast,
        d.forecast,
        d.lower_bound || d.forecast,
        d.upper_bound || d.forecast
    ].filter(v => v !== undefined));
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);
    const xScale = (index) => {
        return (index / Math.max(data.length - 1, 1)) * chartWidth;
    };
    const yScale = (value) => {
        if (maxValue === minValue)
            return chartHeight / 2;
        return chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
    };
    const generatePath = (values, isForecast = false) => {
        return values.map((value, index) => {
            const x = xScale(index);
            const y = yScale(value);
            return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
    };
    const generateAreaPath = () => {
        if (!showConfidence || !data[0]?.upper_bound || !data[0]?.lower_bound)
            return '';
        const upperPath = data.map((d, i) => {
            const x = xScale(i);
            const y = yScale(d.upper_bound);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
        const lowerPath = data.reverse().map((d, i) => {
            const x = xScale(data.length - 1 - i);
            const y = yScale(d.lower_bound);
            return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
        return `${upperPath} ${lowerPath} Z`;
    };
    const handleMouseMove = (e) => {
        if (!svgRef.current || data.length === 0)
            return;
        const rect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - margin.left;
        const y = e.clientY - rect.top - margin.top;
        const index = Math.round((x / chartWidth) * (data.length - 1));
        if (index >= 0 && index < data.length) {
            setHoveredIndex(index);
            setMousePosition({ x: e.clientX, y: e.clientY });
            const point = data[index];
            setTooltip({
                date: point.date,
                value: point.actual || point.forecast,
                type: point.actual ? 'actual' : 'forecast',
                confidence: point.confidence
            });
        }
    };
    const handleMouseLeave = () => {
        setHoveredIndex(null);
        setTooltip(null);
    };
    if (loading) {
        return (<div className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-border-light p-6 ${className}`}>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-[#F97B22]/10 rounded-lg">
            <lucide_react_1.LineChart className="w-6 h-6 text-[#F97B22]"/>
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary font-heading">{title}</h3>
            <p className="text-sm text-text-secondary">Analyse prédictive des tendances</p>
          </div>
        </div>
        <SkeletonChart />
      </div>);
    }
    if (error) {
        return (<div className={`bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-[24px] p-6 ${className}`}>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <lucide_react_1.BarChart3 className="w-6 h-6 text-red-600"/>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-800">Erreur de chargement des prévisions</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>);
    }
    if (data.length === 0) {
        return (<div className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-border-light p-6 ${className}`}>
        <div className="text-center py-12">
          <lucide_react_1.Activity className="w-12 h-12 text-text-muted mx-auto mb-4"/>
          <p className="text-text-secondary">Aucune donnée de prévision disponible</p>
        </div>
      </div>);
    }
    const forecastData = data.filter(d => !d.actual);
    const actualData = data.filter(d => d.actual);
    const latestValue = data[data.length - 1]?.forecast;
    const previousValue = data[data.length - 2]?.forecast || data[data.length - 2]?.actual;
    const trend = latestValue && previousValue ? (latestValue > previousValue ? 'up' : latestValue < previousValue ? 'down' : 'stable') : 'stable';
    const changePercent = previousValue && latestValue ? ((latestValue - previousValue) / previousValue) * 100 : 0;
    return (<div className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-border-light p-6 ${className}`}>
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#F97B22]/10 rounded-lg">
            <lucide_react_1.LineChart className="w-6 h-6 text-[#F97B22]"/>
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary font-heading">{title}</h3>
            <p className="text-sm text-text-secondary">Analyse prédictive des tendances</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {showTarget && target && (<div className="text-right">
              <div className="text-xs text-text-secondary">Objectif</div>
              <div className="text-sm font-bold text-text-primary">{target.toLocaleString('fr-FR')}</div>
            </div>)}
          <div className="text-right">
            <div className="text-xs text-text-secondary">Tendance</div>
            <div className={`text-sm font-bold flex items-center space-x-1 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
              {trend === 'up' ? <lucide_react_1.ArrowUpRight className="w-4 h-4"/> :
            trend === 'down' ? <lucide_react_1.ArrowDownRight className="w-4 h-4"/> :
                <lucide_react_1.Activity className="w-4 h-4"/>}
              <span>{changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="relative">
        <svg ref={svgRef} width="100%" height={height} viewBox={`0 0 ${chartWidth + margin.left + margin.right} ${height}`} className="overflow-visible" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            
            <g className="opacity-20">
              {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (<line key={ratio} x1={0} x2={chartWidth} y1={yScale(minValue + (maxValue - minValue) * ratio)} y2={yScale(minValue + (maxValue - minValue) * ratio)} stroke="#E5E7EB" strokeDasharray="2,2"/>))}
            </g>

            
            {showTarget && target && (<line x1={0} x2={chartWidth} y1={yScale(target)} y2={yScale(target)} stroke="#F97B22" strokeWidth={2} strokeDasharray="5,5" opacity={0.7}/>)}

            
            {showConfidence && data[0]?.upper_bound && data[0]?.lower_bound && (<path d={generateAreaPath()} fill="url(#confidenceGradient)" opacity={0.3} className="transition-all duration-300"/>)}

            
            {actualData.length > 0 && (<path d={generatePath(actualData.map(d => d.actual), false)} stroke="#10B981" strokeWidth={3} fill="none" className="transition-all duration-300" style={{
                strokeDasharray: enableAnimations && hoveredIndex !== null ? '5,5' : 'none'
            }}/>)}

            
            <path d={generatePath(forecastData.map(d => d.forecast), true)} stroke="#F97B22" strokeWidth={3} fill="none" strokeDasharray="10,5" className="transition-all duration-300"/>

            
            {data.map((point, index) => {
            const x = xScale(index);
            const y = yScale(point.actual || point.forecast);
            const isActual = !!point.actual;
            const isHovered = hoveredIndex === index;
            return (<g key={index}>
                  <circle cx={x} cy={y} r={isHovered ? 8 : 6} fill={isActual ? '#10B981' : '#F97B22'} stroke="white" strokeWidth={2} className={`transition-all duration-200 ${isHovered ? 'shadow-lg' : ''}`}/>
                  {showConfidence && point.confidence && (<text x={x} y={y - 15} textAnchor="middle" className="text-xs fill-text-secondary">
                      {point.confidence}%
                    </text>)}
                </g>);
        })}

            
            <g className="text-xs fill-text-secondary">
              {data.map((point, index) => {
            const x = xScale(index);
            return (<text key={index} x={x} y={chartHeight + 20} textAnchor="middle" className="select-none">
                    {point.date}
                  </text>);
        })}
            </g>
          </g>
          
          
          <defs>
            <linearGradient id="confidenceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F97B22" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#F97B22" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
        </svg>

        
        {tooltip && (<div className="absolute z-50 bg-gray-900 text-white text-sm rounded-lg py-2 px-3 shadow-lg pointer-events-none" style={{
                left: mousePosition.x - 100,
                top: mousePosition.y - 80,
                transform: 'translateX(-50%)'
            }}>
            <div className="font-semibold">{tooltip.date}</div>
            <div className={`flex items-center space-x-1 ${tooltip.type === 'actual' ? 'text-green-400' : 'text-orange-400'}`}>
              <span>Valeur: {tooltip.value.toLocaleString('fr-FR')}</span>
              {tooltip.type === 'actual' ? '✓' : '🔮'}
            </div>
            {tooltip.confidence && (<div className="text-xs text-gray-300">
                Confiance: {tooltip.confidence}%
              </div>)}
          </div>)}
      </div>

      
      <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-green-500"></div>
          <span className="text-text-secondary">Données réelles</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-0.5 bg-orange-500 border-dashed border-t-2 border-orange-500"></div>
          <span className="text-text-secondary">Prévisions</span>
        </div>
        {showConfidence && (<div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 opacity-30 rounded"></div>
            <span className="text-text-secondary">Intervalle de confiance</span>
          </div>)}
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-border-light">
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">
            {latestValue?.toLocaleString('fr-FR')}
          </div>
          <div className="text-sm text-text-secondary">Valeur prédite</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
            {changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%
          </div>
          <div className="text-sm text-text-secondary">Variation prévue</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#F97B22]">
            {data.length}
          </div>
          <div className="text-sm text-text-secondary">Périodes analysées</div>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=ForecastingChart.js.map