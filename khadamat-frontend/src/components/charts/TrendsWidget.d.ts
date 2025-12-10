import React from 'react';
import { TrendIndicator, AnalyticsInsight } from '@/types/analytics';
interface TrendsWidgetProps {
    trends: TrendIndicator[];
    insights: AnalyticsInsight[];
    loading?: boolean;
    error?: string | null;
    className?: string;
    showInsights?: boolean;
    compact?: boolean;
    enableAnimations?: boolean;
    showForecasting?: boolean;
    showBenchmarks?: boolean;
    timeSeriesData?: any[];
    benchmarkData?: any[];
}
export declare function TrendsWidget({ trends, insights, loading, error, className, showInsights, compact, enableAnimations, showForecasting, showBenchmarks, timeSeriesData, benchmarkData }: TrendsWidgetProps): React.JSX.Element;
export declare function EnhancedTrendIndicatorCard({ trend, className, showProgress, enableAnimations }: {
    trend: TrendIndicator;
    className?: string;
    showProgress?: boolean;
    enableAnimations?: boolean;
}): React.JSX.Element;
export {};
