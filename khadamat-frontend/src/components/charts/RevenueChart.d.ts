import React from 'react';
import { MonthlyRevenueData } from '@/types/analytics';
interface RevenueChartProps {
    data: MonthlyRevenueData[];
    loading?: boolean;
    error?: string | null;
    showTarget?: boolean;
    showGrowth?: boolean;
    className?: string;
    height?: number;
}
export declare function RevenueChart({ data, loading, error, showTarget, showGrowth, className, height }: RevenueChartProps): React.JSX.Element;
export declare function MiniRevenueChart({ data, className, height }: {
    data: MonthlyRevenueData[];
    className?: string;
    height?: number;
}): React.JSX.Element;
export {};
