'use client';

import React from 'react';
import { ComponentProps } from '@/types/performance-types';

/**
 * Performance Optimization Utilities
 *
 * This module provides utility functions for optimizing
 * React component performance through memoization and other techniques.
 */

/**
 * Enhanced React.memo with custom comparison
 */
export function createOptimizedMemo<T extends object>(
  Component: React.ComponentType<T>,
  areEqual: (prevProps: T, nextProps: T) => boolean = (prev, next) => {
    // Default shallow comparison
    return Object.keys(prev).every(key =>
      (prev as Record<string, unknown>)[key] === (next as Record<string, unknown>)[key]
    );
  }
): React.MemoExoticComponent<React.ComponentType<T>> {
  return React.memo(Component, areEqual);
}

/**
 * Memoize expensive calculations with dependency tracking
 */
export function useOptimizedMemo<T>(
  calculation: () => T,
  dependencies: React.DependencyList
): T {
  return React.useMemo(calculation, dependencies);
}

/**
 * Create optimized event handlers with automatic debouncing
 */
export function useOptimizedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  dependencies: React.DependencyList,
  debounceTime: number = 0
): T {
  const callbackRef = React.useRef<T>(callback);

  // Update callback reference when dependencies change
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback, ...dependencies]);

  // Create memoized handler
  const optimizedCallback = React.useCallback(
    ((...args: Parameters<T>) => {
      if (debounceTime > 0) {
        const timeout = setTimeout(() => {
          callbackRef.current(...args);
        }, debounceTime);

        return () => clearTimeout(timeout);
      } else {
        return callbackRef.current(...args);
      }
    }) as T,
    [debounceTime, ...dependencies]
  );

  return optimizedCallback;
}

/**
 * Performance budget checker
 */
export function checkPerformanceBudget(metricName: string, value: number, budget: number): boolean {
  const isWithinBudget = value <= budget;
  const percentage = (value / budget) * 100;

  if (process.env.NODE_ENV === 'development') {
    if (!isWithinBudget) {
      console.warn(
        `[Budget Warning] ${metricName}: ${value.toFixed(2)}ms ` +
        `exceeds budget of ${budget}ms (${percentage.toFixed(1)}%)`
      );
    } else {
      console.log(
        `[Budget OK] ${metricName}: ${value.toFixed(2)}ms ` +
        `within budget (${percentage.toFixed(1)}%)`
      );
    }
  }

  return isWithinBudget;
}

/**
 * Component optimization helper - checks if component should be memoized
 */
export function shouldMemoizeComponent(
  props: ComponentProps,
  threshold: number = 5
): boolean {
  // Simple heuristic: memoize if component has many props
  const propCount = Object.keys(props).length;
  const hasChildren = Boolean(props.children);

  return propCount > threshold || hasChildren;
}

/**
 * Measure component render time
 */
export function measureRenderTime<T extends object>(
  Component: React.ComponentType<T>,
  componentName: string
): React.ComponentType<T> {
  return function PerformanceMonitoredComponent(props: T) {
    const startTime = React.useRef(performance.now());
    const renderCount = React.useRef(0);

    renderCount.current++;

    React.useEffect(() => {
      const endTime = performance.now();
      const renderDuration = endTime - startTime.current;

      if (process.env.NODE_ENV === 'development' && renderDuration > 1) {
        console.log(
          `[Performance] ${componentName} - ` +
          `Render #${renderCount.current}: ${renderDuration.toFixed(2)}ms`
        );
      }
    }, [props]);

    return React.createElement(Component, props);
  };
}