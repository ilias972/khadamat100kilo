import React from 'react';
interface TrendIndicator {
    value: number;
    isPositive: boolean;
    label?: string;
    period?: string;
}
interface ProgressIndicator {
    current: number;
    target: number;
    label?: string;
}
interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    variant?: 'default' | 'compact' | 'detailed' | 'mobile' | 'list';
    size?: 'sm' | 'md' | 'lg';
    trend?: TrendIndicator;
    progress?: ProgressIndicator;
    loading?: boolean;
    error?: string;
    actions?: Array<{
        label: string;
        onClick: () => void;
        variant?: 'default' | 'outline' | 'ghost';
    }>;
    interactive?: boolean;
    showProgress?: boolean;
    color?: 'default' | 'success' | 'warning' | 'error' | 'info';
    className?: string;
}
export declare function EnhancedStatsCard({ title, value, subtitle, icon: Icon, variant, size, trend, progress, loading, error, actions, interactive, showProgress, color, className }: StatsCardProps): React.JSX.Element;
interface MobileKPICardProps {
    title: string;
    value: string | number;
    trend?: TrendIndicator;
    variant?: 'revenue' | 'bookings' | 'rating' | 'growth';
    size?: 'sm' | 'md';
    className?: string;
}
export declare function MobileKPICard({ title, value, trend, variant, size, className }: MobileKPICardProps): React.JSX.Element;
interface AnimatedCounterProps {
    value: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    className?: string;
}
export declare function AnimatedCounter({ value, duration, decimals, prefix, suffix, className }: AnimatedCounterProps): React.JSX.Element;
export {};
