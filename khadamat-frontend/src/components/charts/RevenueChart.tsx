// Revenue Chart Component - Évolution des revenus mensuels
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MonthlyRevenueData } from '@/types/analytics';
import { ChartContainer, ChartTooltip, ChartLegend } from './ChartContainer';

interface RevenueChartProps {
  data: MonthlyRevenueData[];
  loading?: boolean;
  error?: string | null;
  showTarget?: boolean;
  showGrowth?: boolean;
  className?: string;
  height?: number;
}

export function RevenueChart({
  data,
  loading = false,
  error = null,
  showTarget = true,
  showGrowth = true,
  className,
  height = 350
}: RevenueChartProps) {
  // Format data for Recharts
  const chartData = data.map(item => ({
    ...item,
    revenueFormatted: item.revenue.toLocaleString('fr-FR'),
    targetFormatted: item.target?.toLocaleString('fr-FR'),
    growthFormatted: item.growth ? `${item.growth > 0 ? '+' : ''}${item.growth}%` : '0%'
  }));

  // Calculate growth indicator
  const latestRevenue = data[data.length - 1]?.revenue || 0;
  const previousRevenue = data[data.length - 2]?.revenue || 0;
  const growthRate = previousRevenue > 0 
    ? ((latestRevenue - previousRevenue) / previousRevenue * 100)
    : 0;

  // Color palette from warm-tech design system
  const colors = {
    revenue: '#F97B22',           // Primary orange
    target: '#EDEEEF',            // Neutral gray
    grid: '#F1F5F9',              // Light grid
    text: '#64748b',              // Secondary text
    success: '#22c55e',           // Green for positive growth
    error: '#ef4444'              // Red for negative growth
  };

  // Custom tooltip formatter
  const tooltipFormatter = (value: any, name: string): [string, string] => {
    const formattedValue = typeof value === 'number'
      ? `${value.toLocaleString('fr-FR')} DH`
      : value;
    const label = name === 'revenue' ? 'Revenus' :
                 name === 'target' ? 'Objectif' : name;
    return [formattedValue, label] as [string, string];
  };

  // Legend items
  const legendItems = [
    { 
      label: 'Revenus réalisés', 
      color: colors.revenue,
      value: `${latestRevenue.toLocaleString('fr-FR')} DH`
    }
  ];

  if (showTarget) {
    legendItems.push({
      label: 'Objectif mensuel',
      color: colors.target,
      value: data[data.length - 1]?.target?.toLocaleString('fr-FR') || '0'
    });
  }

  const trendIcon = growthRate > 0 ? TrendingUp : TrendingDown;
  const trendColor = growthRate > 0 ? colors.success : colors.error;

  return (
    <ChartContainer
      title="Évolution des revenus"
      subtitle="6 derniers mois"
      loading={loading}
      error={error}
      className={className}
      height={height}
      actions={
        showGrowth && (
          <div className="flex items-center space-x-2">
            {React.createElement(trendIcon, { 
              className: "w-4 h-4", 
              style: { color: trendColor }
            })}
            <span 
              className="text-sm font-medium"
              style={{ color: trendColor }}
            >
              {growthRate > 0 ? '+' : ''}{growthRate.toFixed(1)}%
            </span>
          </div>
        )
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            {/* Gradient for area fill */}
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.revenue} stopOpacity={0.1}/>
              <stop offset="95%" stopColor={colors.revenue} stopOpacity={0}/>
            </linearGradient>
          </defs>

          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={colors.grid}
            opacity={0.5}
          />
          
          <XAxis 
            dataKey="label"
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
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />

          {/* Target line */}
          {showTarget && (
            <ReferenceLine
              y={data[data.length - 1]?.target}
              stroke={colors.target}
              strokeDasharray="5 5"
              strokeWidth={2}
              ifOverflow="extendDomain"
            />
          )}

          {/* Revenue area (for better visual impact) */}
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={colors.revenue}
            fillOpacity={1}
            fill="url(#revenueGradient)"
            strokeWidth={0}
          />

          {/* Revenue line */}
          <Line
            type="monotone"
            dataKey="revenue"
            stroke={colors.revenue}
            strokeWidth={3}
            dot={{ 
              fill: colors.revenue, 
              strokeWidth: 2, 
              r: 4,
              stroke: '#ffffff'
            }}
            activeDot={{ 
              r: 6, 
              stroke: colors.revenue, 
              strokeWidth: 2,
              fill: '#ffffff'
            }}
          />

          {/* Target line (if showing targets) */}
          {showTarget && (
            <Line
              type="monotone"
              dataKey="target"
              stroke={colors.target}
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={false}
            />
          )}

          <Tooltip
            content={<ChartTooltip formatter={tooltipFormatter} />}
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Growth indicator */}
      {showGrowth && (
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-text-secondary">
              Évolution par rapport au mois dernier
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {React.createElement(trendIcon, { 
              className: "w-4 h-4",
              style: { color: trendColor }
            })}
            <span 
              className="text-sm font-semibold"
              style={{ color: trendColor }}
            >
              {growthRate > 0 ? '+' : ''}{growthRate.toFixed(1)}%
            </span>
          </div>
        </div>
      )}

      {/* Legend */}
      <ChartLegend items={legendItems} />
    </ChartContainer>
  );
}

// Simplified version for compact displays
export function MiniRevenueChart({
  data,
  className,
  height = 200
}: {
  data: MonthlyRevenueData[];
  className?: string;
  height?: number;
}) {
  const latestRevenue = data[data.length - 1]?.revenue || 0;
  const previousRevenue = data[data.length - 2]?.revenue || 0;
  const growthRate = previousRevenue > 0 
    ? ((latestRevenue - previousRevenue) / previousRevenue * 100)
    : 0;

  return (
    <div
      className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-medium text-text-primary">Revenus ce mois</h4>
          <p className="text-2xl font-bold text-[#F97B22]">
            {latestRevenue.toLocaleString('fr-FR')} DH
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <TrendingUp className={`w-4 h-4 ${growthRate > 0 ? 'text-green-500' : 'text-red-500'}`} />
          <span className={`text-sm font-medium ${growthRate > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {growthRate > 0 ? '+' : ''}{growthRate.toFixed(1)}%
          </span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={height - 60}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#F97B22"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, stroke: '#F97B22', strokeWidth: 2, fill: '#ffffff' }}
          />
          <XAxis dataKey="label" hide />
          <YAxis hide />
          <Tooltip
            formatter={(value: any) => [`${value.toLocaleString('fr-FR')} DH`, 'Revenus']}
            labelFormatter={(label) => `Mois: ${label}`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}