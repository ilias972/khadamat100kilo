/**
 * Comprehensive type definitions for performance monitoring and utilities
 * Replaces `any` usage in performance-related hooks and utilities
 */

/**
 * Performance Metric Rating
 */
export type PerformanceRating = 'good' | 'needs-improvement' | 'poor';

/**
 * Performance Metric Name
 */
export type PerformanceMetricName =
  | 'fcp' // First Contentful Paint
  | 'lcp' // Largest Contentful Paint
  | 'fid' // First Input Delay
  | 'cls' // Cumulative Layout Shift
  | 'ttfb' // Time to First Byte
  | 'tti'; // Time to Interactive

/**
 * Performance Metrics Interface
 */
export interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  tti: number;
}

/**
 * Performance Thresholds
 */
export interface PerformanceThresholds {
  fcp: { good: number; needsImprovement: number };
  lcp: { good: number; needsImprovement: number };
  fid: { good: number; needsImprovement: number };
  cls: { good: number; needsImprovement: number };
  ttfb: { good: number; needsImprovement: number };
}

/**
 * Performance Score
 */
export interface PerformanceScore {
  overall: number;
  metrics: Record<PerformanceMetricName, PerformanceRating>;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
}

/**
 * Performance Entry Type
 */
export type PerformanceEntryType =
  | 'navigation'
  | 'resource'
  | 'paint'
  | 'measure'
  | 'mark'
  | 'largest-contentful-paint'
  | 'layout-shift';

/**
 * Performance Observer Entry
 */
export interface PerformanceObserverEntry {
  name: string;
  entryType: PerformanceEntryType;
  startTime: number;
  duration: number;
  [key: string]: unknown;
}

/**
 * Bundle Size Information
 */
export interface BundleSizeInfo {
  total: number;
  chunks: Array<{
    name: string;
    size: number;
    duration: number;
  }>;
}

/**
 * Connection Information
 */
export interface ConnectionInfo {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | '5g' | string;
  downlink: number;
  rtt: number;
  saveData?: boolean;
}

/**
 * Performance Budget
 */
export interface PerformanceBudget {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  bundleSize: number;
  imageSize: number;
}

/**
 * Performance Report
 */
export interface PerformanceReport {
  timestamp: string;
  url: string;
  metrics: PerformanceMetrics;
  score: PerformanceScore;
  budget: PerformanceBudget;
  violations: Array<{
    metric: PerformanceMetricName;
    value: number;
    threshold: number;
    severity: 'error' | 'warning';
  }>;
  recommendations: string[];
}

/**
 * Lazy Loading Options
 */
export interface LazyLoadingOptions {
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

/**
 * Debounce Options
 */
export interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

/**
 * Throttle Options
 */
export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

/**
 * Request Idle Callback Options
 */
export interface RequestIdleCallbackOptions {
  timeout?: number;
}

/**
 * Performance Hook Return Type
 */
export interface UsePerformanceMonitoringReturn {
  metrics: PerformanceMetrics | null;
  performanceScore: number | null;
  isMonitoring: boolean;
  getMetricRating: (metric: keyof PerformanceMetrics, value: number) => PerformanceRating;
  lazyLoadImage: (img: HTMLImageElement, src: string, options?: LazyLoadingOptions) => void;
  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number,
    options?: DebounceOptions
  ) => (...args: Parameters<T>) => void;
  throttle: <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number,
    options?: ThrottleOptions
  ) => (...args: Parameters<T>) => void;
  requestIdleCallback: (
    callback: () => void,
    options?: RequestIdleCallbackOptions
  ) => number;
  cancelIdleCallback: (id: number) => void;
  measureRender: (componentName: string, callback: () => void) => void;
  getBundleSize: () => Promise<BundleSizeInfo>;
  prefersReducedMotion: () => boolean;
  getConnectionInfo: () => ConnectionInfo | null;
  shouldLoadHighQuality: () => boolean;
}

/**
 * Performance Utilities
 */
export interface PerformanceUtils {
  preloadResource: (href: string, as: string) => void;
  prefetchPage: (href: string) => void;
  lazyLoadImage: (img: HTMLImageElement, src: string, options?: LazyLoadingOptions) => void;
  debounce: <T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number,
    options?: DebounceOptions
  ) => (...args: Parameters<T>) => void;
  throttle: <T extends (...args: unknown[]) => unknown>(
    func: T,
    limit: number,
    options?: ThrottleOptions
  ) => (...args: Parameters<T>) => void;
  requestIdleCallback: (
    callback: () => void,
    options?: RequestIdleCallbackOptions
  ) => number;
  cancelIdleCallback: (id: number) => void;
  measureRender: (componentName: string, callback: () => void) => void;
  getBundleSize: () => Promise<BundleSizeInfo>;
  prefersReducedMotion: () => boolean;
  getConnectionInfo: () => ConnectionInfo | null;
  shouldLoadHighQuality: () => boolean;
}

/**
 * Render Performance Measurement
 */
export interface RenderMeasurement {
  componentName: string;
  startTime: number;
  endTime: number;
  duration: number;
  timestamp: string;
}

/**
 * Performance Event
 */
export interface PerformanceEvent {
  type: 'metric' | 'violation' | 'recommendation';
  name: string;
  value: number | string;
  timestamp: string;
  context?: Record<string, unknown>;
}

/**
 * Performance Observer Callback
 */
export type PerformanceObserverCallback = (
  entries: PerformanceObserverEntry[],
  observer: PerformanceObserver
) => void;

/**
 * Performance Mark Options
 */
export interface PerformanceMarkOptions {
  detail?: unknown;
  startTime?: number;
}

/**
 * Performance Measure Options
 */
export interface PerformanceMeasureOptions {
  detail?: unknown;
  startTime?: number;
  endTime?: number;
}

/**
 * Web Vitals Metric
 */
export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: PerformanceRating;
  timestamp: number;
  navigationType?: string;
}

/**
 * Performance Timeline Entry
 */
export interface PerformanceTimelineEntry {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
  toJSON: () => Record<string, unknown>;
}

/**
 * Resource Timing Entry
 */
export interface PerformanceResourceTiming extends PerformanceTimelineEntry {
  initiatorType: string;
  transferSize: number;
  encodedBodySize: number;
  decodedBodySize: number;
  responseStart: number;
  responseEnd: number;
  requestStart: number;
  connectStart: number;
  connectEnd: number;
  domainLookupStart: number;
  domainLookupEnd: number;
}

/**
 * Navigation Timing Entry
 */
export interface PerformanceNavigationTiming extends PerformanceTimelineEntry {
  domContentLoadedEventStart: number;
  domContentLoadedEventEnd: number;
  domInteractive: number;
  domComplete: number;
  loadEventStart: number;
  loadEventEnd: number;
  responseStart: number;
  responseEnd: number;
  requestStart: number;
  connectStart: number;
  connectEnd: number;
  domainLookupStart: number;
  domainLookupEnd: number;
  fetchStart: number;
  redirectStart: number;
  redirectEnd: number;
  secureConnectionStart: number;
  unloadEventStart: number;
  unloadEventEnd: number;
}