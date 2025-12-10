import React from 'react';
import { HTMLMotionProps } from 'framer-motion';
interface GlassContainerProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
    children: React.ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg' | 'xl';
    intensity?: 'light' | 'medium' | 'strong';
    animated?: boolean;
    reveal?: boolean;
}
export declare const GlassContainer: React.FC<GlassContainerProps>;
export {};
