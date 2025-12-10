import React from 'react';
interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    variant?: 'text' | 'rectangular' | 'circular';
    animate?: boolean;
}
export declare function Skeleton({ className, width, height, variant, animate }: SkeletonProps): React.JSX.Element;
interface ShimmerSkeletonProps extends SkeletonProps {
    shimmerColor?: string;
    backgroundColor?: string;
}
export declare function ShimmerSkeleton({ className, shimmerColor, backgroundColor, ...props }: ShimmerSkeletonProps): React.JSX.Element;
export declare function BookingCardSkeleton({ variant }: {
    variant?: 'default' | 'compact' | 'mobile';
}): React.JSX.Element;
export declare function StatsCardSkeleton({ variant }: {
    variant?: 'default' | 'compact' | 'mobile';
}): React.JSX.Element;
export declare function ChartSkeleton({ height }: {
    height?: number;
}): React.JSX.Element;
export declare function MessageCardSkeleton(): React.JSX.Element;
export declare function DashboardSkeleton({ type }: {
    type?: 'client' | 'pro';
}): React.JSX.Element;
export declare function ProDashboardSkeleton(): React.JSX.Element;
export declare function ClientDashboardSkeleton(): React.JSX.Element;
export declare function MobileDashboardSkeleton(): React.JSX.Element;
interface ProgressiveSkeletonProps {
    loaded?: boolean;
    fallback?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
export declare function ProgressiveSkeleton({ loaded, fallback, children, className }: ProgressiveSkeletonProps): React.JSX.Element;
export declare function SkeletonList({ count, component: Component, className }: {
    count?: number;
    component: React.ComponentType;
    className?: string;
}): React.JSX.Element;
export declare function TableSkeleton({ rows, columns }: {
    rows?: number;
    columns?: number;
}): React.JSX.Element;
export declare function InfiniteLoadingSkeleton(): React.JSX.Element;
export {};
