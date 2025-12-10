// Types for Analytics Data Visualization

export interface MonthlyRevenueData {
  month: string; // Format: "2024-06"
  label: string; // Format: "Juin"
  revenue: number;
  bookings: number;
  target?: number;
  growth?: number; // Percentage growth vs previous month
}

export interface BookingsData {
  date: string;
  bookings: number;
  completed: number;
  cancelled: number;
  pending: number;
}

export interface PerformanceMetrics {
  completionRate: number;
  cancellationRate: number;
  responseTime: number; // in hours
  customerSatisfaction: number; // 1-5 scale
  repeatCustomers: number; // percentage
  averageRating: number; // 1-5 scale
  totalReviews: number;
}

export interface TrendIndicator {
  label: string;
  value: number;
  percentage: number;
  isPositive: boolean;
  icon: string;
  color: 'green' | 'red' | 'blue' | 'orange' | 'gray';
}

export interface BenchmarkData {
  category: string;
  userValue: number;
  averageValue: number;
  topPerformersValue: number;
  percentile: number; // 0-100
}

export interface AnalyticsInsight {
  type: 'opportunity' | 'warning' | 'success' | 'info';
  title: string;
  description: string;
  actionable: boolean;
  priority: 'high' | 'medium' | 'low';
  recommendation?: string;
}

export interface DashboardAnalytics {
  revenue: MonthlyRevenueData[];
  bookings: BookingsData[];
  performance: PerformanceMetrics;
  trends: TrendIndicator[];
  benchmarks: BenchmarkData[];
  insights: AnalyticsInsight[];
  summary: {
    totalRevenue: number;
    totalBookings: number;
    averageBookingValue: number;
    growthRate: number;
    period: string;
  };
}

// Chart configuration types
export interface ChartConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    neutral: string;
  };
  gradients: {
    primary: string;
    secondary: string;
  };
}

export interface ChartProps {
  data: any[];
  config: ChartConfig;
  height?: number;
  responsive?: boolean;
  animate?: boolean;
  className?: string;
}

// Time period types
export type TimePeriod = '7d' | '30d' | '3m' | '6m' | '1y' | 'all';

export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}