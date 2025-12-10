// Bookings Chart Component - Évolution des réservations
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart
} from 'recharts';
import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';
import { BookingsData } from '@/types/analytics';
import { ChartContainer, ChartTooltip, ChartLegend } from './ChartContainer';
import { TooltipFormatter, BookingsChartData } from '@/types/chart-types';

interface BookingsChartProps {
  data: BookingsData[];
  loading?: boolean;
  error?: string | null;
  showTrends?: boolean;
  timeRange?: '7d' | '30d' | '90d';
  className?: string;
  height?: number;
}

export function BookingsChart({
  data,
  loading = false,
  error = null,
  showTrends = true,
  timeRange = '30d',
  className,
  height = 350
}: BookingsChartProps) {
  // Format data for better display
  const chartData = data.map(item => {
    const totalBookings = item.bookings;
    const completionRate = totalBookings > 0 
      ? Math.round((item.completed / totalBookings) * 100) 
      : 0;
    
    return {
      ...item,
      dateFormatted: new Date(item.date).toLocaleDateString('fr-FR', { 
        day: '2-digit', 
        month: '2-digit' 
      }),
      totalBookings,
      completionRate,
      pendingRate: totalBookings > 0 
        ? Math.round((item.pending / totalBookings) * 100) 
        : 0
    };
  });

  // Calculate summary metrics
  const totalBookings = data.reduce((sum, item) => sum + item.bookings, 0);
  const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0);
  const totalCancelled = data.reduce((sum, item) => sum + item.cancelled, 0);
  const completionRate = totalBookings > 0 ? Math.round((totalCompleted / totalBookings) * 100) : 0;

  // Color palette
  const colors = {
    completed: '#22c55e',      // Success green
    cancelled: '#ef4444',      // Error red  
    pending: '#f59e0b',        // Warning amber
    total: '#F97B22',          // Primary orange
    grid: '#F1F5F9',           // Light grid
    text: '#64748b',           // Secondary text
    line: '#3b82f6'            // Trend line blue
  };

  // Tooltip formatter
  const tooltipFormatter: TooltipFormatter = (value: string | number, name: string): [string, string] => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    const labelMap: Record<string, string> = {
      completed: 'Terminées',
      cancelled: 'Annulées',
      pending: 'En attente',
      total: 'Total',
      completionRate: 'Taux de complétion'
    };

    const label = labelMap[name] || name;
    const formattedValue = name.includes('Rate')
      ? `${numValue}%`
      : `${numValue} réservation${numValue > 1 ? 's' : ''}`;

    return [formattedValue, label] as [string, string];
  };

  // Time range display
  const timeRangeLabels = {
    '7d': '7 derniers jours',
    '30d': '30 derniers jours', 
    '90d': '3 derniers mois'
  };

  // Legend items
  const legendItems = [
    { label: 'Terminées', color: colors.completed, value: totalCompleted },
    { label: 'En attente', color: colors.pending, value: data.reduce((sum, item) => sum + item.pending, 0) },
    { label: 'Annulées', color: colors.cancelled, value: totalCancelled }
  ];

  return (
    <ChartContainer
      title="Évolution des réservations"
      subtitle={timeRangeLabels[timeRange]}
      loading={loading}
      error={error}
      className={className}
      height={height}
      actions={
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-600">
            {completionRate}% terminées
          </span>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={colors.grid}
            opacity={0.5}
          />
          
          <XAxis 
            dataKey="dateFormatted"
            axisLine={false}
            tickLine={false}
            tick={{ 
              fill: colors.text, 
              fontSize: 12,
              fontWeight: 500
            }}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ 
              fill: colors.text, 
              fontSize: 12,
              fontWeight: 500
            }}
          />

          {/* Bar for booking status */}
          <Bar 
            dataKey="completed" 
            stackId="bookings"
            fill={colors.completed}
            radius={[0, 0, 0, 0]}
          />
          
          <Bar 
            dataKey="pending" 
            stackId="bookings"
            fill={colors.pending}
            radius={[0, 0, 0, 0]}
          />
          
          <Bar 
            dataKey="cancelled" 
            stackId="bookings"
            fill={colors.cancelled}
            radius={[2, 2, 0, 0]}
          />

          {/* Trend line for completion rate */}
          {showTrends && (
            <Line
              type="monotone"
              dataKey="completionRate"
              stroke={colors.line}
              strokeWidth={2}
              dot={false}
              activeDot={{ 
                r: 4, 
                stroke: colors.line, 
                strokeWidth: 2,
                fill: '#ffffff'
              }}
              yAxisId="right"
            />
          )}

          {/* Right Y axis for completion rate */}
          {showTrends && (
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: colors.text, 
                fontSize: 12,
                fontWeight: 500
              }}
              tickFormatter={(value) => `${value}%`}
            />
          )}

          <Tooltip
            content={<ChartTooltip formatter={tooltipFormatter} />}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#F97B22]">{totalBookings}</div>
          <div className="text-sm text-text-secondary">Total réservations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{totalCompleted}</div>
          <div className="text-sm text-text-secondary">Terminées</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-600">{data.reduce((sum, item) => sum + item.pending, 0)}</div>
          <div className="text-sm text-text-secondary">En attente</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{totalCancelled}</div>
          <div className="text-sm text-text-secondary">Annulées</div>
        </div>
      </div>

      <ChartLegend items={legendItems} />
    </ChartContainer>
  );
}

