'use client';

import { useState, useEffect } from 'react';

// Breakpoint definitions matching Tailwind CSS
export const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Hook for detecting current viewport size
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('md');
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });
      
      // Determine current breakpoint
      if (width < breakpoints.sm) {
        setBreakpoint('xs');
      } else if (width < breakpoints.md) {
        setBreakpoint('sm');
      } else if (width < breakpoints.lg) {
        setBreakpoint('md');
      } else if (width < breakpoints.xl) {
        setBreakpoint('lg');
      } else if (width < breakpoints['2xl']) {
        setBreakpoint('xl');
      } else {
        setBreakpoint('2xl');
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    windowSize,
    isXs: breakpoint === 'xs',
    isSm: breakpoint === 'sm',
    isMd: breakpoint === 'md',
    isLg: breakpoint === 'lg',
    isXl: breakpoint === 'xl',
    is2Xl: breakpoint === '2xl',
    
    // Helper methods
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
    
    // Custom breakpoints
    isLargeDesktop: breakpoint === 'xl' || breakpoint === '2xl',
    isSmallMobile: breakpoint === 'xs',
    
    // Utility functions
    isAtLeast: (target: Breakpoint) => {
      const targetIndex = Object.keys(breakpoints).indexOf(target);
      const currentIndex = Object.keys(breakpoints).indexOf(breakpoint);
      return currentIndex >= targetIndex;
    },
    
    isAtMost: (target: Breakpoint) => {
      const targetIndex = Object.keys(breakpoints).indexOf(target);
      const currentIndex = Object.keys(breakpoints).indexOf(breakpoint);
      return currentIndex <= targetIndex;
    }
  };
}

// Hook for responsive values
export function useResponsiveValue<T>(values: Partial<Record<Breakpoint, T>>): T | undefined {
  const { breakpoint, isAtLeast, isAtMost } = useBreakpoint();
  
  // Get the value for current breakpoint or find the closest smaller breakpoint
  const getValue = (): T | undefined => {
    // First try exact match
    if (values[breakpoint]) {
      return values[breakpoint];
    }
    
    // Find the largest breakpoint that is less than or equal to current
    const sortedBreakpoints = Object.keys(breakpoints) as Breakpoint[];
    const currentIndex = sortedBreakpoints.indexOf(breakpoint);
    
    for (let i = currentIndex; i >= 0; i--) {
      const bp = sortedBreakpoints[i];
      if (values[bp]) {
        return values[bp];
      }
    }
    
    // If no value found, return undefined
    return undefined;
  };
  
  return getValue();
}

// Hook for responsive boolean conditions
export function useResponsiveBoolean(breakpoint: Breakpoint) {
  const { breakpoint: currentBreakpoint } = useBreakpoint();
  
  const isActive = () => {
    const sortedBreakpoints = Object.keys(breakpoints) as Breakpoint[];
    const targetIndex = sortedBreakpoints.indexOf(breakpoint);
    const currentIndex = sortedBreakpoints.indexOf(currentBreakpoint);
    
    return currentIndex >= targetIndex;
  };
  
  return isActive();
}

// Hook for orientation changes
export function useOrientation() {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const { windowSize } = useBreakpoint();

  useEffect(() => {
    const checkOrientation = () => {
      setOrientation(windowSize.height > windowSize.width ? 'portrait' : 'landscape');
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    
    return () => window.removeEventListener('resize', checkOrientation);
  }, [windowSize]);

  return {
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape'
  };
}

// Hook for touch capability detection
export function useTouchCapability() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      // Check for touch events support
      const hasTouch = 'ontouchstart' in window || 
                      navigator.maxTouchPoints > 0 || 
                      // @ts-ignore - legacy support
                      navigator.msMaxTouchPoints > 0;
      
      // Additional checks for better accuracy
      const hasHoverNone = window.matchMedia && window.matchMedia('(hover: none)').matches;
      const hasCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
      
      setIsTouchDevice(hasTouch && (hasHoverNone || hasCoarsePointer));
    };

    checkTouch();
  }, []);

  return {
    isTouchDevice,
    hasTouchEvents: isTouchDevice,
    hasHover: !isTouchDevice
  };
}

// Combined responsive hook
export function useResponsive() {
  const breakpoint = useBreakpoint();
  const orientation = useOrientation();
  const touch = useTouchCapability();
  
  return {
    ...breakpoint,
    ...orientation,
    ...touch,
    
    // Combined utilities
    isMobilePortrait: breakpoint.isMobile && orientation.isPortrait,
    isMobileLandscape: breakpoint.isMobile && orientation.isLandscape,
    isTabletPortrait: breakpoint.isTablet && orientation.isPortrait,
    isTabletLandscape: breakpoint.isTablet && orientation.isLandscape,
    isDesktopTouch: breakpoint.isDesktop && touch.isTouchDevice,
    isDesktopMouse: breakpoint.isDesktop && !touch.isTouchDevice,
    
    // Responsive content helpers
    shouldShowMobileNav: breakpoint.isMobile,
    shouldShowDesktopSidebar: breakpoint.isDesktop,
    shouldUseTouchOptimizedElements: touch.isTouchDevice,
    
    // Grid helpers
    getGridColumns: (desktop: number, tablet?: number, mobile?: number) => {
      if (breakpoint.isDesktop) return desktop;
      if (breakpoint.isTablet) return tablet || Math.ceil(desktop * 0.75);
      return mobile || 1;
    },
    
    getFontSize: (desktop: string, tablet?: string, mobile?: string) => {
      return useResponsiveValue({
        '2xl': desktop,
        'xl': tablet || desktop,
        'lg': tablet || desktop,
        'md': mobile || tablet || desktop,
        'sm': mobile || '0.875rem',
        'xs': mobile || '0.75rem'
      }) || desktop;
    }
  };
}

// Safe area padding helper for devices with notches
export function useSafeArea() {
  const [safeArea, setSafeArea] = useState({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  });

  useEffect(() => {
    const updateSafeArea = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      
      setSafeArea({
        top: parseInt(computedStyle.getPropertyValue('--safe-area-inset-top') || '0'),
        right: parseInt(computedStyle.getPropertyValue('--safe-area-inset-right') || '0'),
        bottom: parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom') || '0'),
        left: parseInt(computedStyle.getPropertyValue('--safe-area-inset-left') || '0')
      });
    };

    updateSafeArea();
    
    // CSS environment variables are usually static, but we can check on resize
    window.addEventListener('resize', updateSafeArea);
    
    return () => window.removeEventListener('resize', updateSafeArea);
  }, []);

  return safeArea;
}