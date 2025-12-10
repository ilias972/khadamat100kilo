'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { entranceAnimations, microInteractions } from '@/lib/animations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Clock,
  Star,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Award,
  RefreshCw,
  Download,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  MessageSquare,
  Heart,
  Share2
} from 'lucide-react';

export interface MetricData {
  id: string;
  label: string;
  value: number | string;
  previousValue?: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  format?: 'number' | 'currency' | 'percentage' | 'time' | 'rating';
  icon?: React.ComponentType<any>;
  color?: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface ChartData {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'pie' | 'area';
  data: any[];
  period: 'day' | 'week' | 'month' | 'year';
}

interface AnalyticsDashboardProps {
  userType: 'client' | 'professional';
  metrics: MetricData[];
  charts?: ChartData[];
  timeRange?: '7d' | '30d' | '90d' | '1y';
  onTimeRangeChange?: (range: string) => void;
  onExport?: () => void;
  onRefresh?: () => void;
  className?: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  userType,
  metrics,
  charts = [],
  timeRange = '30d',
  onTimeRangeChange,
  onExport,
  onRefresh,
  className
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState(timeRange);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedCharts, setExpandedCharts] = useState<Set<string>>(new Set());

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const toggleChartExpansion = (chartId: string) => {
    const newExpanded = new Set(expandedCharts);
    if (newExpanded.has(chartId)) {
      newExpanded.delete(chartId);
    } else {
      newExpanded.add(chartId);
    }
    setExpandedCharts(newExpanded);
  };

  const formatValue = (value: number | string, format?: string) => {
    if (typeof value === 'string') return value;

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

  const getChangeColor = (change?: number, changeType?: string) => {
    if (!change) return 'text-gray-500';

    if (changeType === 'increase' || change > 0) return 'text-green-600';
    if (changeType === 'decrease' || change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const getChangeIcon = (change?: number, changeType?: string) => {
    if (!change) return null;

    if (changeType === 'increase' || change > 0) return TrendingUp;
    if (changeType === 'decrease' || change < 0) return TrendingDown;
    return null;
  };

  const timeRangeOptions = [
    { value: '7d', label: '7 jours' },
    { value: '30d', label: '30 jours' },
    { value: '90d', label: '90 jours' },
    { value: '1y', label: '1 an' }
  ];

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Analytics & Performances
          </h2>
          <p className="text-gray-600 mt-1">
            Suivez vos statistiques et tendances
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Time Range Selector */}
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => {
                setSelectedPeriod(e.target.value as any);
                onTimeRangeChange?.(e.target.value);
              }}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {timeRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Actions */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center space-x-2"
          >
            <RefreshCw className={cn('w-4 h-4', isRefreshing && 'animate-spin')} />
            <span>Actualiser</span>
          </Button>

          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Exporter</span>
            </Button>
          )}
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="visible"
      >
        {metrics.map((metric, index) => {
          const ChangeIcon = getChangeIcon(metric.change, metric.changeType);
          const changeColor = getChangeColor(metric.change, metric.changeType);

          return (
            <motion.div
              key={metric.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <Card className="p-4 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {metric.icon && (
                      <div className={cn(
                        'p-2 rounded-lg',
                        metric.color || 'bg-primary-100 text-primary-600'
                      )}>
                        <metric.icon className="w-5 h-5" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatValue(metric.value, metric.format)}
                      </p>
                    </div>
                  </div>

                  {/* Trend Indicator */}
                  {metric.change !== undefined && (
                    <div className={cn('flex items-center space-x-1 text-sm', changeColor)}>
                      {ChangeIcon && <ChangeIcon className="w-4 h-4" />}
                      <span className="font-medium">
                        {metric.change > 0 ? '+' : ''}{metric.change}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Progress Bar for some metrics */}
                {metric.trend && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>Tendance</span>
                      <span className={cn(
                        metric.trend === 'up' && 'text-green-600',
                        metric.trend === 'down' && 'text-red-600',
                        metric.trend === 'stable' && 'text-gray-600'
                      )}>
                        {metric.trend === 'up' && '↗️ Augmentation'}
                        {metric.trend === 'down' && '↘️ Diminution'}
                        {metric.trend === 'stable' && '→ Stable'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={cn(
                          'h-2 rounded-full',
                          metric.trend === 'up' && 'bg-green-500',
                          metric.trend === 'down' && 'bg-red-500',
                          metric.trend === 'stable' && 'bg-gray-500'
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      {charts.length > 0 && (
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Analyses détaillées
            </h3>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Activity className="w-3 h-3" />
              <span>Temps réel</span>
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {charts.map((chart, index) => (
              <motion.div
                key={chart.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card className="overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900">
                        {chart.title}
                      </h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleChartExpansion(chart.id)}
                        className="p-1"
                      >
                        {expandedCharts.has(chart.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Période: {chart.period === 'day' ? 'Aujourd\'hui' :
                               chart.period === 'week' ? 'Cette semaine' :
                               chart.period === 'month' ? 'Ce mois' : 'Cette année'}
                    </p>
                  </div>

                  <AnimatePresence>
                    {expandedCharts.has(chart.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4"
                      >
                        {/* Placeholder for chart - in real app, use recharts or similar */}
                        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Graphique {chart.type}</p>
                            <p className="text-xs">Intégration en cours</p>
                          </div>
                        </div>

                        {/* Chart insights */}
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Tendance générale:</span>
                            <Badge variant="success" className="flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3" />
                              <span>+12%</span>
                            </Badge>
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Insights Section */}
      <motion.div
        className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Zap className="w-5 h-5 text-primary-600" />
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
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Objectif atteint</span>
            </div>
            <p className="text-sm text-gray-600">
              Vous avez dépassé votre objectif de réservations de 15% ce mois-ci.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">Tendance positive</span>
            </div>
            <p className="text-sm text-gray-600">
              Vos avis clients ont augmenté de 0.3 points en moyenne.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-900">Recommandation</span>
            </div>
            <p className="text-sm text-gray-600">
              Augmentez vos tarifs de 5-10% pour optimiser vos revenus.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Mock data generators for demo
export const generateMockMetrics = (userType: 'client' | 'professional'): MetricData[] => {
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
        icon: Calendar,
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
        icon: DollarSign,
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
        icon: Star,
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
        icon: MessageSquare,
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
      icon: DollarSign,
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
      icon: Calendar,
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
      icon: Star,
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
      icon: Eye,
      color: 'bg-indigo-100 text-indigo-600',
      trend: 'up'
    }
  ];
};