// Enhanced Trends Widget Component - Indicateurs de performance vs objectifs
import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Award,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Zap,
  Users,
  Clock,
  DollarSign,
  BarChart3,
  RefreshCw,
  Info,
  Lightbulb,
  TrendingUpIcon,
  Activity
} from 'lucide-react';
import { TrendIndicator, AnalyticsInsight } from '@/types/analytics';

interface TrendsWidgetProps {
  trends: TrendIndicator[];
  insights: AnalyticsInsight[];
  loading?: boolean;
  error?: string | null;
  className?: string;
  showInsights?: boolean;
  compact?: boolean;
  enableAnimations?: boolean;
  showForecasting?: boolean;
  showBenchmarks?: boolean;
  timeSeriesData?: any[];
  benchmarkData?: any[];
}

interface AnimatedCounterProps {
  value: number | string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

interface InteractiveTooltipProps {
  content: string;
  children: React.ReactNode;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  prefix = '',
  suffix = '',
  decimals = 0
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const numericValue = typeof value === 'string' ? parseFloat(value) || 0 : value;
      let startTime: number;
      const startValue = 0;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (numericValue - startValue) * easeOutCubic;
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible, value, duration]);

  return (
    <div ref={elementRef}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </div>
  );
};

const InteractiveTooltip: React.FC<InteractiveTooltipProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsVisible(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsVisible(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {isVisible && (
        <div 
          className="absolute z-50 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-lg max-w-xs pointer-events-none"
          style={{
            left: position.x + 10,
            top: position.y - 40,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="relative">
            {content}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProgressRing: React.FC<{ percentage: number; size?: number; strokeWidth?: number; color?: string }> = ({
  percentage,
  size = 60,
  strokeWidth = 6,
  color = '#F97B22'
}) => {
  const normalizedRadius = (size - strokeWidth * 2) / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        height={size}
        width={size}
        className="transform -rotate-90"
      >
        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-text-primary">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

const SkeletonLoader: React.FC = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

export function TrendsWidget({
  trends,
  insights,
  loading = false,
  error = null,
  className,
  showInsights = true,
  compact = false,
  enableAnimations = true,
  showForecasting = false,
  showBenchmarks = false,
  timeSeriesData = [],
  benchmarkData = []
}: TrendsWidgetProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState('6m');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Color mapping for trend indicators
  const colorMap = {
    green: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      border: 'border-green-200',
      text: 'text-green-700',
      icon: 'text-green-600',
      dot: 'bg-green-500',
      gradient: 'from-green-500 to-emerald-500'
    },
    red: {
      bg: 'bg-gradient-to-br from-red-50 to-rose-50',
      border: 'border-red-200', 
      text: 'text-red-700',
      icon: 'text-red-600',
      dot: 'bg-red-500',
      gradient: 'from-red-500 to-rose-500'
    },
    blue: {
      bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: 'text-blue-600',
      dot: 'bg-blue-500',
      gradient: 'from-blue-500 to-indigo-500'
    },
    orange: {
      bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
      border: 'border-orange-200',
      text: 'text-orange-700', 
      icon: 'text-orange-600',
      dot: 'bg-orange-500',
      gradient: 'from-orange-500 to-amber-500'
    },
    gray: {
      bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
      border: 'border-gray-200',
      text: 'text-gray-700',
      icon: 'text-gray-600',
      dot: 'bg-gray-500',
      gradient: 'from-gray-500 to-slate-500'
    }
  };

  // Get icon component for trend direction
  const getTrendIcon = (percentage: number) => {
    if (percentage > 0) return TrendingUp;
    if (percentage < 0) return TrendingDown;
    return Minus;
  };

  // Format trend value based on type
  const formatTrendValue = (trend: TrendIndicator) => {
    if (typeof trend.value === 'number') {
      if (trend.value >= 1000000) {
        return `${(trend.value / 1000000).toFixed(1)}M`;
      }
      if (trend.value >= 1000) {
        return `${(trend.value / 1000).toFixed(1)}k`;
      }
      return trend.value.toLocaleString('fr-FR');
    }
    return String(trend.value);
  };

  // Get insight icon based on type
  const getInsightIcon = (type: AnalyticsInsight['type']) => {
    const iconMap = {
      success: CheckCircle,
      opportunity: Target,
      warning: AlertTriangle,
      info: Lightbulb
    };
    return iconMap[type] || Award;
  };

  // Get insight colors
  const getInsightColors = (type: AnalyticsInsight['type']) => {
    const colorMap = {
      success: {
        bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
        border: 'border-green-200',
        text: 'text-green-700',
        icon: 'text-green-600'
      },
      opportunity: {
        bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        icon: 'text-blue-600'
      },
      warning: {
        bg: 'bg-gradient-to-br from-orange-50 to-amber-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        icon: 'text-orange-600'
      },
      info: {
        bg: 'bg-gradient-to-br from-purple-50 to-violet-50',
        border: 'border-purple-200',
        text: 'text-purple-700',
        icon: 'text-purple-600'
      }
    };
    return colorMap[type];
  };

  const refreshAnimation = () => {
    setAnimationKey(prev => prev + 1);
  };

  const getGoalProgress = (trend: TrendIndicator, target: number = 100) => {
    const current = typeof trend.value === 'number' ? trend.value : 0;
    return Math.min((current / target) * 100, 100);
  };

  if (loading) {
    return (
      <div className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-border-light p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-text-primary font-heading">Indicateurs de performance</h3>
          <SkeletonLoader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 rounded-[24px] p-6 ${className}`}>
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <div>
            <h3 className="text-lg font-semibold text-red-800">Erreur de chargement</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
        <button 
          onClick={refreshAnimation}
          className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2 inline" />
          Réessayer
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <div
        className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-text-primary font-heading">Tendances clés</h3>
          <InteractiveTooltip content="Données mises à jour en temps réel">
            <button className="text-text-secondary hover:text-text-primary transition-colors">
              <Info className="w-4 h-4" />
            </button>
          </InteractiveTooltip>
        </div>
        
        <div className="space-y-4">
          {trends.slice(0, 3).map((trend, index) => {
            const TrendIcon = getTrendIcon(trend.percentage);
            const colors = colorMap[trend.color];
            const goalProgress = getGoalProgress(trend);
            
            return (
              <div 
                key={`compact-${animationKey}-${index}`}
                className={`${colors.bg} ${colors.border} border rounded-[16px] p-4 transition-all duration-300 hover:shadow-md cursor-pointer transform hover:scale-105`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{trend.icon}</div>
                    <div>
                      <div className="text-sm font-medium text-text-primary">{trend.label}</div>
                      <div className="text-xs text-text-secondary">
                        <AnimatedCounter 
                          value={typeof trend.value === 'number' ? trend.value : 0}
                          prefix={trend.label.includes('€') || trend.label.includes('DH') ? '€' : ''}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <TrendIcon 
                      className={`w-5 h-5 ${trend.isPositive ? 'text-green-500' : 'text-red-500'} transition-transform duration-300 ${hoveredIndex === index ? 'scale-110' : ''}`} 
                    />
                    <div className="text-right">
                      <span 
                        className={`text-sm font-bold ${
                          trend.isPositive ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {enableAnimations ? (
                          <AnimatedCounter
                            value={trend.percentage}
                            prefix={trend.percentage > 0 ? '+' : ''}
                            suffix="%"
                            decimals={1}
                          />
                        ) : (
                          `${trend.percentage > 0 ? '+' : ''}${trend.percentage.toFixed(1)}%`
                        )}
                      </span>
                      <div className="w-16 h-1 bg-gray-200 rounded-full mt-1">
                        <div 
                          className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${goalProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-border-light p-6 ${className}`}
      key={animationKey}
    >
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#F97B22]/10 rounded-lg">
            <BarChart3 className="w-6 h-6 text-[#F97B22]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-text-primary font-heading">Indicateurs de performance</h3>
            <p className="text-sm text-text-secondary">vs Objectifs en temps réel</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-1 text-sm border border-border-light rounded-lg bg-white/50 backdrop-blur-sm"
          >
            <option value="1m">1 mois</option>
            <option value="3m">3 mois</option>
            <option value="6m">6 mois</option>
            <option value="1y">1 an</option>
          </select>
          <InteractiveTooltip content="Actualiser les données">
            <button 
              onClick={refreshAnimation}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-text-secondary" />
            </button>
          </InteractiveTooltip>
        </div>
      </div>

      {/* Enhanced Trends Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {trends.map((trend, index) => {
          const TrendIcon = getTrendIcon(trend.percentage);
          const colors = colorMap[trend.color];
          const isPositive = trend.isPositive;
          const goalProgress = getGoalProgress(trend);
          
          return (
            <div
              key={`trend-${animationKey}-${index}`}
              className={`${colors.bg} ${colors.border} border rounded-[20px] p-6 transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:scale-105 relative overflow-hidden`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <Activity className="w-full h-full" />
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{trend.icon}</div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${colors.dot} ${enableAnimations && hoveredIndex === index ? 'animate-pulse' : ''}`} />
                    <InteractiveTooltip content={`Performance vs mois précédent: ${isPositive ? '+' : ''}${trend.percentage.toFixed(1)}%`}>
                      <Info className="w-4 h-4 text-text-secondary hover:text-text-primary" />
                    </InteractiveTooltip>
                  </div>
                </div>
                
                <div className="text-sm font-medium text-text-secondary mb-2">
                  {trend.label}
                </div>
                
                <div className="text-3xl font-bold text-text-primary mb-3">
                  {enableAnimations ? (
                    <AnimatedCounter 
                      value={typeof trend.value === 'number' ? trend.value : 0}
                      prefix={trend.label.includes('€') || trend.label.includes('DH') ? '€' : ''}
                      decimals={trend.label.includes('note') ? 1 : 0}
                    />
                  ) : (
                    formatTrendValue(trend)
                  )}
                </div>
                
                <div className="space-y-3">
                  {/* Progress Ring */}
                  <div className="flex items-center justify-between">
                    <ProgressRing 
                      percentage={goalProgress} 
                      size={50} 
                      strokeWidth={4}
                      color={isPositive ? '#10B981' : '#EF4444'}
                    />
                    <div className="flex-1 ml-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-text-primary">Objectif</span>
                        <span className="text-xs text-text-secondary">75%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${Math.min(goalProgress, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <TrendIcon 
                        className={`w-4 h-4 ${
                          isPositive ? 'text-green-500' : 'text-red-500'
                        } transition-transform duration-300 ${hoveredIndex === index ? 'scale-110' : ''}`} 
                      />
                      <span 
                        className={`text-sm font-bold ${
                          isPositive ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {enableAnimations ? (
                          <AnimatedCounter
                            value={trend.percentage}
                            prefix={trend.percentage > 0 ? '+' : ''}
                            suffix="%"
                            decimals={1}
                          />
                        ) : (
                          `${trend.percentage > 0 ? '+' : ''}${trend.percentage.toFixed(1)}%`
                        )}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                      vs mois dernier
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Insights Section */}
      {showInsights && insights.length > 0 && (
        <div className="border-t border-border-light pt-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-bold text-text-primary font-heading flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-[#F97B22]" />
              Insights & Recommandations Intelligentes
            </h4>
            <InteractiveTooltip content="Algorithmes d'IA analysent vos performances pour générer des insights personnalisés">
              <button className="text-text-secondary hover:text-text-primary">
                <Info className="w-4 h-4" />
              </button>
            </InteractiveTooltip>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {insights.slice(0, 4).map((insight, index) => {
              const InsightIcon = getInsightIcon(insight.type);
              const colors = getInsightColors(insight.type);
              
              return (
                <div
                  key={`insight-${animationKey}-${index}`}
                  className={`${colors.bg} ${colors.border} border rounded-[20px] p-6 transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:scale-105 relative overflow-hidden`}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                    <InsightIcon className="w-full h-full" />
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`p-3 rounded-lg ${colors.bg} border ${colors.border}`}>
                        <InsightIcon className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className={`text-base font-bold ${colors.text}`}>
                            {insight.title}
                          </h5>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                              insight.priority === 'high' 
                                ? 'bg-red-100 text-red-700'
                                : insight.priority === 'medium'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {insight.priority === 'high' ? '🔴 Priorité haute' :
                               insight.priority === 'medium' ? '🟡 Priorité moyenne' : '🟢 Priorité basse'}
                            </span>
                          </div>
                        </div>
                        
                        <p className={`text-sm ${colors.text} mb-4 leading-relaxed`}>
                          {insight.description}
                        </p>
                        
                        {insight.recommendation && (
                          <div className={`text-sm ${colors.text} p-4 bg-white/70 rounded-xl border ${colors.border} mb-4`}>
                            <div className="flex items-start space-x-2">
                              <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <div>
                                <strong className="block mb-1">💡 Conseil personnalisé:</strong>
                                <p>{insight.recommendation}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className={`text-xs px-2 py-1 rounded-lg ${colors.bg} ${colors.text}`}>
                            {insight.type === 'success' ? '🎉 Succès' :
                             insight.type === 'opportunity' ? '🎯 Opportunité' :
                             insight.type === 'warning' ? '⚠️ Attention' : 'ℹ️ Information'}
                          </div>
                          
                          {insight.actionable && (
                            <button className={`text-sm font-medium ${colors.icon} hover:underline flex items-center space-x-1`}>
                              <span>Voir l'action recommandée</span>
                              <ArrowUp className="w-3 h-3 transform rotate-45" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Benchmark Comparison Section */}
      {showBenchmarks && benchmarkData.length > 0 && (
        <div className="border-t border-border-light pt-6 mt-6">
          <h4 className="text-lg font-bold text-text-primary font-heading mb-6 flex items-center">
            <Award className="w-5 h-5 mr-2 text-[#F97B22]" />
            Comparaisons avec les Professionnels
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benchmarkData.map((benchmark, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-[20px] p-6">
                <div className="text-center">
                  <h5 className="text-sm font-medium text-blue-800 mb-4">{benchmark.category}</h5>
                  
                  <div className="space-y-4">
                    {/* User Value */}
                    <div className="relative">
                      <div className="text-2xl font-bold text-blue-900 mb-1">
                        {typeof benchmark.userValue === 'number' ? 
                          benchmark.userValue.toFixed(1) : benchmark.userValue}
                      </div>
                      <div className="text-xs text-blue-600">Votre valeur</div>
                      <div className="absolute top-0 right-0">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Comparison Bars */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-blue-700">
                        <span>Moyenne</span>
                        <span>{benchmark.averageValue}</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(benchmark.userValue / benchmark.averageValue) * 100}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between text-xs text-blue-700">
                        <span>Top performers</span>
                        <span>{benchmark.topPerformersValue}</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(benchmark.userValue / benchmark.topPerformersValue) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Percentile */}
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-900">
                        {benchmark.percentile}ème percentile
                      </div>
                      <div className="text-xs text-blue-600">vs autres professionnels</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced trend indicator card for dashboard widgets
export function EnhancedTrendIndicatorCard({
  trend,
  className,
  showProgress = true,
  enableAnimations = true
}: {
  trend: TrendIndicator;
  className?: string;
  showProgress?: boolean;
  enableAnimations?: boolean;
}) {
  const TrendIcon = trend.percentage > 0 ? TrendingUp : 
                   trend.percentage < 0 ? TrendingDown : Minus;
  
  const colorMap = {
    green: 'text-green-600',
    red: 'text-red-600',
    blue: 'text-blue-600',
    orange: 'text-orange-600',
    gray: 'text-gray-600'
  };

  return (
    <div
      className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[20px] p-6 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer ${className}`}
    >
      <div className="text-3xl mb-3 transition-transform duration-300 hover:scale-110">
        {trend.icon}
      </div>
      <div className="text-sm text-text-secondary mb-2 font-medium">
        {trend.label}
      </div>
      <div className="text-2xl font-bold text-text-primary mb-3">
        {enableAnimations ? (
          <AnimatedCounter 
            value={typeof trend.value === 'number' ? trend.value : 0}
            prefix={trend.label.includes('€') || trend.label.includes('DH') ? '€' : ''}
            decimals={trend.label.includes('note') ? 1 : 0}
          />
        ) : (
          typeof trend.value === 'number' ? 
            trend.value.toLocaleString('fr-FR') : String(trend.value)
        )}
      </div>
      
      <div className={`flex items-center justify-center space-x-2 ${colorMap[trend.color]} mb-3`}>
        <TrendIcon className="w-5 h-5 transition-transform duration-300" />
        <span className="text-sm font-bold">
          {enableAnimations ? (
            <AnimatedCounter
              value={trend.percentage}
              prefix={trend.percentage > 0 ? '+' : ''}
              suffix="%"
              decimals={1}
            />
          ) : (
            `${trend.percentage > 0 ? '+' : ''}${trend.percentage.toFixed(1)}%`
          )}
        </span>
      </div>
      
      {showProgress && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 bg-gradient-to-r ${
              trend.color === 'green' ? 'from-green-500 to-emerald-500' :
              trend.color === 'red' ? 'from-red-500 to-rose-500' :
              trend.color === 'blue' ? 'from-blue-500 to-indigo-500' :
              trend.color === 'orange' ? 'from-orange-500 to-amber-500' :
              'from-gray-500 to-slate-500'
            } rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(Math.abs(trend.percentage) * 2, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}