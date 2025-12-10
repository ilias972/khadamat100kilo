import { useState, useEffect, useCallback } from 'react';

interface MobileFirstState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  orientation: 'portrait' | 'landscape';
  hasTouch: boolean;
  hasNotch: boolean;
  safeAreaInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

interface MobileFirstActions {
  getOptimalGridColumns: () => number;
  getOptimalSpacing: () => string;
  getOptimalFontSize: (baseSize: string) => string;
  isTouchDevice: () => boolean;
  prefersReducedMotion: () => boolean;
  getViewportHeight: () => number;
  getViewportWidth: () => number;
}

export const useMobileFirst = (): MobileFirstState & MobileFirstActions => {
  const [state, setState] = useState<MobileFirstState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLandscape: false,
    isPortrait: true,
    screenSize: 'lg',
    orientation: 'portrait',
    hasTouch: false,
    hasNotch: false,
    safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 }
  });

  const updateDeviceState = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = width > height ? 'landscape' : 'portrait';

    // Determine screen size
    let screenSize: MobileFirstState['screenSize'] = 'xs';
    if (width >= 1536) screenSize = '2xl';
    else if (width >= 1280) screenSize = 'xl';
    else if (width >= 1024) screenSize = 'lg';
    else if (width >= 768) screenSize = 'md';
    else if (width >= 640) screenSize = 'sm';
    else screenSize = 'xs';

    // Determine device type
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    // Check for touch capability
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Check for notch (simplified detection)
    const hasNotch = window.innerHeight < window.outerHeight - 100 ||
                    CSS.supports('padding: max(0px)') ||
                    window.navigator.userAgent.includes('Safari') &&
                    window.navigator.userAgent.includes('Mobile');

    // Get safe area insets (simplified)
    const safeAreaInsets = {
      top: parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)')) || 0,
      bottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-bottom)')) || 0,
      left: parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-left)')) || 0,
      right: parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-right)')) || 0
    };

    setState({
      isMobile,
      isTablet,
      isDesktop,
      isLandscape: orientation === 'landscape',
      isPortrait: orientation === 'portrait',
      screenSize,
      orientation,
      hasTouch,
      hasNotch,
      safeAreaInsets
    });
  }, []);

  useEffect(() => {
    updateDeviceState();

    const handleResize = () => updateDeviceState();
    const handleOrientationChange = () => {
      // Delay to allow orientation change to complete
      setTimeout(updateDeviceState, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, [updateDeviceState]);

  // Actions
  const getOptimalGridColumns = useCallback(() => {
    if (state.isMobile) return 1;
    if (state.isTablet) return 2;
    return 3;
  }, [state.isMobile, state.isTablet]);

  const getOptimalSpacing = useCallback(() => {
    if (state.isMobile) return '1rem';
    if (state.isTablet) return '1.5rem';
    return '2rem';
  }, [state.isMobile, state.isTablet]);

  const getOptimalFontSize = useCallback((baseSize: string) => {
    const sizeMap: Record<string, Record<MobileFirstState['screenSize'], string>> = {
      'sm': { xs: '0.75rem', sm: '0.875rem', md: '0.875rem', lg: '0.875rem', xl: '0.875rem', '2xl': '0.875rem' },
      'base': { xs: '0.875rem', sm: '1rem', md: '1rem', lg: '1rem', xl: '1rem', '2xl': '1rem' },
      'lg': { xs: '1rem', sm: '1.125rem', md: '1.125rem', lg: '1.125rem', xl: '1.125rem', '2xl': '1.125rem' },
      'xl': { xs: '1.125rem', sm: '1.25rem', md: '1.25rem', lg: '1.25rem', xl: '1.25rem', '2xl': '1.25rem' },
      '2xl': { xs: '1.25rem', sm: '1.5rem', md: '1.5rem', lg: '1.5rem', xl: '1.5rem', '2xl': '1.5rem' },
      '3xl': { xs: '1.5rem', sm: '1.875rem', md: '1.875rem', lg: '1.875rem', xl: '1.875rem', '2xl': '1.875rem' }
    };

    return sizeMap[baseSize]?.[state.screenSize] || baseSize;
  }, [state.screenSize]);

  const isTouchDevice = useCallback(() => state.hasTouch, [state.hasTouch]);

  const prefersReducedMotion = useCallback(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const getViewportHeight = useCallback(() => window.innerHeight, []);
  const getViewportWidth = useCallback(() => window.innerWidth, []);

  return {
    ...state,
    getOptimalGridColumns,
    getOptimalSpacing,
    getOptimalFontSize,
    isTouchDevice,
    prefersReducedMotion,
    getViewportHeight,
    getViewportWidth
  };
};

// Hook for responsive images
export const useResponsiveImage = (sources: Record<string, string>) => {
  const { screenSize } = useMobileFirst();

  const getOptimalImage = useCallback(() => {
    // Priority: exact match, then smaller sizes, then default
    const sizePriority = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    const currentIndex = sizePriority.indexOf(screenSize);

    for (let i = currentIndex; i >= 0; i--) {
      const size = sizePriority[i];
      if (sources[size]) {
        return sources[size];
      }
    }

    return sources.default || sources.lg || Object.values(sources)[0];
  }, [screenSize, sources]);

  return getOptimalImage();
};

// Hook for mobile gestures
export const useMobileGestures = () => {
  const [gestures, setGestures] = useState({
    swipeLeft: false,
    swipeRight: false,
    swipeUp: false,
    swipeDown: false,
    pinch: false,
    tap: false
  });

  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Implementation for gesture detection
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    // Implementation for gesture detection
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    // Implementation for gesture detection
  }, []);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return gestures;
};

// Hook for mobile viewport optimization
export const useMobileViewport = () => {
  useEffect(() => {
    // Prevent zoom on input focus for iOS
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }

    // Handle visual viewport API for mobile browsers
    const handleVisualViewport = () => {
      if (window.visualViewport) {
        const visualViewport = window.visualViewport;
        const height = visualViewport.height;
        const offsetTop = visualViewport.offsetTop;

        document.documentElement.style.setProperty('--visual-viewport-height', `${height}px`);
        document.documentElement.style.setProperty('--visual-viewport-offset-top', `${offsetTop}px`);
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewport);
      handleVisualViewport();
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewport);
      }
    };
  }, []);

  return {
    isVisualViewportSupported: !!window.visualViewport,
    visualViewportHeight: typeof window !== 'undefined' && window.visualViewport
      ? window.visualViewport.height
      : window.innerHeight,
    visualViewportOffsetTop: typeof window !== 'undefined' && window.visualViewport
      ? window.visualViewport.offsetTop
      : 0
  };
};