// Simple bar chart for compact view
export function BookingsBarChart({
  data,
  className,
  height = 200
}: {
  data: BookingsData[];
  className?: string;
  height?: number;
}) {
  const totalBookings = data.reduce((sum, item) => sum + item.bookings, 0);
  const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0);
  const completionRate = totalBookings > 0 ? Math.round((totalCompleted / totalBookings) * 100) : 0;

  return (
    <div
      className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-medium text-text-primary">Réservations ce mois</h4>
          <p className="text-2xl font-bold text-[#F97B22]">
            {totalBookings}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium text-green-500">
            {completionRate}%
          </span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={height - 60}>
        <BarChart data={data.slice(-7)}> {/* Last 7 days */}
          <Bar 
            dataKey="completed" 
            fill="#22c55e"
            radius={[2, 2, 0, 0]}
          />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
            hide 
          />
          <YAxis hide />
          <Tooltip
            formatter={(value: number) => [`${value} réservations`, 'Terminées']}
            labelFormatter={(label: string) => new Date(label).toLocaleDateString('fr-FR')}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Status distribution pie chart component
export function BookingsStatusChart({
  data,
  className,
  size = 200
}: {
  data: BookingsData[];
  className?: string;
  size?: number;
}) {
  const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0);
  const totalCancelled = data.reduce((sum, item) => sum + item.cancelled, 0);
  const totalPending = data.reduce((sum, item) => sum + item.pending, 0);
  const total = totalCompleted + totalCancelled + totalPending;

  const completionRate = total > 0 ? Math.round((totalCompleted / total) * 100) : 0;

  return (
    <div
      className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 ${className}`}
    >
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold text-text-primary">Répartition des réservations</h4>
        <p className="text-3xl font-bold text-[#F97B22] mt-2">{completionRate}%</p>
        <p className="text-sm text-text-secondary">Taux de réussite</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm text-text-secondary">Terminées</span>
          </div>
          <span className="text-sm font-medium text-text-primary">{totalCompleted}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-sm text-text-secondary">En attente</span>
          </div>
          <span className="text-sm font-medium text-text-primary">{totalPending}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-sm text-text-secondary">Annulées</span>
          </div>
          <span className="text-sm font-medium text-text-primary">{totalCancelled}</span>
        </div>
      </div>
    </div>
  );
}