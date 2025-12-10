'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePerformanceMetrics = exports.performanceUtils = exports.usePerformanceMonitoring = void 0;
const react_1 = require("react");
const THRESHOLDS = {
    fcp: { good: 1800, needsImprovement: 3000 },
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    ttfb: { good: 800, needsImprovement: 1800 }
};
const usePerformanceMonitoring = () => {
    const [metrics, setMetrics] = (0, react_1.useState)({
        fcp: 0,
        lcp: 0,
        fid: 0,
        cls: 0,
        ttfb: 0,
        tti: 0
    });
    const [isSupported, setIsSupported] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (typeof window === 'undefined' || !('performance' in window)) {
            return;
        }
        setIsSupported(true);
        const measureWebVitals = () => {
            try {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    const ttfb = navigation.responseStart - navigation.requestStart;
                    setMetrics((prev) => ({ ...prev, ttfb }));
                    reportMetric('TTFB', ttfb);
                }
                if ('PerformanceObserver' in window) {
                    const fcpObserver = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            if (entry.name === 'first-contentful-paint') {
                                setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
                                reportMetric('FCP', entry.startTime);
                            }
                        }
                    });
                    fcpObserver.observe({ entryTypes: ['paint'] });
                    const lcpObserver = new PerformanceObserver((list) => {
                        for (const entry of list.getEntries()) {
                            setMetrics((prev) => ({ ...prev, lcp: entry.startTime }));
                            reportMetric('LCP', entry.startTime);
                        }
                    });
                    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
                    const clsObserver = new PerformanceObserver((list) => {
                        let clsValue = 0;
                        for (const entry of list.getEntries()) {
                            if (!entry.hadRecentInput) {
                                clsValue += entry.value;
                            }
                        }
                        setMetrics((prev) => ({ ...prev, cls: clsValue }));
                        reportMetric('CLS', clsValue);
                    });
                    clsObserver.observe({ entryTypes: ['layout-shift'] });
                }
            }
            catch (error) {
                console.warn('Performance monitoring not fully available:', error);
            }
        };
        measureWebVitals();
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
            }
            catch (error) {
                console.warn('PerformanceObserver not supported:', error);
            }
        }
    }, []);
    const reportMetric = (0, react_1.useCallback)((name, value) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Performance] ${name}:`, value);
        }
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', name, {
                value: Math.round(value),
                metric_id: name,
                metric_value: value,
                metric_delta: value
            });
        }
    }, []);
    const getMetricRating = (0, react_1.useCallback)((metricName, value) => {
        const threshold = THRESHOLDS[metricName];
        if (!threshold)
            return 'good';
        if (value <= threshold.good)
            return 'good';
        if (value <= threshold.needsImprovement)
            return 'needs-improvement';
        return 'poor';
    }, []);
    const getOverallScore = (0, react_1.useCallback)(() => {
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
        isSupported,
        getMetricRating,
        getOverallScore,
        reportMetric
    };
};
exports.usePerformanceMonitoring = usePerformanceMonitoring;
exports.performanceUtils = {
    preloadResource: (href, as) => {
        if (typeof document === 'undefined')
            return;
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = as;
        document.head.appendChild(link);
    },
    prefetchPage: (href) => {
        if (typeof document === 'undefined')
            return;
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
    },
    lazyLoadImage: (img, src) => {
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
        }
        else {
            img.src = src;
        }
    },
    debounce: (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    },
    throttle: (func, limit) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    },
    requestIdleCallback: (callback, options) => {
        if ('requestIdleCallback' in window) {
            return window.requestIdleCallback(callback, options);
        }
        else {
            return setTimeout(callback, 1);
        }
    },
    cancelIdleCallback: (id) => {
        if ('cancelIdleCallback' in window) {
            window.cancelIdleCallback(id);
        }
        else {
            clearTimeout(id);
        }
    },
    measureRender: (componentName, callback) => {
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
            performance.clearMarks(startMark);
            performance.clearMarks(endMark);
            performance.clearMeasures(measureName);
        }
        catch (error) {
            console.warn('Performance measurement failed:', error);
        }
    },
    getBundleSize: async () => {
        if (typeof window === 'undefined') {
            return { total: 0, chunks: [] };
        }
        try {
            const resources = performance.getEntriesByType('resource');
            const scripts = resources.filter(r => r.initiatorType === 'script');
            const total = scripts.reduce((sum, script) => sum + (script.transferSize || 0), 0);
            const chunks = scripts.map(script => ({
                name: script.name,
                size: script.transferSize,
                duration: script.duration
            }));
            return { total, chunks };
        }
        catch (error) {
            console.warn('Failed to get bundle size:', error);
            return { total: 0, chunks: [] };
        }
    },
    prefersReducedMotion: () => {
        if (typeof window === 'undefined')
            return false;
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },
    getConnectionInfo: () => {
        if (typeof navigator === 'undefined' || !('connection' in navigator)) {
            return null;
        }
        const connection = navigator.connection;
        return {
            effectiveType: connection.effectiveType || 'unknown',
            downlink: connection.downlink || 0,
            rtt: connection.rtt || 0
        };
    },
    shouldLoadHighQuality: () => {
        const connection = exports.performanceUtils.getConnectionInfo();
        if (!connection)
            return true;
        return connection.effectiveType === '4g' || connection.effectiveType === '5g';
    }
};
const usePerformanceMetrics = () => {
    const [metrics, setMetrics] = (0, react_1.useState)({
        fcp: 0,
        lcp: 0,
        fid: 0,
        cls: 0,
        ttfb: 0,
        tti: 0
    });
    const [isSupported, setIsSupported] = (0, react_1.useState)(false);
    const getMetricRating = (0, react_1.useCallback)((metricName, value) => {
        const threshold = THRESHOLDS[metricName];
        if (!threshold)
            return 'good';
        if (value <= threshold.good)
            return 'good';
        if (value <= threshold.needsImprovement)
            return 'needs-improvement';
        return 'poor';
    }, []);
    const getOverallScore = (0, react_1.useCallback)(() => {
        const scores = {
            fcp: getMetricRating('fcp', metrics.fcp) === 'good' ? 100 : getMetricRating('fcp', metrics.fcp) === 'needs-improvement' ? 50 : 0,
            lcp: getMetricRating('lcp', metrics.lcp) === 'good' ? 100 : getMetricRating('lcp', metrics.lcp) === 'needs-improvement' ? 50 : 0,
            cls: getMetricRating('cls', metrics.cls) === 'good' ? 100 : getMetricRating('cls', metrics.cls) === 'needs-improvement' ? 50 : 0
        };
        const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
        return Math.round(total / Object.keys(scores).length);
    }, [metrics, getMetricRating]);
    const reportMetric = (0, react_1.useCallback)((name, value) => {
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
exports.usePerformanceMetrics = usePerformanceMetrics;
//# sourceMappingURL=usePerformanceMonitoring.js.map