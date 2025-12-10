export declare const breakpoints: {
    readonly xs: 320;
    readonly sm: 640;
    readonly md: 768;
    readonly lg: 1024;
    readonly xl: 1280;
    readonly '2xl': 1536;
};
export type Breakpoint = keyof typeof breakpoints;
export declare function useBreakpoint(): {
    breakpoint: "sm" | "md" | "lg" | "xl" | "2xl" | "xs";
    windowSize: {
        width: number;
        height: number;
    };
    isXs: boolean;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
    is2Xl: boolean;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLargeDesktop: boolean;
    isSmallMobile: boolean;
    isAtLeast: (target: Breakpoint) => boolean;
    isAtMost: (target: Breakpoint) => boolean;
};
export declare function useResponsiveValue<T>(values: Partial<Record<Breakpoint, T>>): T | undefined;
export declare function useResponsiveBoolean(breakpoint: Breakpoint): boolean;
export declare function useOrientation(): {
    orientation: "portrait" | "landscape";
    isPortrait: boolean;
    isLandscape: boolean;
};
export declare function useTouchCapability(): {
    isTouchDevice: boolean;
    hasTouchEvents: boolean;
    hasHover: boolean;
};
export declare function useResponsive(): {
    isMobilePortrait: boolean;
    isMobileLandscape: boolean;
    isTabletPortrait: boolean;
    isTabletLandscape: boolean;
    isDesktopTouch: boolean;
    isDesktopMouse: boolean;
    shouldShowMobileNav: boolean;
    shouldShowDesktopSidebar: boolean;
    shouldUseTouchOptimizedElements: boolean;
    getGridColumns: (desktop: number, tablet?: number, mobile?: number) => number;
    getFontSize: (desktop: string, tablet?: string, mobile?: string) => string;
    isTouchDevice: boolean;
    hasTouchEvents: boolean;
    hasHover: boolean;
    orientation: "portrait" | "landscape";
    isPortrait: boolean;
    isLandscape: boolean;
    breakpoint: "sm" | "md" | "lg" | "xl" | "2xl" | "xs";
    windowSize: {
        width: number;
        height: number;
    };
    isXs: boolean;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
    is2Xl: boolean;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLargeDesktop: boolean;
    isSmallMobile: boolean;
    isAtLeast: (target: Breakpoint) => boolean;
    isAtMost: (target: Breakpoint) => boolean;
};
export declare function useSafeArea(): {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
