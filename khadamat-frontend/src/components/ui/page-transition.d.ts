import React from 'react';
import { HTMLMotionProps } from 'framer-motion';
export type TransitionType = 'fade' | 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'scale' | 'rotate' | 'flip' | 'zoom' | 'blur' | 'moroccan-fade' | 'moroccan-slide' | 'moroccan-scale' | 'moroccan-spiral' | 'moroccan-wave';
interface PageTransitionProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
    children: React.ReactNode;
    type?: TransitionType;
    duration?: number;
    delay?: number;
    className?: string;
}
export declare const PageTransition: React.FC<PageTransitionProps>;
interface PageTransitionContextType {
    transitionType: TransitionType;
    setTransitionType: (type: TransitionType) => void;
    duration: number;
    setDuration: (duration: number) => void;
}
export declare const usePageTransition: () => PageTransitionContextType;
interface PageTransitionProviderProps {
    children: React.ReactNode;
    defaultType?: TransitionType;
    defaultDuration?: number;
}
export declare const PageTransitionProvider: React.FC<PageTransitionProviderProps>;
interface SmartPageTransitionProps extends Omit<PageTransitionProps, 'type'> {
    children: React.ReactNode;
    routeTransitions?: Record<string, TransitionType>;
}
export declare const SmartPageTransition: React.FC<SmartPageTransitionProps>;
interface StaggeredTransitionProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
    children: React.ReactNode;
    staggerDelay?: number;
    childAnimation?: TransitionType;
}
export declare const StaggeredTransition: React.FC<StaggeredTransitionProps>;
interface LoadingTransitionProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
    children: React.ReactNode;
    isLoading: boolean;
    loadingComponent?: React.ReactNode;
    type?: TransitionType;
}
export declare const LoadingTransition: React.FC<LoadingTransitionProps>;
export declare const transitions: {
    readonly page: (type?: TransitionType) => {
        type: TransitionType;
        duration: number;
    };
    readonly modal: (type?: TransitionType) => {
        type: TransitionType;
        duration: number;
    };
    readonly card: (type?: TransitionType) => {
        type: TransitionType;
        duration: number;
        delay: number;
    };
    readonly list: (type?: TransitionType) => {
        type: TransitionType;
        duration: number;
        staggerDelay: number;
    };
};
export {};
