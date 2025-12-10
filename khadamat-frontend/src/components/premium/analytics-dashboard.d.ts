import React from 'react';
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
export declare const AnalyticsDashboard: React.FC<AnalyticsDashboardProps>;
export declare const generateMockMetrics: (userType: "client" | "professional") => MetricData[];
export {};
