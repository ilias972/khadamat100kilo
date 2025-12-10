'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breakpoints = void 0;
exports.useBreakpoint = useBreakpoint;
exports.useResponsiveValue = useResponsiveValue;
exports.useResponsiveBoolean = useResponsiveBoolean;
exports.useOrientation = useOrientation;
exports.useTouchCapability = useTouchCapability;
exports.useResponsive = useResponsive;
exports.useSafeArea = useSafeArea;
const react_1 = require("react");
exports.breakpoints = {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
};
function useBreakpoint() {
    const [breakpoint, setBreakpoint] = (0, react_1.useState)('md');
    const [windowSize, setWindowSize] = (0, react_1.useState)({
        width: typeof window !== 'undefined' ? window.innerWidth : 1024,
        height: typeof window !== 'undefined' ? window.innerHeight : 768
    });
    (0, react_1.useEffect)(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setWindowSize({ width, height });
            if (width < exports.breakpoints.sm) {
                setBreakpoint('xs');
            }
            else if (width < exports.breakpoints.md) {
                setBreakpoint('sm');
            }
            else if (width < exports.breakpoints.lg) {
                setBreakpoint('md');
            }
            else if (width < exports.breakpoints.xl) {
                setBreakpoint('lg');
            }
            else if (width < exports.breakpoints['2xl']) {
                setBreakpoint('xl');
            }
            else {
                setBreakpoint('2xl');
            }
        };
        handleResize();
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
        isMobile: breakpoint === 'xs' || breakpoint === 'sm',
        isTablet: breakpoint === 'md',
        isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
        isLargeDesktop: breakpoint === 'xl' || breakpoint === '2xl',
        isSmallMobile: breakpoint === 'xs',
        isAtLeast: (target) => {
            const targetIndex = Object.keys(exports.breakpoints).indexOf(target);
            const currentIndex = Object.keys(exports.breakpoints).indexOf(breakpoint);
            return currentIndex >= targetIndex;
        },
        isAtMost: (target) => {
            const targetIndex = Object.keys(exports.breakpoints).indexOf(target);
            const currentIndex = Object.keys(exports.breakpoints).indexOf(breakpoint);
            return currentIndex <= targetIndex;
        }
    };
}
function useResponsiveValue(values) {
    const { breakpoint, isAtLeast, isAtMost } = useBreakpoint();
    const getValue = () => {
        if (values[breakpoint]) {
            return values[breakpoint];
        }
        const sortedBreakpoints = Object.keys(exports.breakpoints);
        const currentIndex = sortedBreakpoints.indexOf(breakpoint);
        for (let i = currentIndex; i >= 0; i--) {
            const bp = sortedBreakpoints[i];
            if (values[bp]) {
                return values[bp];
            }
        }
        return undefined;
    };
    return getValue();
}
function useResponsiveBoolean(breakpoint) {
    const { breakpoint: currentBreakpoint } = useBreakpoint();
    const isActive = () => {
        const sortedBreakpoints = Object.keys(exports.breakpoints);
        const targetIndex = sortedBreakpoints.indexOf(breakpoint);
        const currentIndex = sortedBreakpoints.indexOf(currentBreakpoint);
        return currentIndex >= targetIndex;
    };
    return isActive();
}
function useOrientation() {
    const [orientation, setOrientation] = (0, react_1.useState)('portrait');
    const { windowSize } = useBreakpoint();
    (0, react_1.useEffect)(() => {
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
function useTouchCapability() {
    const [isTouchDevice, setIsTouchDevice] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const checkTouch = () => {
            const hasTouch = 'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                navigator.msMaxTouchPoints > 0;
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
function useResponsive() {
    const breakpoint = useBreakpoint();
    const orientation = useOrientation();
    const touch = useTouchCapability();
    return {
        ...breakpoint,
        ...orientation,
        ...touch,
        isMobilePortrait: breakpoint.isMobile && orientation.isPortrait,
        isMobileLandscape: breakpoint.isMobile && orientation.isLandscape,
        isTabletPortrait: breakpoint.isTablet && orientation.isPortrait,
        isTabletLandscape: breakpoint.isTablet && orientation.isLandscape,
        isDesktopTouch: breakpoint.isDesktop && touch.isTouchDevice,
        isDesktopMouse: breakpoint.isDesktop && !touch.isTouchDevice,
        shouldShowMobileNav: breakpoint.isMobile,
        shouldShowDesktopSidebar: breakpoint.isDesktop,
        shouldUseTouchOptimizedElements: touch.isTouchDevice,
        getGridColumns: (desktop, tablet, mobile) => {
            if (breakpoint.isDesktop)
                return desktop;
            if (breakpoint.isTablet)
                return tablet || Math.ceil(desktop * 0.75);
            return mobile || 1;
        },
        getFontSize: (desktop, tablet, mobile) => {
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
function useSafeArea() {
    const [safeArea, setSafeArea] = (0, react_1.useState)({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    });
    (0, react_1.useEffect)(() => {
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
        window.addEventListener('resize', updateSafeArea);
        return () => window.removeEventListener('resize', updateSafeArea);
    }, []);
    return safeArea;
}
//# sourceMappingURL=use-responsive.js.map