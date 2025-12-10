import React from 'react';
import { BookingsData } from '@/types/analytics';
interface BookingsChartProps {
    data: BookingsData[];
    loading?: boolean;
    error?: string | null;
    showTrends?: boolean;
    timeRange?: '7d' | '30d' | '90d';
    className?: string;
    height?: number;
}
export declare function BookingsChart({ data, loading, error, showTrends, timeRange, className, height }: BookingsChartProps): React.JSX.Element;
export declare function BookingsBarChart({ data, className, height }: {
    data: BookingsData[];
    className?: string;
    height?: number;
}): React.JSX.Element;
export declare function BookingsStatusChart({ data, className, size }: {
    data: BookingsData[];
    className?: string;
    size?: number;
}): React.JSX.Element;
export {};
