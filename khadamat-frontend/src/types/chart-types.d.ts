/**
 * Comprehensive type definitions for chart components
 * Replaces `any` usage in chart-related components
 */

import { ReactElement } from 'react';

/**
 * Chart Data Point - Represents a single data point in a chart
 */
export interface ChartDataPoint {
  x: string | number | Date;
  y: number | null;
  label?: string;
  color?: string;
  metadata?: Record<string, unknown>;
  [key: string]: unknown; // Allow additional properties for flexibility
}

/**
 * Chart Series - Represents a series of data points
 */
export interface ChartSeries {
  id: string;
  name: string;
  data: ChartDataPoint[];
  color?: string;
  type?: 'line' | 'bar' | 'area';
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  [key: string]: unknown; // Allow additional properties
}

/**
 * Tooltip Formatter Function
 */
export type TooltipFormatter = (value: number | string, name: string) => [string, string];

/**
 * Chart Container Props
 */
export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  loading?: boolean;
  error?: string | null;
  className?: string;
  height?: number;
  actions?: ReactElement;
  children: ReactElement;
}

/**
 * Chart Tooltip Props
 */
export interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number | string;
    color?: string;
    [key: string]: unknown;
  }>;
  label?: string;
  formatter?: TooltipFormatter;
}

/**
 * Chart Legend Item
 */
export interface ChartLegendItem {
  label: string;
  color: string;
  value: number | string;
  [key: string]: unknown;
}

/**
 * Chart Legend Props
 */
export interface ChartLegendProps {
  items: ChartLegendItem[];
  className?: string;
}

/**
 * Time Series Data Point
 */
export interface TimeSeriesDataPoint {
  date: string | Date;
  value: number;
  label?: string;
  [key: string]: unknown;
}

/**
 * Time Series Data
 */
export interface TimeSeriesData {
  id?: string;
  name?: string;
  data: TimeSeriesDataPoint[];
  color?: string;
  [key: string]: unknown;
}

/**
 * Benchmark Comparison Data
 */
export interface BenchmarkComparisonData {
  id: string;
  name: string;
  value: number;
  benchmarkValue: number;
  difference: number;
  percentage: number;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
  [key: string]: unknown;
}

/**
 * Trends Widget Data
 */
export interface TrendsWidgetData {
  timeSeriesData?: TimeSeriesData[];
  benchmarkData?: BenchmarkComparisonData[];
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Performance Metrics for Charts
 */
export interface ChartPerformanceMetrics {
  renderTime?: number;
  dataPoints?: number;
  seriesCount?: number;
  [key: string]: unknown;
}

/**
 * Chart Configuration Options
 */
export interface ChartConfig {
  colors?: {
    primary?: string;
    secondary?: string;
    success?: string;
    warning?: string;
    error?: string;
    [key: string]: string | undefined;
  };
  gradients?: {
    primary?: string;
    secondary?: string;
    [key: string]: string | undefined;
  };
  animation?: {
    duration?: number;
    easing?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Generic Chart Props
 */
export interface GenericChartProps<T = unknown> {
  data: T[];
  config?: ChartConfig;
  height?: number;
  responsive?: boolean;
  animate?: boolean;
  className?: string;
  loading?: boolean;
  error?: string | null;
  onDataPointClick?: (data: T, index: number) => void;
  [key: string]: unknown;
}

/**
 * Bookings Chart Specific Types
 */
export interface BookingsChartData extends ChartDataPoint {
  date: string;
  bookings: number;
  completed: number;
  cancelled: number;
  pending: number;
  dateFormatted?: string;
  totalBookings?: number;
  completionRate?: number;
  pendingRate?: number;
}

/**
 * Revenue Chart Specific Types
 */
export interface RevenueChartData extends ChartDataPoint {
  date: string;
  revenue: number;
  bookings?: number;
  averageValue?: number;
  formattedRevenue?: string;
}

/**
 * Status Distribution Data
 */
export interface StatusDistribution {
  completed: number;
  cancelled: number;
  pending: number;
  total: number;
  completionRate: number;
}

/**
 * Chart Event Handlers
 */
export interface ChartEventHandlers {
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<SVGElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<SVGElement>) => void;
  [key: string]: ((event: React.MouseEvent<SVGElement>) => void) | undefined;
}