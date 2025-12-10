// Base Chart Container Component with Warm-Tech Design System
import React from 'react';
import { cn } from '@/lib/utils';
import { Loading } from '@/components/ui/loading';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  loading?: boolean;
  error?: string | null;
  className?: string;
  actions?: React.ReactNode;
  height?: number;
  showBorder?: boolean;
}

export function ChartContainer({
  title,
  subtitle,
  children,
  loading = false,
  error = null,
  className,
  actions,
  height = 300,
  showBorder = true
}: ChartContainerProps) {
  if (loading) {
    return (
      <div
        className={cn(
          'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)]',
          showBorder && 'border border-border-light',
          className
        )}
        style={{ height: `${height + 80}px` }} // Extra height for header
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-text-primary font-heading">{title}</h3>
              {subtitle && (
                <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
              )}
            </div>
            {actions}
          </div>
          <div className="flex items-center justify-center h-full">
            <Loading size="md" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-red-200',
          className
        )}
        style={{ height: `${height + 80}px` }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-text-primary font-heading">{title}</h3>
              {subtitle && (
                <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
              )}
            </div>
            {actions}
          </div>
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚠️</span>
              </div>
              <p className="text-red-600 font-medium mb-2">Erreur de chargement</p>
              <p className="text-sm text-text-secondary">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)]',
        showBorder && 'border border-border-light',
        className
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-text-primary font-heading">{title}</h3>
            {subtitle && (
              <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
            )}
          </div>
          {actions}
        </div>
        <div style={{ height: `${height}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Chart Legend Component for consistent styling
interface ChartLegendProps {
  items: Array<{
    label: string;
    color: string;
    value?: string | number;
  }>;
  className?: string;
}

export function ChartLegend({ items, className }: ChartLegendProps) {
  return (
    <div className={cn('flex flex-wrap gap-4 justify-center mt-4', className)}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm text-text-secondary">{item.label}</span>
          {item.value && (
            <span className="text-sm font-medium text-text-primary">{item.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

// Chart Tooltip Component with warm-tech styling
interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: any, name: string) => [string, string];
}

export function ChartTooltip({ active, payload, label, formatter }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white/95 backdrop-blur-sm border border-border-light rounded-lg shadow-lg p-3">
      {label && (
        <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
      )}
      {payload.map((entry, index) => {
        const formattedValue = formatter 
          ? formatter(entry.value, entry.dataKey)[0] 
          : entry.value.toLocaleString();
        
        return (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-text-secondary">
              {formatter ? formatter(entry.value, entry.dataKey)[1] : entry.dataKey}:
            </span>
            <span className="text-sm font-medium text-text-primary">
              {formattedValue}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Responsive container for charts
interface ResponsiveChartContainerProps {
  children: React.ReactNode;
  aspectRatio?: number; // width / height
  className?: string;
}

export function ResponsiveChartContainer({ 
  children, 
  aspectRatio = 16 / 9, 
  className 
}: ResponsiveChartContainerProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <div
        className="w-full"
        style={{
          paddingBottom: `${100 / aspectRatio}%`
        }}
      />
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}