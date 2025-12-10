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
export declare const useMobileFirst: () => MobileFirstState & MobileFirstActions;
export declare const useResponsiveImage: (sources: Record<string, string>) => string;
export declare const useMobileGestures: () => {
    swipeLeft: boolean;
    swipeRight: boolean;
    swipeUp: boolean;
    swipeDown: boolean;
    pinch: boolean;
    tap: boolean;
};
export declare const useMobileViewport: () => {
    isVisualViewportSupported: boolean;
    visualViewportHeight: number;
    visualViewportOffsetTop: number;
};
export {};
