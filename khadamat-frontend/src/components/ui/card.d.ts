import React from 'react';
import { HTMLMotionProps } from 'framer-motion';
interface CardProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    interactive?: boolean;
    premium?: boolean;
    glow?: boolean;
}
export declare const Card: React.FC<CardProps>;
export {};
