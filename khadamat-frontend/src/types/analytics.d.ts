import { ChartSeries, TimeSeriesDataPoint } from './performance-types';

export interface MonthlyRevenueData {
    month: string;
    label: string;
    revenue: number;
    bookings: number;
    target?: number;
    growth?: number;
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
    responseTime: number;
    customerSatisfaction: number;
    repeatCustomers: number;
    averageRating: number;
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
    percentile: number;
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
    data: ChartSeries[];
    config: ChartConfig;
    height?: number;
    responsive?: boolean;
    animate?: boolean;
    className?: string;
}
export type TimePeriod = '7d' | '30d' | '3m' | '6m' | '1y' | 'all';
export interface TimeSeriesData {
    date: string;
    value: number;
    label?: string;
}
