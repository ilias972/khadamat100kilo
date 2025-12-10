'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  PerformanceMetrics,
  PerformanceThresholdsMap,
  PerformanceRating,
  PaintEvent,
  LargestContentfulPaintEvent,
  FirstInputEvent,
  LayoutShiftEvent,
  NavigationEvent,
  MeasureEvent,
  PerformanceAnalyticsEvent
} from '@/types/performance-types';

/**
 * Production Performance Monitoring
 *
 * This module provides comprehensive performance monitoring for production environments
 * including Real User Monitoring (RUM), performance metrics tracking, and analytics integration.
 */

/**
 * Performance thresholds for budget checking
 */
const PERFORMANCE_THRESHOLDS: PerformanceThresholdsMap = {
  fcp: { good: 1800, needsImprovement: 3000, poor: 4000 },
  lcp: { good: 2500, needsImprovement: 4000, poor: 5000 },
  fid: { good: 100, needsImprovement: 300, poor: 500 },
  cls: { good: 0.1, needsImprovement: 0.25, poor: 0.5 },
  ttfb: { good: 800, needsImprovement: 1800, poor: 2500 },
  tti: { good: 3800, needsImprovement: 7300, poor: 10000 }
};

/**
 * Main performance monitoring hook
 */
export function usePerformanceMonitoring(): {
  metrics: PerformanceMetrics | null;
  performanceScore: number | null;
  isMonitoring: boolean;
  getMetricRating: (metric: keyof PerformanceMetrics, value: number) => 'good' | 'needs-improvement' | 'poor';
} {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [performanceScore, setPerformanceScore] = useState<number | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  /**
   * Get metric rating
   */
  const getMetricRating = useCallback((metricName: keyof PerformanceMetrics, value: number): PerformanceRating => {
    const threshold = PERFORMANCE_THRESHOLDS[metricName];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.needsImprovement) return 'needs-improvement';
    return 'poor';
  }, []);

  /**
   * Calculate performance score (0-100)
   */
  const calculatePerformanceScore = useCallback((metrics: PerformanceMetrics): number => {
    let totalScore = 0;
    let metricCount = 0;

    // Calculate individual metric scores
    const scores = {
      fcp: getMetricScore('fcp', metrics.fcp),
      lcp: getMetricScore('lcp', metrics.lcp),
      fid: getMetricScore('fid', metrics.fid),
      cls: getMetricScore('cls', metrics.cls),
      ttfb: getMetricScore('ttfb', metrics.ttfb),
      tti: getMetricScore('tti', metrics.tti)
    };

    // Calculate average score
    Object.values(scores).forEach(score => {
      if (score !== null) {
        totalScore += score;
        metricCount++;
      }
    });

    return metricCount > 0 ? Math.round(totalScore / metricCount) : 0;
  }, [getMetricRating]);

  /**
   * Get individual metric score
   */
  const getMetricScore = useCallback((metricName: keyof PerformanceMetrics, value: number): number => {
    const threshold = PERFORMANCE_THRESHOLDS[metricName];
    if (!threshold) return 100;

    if (value <= threshold.good) return 100;
    if (value <= threshold.needsImprovement) return 50;
    if (value <= threshold.poor) return 25;
    return 0;
  }, []);

  /**
   * Main monitoring effect
   */
  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      setIsMonitoring(false);
      return;
    }

    setIsMonitoring(true);

    // Check if PerformanceObserver is supported
    if (!('PerformanceObserver' in window)) {
      setIsMonitoring(false);
      return;
    }

    // Initialize metrics
    const initialMetrics: PerformanceMetrics = {
      fcp: 0,
      lcp: 0,
      fid: 0,
      cls: 0,
      ttfb: 0,
      tti: 0
    };

    // Set up PerformanceObserver for web vitals
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();

      entries.forEach(entry => {
        switch (entry.entryType) {
          case 'paint':
            if ((entry as PaintEvent).name === 'first-contentful-paint') {
              initialMetrics.fcp = (entry as PaintEvent).startTime;
            }
            break;

          case 'largest-contentful-paint':
            initialMetrics.lcp = (entry as LargestContentfulPaintEvent).startTime;
            break;

          case 'first-input':
            if ('processingStart' in entry) {
              const fidEntry = entry as unknown as FirstInputEvent;
              initialMetrics.fid = fidEntry.processingStart - fidEntry.startTime;
            }
            break;

          case 'layout-shift':
            const clsEntry = entry as unknown as LayoutShiftEvent;
            if (!clsEntry.hadRecentInput) {
              initialMetrics.cls += clsEntry.value;
            }
            break;

          case 'navigation':
            const navEntry = entry as unknown as NavigationEvent;
            initialMetrics.ttfb = navEntry.responseStart;
            break;

          case 'measure':
            const measureEntry = entry as unknown as MeasureEvent;
            if (measureEntry.name === 'tti') {
              initialMetrics.tti = measureEntry.duration;
            }
            break;
        }
      });

      // Update metrics state
      setMetrics({ ...initialMetrics });

      // Calculate performance score
      const score = calculatePerformanceScore(initialMetrics);
      setPerformanceScore(score);

      // Send to analytics in production
      if (process.env.NODE_ENV === 'production') {
        sendToAnalytics(initialMetrics, score);
      }
    });

    // Observe all performance entry types
    observer.observe({
      entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift', 'navigation', 'measure']
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [calculatePerformanceScore]);

  /**
   * Send metrics to analytics service
   */
  const sendToAnalytics = useCallback((metrics: PerformanceMetrics, score: number) => {
    try {
      // In a real implementation, this would send to your analytics service
      if (typeof window !== 'undefined' && (window as { gtag?: Function }).gtag) {
        (window as { gtag?: Function }).gtag?.('event', 'performance_metrics', {
          ...metrics,
          performance_score: score,
          metric_id: 'web_vitals',
          event_category: 'performance'
        });
      }

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        const analyticsEvent: PerformanceAnalyticsEvent = {
          metrics,
          performanceScore: score,
          metricId: 'web_vitals',
          eventCategory: 'performance',
          timestamp: new Date().toISOString()
        };
        console.log('[Performance Monitoring]', analyticsEvent);
      }
    } catch (error) {
      console.error('Failed to send performance metrics:', error);
    }
  }, []);

  return {
    metrics,
    performanceScore,
    isMonitoring,
    getMetricRating
  };
}

