import React from 'react';
interface FadeInStaggerProps {
    children: React.ReactNode;
    className?: string;
    staggerDelay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    duration?: number;
    once?: boolean;
    triggerOnce?: boolean;
}
export declare const FadeInStagger: React.FC<FadeInStaggerProps>;
export declare const FadeInStaggerUp: React.FC<Omit<FadeInStaggerProps, 'direction'>>;
export declare const FadeInStaggerDown: React.FC<Omit<FadeInStaggerProps, 'direction'>>;
export declare const FadeInStaggerLeft: React.FC<Omit<FadeInStaggerProps, 'direction'>>;
export declare const FadeInStaggerRight: React.FC<Omit<FadeInStaggerProps, 'direction'>>;
export declare const FadeInStaggerGrid: React.FC<FadeInStaggerProps & {
    columns?: number;
    rows?: number;
}>;
export default FadeInStagger;
