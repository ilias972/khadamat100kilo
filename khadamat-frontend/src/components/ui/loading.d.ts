import React from 'react';
interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
    className?: string;
    fullScreen?: boolean;
}
export declare const Loading: React.FC<LoadingProps>;
export declare const LoadingSkeleton: React.FC<{
    className?: string;
    lines?: number;
}>;
export declare const LoadingCard: React.FC<{
    className?: string;
}>;
export {};
