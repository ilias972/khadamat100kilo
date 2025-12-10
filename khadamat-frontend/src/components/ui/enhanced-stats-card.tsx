'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { microInteractions } from '@/lib/animations';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  DollarSign, 
  Users, 
  Calendar, 
  Star, 
  Award,
  Activity,
  Target,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface TrendIndicator {
  value: number;
  isPositive: boolean;
  label?: string;
  period?: string;
}

interface ProgressIndicator {
  current: number;
  target: number;
  label?: string;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: 'default' | 'compact' | 'detailed' | 'mobile' | 'list';
  size?: 'sm' | 'md' | 'lg';
  trend?: TrendIndicator;
  progress?: ProgressIndicator;
  loading?: boolean;
  error?: string;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline' | 'ghost';
  }>;
  interactive?: boolean;
  showProgress?: boolean;
  color?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export function EnhancedStatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  size = 'md',
  trend,
  progress,
  loading = false,
  error,
  actions,
  interactive = false,
  showProgress = false,
  color = 'default',
  className
}: StatsCardProps) {
  const isCompact = variant === 'compact';
  const isMobile = variant === 'mobile';
  const isDetailed = variant === 'detailed';
  const isList = variant === 'list';

  const colorVariants = {
    default: {
      iconBg: 'bg-[#F97B22]/10',
      iconColor: 'text-[#F97B22]',
      accentColor: 'text-[#F97B22]'
    },
    success: {
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      accentColor: 'text-green-600'
    },
    warning: {
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      accentColor: 'text-yellow-600'
    },
    error: {
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      accentColor: 'text-red-600'
    },
    info: {
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      accentColor: 'text-blue-600'
    }
  };

  const colorScheme = colorVariants[color];
  const sizeClasses = {
    sm: {
      container: 'p-3',
      icon: 'w-8 h-8',
      text: {
        title: 'text-xs',
        value: 'text-lg font-bold',
        subtitle: 'text-xs'
      }
    },
    md: {
      container: 'p-6',
      icon: 'w-12 h-12',
      text: {
        title: 'text-sm',
        value: 'text-3xl font-bold',
        subtitle: 'text-sm'
      }
    },
    lg: {
      container: 'p-8',
      icon: 'w-16 h-16',
      text: {
        title: 'text-base',
        value: 'text-4xl font-bold',
        subtitle: 'text-base'
      }
    }
  };

  const cardSizes = sizeClasses[size];

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString('fr-FR');
    }
    return val;
  };

  const renderTrendIcon = () => {
    if (!trend) return null;
    
    const trendColor = trend.isPositive ? 'text-green-600' : 'text-red-600';
    
    if (isCompact) {
      return (
        <div className={cn('flex items-center space-x-1', trendColor)}>
          {trend.isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          <span className="text-xs font-medium">{Math.abs(trend.value)}%</span>
        </div>
      );
    }
    
    return (
      <div className={cn('flex items-center space-x-2', trendColor)}>
        {trend.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span className="text-sm font-medium">
          {trend.isPositive ? '+' : ''}{trend.value}%
          {trend.period && <span className="text-text-muted"> {trend.period}</span>}
        </span>
      </div>
    );
  };

  const renderProgress = () => {
    if (!progress || !showProgress) return null;
    
    const percentage = Math.min((progress.current / progress.target) * 100, 100);
    
    return (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-secondary">{progress.label || 'Progression'}</span>
          <span className="text-xs font-medium text-text-primary">
            {progress.current.toLocaleString()} / {progress.target.toLocaleString()}
          </span>
        </div>
        <div className="w-full bg-[#EDEEEF] rounded-full h-2">
          <motion.div
            className={cn('h-2 rounded-full', colorScheme.accentColor.replace('text-', 'bg-'))}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1000, ease: 'easeOut' }}
          />
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className={cn('flex items-center justify-between', cardSizes.container)}>
          <div className="flex-1">
            <div className="animate-pulse">
              <div className="h-4 bg-[#EDEEEF] rounded mb-2"></div>
              <div className="h-8 bg-[#EDEEEF] rounded mb-2"></div>
              <div className="h-3 bg-[#EDEEEF] rounded w-2/3"></div>
            </div>
          </div>
          <div className="w-12 h-12 bg-[#EDEEEF] rounded-full animate-pulse"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className={cn('flex items-center justify-between', cardSizes.container)}>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-500">Erreur de chargement</span>
            </div>
            <p className="text-xs text-text-muted">{error}</p>
          </div>
        </div>
      );
    }

    return (
      <div className={cn('flex items-center justify-between', cardSizes.container)}>
        <div className="flex-1">
          <p className={cn('font-medium text-text-secondary mb-1', cardSizes.text.title)}>
            {title}
          </p>
          
          <p className={cn('text-text-primary mb-1', cardSizes.text.value)}>
            {formatValue(value)}
          </p>
          
          {subtitle && (
            <p className={cn('text-text-secondary', cardSizes.text.subtitle)}>
              {subtitle}
            </p>
          )}
          
          {/* Trend indicator */}
          {!isCompact && renderTrendIcon()}
          
          {/* Progress indicator */}
          {isDetailed && renderProgress()}
          
          {/* Actions */}
          {actions && actions.length > 0 && (
            <div className={cn('flex flex-wrap gap-2 mt-4', isCompact ? 'mt-2' : 'mt-4')}>
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={cn(
                    'px-3 py-1 rounded-lg text-sm font-medium transition-colors',
                    action.variant === 'outline' 
                      ? 'border border-border-light text-text-secondary hover:bg-[#F97B22]/10 hover:text-[#F97B22]'
                      : 'bg-[#F97B22]/10 text-[#F97B22] hover:bg-[#F97B22]/20'
                  )}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Icon */}
        <div className={cn(
          'rounded-full flex items-center justify-center ml-4',
          cardSizes.icon,
          colorScheme.iconBg
        )}>
          <Icon className={cn(cardSizes.icon.replace('w-', 'w-').replace('h-', 'h-'), colorScheme.iconColor)} />
        </div>
      </div>
    );
  };

  const baseClasses = cn(
    'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-card',
    'border border-white/20 transition-all duration-200',
    interactive && 'cursor-pointer hover:shadow-card-hover hover:scale-[1.02]',
    {
      'p-3': isCompact || variant === 'mobile',
      'p-6': variant === 'default',
      'p-8': isDetailed,
      'flex items-center space-x-4 p-4': isList
    },
    interactive && 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]',
    className
  );

  if (interactive) {
    return (
      <motion.div
        className={baseClasses}
        whileHover={microInteractions.cardTilt}
        whileTap={{ scale: 0.98 }}
      >
        {renderContent()}
      </motion.div>
    );
  }

  return <div className={baseClasses}>{renderContent()}</div>;
}

