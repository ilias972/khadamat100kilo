import React from 'react';
interface ChartDataPoint {
    label: string;
    value: number;
    date?: string;
    change?: number;
    color?: string;
}
interface MobileChartProps {
    title: string;
    subtitle?: string;
    data: ChartDataPoint[];
    type?: 'line' | 'bar' | 'area' | 'donut';
    variant?: 'revenue' | 'bookings' | 'performance' | 'trends';
    height?: number;
    showTooltip?: boolean;
    interactive?: boolean;
    loading?: boolean;
    error?: string;
    className?: string;
}
export declare function MobileChart({ title, subtitle, data, type, variant, height, showTooltip, interactive, loading, error, className }: MobileChartProps): React.JSX.Element;
interface MobileRevenueChartProps {
    data: ChartDataPoint[];
    height?: number;
    className?: string;
}
export declare function MobileRevenueChart({ data, height, className }: MobileRevenueChartProps): React.JSX.Element;
interface MobileBookingsChartProps {
    data: ChartDataPoint[];
    height?: number;
    className?: string;
}
export declare function MobileBookingsChart({ data, height, className }: MobileBookingsChartProps): React.JSX.Element;
interface MobilePerformanceChartProps {
    data: ChartDataPoint[];
    height?: number;
    className?: string;
}
export declare function MobilePerformanceChart({ data, height, className }: MobilePerformanceChartProps): React.JSX.Element;
interface SwipeableChartsProps {
    charts: Array<{
        id: string;
        title: string;
        component: React.ComponentType;
    }>;
    className?: string;
}
export declare function SwipeableCharts({ charts, className }: SwipeableChartsProps): React.JSX.Element;
export {};
