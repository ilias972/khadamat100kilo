interface PerformanceMetrics {
    fcp: number;
    lcp: number;
    fid: number;
    cls: number;
    ttfb: number;
    tti: number;
}
export declare const usePerformanceMonitoring: () => {
    metrics: PerformanceMetrics;
    isSupported: boolean;
    getMetricRating: (metricName: keyof PerformanceMetrics, value: number) => "good" | "needs-improvement" | "poor";
    getOverallScore: () => number;
    reportMetric: (name: string, value: number) => void;
};
export declare const performanceUtils: {
    preloadResource: (href: string, as: string) => void;
    prefetchPage: (href: string) => void;
    lazyLoadImage: (img: HTMLImageElement, src: string) => void;
    debounce: <T extends (...args: any[]) => any>(func: T, wait: number) => ((...args: Parameters<T>) => void);
    throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => ((...args: Parameters<T>) => void);
    requestIdleCallback: (callback: () => void, options?: {
        timeout?: number;
    }) => number | NodeJS.Timeout;
    cancelIdleCallback: (id: number) => void;
    measureRender: (componentName: string, callback: () => void) => void;
    getBundleSize: () => Promise<{
        total: number;
        chunks: any[];
    }>;
    prefersReducedMotion: () => boolean;
    getConnectionInfo: () => {
        effectiveType: string;
        downlink: number;
        rtt: number;
    } | null;
    shouldLoadHighQuality: () => boolean;
};
export declare const usePerformanceMetrics: () => {
    metrics: PerformanceMetrics;
    isSupported: boolean;
    getMetricRating: (metricName: keyof PerformanceMetrics, value: number) => "good" | "needs-improvement" | "poor";
    getOverallScore: () => number;
    reportMetric: (name: string, value: number) => void;
};
export {};
