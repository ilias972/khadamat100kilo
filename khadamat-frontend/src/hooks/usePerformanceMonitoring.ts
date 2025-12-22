'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  PerformanceMetrics,
  PerformanceRating,
  UsePerformanceMonitoringReturn,
  PerformanceThresholdsMap
} from '@/types/performance-types';

const THRESHOLDS: PerformanceThresholdsMap = {
  fcp: { good: 1800, needsImprovement: 3000, poor: 4000 },
  lcp: { good: 2500, needsImprovement: 4000, poor: 5000 },
  fid: { good: 100, needsImprovement: 300, poor: 500 },
  cls: { good: 0.1, needsImprovement: 0.25, poor: 0.5 },
  ttfb: { good: 800, needsImprovement: 1800, poor: 2500 },
  tti: { good: 3800, needsImprovement: 7300, poor: 10000 }
};

export const usePerformanceMonitoring = (): UsePerformanceMonitoringReturn => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    tti: 0
  });

  const [isSupported, setIsSupported] = useState(false);

  // ✅ CORRECTION : reportMetric est défini AVANT le useEffect qui l'utilise
  const reportMetric = useCallback((name: string, value: number) => {
    // In production, send to analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}:`, value);
    }

    // Send to analytics (e.g., Google Analytics, custom endpoint)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, {
        value: Math.round(value),
        metric_id: name,
        metric_value: value,
        metric_delta: value
      });
    }
  }, []);

  useEffect(() => {
    // Check if Performance API is supported
    if (typeof window === 'undefined' || !('performance' in window)) {
      return;
    }

    setIsSupported(true);

    // Use basic Performance API for core web vitals
    const measureWebVitals = () => {
      try {
        // Measure basic navigation timing
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const ttfb = navigation.responseStart - navigation.requestStart;
          setMetrics((prev) => ({ ...prev, ttfb }));
          reportMetric('TTFB', ttfb);
        }

        // Use PerformanceObserver for paint metrics
        if ('PerformanceObserver' in window) {
          // First Contentful Paint
          const fcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name === 'first-contentful-paint') {
                setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
                reportMetric('FCP', entry.startTime);
              }
            }
          });
          fcpObserver.observe({ entryTypes: ['paint'] });

          // Largest Contentful Paint
          const lcpObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              setMetrics((prev) => ({ ...prev, lcp: entry.startTime }));
              reportMetric('LCP', entry.startTime);
            }
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            setMetrics((prev) => ({ ...prev, cls: clsValue }));
            reportMetric('CLS', clsValue);
          });
          clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
      } catch (error) {
        console.warn('Performance monitoring not fully available:', error);
      }
    };

    measureWebVitals();

    // Measure Time to Interactive (TTI) using Performance Observer
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'measure' && entry.name === 'tti') {
              setMetrics((prev) => ({ ...prev, tti: entry.duration }));
            }
          }
        });
        observer.observe({ entryTypes: ['measure'] });
      } catch (error) {
        console.warn('PerformanceObserver not supported:', error);
      }
    }
  }, [reportMetric]); // ✅ reportMetric ajouté aux dépendances

  const getMetricRating = useCallback((metricName: keyof PerformanceMetrics, value: number): PerformanceRating => {
    const threshold = THRESHOLDS[metricName as keyof PerformanceThresholdsMap];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  }, []);

  const getOverallScore = useCallback((): number => {
    const scores = {
      fcp: getMetricRating('fcp', metrics.fcp) === 'good' ? 100 : getMetricRating('fcp', metrics.fcp) === 'needs-improvement' ? 50 : 0,
      lcp: getMetricRating('lcp', metrics.lcp) === 'good' ? 100 : getMetricRating('lcp', metrics.lcp) === 'needs-improvement' ? 50 : 0,
      fid: getMetricRating('fid', metrics.fid) === 'good' ? 100 : getMetricRating('fid', metrics.fid) === 'needs-improvement' ? 50 : 0,
      cls: getMetricRating('cls', metrics.cls) === 'good' ? 100 : getMetricRating('cls', metrics.cls) === 'needs-improvement' ? 50 : 0
    };

    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Math.round(total / Object.keys(scores).length);
  }, [metrics, getMetricRating]);

  return {
    metrics,
    performanceScore: getOverallScore(),
    isMonitoring: isSupported,
    getMetricRating,
    getOverallScore,
    lazyLoadImage: performanceUtils.lazyLoadImage,
    debounce: performanceUtils.debounce,
    throttle: performanceUtils.throttle,
    requestIdleCallback: performanceUtils.requestIdleCallback,
    cancelIdleCallback: performanceUtils.cancelIdleCallback,
    measureRender: performanceUtils.measureRender,
    getBundleSize: performanceUtils.getBundleSize,
    prefersReducedMotion: performanceUtils.prefersReducedMotion,
    getConnectionInfo: performanceUtils.getConnectionInfo,
    shouldLoadHighQuality: performanceUtils.shouldLoadHighQuality
  };
};

