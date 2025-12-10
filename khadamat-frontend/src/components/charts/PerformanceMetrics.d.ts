import React from 'react';
import { PerformanceMetrics as PerformanceMetricsType } from '@/types/analytics';
interface PerformanceMetricsProps {
    data: PerformanceMetricsType;
    loading?: boolean;
    error?: string | null;
    className?: string;
    showDetails?: boolean;
    compact?: boolean;
}
export declare function PerformanceMetrics({ data, loading, error, className, showDetails, compact }: PerformanceMetricsProps): React.JSX.Element;
interface RadialProgressProps {
    value: number;
    target: number;
    label: string;
    color?: string;
    size?: number;
    showPercentage?: boolean;
}
export declare function RadialProgress({ value, target, label, color, size, showPercentage }: RadialProgressProps): React.JSX.Element;
export declare function PerformanceIndicators({ data, className }: {
    data: PerformanceMetricsType;
    className?: string;
}): React.JSX.Element;
export {};
