import React from 'react';
interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    fallbackSrc?: string;
    className?: string;
    containerClassName?: string;
    blurDataURL?: string;
    priority?: boolean;
    quality?: number;
    placeholder?: 'blur' | 'empty' | React.ReactElement;
    onLoad?: () => void;
    onError?: () => void;
}
export declare const LazyImage: React.FC<LazyImageProps>;
interface LazySectionProps {
    children: React.ReactNode;
    className?: string;
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    animationType?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'stagger';
    staggerDelay?: number;
}
export declare const LazySection: React.FC<LazySectionProps>;
interface InfiniteScrollProps {
    children: React.ReactNode;
    hasNextPage: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
    threshold?: number;
    className?: string;
    loadingComponent?: React.ReactNode;
    endMessage?: React.ReactNode;
}
export declare const InfiniteScroll: React.FC<InfiniteScrollProps>;
interface ProgressiveImageProps extends Omit<LazyImageProps, 'srcSet'> {
    qualitySrcSet?: {
        low: string;
        medium: string;
        high: string;
    };
}
export declare const ProgressiveImage: React.FC<ProgressiveImageProps>;
interface VirtualizedListProps<T> {
    items: T[];
    itemHeight: number;
    containerHeight: number;
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
    overscan?: number;
}
export declare const VirtualizedList: <T>({ items, itemHeight, containerHeight, renderItem, className, overscan }: VirtualizedListProps<T>) => React.JSX.Element;
export declare const useLazyLoad: (options?: IntersectionObserverInit) => {
    ref: (node: Element | null) => (() => void) | undefined;
    isInView: boolean;
    hasBeenInView: boolean;
};
export {};
