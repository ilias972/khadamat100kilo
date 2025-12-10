"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMobileViewport = exports.useMobileGestures = exports.useResponsiveImage = exports.useMobileFirst = void 0;
const react_1 = require("react");
const useMobileFirst = () => {
    const [state, setState] = (0, react_1.useState)({
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
    const updateDeviceState = (0, react_1.useCallback)(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const orientation = width > height ? 'landscape' : 'portrait';
        let screenSize = 'xs';
        if (width >= 1536)
            screenSize = '2xl';
        else if (width >= 1280)
            screenSize = 'xl';
        else if (width >= 1024)
            screenSize = 'lg';
        else if (width >= 768)
            screenSize = 'md';
        else if (width >= 640)
            screenSize = 'sm';
        else
            screenSize = 'xs';
        const isMobile = width < 768;
        const isTablet = width >= 768 && width < 1024;
        const isDesktop = width >= 1024;
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const hasNotch = window.innerHeight < window.outerHeight - 100 ||
            CSS.supports('padding: max(0px)') ||
            window.navigator.userAgent.includes('Safari') &&
                window.navigator.userAgent.includes('Mobile');
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
    (0, react_1.useEffect)(() => {
        updateDeviceState();
        const handleResize = () => updateDeviceState();
        const handleOrientationChange = () => {
            setTimeout(updateDeviceState, 100);
        };
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleOrientationChange);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, [updateDeviceState]);
    const getOptimalGridColumns = (0, react_1.useCallback)(() => {
        if (state.isMobile)
            return 1;
        if (state.isTablet)
            return 2;
        return 3;
    }, [state.isMobile, state.isTablet]);
    const getOptimalSpacing = (0, react_1.useCallback)(() => {
        if (state.isMobile)
            return '1rem';
        if (state.isTablet)
            return '1.5rem';
        return '2rem';
    }, [state.isMobile, state.isTablet]);
    const getOptimalFontSize = (0, react_1.useCallback)((baseSize) => {
        const sizeMap = {
            'sm': { xs: '0.75rem', sm: '0.875rem', md: '0.875rem', lg: '0.875rem', xl: '0.875rem', '2xl': '0.875rem' },
            'base': { xs: '0.875rem', sm: '1rem', md: '1rem', lg: '1rem', xl: '1rem', '2xl': '1rem' },
            'lg': { xs: '1rem', sm: '1.125rem', md: '1.125rem', lg: '1.125rem', xl: '1.125rem', '2xl': '1.125rem' },
            'xl': { xs: '1.125rem', sm: '1.25rem', md: '1.25rem', lg: '1.25rem', xl: '1.25rem', '2xl': '1.25rem' },
            '2xl': { xs: '1.25rem', sm: '1.5rem', md: '1.5rem', lg: '1.5rem', xl: '1.5rem', '2xl': '1.5rem' },
            '3xl': { xs: '1.5rem', sm: '1.875rem', md: '1.875rem', lg: '1.875rem', xl: '1.875rem', '2xl': '1.875rem' }
        };
        return sizeMap[baseSize]?.[state.screenSize] || baseSize;
    }, [state.screenSize]);
    const isTouchDevice = (0, react_1.useCallback)(() => state.hasTouch, [state.hasTouch]);
    const prefersReducedMotion = (0, react_1.useCallback)(() => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }, []);
    const getViewportHeight = (0, react_1.useCallback)(() => window.innerHeight, []);
    const getViewportWidth = (0, react_1.useCallback)(() => window.innerWidth, []);
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
exports.useMobileFirst = useMobileFirst;
const useResponsiveImage = (sources) => {
    const { screenSize } = (0, exports.useMobileFirst)();
    const getOptimalImage = (0, react_1.useCallback)(() => {
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
exports.useResponsiveImage = useResponsiveImage;
const useMobileGestures = () => {
    const [gestures, setGestures] = (0, react_1.useState)({
        swipeLeft: false,
        swipeRight: false,
        swipeUp: false,
        swipeDown: false,
        pinch: false,
        tap: false
    });
    const handleTouchStart = (0, react_1.useCallback)((e) => {
    }, []);
    const handleTouchMove = (0, react_1.useCallback)((e) => {
    }, []);
    const handleTouchEnd = (0, react_1.useCallback)((e) => {
    }, []);
    (0, react_1.useEffect)(() => {
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
exports.useMobileGestures = useMobileGestures;
const useMobileViewport = () => {
    (0, react_1.useEffect)(() => {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
        }
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
exports.useMobileViewport = useMobileViewport;
//# sourceMappingURL=use-mobile-first.js.map