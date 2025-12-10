import React from 'react';
interface ForecastData {
    date: string;
    actual?: number;
    forecast: number;
    lower_bound?: number;
    upper_bound?: number;
    trend: 'up' | 'down' | 'stable';
    confidence: number;
}
interface ForecastingChartProps {
    data: ForecastData[];
    title?: string;
    loading?: boolean;
    error?: string | null;
    className?: string;
    showConfidence?: boolean;
    showTarget?: boolean;
    target?: number;
    enableAnimations?: boolean;
    height?: number;
    type?: 'line' | 'area' | 'bar';
    period?: 'weekly' | 'monthly' | 'quarterly';
}
export declare function ForecastingChart({ data, title, loading, error, className, showConfidence, showTarget, target, enableAnimations, height, type, period }: ForecastingChartProps): React.JSX.Element;
export {};
