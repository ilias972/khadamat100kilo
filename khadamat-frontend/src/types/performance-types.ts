/**
 * Performance Monitoring Types
 *
 * Type-safe definitions for performance monitoring and optimization utilities
 */

// Performance Event Types
export type PerformanceEventType =
  | 'paint'
  | 'largest-contentful-paint'
  | 'first-input'
  | 'layout-shift'
  | 'navigation'
  | 'measure';

export interface PerformanceEvent {
  entryType: PerformanceEventType;
  name: string;
  startTime: number;
  duration?: number;
  value?: number;
  hadRecentInput?: boolean;
  processingStart?: number;
  responseStart?: number;
}

export interface PaintEvent extends PerformanceEvent {
  entryType: 'paint';
  name: 'first-contentful-paint' | 'first-paint';
}

export interface LargestContentfulPaintEvent extends PerformanceEvent {
  entryType: 'largest-contentful-paint';
}

export interface FirstInputEvent extends PerformanceEvent {
  entryType: 'first-input';
  processingStart: number;
}

export interface LayoutShiftEvent extends PerformanceEvent {
  entryType: 'layout-shift';
  value: number;
  hadRecentInput: boolean;
}

export interface NavigationEvent extends PerformanceEvent {
  entryType: 'navigation';
  responseStart: number;
}

export interface MeasureEvent extends PerformanceEvent {
  entryType: 'measure';
  name: 'tti';
  duration: number;
}

// Performance Metrics
export interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
  tti: number; // Time to Interactive
}

// Performance Thresholds
export interface PerformanceThresholds {
  good: number;
  needsImprovement: number;
  poor: number;
}

export interface PerformanceThresholdsMap {
  fcp: PerformanceThresholds;
  lcp: PerformanceThresholds;
  fid: PerformanceThresholds;
  cls: PerformanceThresholds;
  ttfb: PerformanceThresholds;
  tti: PerformanceThresholds;
}

// Performance Rating
export type PerformanceRating = 'good' | 'needs-improvement' | 'poor';

// Component Performance
export interface ComponentRenderMetrics {
  renderTime: number;
  averageRenderTime: number;
  renderCount: number;
  componentName: string;
}

// Optimization Utilities
export interface MemoizationOptions<T extends object> {
  Component: React.ComponentType<T>;
  areEqual?: (prevProps: T, nextProps: T) => boolean;
}

export interface DebounceOptions {
  wait: number;
}

export interface ThrottleOptions {
  limit: number;
}

// Analytics Event
export interface PerformanceAnalyticsEvent {
  metrics: PerformanceMetrics;
  performanceScore: number;
  metricId: string;
  eventCategory: string;
  timestamp: string;
}

// Budget Checking
export interface PerformanceBudgetStatus {
  isWithinBudget: boolean;
  budgetStatus: Record<string, 'pass' | 'fail' | 'unknown'>;
}

// Chart Data Types
export interface ChartDataPoint {
  x: string | number | Date;
  y: number;
  label?: string;
  color?: string;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[];
  color?: string;
}

export interface ChartConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    neutral: string;
  };
  gradients: {
    primary: string;
    secondary: string;
  };
}

export interface ChartProps {
  data: ChartSeries[];
  config: ChartConfig;
  height?: number;
  responsive?: boolean;
  animate?: boolean;
  className?: string;
}

// Time Series Data
export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  label?: string;
}

// Booking History
export interface BookingHistoryItem {
  id: string;
  serviceId: string;
  professionalId: string;
  date: string;
  status: 'completed' | 'cancelled' | 'pending';
  rating?: number;
}

// Professional Data
export interface Professional {
  id: string;
  name: string;
  category: string;
  city: string;
  rating: number;
  bookings: number;
  isVerified: boolean;
}

// Service Category
export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  isActive: boolean;
  slug: string;
}

// City Data
export interface City {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  professionalCount: number;
}

// Error Handling
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  details?: Record<string, unknown>;
}

// Analytics Data
export interface AnalyticsData {
  revenue: number[];
  bookings: number[];
  performance: {
    completionRate: number;
    cancellationRate: number;
    responseTime: number;
    customerSatisfaction: number;
  };
  trends: {
    label: string;
    value: number;
    percentage: number;
  }[];
}

// Bundle Size Information
export interface BundleSizeInfo {
  total: number;
  chunks: Array<{
    name: string;
    size: number;
    duration: number;
  }>;
}

// Connection Information
export interface ConnectionInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
}

// Performance Monitoring Hook Return Type
export interface UsePerformanceMonitoringReturn {
  metrics: PerformanceMetrics;
  performanceScore: number;
  isMonitoring: boolean;
  getMetricRating: (metric: keyof PerformanceMetrics, value: number) => PerformanceRating;
  getOverallScore: () => number;
  lazyLoadImage: (img: HTMLImageElement, src: string) => void;
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => (...args: Parameters<T>) => void;
  throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => (...args: Parameters<T>) => void;
  requestIdleCallback: (callback: () => void, options?: { timeout?: number }) => number | NodeJS.Timeout;
  cancelIdleCallback: (id: number) => void;
  measureRender: (componentName: string, callback: () => void) => void;
  getBundleSize: () => Promise<BundleSizeInfo>;
  prefersReducedMotion: () => boolean;
  getConnectionInfo: () => ConnectionInfo | null;
  shouldLoadHighQuality: () => boolean;
}

// User Data
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'pro' | 'admin';
  createdAt: string;
}

// Function Types
export type GenericFunction<T extends any[] = any[], R = any> = (...args: T) => R;
export type AsyncFunction<T extends any[] = any[], R = any> = (...args: T) => Promise<R>;

// Component Props
export interface ComponentProps {
  [key: string]: unknown;
  children?: React.ReactNode;
  className?: string;
}

// Event Types
export interface CustomEvent<T = unknown> {
  type: string;
  target: EventTarget & T;
  currentTarget: EventTarget & T;
  [key: string]: unknown;
}