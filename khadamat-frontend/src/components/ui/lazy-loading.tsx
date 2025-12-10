'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { scrollAnimations, microInteractions } from '@/lib/animations';
import { LoadingSpinner } from './feedback-system';

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

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallbackSrc,
  className,
  containerClassName,
  blurDataURL,
  priority = false,
  placeholder = 'blur',
  onLoad,
  onError,
  ...imgProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(fallbackSrc || src);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "50px" });

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    if (currentSrc !== fallbackSrc && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    }
    onError?.();
  }, [currentSrc, fallbackSrc, onError]);

  useEffect(() => {
    if (!isInView && !priority) return;

    const img = new Image();
    img.src = src;
    img.onload = handleLoad;
    img.onerror = handleError;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, isInView, priority, handleLoad, handleError]);

  const shouldShowImage = isLoaded && !hasError && (isInView || priority);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', containerClassName)}
    >
      {/* Placeholder */}
      <AnimatePresence>
        {!shouldShowImage && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'absolute inset-0 flex items-center justify-center bg-gray-100',
              className
            )}
          >
            {placeholder === 'blur' && blurDataURL ? (
              <img
                src={blurDataURL}
                alt=""
                className="w-full h-full object-cover filter blur-sm scale-110"
                aria-hidden="true"
              />
            ) : placeholder === 'empty' ? (
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            ) : (
              placeholder
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading spinner */}
      <AnimatePresence>
        {!isLoaded && !hasError && (isInView || priority) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <LoadingSpinner size="md" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main image */}
      <AnimatePresence>
        {shouldShowImage && (
          <motion.div
            className={cn('w-full h-full', className)}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img
              ref={imgRef}
              src={currentSrc}
              alt={alt}
              className="w-full h-full object-cover"
              {...imgProps}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error state */}
      {hasError && (
        <div className={cn(
          'absolute inset-0 flex items-center justify-center bg-gray-100',
          className
        )}>
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-sm">Image non disponible</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Lazy section component for content blocks
interface LazySectionProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  animationType?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'scale' | 'stagger';
  staggerDelay?: number;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  className,
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  triggerOnce = true,
  animationType = 'fade',
  staggerDelay = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    amount: threshold,
    margin: rootMargin as any,
    once: triggerOnce
  });

  if (animationType === 'stagger') {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay
            }
          }
        }}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Default animations
  const getInitialVariant = () => {
    switch (animationType) {
      case 'fade':
        return { opacity: 0, y: 30 };
      case 'slide-up':
        return { opacity: 0, y: 50 };
      case 'slide-left':
        return { opacity: 0, x: -50 };
      case 'slide-right':
        return { opacity: 0, x: 50 };
      case 'scale':
        return { opacity: 0, scale: 0.9 };
      default:
        return { opacity: 0, y: 30 };
    }
  };

  const getAnimateVariant = () => {
    switch (animationType) {
      case 'fade':
        return { opacity: 1, y: 0 };
      case 'slide-up':
        return { opacity: 1, y: 0 };
      case 'slide-left':
        return { opacity: 1, x: 0 };
      case 'slide-right':
        return { opacity: 1, x: 0 };
      case 'scale':
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialVariant()}
      animate={isInView ? getAnimateVariant() : getInitialVariant()}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
};

// Infinite scroll component
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

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  hasNextPage,
  isLoading,
  onLoadMore,
  threshold = 100,
  className,
  loadingComponent,
  endMessage
}) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(loadMoreRef, { amount: 0.1 });

  useEffect(() => {
    if (isInView && hasNextPage && !isLoading) {
      onLoadMore();
    }
  }, [isInView, hasNextPage, isLoading, onLoadMore]);

  return (
    <div className={className}>
      {children}

      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center py-8"
        >
          {loadingComponent || (
            <div className="flex items-center space-x-2 text-gray-600">
              <LoadingSpinner size="md" />
              <span>Chargement...</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Load more trigger */}
      {hasNextPage && !isLoading && (
        <div ref={loadMoreRef} className="h-4" />
      )}

      {/* End message */}
      {!hasNextPage && !isLoading && endMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8 text-gray-500"
        >
          {endMessage}
        </motion.div>
      )}
    </div>
  );
};

// Progressive image loading with multiple quality levels
interface ProgressiveImageProps extends Omit<LazyImageProps, 'srcSet'> {
  qualitySrcSet?: {
    low: string;
    medium: string;
    high: string;
  };
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  qualitySrcSet,
  ...props
}) => {
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('low');
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

  useEffect(() => {
    if (!qualitySrcSet) return;

    // Load medium quality after a short delay
    const mediumTimer = setTimeout(() => {
      setQuality('medium');
    }, 100);

    // Load high quality after longer delay
    const highTimer = setTimeout(() => {
      setQuality('high');
      setIsHighQualityLoaded(true);
    }, 500);

    return () => {
      clearTimeout(mediumTimer);
      clearTimeout(highTimer);
    };
  }, [qualitySrcSet]);

  const currentSrc = qualitySrcSet ? qualitySrcSet[quality] : props.src;

  return (
    <LazyImage
      {...props}
      src={currentSrc}
      className={cn(
        props.className,
        !isHighQualityLoaded && 'filter blur-sm',
        isHighQualityLoaded && 'filter-none'
      )}
      onLoad={() => {
        if (quality === 'high') {
          setIsHighQualityLoaded(true);
        }
        props.onLoad?.();
      }}
    />
  );
};

// Virtualized list for large datasets
interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
}

export const VirtualizedList = <T,>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className,
  overscan = 5
}: VirtualizedListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      className={cn('overflow-auto', className)}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <motion.div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: itemHeight }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// Intersection observer hook for custom lazy loading logic
export const useLazyLoad = (options?: IntersectionObserverInit) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const ref = useRef<Element | null>(null);

  const setRef = useCallback((node: Element | null) => {
    if (ref.current) {
      // Cleanup previous observer
      const observer = new IntersectionObserver(() => {}, options);
      observer.disconnect();
    }

    ref.current = node;

    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting && !hasBeenInView) {
            setHasBeenInView(true);
          }
        },
        options
      );

      observer.observe(node);

      return () => observer.disconnect();
    }
  }, [options, hasBeenInView]);

  return { ref: setRef, isInView, hasBeenInView };
};