import { TimePeriod } from '@/types/analytics';
import { DashboardAnalytics, MonthlyRevenueData, BookingsData, PerformanceMetrics, TrendIndicator, BenchmarkData, AnalyticsInsight } from '@/types/analytics';

export declare function useProAnalytics(period?: TimePeriod): {
    analytics: DashboardAnalytics | null;
    loading: boolean;
    error: string | null;
    refreshAnalytics: () => void;
    getRevenueData: () => MonthlyRevenueData[];
    getBookingsData: () => BookingsData[];
    getPerformanceMetrics: () => PerformanceMetrics;
    getTrends: () => TrendIndicator[];
    getInsights: () => AnalyticsInsight[];
    getBenchmarks: () => BenchmarkData[];
    getSummary: () => DashboardAnalytics['summary'];
};
