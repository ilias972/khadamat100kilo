import React from 'react';
interface LazySectionProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    rootMargin?: string;
    threshold?: number;
}
export declare const LazySection: React.FC<LazySectionProps>;
export {};
