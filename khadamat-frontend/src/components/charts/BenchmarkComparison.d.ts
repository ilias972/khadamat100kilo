import React from 'react';
interface BenchmarkData {
    category: string;
    userValue: number;
    averageValue: number;
    topPerformersValue: number;
    percentile: number;
    trend: 'up' | 'down' | 'stable';
    improvement: number;
    badge?: string;
    icon: React.ComponentType<any>;
    description: string;
    target?: number;
    monthlyChange?: number;
}
interface BenchmarkComparisonProps {
    data: BenchmarkData[];
    loading?: boolean;
    error?: string | null;
    className?: string;
    title?: string;
    showImprovements?: boolean;
    enableAnimations?: boolean;
    category?: string;
    maxItems?: number;
}
export declare function BenchmarkComparison({ data, loading, error, className, title, showImprovements, enableAnimations, category, maxItems }: BenchmarkComparisonProps): React.JSX.Element;
export {};