/**
 * Performance budget checker
 */
export function usePerformanceBudgetCheck(
  metrics: PerformanceMetrics | null,
  budgets: Partial<Record<keyof PerformanceMetrics, number>> = {}
): {
  isWithinBudget: boolean;
  budgetStatus: Record<string, 'pass' | 'fail' | 'unknown'>;
} {
  const [isWithinBudget, setIsWithinBudget] = useState(true);
  const [budgetStatus, setBudgetStatus] = useState<Record<string, 'pass' | 'fail' | 'unknown'>>({});

  useEffect(() => {
    if (!metrics) {
      setIsWithinBudget(true);
      setBudgetStatus({});
      return;
    }

    const newBudgetStatus: Record<string, 'pass' | 'fail' | 'unknown'> = {};
    let allWithinBudget = true;

    // Check each metric against budget
    (Object.keys(budgets) as Array<keyof PerformanceMetrics>).forEach(metricName => {
      const budget = budgets[metricName];
      const actualValue = metrics[metricName];

      if (typeof budget === 'number' && typeof actualValue === 'number') {
        const withinBudget = actualValue <= budget;
        newBudgetStatus[metricName] = withinBudget ? 'pass' : 'fail';

        if (!withinBudget) {
          allWithinBudget = false;

          if (process.env.NODE_ENV === 'development') {
            console.warn(
              `[Budget Check] ${metricName}: ${actualValue} exceeds budget of ${budget}`
            );
          }
        }
      } else {
        newBudgetStatus[metricName] = 'unknown';
      }
    });

    setIsWithinBudget(allWithinBudget);
    setBudgetStatus(newBudgetStatus);
  }, [metrics, budgets]);

  return {
    isWithinBudget,
    budgetStatus
  };
}

/**
 * Component performance tracker
 */
export function useComponentPerformance(
  componentName: string,
  dependencies: React.DependencyList = []
): (callback: () => void) => void {
  const renderTimesRef = React.useRef<number[]>([]);
  const lastRenderTimeRef = React.useRef<number>(0);

  useEffect(() => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      renderTimesRef.current.push(renderTime);
      lastRenderTimeRef.current = renderTime;

      // Keep only last 10 render times
      if (renderTimesRef.current.length > 10) {
        renderTimesRef.current.shift();
      }

      if (process.env.NODE_ENV === 'development' && renderTime > 5) {
        console.log(
          `[Component Perf] ${componentName}: ${renderTime.toFixed(2)}ms ` +
          `(avg: ${(renderTimesRef.current.reduce((a: number, b: number) => a + b, 0) / renderTimesRef.current.length).toFixed(2)}ms)`
        );
      }
    };
  }, dependencies);

  /**
   * Track specific operations
   */
  const trackOperation = useCallback((callback: () => void) => {
    const startTime = performance.now();
    const result = callback();
    const endTime = performance.now();
    const operationTime = endTime - startTime;

    if (process.env.NODE_ENV === 'development' && operationTime > 2) {
      console.log(
        `[Operation Perf] ${componentName}: ${operationTime.toFixed(2)}ms`
      );
    }

    return result;
  }, [componentName]);

  return trackOperation;
}

/**
 * Performance monitoring provider
 */
export function PerformanceMonitoringProvider({ children }: { children: React.ReactNode }) {
  // This provider would wrap the app and provide performance context
  return React.createElement(
    React.Fragment,
    null,
    children
  );
}