// Quick stats cards for mobile
interface MobileKPICardProps {
  title: string;
  value: string | number;
  trend?: TrendIndicator;
  variant?: 'revenue' | 'bookings' | 'rating' | 'growth';
  size?: 'sm' | 'md';
  className?: string;
}

export function MobileKPICard({
  title,
  value,
  trend,
  variant = 'revenue',
  size = 'md',
  className
}: MobileKPICardProps) {
  const variants = {
    revenue: {
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    bookings: {
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    rating: {
      icon: Star,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100'
    },
    growth: {
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  };

  const config = variants[variant];
  const Icon = config.icon;

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (variant === 'revenue' && val >= 1000) {
        return `${(val / 1000).toFixed(1)}K DH`;
      }
      return val.toLocaleString('fr-FR');
    }
    return val;
  };

  return (
    <div className={cn(
      'bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-white/20',
      'hover:shadow-lg transition-all duration-200',
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', config.bg)}>
          <Icon className={cn('w-4 h-4', config.color)} />
        </div>
        {trend && (
          <div className={cn(
            'flex items-center space-x-1 text-xs font-medium',
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            {trend.isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            <span>{Math.abs(trend.value)}%</span>
          </div>
        )}
      </div>
      
      <div className="text-left">
        <p className="text-xs text-text-secondary mb-1">{title}</p>
        <p className="text-lg font-bold text-text-primary">{formatValue(value)}</p>
      </div>
    </div>
  );
}

// Animated counter component
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = value * easeOutCubic;
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <span className={className}>
      {prefix}{displayValue.toFixed(decimals)}{suffix}
    </span>
  );
}