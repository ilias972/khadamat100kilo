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
exports.MobileChart = MobileChart;
exports.MobileRevenueChart = MobileRevenueChart;
exports.MobileBookingsChart = MobileBookingsChart;
exports.MobilePerformanceChart = MobilePerformanceChart;
exports.SwipeableCharts = SwipeableCharts;
const react_1 = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
const framer_motion_1 = require("framer-motion");
const lucide_react_1 = require("lucide-react");
function MobileChart({ title, subtitle, data, type = 'line', variant = 'trends', height = 200, showTooltip = true, interactive = true, loading = false, error, className }) {
    const [currentIndex, setCurrentIndex] = (0, react_1.useState)(0);
    const [selectedPoint, setSelectedPoint] = (0, react_1.useState)(null);
    const chartRef = (0, react_1.useRef)(null);
    const variantStyles = {
        revenue: {
            primary: 'stroke-[#F97B22]',
            fill: 'fill-[#F97B22]/20',
            background: 'bg-gradient-to-br from-[rgba(249,123,34,0.1)] to-[rgba(249,123,34,0.05)]'
        },
        bookings: {
            primary: 'stroke-blue-500',
            fill: 'fill-blue-500/20',
            background: 'bg-gradient-to-br from-blue-50 to-blue-100/30'
        },
        performance: {
            primary: 'stroke-green-500',
            fill: 'fill-green-500/20',
            background: 'bg-gradient-to-br from-green-50 to-green-100/30'
        },
        trends: {
            primary: 'stroke-purple-500',
            fill: 'fill-purple-500/20',
            background: 'bg-gradient-to-br from-purple-50 to-purple-100/30'
        }
    };
    const styles = variantStyles[variant];
    const formatValue = (value) => {
        if (variant === 'revenue') {
            return `${(value / 1000).toFixed(1)}K DH`;
        }
        if (variant === 'bookings') {
            return value.toLocaleString('fr-FR');
        }
        return value.toString();
    };
    const getChartIcon = () => {
        switch (type) {
            case 'bar': return lucide_react_1.BarChart3;
            case 'donut': return lucide_react_1.PieChart;
            case 'area': return lucide_react_1.Activity;
            default: return lucide_react_1.LineChart;
        }
    };
    const ChartIcon = getChartIcon();
    const renderChart = () => {
        if (!data || data.length === 0)
            return null;
        const maxValue = Math.max(...data.map(d => d.value));
        const minValue = Math.min(...data.map(d => d.value));
        const range = maxValue - minValue;
        const width = 280;
        const padding = 20;
        const chartWidth = width - padding * 2;
        const chartHeight = height - 40;
        const points = data.map((point, index) => {
            const x = padding + (index / (data.length - 1)) * chartWidth;
            const y = padding + chartHeight - ((point.value - minValue) / range) * chartHeight;
            return { x, y, ...point, index };
        });
        const pathData = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
        const areaData = `${pathData} L ${padding + chartWidth} ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`;
        return (<div className="relative">
        <svg width={width} height={height} className="overflow-visible">
          
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (<line key={index} x1={padding} y1={padding + chartHeight - ratio * chartHeight} x2={padding + chartWidth} y2={padding + chartHeight - ratio * chartHeight} stroke="#EDEEEF" strokeWidth="0.5"/>))}
          
          
          {type === 'area' && (<framer_motion_1.motion.path d={areaData} className={styles.fill} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 500, delay: 100 }}/>)}
          
          
          <framer_motion_1.motion.path d={pathData} className={(0, utils_1.cn)('fill-none stroke-2', styles.primary)} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1000, ease: 'easeInOut' }}/>
          
          
          {points.map((point, index) => (<framer_motion_1.motion.circle key={index} cx={point.x} cy={point.y} r="3" className={(0, utils_1.cn)('fill-white', styles.primary)} initial={{ r: 0 }} animate={{ r: 3 }} transition={{ duration: 300, delay: index * 50 }} onClick={() => setSelectedPoint(point)} style={{ cursor: interactive ? 'pointer' : 'default' }}/>))}
          
          
          {points.filter((_, i) => i % Math.ceil(data.length / 4) === 0).map((point, index) => (<text key={index} x={point.x} y={height - 5} textAnchor="middle" className="text-xs fill-text-muted">
              {point.label}
            </text>))}
        </svg>
        
        
        {showTooltip && selectedPoint && (<framer_motion_1.motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
            {selectedPoint.label}: {formatValue(selectedPoint.value)}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"/>
          </framer_motion_1.motion.div>)}
      </div>);
    };
    if (loading) {
        return (<div className={(0, utils_1.cn)('bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6', className)}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-6 bg-[#EDEEEF] rounded w-32"></div>
            <div className="h-6 bg-[#EDEEEF] rounded w-6"></div>
          </div>
          <div className="h-40 bg-[#EDEEEF] rounded"></div>
        </div>
      </div>);
    }
    if (error) {
        return (<div className={(0, utils_1.cn)('bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6', className)}>
        <div className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <lucide_react_1.Activity className="w-6 h-6 text-red-500"/>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
          <p className="text-sm text-red-600">Erreur de chargement: {error}</p>
        </div>
      </div>);
    }
    if (!data || data.length === 0) {
        return (<div className={(0, utils_1.cn)('bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card p-6', className)}>
        <div className="text-center">
          <ChartIcon className="w-12 h-12 text-text-muted mx-auto mb-4"/>
          <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
          <p className="text-sm text-text-muted">Aucune donnée disponible</p>
        </div>
      </div>);
    }
    return (<framer_motion_1.motion.div className={(0, utils_1.cn)('bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card overflow-hidden', className)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 300 }}>
      
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={(0, utils_1.cn)('w-10 h-10 rounded-lg flex items-center justify-center', styles.background)}>
              <ChartIcon className={(0, utils_1.cn)('w-5 h-5', styles.primary.replace('stroke-', 'text-'))}/>
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary font-heading">{title}</h3>
              {subtitle && (<p className="text-sm text-text-secondary">{subtitle}</p>)}
            </div>
          </div>
          
          
          {data.length > 0 && (<div className="text-right">
              <div className="text-lg font-bold text-text-primary">
                {formatValue(data[data.length - 1]?.value || 0)}
              </div>
              {data[data.length - 1]?.change && (<div className={(0, utils_1.cn)('flex items-center space-x-1 text-sm font-medium', (data[data.length - 1].change || 0) >= 0 ? 'text-green-600' : 'text-red-600')}>
                  {(data[data.length - 1].change || 0) >= 0 ? (<lucide_react_1.TrendingUp className="w-4 h-4"/>) : (<lucide_react_1.TrendingDown className="w-4 h-4"/>)}
                  <span>{Math.abs(data[data.length - 1].change || 0)}%</span>
                </div>)}
            </div>)}
        </div>
      </div>

      
      <div className="px-6 pb-6">
        <div className="relative">
          {renderChart()}
        </div>
      </div>

      
      {data.length > 8 && (<div className="flex justify-center space-x-2 pb-4">
          {Array.from({ length: Math.ceil(data.length / 4) }, (_, i) => (<button key={i} onClick={() => setCurrentIndex(i)} className={(0, utils_1.cn)('w-2 h-2 rounded-full transition-all', i === currentIndex ? 'bg-[#F97B22] scale-125' : 'bg-[#EDEEEF]')}/>))}
        </div>)}

      
      {interactive && (<div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedPoint(null)}/>)}
    </framer_motion_1.motion.div>);
}
function MobileRevenueChart({ data, height = 200, className }) {
    return (<MobileChart title="Revenus" data={data} type="area" variant="revenue" height={height} className={className}/>);
}
function MobileBookingsChart({ data, height = 200, className }) {
    return (<MobileChart title="Réservations" data={data} type="bar" variant="bookings" height={height} className={className}/>);
}
function MobilePerformanceChart({ data, height = 200, className }) {
    return (<MobileChart title="Performance" data={data} type="line" variant="performance" height={height} className={className}/>);
}
function SwipeableCharts({ charts, className }) {
    const [activeIndex, setActiveIndex] = (0, react_1.useState)(0);
    const [startX, setStartX] = (0, react_1.useState)(0);
    const [currentX, setCurrentX] = (0, react_1.useState)(0);
    const [isDragging, setIsDragging] = (0, react_1.useState)(false);
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsDragging(true);
    };
    const handleTouchMove = (e) => {
        if (!isDragging)
            return;
        setCurrentX(e.touches[0].clientX - startX);
    };
    const handleTouchEnd = () => {
        if (!isDragging)
            return;
        const threshold = 50;
        if (currentX > threshold && activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
        else if (currentX < -threshold && activeIndex < charts.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
        setIsDragging(false);
        setCurrentX(0);
    };
    return (<div className={(0, utils_1.cn)('relative overflow-hidden', className)}>
      <div className="flex transition-transform duration-300 ease-out" style={{
            transform: `translateX(calc(-${activeIndex * 100}% + ${currentX}px))`,
        }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        {charts.map((chart) => (<div key={chart.id} className="w-full flex-shrink-0">
            <chart.component />
          </div>))}
      </div>

      
      <div className="flex justify-center space-x-2 mt-4">
        {charts.map((_, index) => (<button key={index} onClick={() => setActiveIndex(index)} className={(0, utils_1.cn)('w-2 h-2 rounded-full transition-all', index === activeIndex ? 'bg-[#F97B22] scale-125' : 'bg-[#EDEEEF]')}/>))}
      </div>
    </div>);
}
//# sourceMappingURL=mobile-chart.js.map