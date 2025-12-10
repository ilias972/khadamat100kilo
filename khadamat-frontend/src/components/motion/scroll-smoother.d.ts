import { ReactNode } from 'react';
import Lenis from 'lenis';
interface ScrollSmootherProps {
    children: ReactNode;
    options?: {
        duration?: number;
        easing?: (t: number) => number;
        direction?: 'vertical' | 'horizontal';
        gestureDirection?: 'vertical' | 'horizontal' | 'both';
        smooth?: boolean;
        mouseMultiplier?: number;
        smoothTouch?: boolean;
        touchMultiplier?: number;
        infinite?: boolean;
    };
}
export declare const ScrollSmoother: React.FC<ScrollSmootherProps>;
export declare const useLenis: () => Lenis | null;
export declare const scrollToElement: (target: string | HTMLElement, options?: {
    offset?: number;
    duration?: number;
}) => void;
export {};
