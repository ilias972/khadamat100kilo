import React from 'react';
interface MobileBottomNavProps {
    className?: string;
}
export declare function MobileBottomNav({ className }: MobileBottomNavProps): React.JSX.Element;
export declare function useMobileLayout(): {
    isMobile: boolean;
    isLandscape: boolean;
    isDesktop: boolean;
};
export declare function SafeAreaPadding({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export {};
