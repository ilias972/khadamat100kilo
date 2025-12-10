import React from 'react';
interface ChartContainerProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    loading?: boolean;
    error?: string | null;
    className?: string;
    actions?: React.ReactNode;
    height?: number;
    showBorder?: boolean;
}
export declare function ChartContainer({ title, subtitle, children, loading, error, className, actions, height, showBorder }: ChartContainerProps): React.JSX.Element;
interface ChartLegendProps {
    items: Array<{
        label: string;
        color: string;
        value?: string | number;
    }>;
    className?: string;
}
export declare function ChartLegend({ items, className }: ChartLegendProps): React.JSX.Element;
interface ChartTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
    formatter?: (value: any, name: string) => [string, string];
}
export declare function ChartTooltip({ active, payload, label, formatter }: ChartTooltipProps): React.JSX.Element | null;
interface ResponsiveChartContainerProps {
    children: React.ReactNode;
    aspectRatio?: number;
    className?: string;
}
export declare function ResponsiveChartContainer({ children, aspectRatio, className }: ResponsiveChartContainerProps): React.JSX.Element;
export {};
