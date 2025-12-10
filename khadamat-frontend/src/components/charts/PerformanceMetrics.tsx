// Performance Metrics Component - KPIs et métriques de performance
import React from 'react';
import { 
  ResponsiveContainer, 
  RadialBarChart, 
  RadialBar, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star, 
  Users, 
  TrendingUp,
  Award,
  Timer,
  Target
} from 'lucide-react';
import { PerformanceMetrics as PerformanceMetricsType } from '@/types/analytics';
import { ChartContainer } from './ChartContainer';

interface PerformanceMetricsProps {
  data: PerformanceMetricsType;
  loading?: boolean;
  error?: string | null;
  className?: string;
  showDetails?: boolean;
  compact?: boolean;
}

export function PerformanceMetrics({
  data,
  loading = false,
  error = null,
  className,
  showDetails = true,
  compact = false
}: PerformanceMetricsProps) {
  // Color palette
  const colors = {
    success: '#22c55e',
    warning: '#f59e0b', 
    error: '#ef4444',
    primary: '#F97B22',
    secondary: '#3b82f6',
    neutral: '#EDEEEF'
  };

  // Format performance data
  const metrics = [
    {
      key: 'completionRate',
      label: 'Taux de complétion',
      value: data.completionRate,
      target: 90,
      icon: CheckCircle,
      color: colors.success,
      unit: '%'
    },
    {
      key: 'cancellationRate', 
      label: 'Taux d\'annulation',
      value: data.cancellationRate,
      target: 5,
      icon: XCircle,
      color: colors.error,
      unit: '%',
      inverse: true // Lower is better
    },
    {
      key: 'responseTime',
      label: 'Temps de réponse',
      value: data.responseTime,
      target: 1,
      icon: Timer,
      color: colors.warning,
      unit: 'h',
      inverse: true
    },
    {
      key: 'customerSatisfaction',
      label: 'Satisfaction client',
      value: data.customerSatisfaction,
      target: 4.5,
      icon: Star,
      color: colors.primary,
      unit: '/5'
    },
    {
      key: 'repeatCustomers',
      label: 'Clients récurrents',
      value: data.repeatCustomers,
      target: 70,
      icon: Users,
      color: colors.secondary,
      unit: '%'
    },
    {
      key: 'averageRating',
      label: 'Note moyenne',
      value: data.averageRating,
      target: 4.5,
      icon: Award,
      color: colors.primary,
      unit: '/5'
    }
  ];

  // Calculate performance score (0-100)
  const performanceScore = Math.round(
    (data.completionRate * 0.3 + 
     (100 - data.cancellationRate) * 0.2 + 
     (100 - (data.responseTime * 20)) * 0.2 + 
     (data.customerSatisfaction * 20) * 0.15 + 
     data.repeatCustomers * 0.1 + 
     (data.averageRating * 20) * 0.05)
  );

  if (compact) {
    return (
      <div
        className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-text-primary font-heading">Performance</h3>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-2xl font-bold text-green-500">{performanceScore}</span>
            <span className="text-sm text-text-secondary">/100</span>
          </div>
        </div>

        <div className="space-y-3">
          {metrics.slice(0, 3).map((metric) => {
            const IconComponent = metric.icon;
            const progress = Math.min((metric.value / metric.target) * 100, 100);
            const isGood = metric.inverse ? metric.value <= metric.target : metric.value >= metric.target;
            
            return (
              <div key={metric.key} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IconComponent 
                    className="w-4 h-4" 
                    style={{ color: isGood ? metric.color : colors.error }}
                  />
                  <span className="text-sm text-text-secondary">{metric.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-text-primary">
                    {metric.value.toFixed(1)}{metric.unit}
                  </span>
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      isGood ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <ChartContainer
      title="Métriques de performance"
      subtitle="Indicateurs clés de réussite"
      loading={loading}
      error={error}
      className={className}
      height={400}
    >
      {/* Performance Score Circle */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <ResponsiveContainer width={120} height={120}>
            <RadialBarChart
              cx={60}
              cy={60}
              innerRadius={40}
              outerRadius={60}
              barSize={8}
              data={[{ value: performanceScore, fill: performanceScore >= 80 ? colors.success : colors.warning }]}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                background={{ fill: colors.neutral }}
                cornerRadius={10}
                fill={performanceScore >= 80 ? colors.success : colors.warning}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{performanceScore}</div>
              <div className="text-xs text-text-secondary">Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const IconComponent = metric.icon;
          const progress = Math.min((metric.value / metric.target) * 100, 100);
          const isGood = metric.inverse ? metric.value <= metric.target : metric.value >= metric.target;
          
          return (
            <div
              key={metric.key}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                isGood 
                  ? 'border-green-200 bg-green-50/50' 
                  : 'border-red-200 bg-red-50/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <IconComponent 
                  className="w-5 h-5" 
                  style={{ color: isGood ? metric.color : colors.error }}
                />
                {isGood ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
              
              <div className="text-sm text-text-secondary mb-1">{metric.label}</div>
              <div className="text-lg font-bold text-text-primary">
                {metric.value.toFixed(1)}{metric.unit}
              </div>
              
              {/* Progress bar */}
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
                  <span>Objectif: {metric.target}{metric.unit}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(progress, 100)}%`,
                      backgroundColor: isGood ? metric.color : colors.error
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Stats */}
      {showDetails && (
        <div className="mt-6 pt-4 border-t border-border-light">
          <h4 className="text-sm font-medium text-text-primary mb-3">Détails supplémentaires</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total avis:</span>
              <span className="font-medium text-text-primary">{data.totalReviews}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Temps moyen:</span>
              <span className="font-medium text-text-primary">{data.responseTime.toFixed(1)}h</span>
            </div>
          </div>
        </div>
      )}
    </ChartContainer>
  );
}

// Radial Progress Component for single metrics
interface RadialProgressProps {
  value: number;
  target: number;
  label: string;
  color?: string;
  size?: number;
  showPercentage?: boolean;
}

export function RadialProgress({
  value,
  target,
  label,
  color = '#F97B22',
  size = 100,
  showPercentage = true
}: RadialProgressProps) {
  const progress = Math.min((value / target) * 100, 100);
  const isGood = value >= target;
  
  const data = [
    { value: progress, fill: isGood ? color : '#ef4444' },
    { value: 100 - progress, fill: '#EDEEEF' }
  ];

  return (
    <div className="text-center">
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie
            data={data}
            cx={size / 2}
            cy={size / 2}
            startAngle={90}
            endAngle={-270}
            innerRadius={size * 0.4}
            outerRadius={size * 0.5}
            dataKey="value"
            stroke="none"
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="mt-2">
        <div className={`text-lg font-bold ${isGood ? 'text-green-600' : 'text-red-600'}`}>
          {value.toFixed(1)}{showPercentage ? '%' : ''}
        </div>
        <div className="text-xs text-text-secondary">{label}</div>
      </div>
    </div>
  );
}

// Simple performance indicators for dashboard summary
export function PerformanceIndicators({
  data,
  className
}: {
  data: PerformanceMetricsType;
  className?: string;
}) {
  const indicators = [
    {
      label: 'Complétion',
      value: data.completionRate,
      unit: '%',
      color: 'green'
    },
    {
      label: 'Note',
      value: data.averageRating,
      unit: '/5',
      color: 'orange'
    },
    {
      label: 'Réponse',
      value: data.responseTime,
      unit: 'h',
      color: 'blue'
    },
    {
      label: 'Récurrence',
      value: data.repeatCustomers,
      unit: '%',
      color: 'purple'
    }
  ];

  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      {indicators.map((indicator) => (
        <div
          key={indicator.label}
          className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[16px] p-4 text-center"
        >
          <div className="text-xl font-bold text-text-primary">
            {indicator.value.toFixed(1)}{indicator.unit}
          </div>
          <div className="text-xs text-text-secondary mt-1">{indicator.label}</div>
        </div>
      ))}
    </div>
  );
}