// Performance optimization utilities
export const performanceUtils = {
  // Preload critical resources
  preloadResource: (href: string, as: string) => {
    if (typeof document === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  },

  // Prefetch next page resources
  prefetchPage: (href: string) => {
    if (typeof document === 'undefined') return;

    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    document.head.appendChild(link);
  },

  // Lazy load images with Intersection Observer
  lazyLoadImage: (img: HTMLImageElement, src: string) => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src;
            observer.unobserve(img);
          }
        });
      });
      observer.observe(img);
    } else {
      img.src = src;
    }
  },

  // Debounce function for performance
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  },

  // Throttle function for performance
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Request Idle Callback wrapper
  requestIdleCallback: (callback: () => void, options?: { timeout?: number }) => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      return (window as any).requestIdleCallback(callback, options);
    } else {
      return setTimeout(callback, 1);
    }
  },

  // Cancel Idle Callback wrapper
  cancelIdleCallback: (id: number) => {
    if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
      (window as any).cancelIdleCallback(id);
    } else {
      clearTimeout(id);
    }
  },

  // Measure component render time
  measureRender: (componentName: string, callback: () => void) => {
    if (typeof performance === 'undefined') {
      callback();
      return;
    }

    const startMark = `${componentName}-start`;
    const endMark = `${componentName}-end`;
    const measureName = `${componentName}-render`;

    performance.mark(startMark);
    callback();
    performance.mark(endMark);

    try {
      performance.measure(measureName, startMark, endMark);
      const measure = performance.getEntriesByName(measureName)[0];
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Render Time] ${componentName}:`, measure.duration.toFixed(2), 'ms');
      }

      // Clean up marks and measures
      performance.clearMarks(startMark);
      performance.clearMarks(endMark);
      performance.clearMeasures(measureName);
    } catch (error) {
      console.warn('Performance measurement failed:', error);
    }
  },

  // Get bundle size information
  getBundleSize: async (): Promise<{ total: number; chunks: any[] }> => {
    if (typeof window === 'undefined') {
      return { total: 0, chunks: [] };
    }

    try {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      const scripts = resources.filter(r => r.initiatorType === 'script');
      
      const total = scripts.reduce((sum, script) => sum + (script.transferSize || 0), 0);
      const chunks = scripts.map(script => ({
        name: script.name,
        size: script.transferSize,
        duration: script.duration
      }));

      return { total, chunks };
    } catch (error) {
      console.warn('Failed to get bundle size:', error);
      return { total: 0, chunks: [] };
    }
  },

  // Check if user prefers reduced motion
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  // Get connection information
  getConnectionInfo: (): { effectiveType: string; downlink: number; rtt: number } | null => {
    if (typeof navigator === 'undefined' || !('connection' in navigator)) {
      return null;
    }

    const connection = (navigator as any).connection;
    return {
      effectiveType: connection.effectiveType || 'unknown',
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0
    };
  },

  // Adaptive loading based on connection
  shouldLoadHighQuality: (): boolean => {
    const connection = performanceUtils.getConnectionInfo();
    if (!connection) return true;

    // Load high quality on 4g and above
    return connection.effectiveType === '4g' || connection.effectiveType === '5g';
  }
};

// Simplified performance monitoring hook
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    tti: 0
  });

  const [isSupported, setIsSupported] = useState(false);

  const getMetricRating = useCallback((metricName: keyof PerformanceMetrics, value: number): PerformanceRating => {
    const threshold = THRESHOLDS[metricName as keyof PerformanceThresholdsMap];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  }, []);

  const getOverallScore = useCallback((): number => {
    const scores = {
      fcp: getMetricRating('fcp', metrics.fcp) === 'good' ? 100 : getMetricRating('fcp', metrics.fcp) === 'needs-improvement' ? 50 : 0,
      lcp: getMetricRating('lcp', metrics.lcp) === 'good' ? 100 : getMetricRating('lcp', metrics.lcp) === 'needs-improvement' ? 50 : 0,
      cls: getMetricRating('cls', metrics.cls) === 'good' ? 100 : getMetricRating('cls', metrics.cls) === 'needs-improvement' ? 50 : 0
    };

    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Math.round(total / Object.keys(scores).length);
  }, [metrics, getMetricRating]);

  const reportMetric = useCallback((name: string, value: number) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}:`, value);
    }
  }, []);

  return {
    metrics,
    isSupported,
    getMetricRating,
    getOverallScore,
    reportMetric
  };
};