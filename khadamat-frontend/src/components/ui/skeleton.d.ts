import React from 'react';
interface SkeletonProps {
    className?: string;
    variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
    animated?: boolean;
    lines?: number;
}
export declare const Skeleton: React.FC<SkeletonProps>;
export declare const SkeletonCard: React.FC<{
    className?: string;
}>;
export declare const SkeletonList: React.FC<{
    count?: number;
    className?: string;
}>;
export declare const SkeletonGrid: React.FC<{
    count?: number;
    className?: string;
}>;
export declare const LoadingOverlay: React.FC<{
    children: React.ReactNode;
    loading?: boolean;
    className?: string;
}>;
export {};
