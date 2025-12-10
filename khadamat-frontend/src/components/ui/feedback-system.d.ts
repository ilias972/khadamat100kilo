import React from 'react';
import { HTMLMotionProps } from 'framer-motion';
export type FeedbackType = 'success' | 'error' | 'warning' | 'info' | 'loading';
export interface FeedbackMessage {
    id: string;
    type: FeedbackType;
    title: string;
    message?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}
interface FeedbackSystemProps {
    messages: FeedbackMessage[];
    onRemove: (id: string) => void;
    position?: 'top' | 'bottom' | 'inline';
    maxMessages?: number;
    className?: string;
}
export declare const FeedbackSystem: React.FC<FeedbackSystemProps>;
interface InlineFeedbackProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
    type: FeedbackType;
    message: string;
    show: boolean;
    className?: string;
}
export declare const InlineFeedback: React.FC<InlineFeedbackProps>;
export declare const SuccessCheckmark: React.FC<{
    size?: number;
    className?: string;
}>;
export declare const LoadingSpinner: React.FC<{
    size?: 'sm' | 'md' | 'lg';
    color?: string;
    className?: string;
}>;
export declare const PulseIndicator: React.FC<{
    color?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}>;
export declare const useFeedback: () => {
    messages: FeedbackMessage[];
    addMessage: (message: Omit<FeedbackMessage, "id">) => string;
    removeMessage: (id: string) => void;
    clearAll: () => void;
    success: (title: string, message?: string, options?: Partial<Omit<FeedbackMessage, "id" | "type" | "title" | "message">>) => string;
    error: (title: string, message?: string, options?: Partial<Omit<FeedbackMessage, "id" | "type" | "title" | "message">>) => string;
    warning: (title: string, message?: string, options?: Partial<Omit<FeedbackMessage, "id" | "type" | "title" | "message">>) => string;
    info: (title: string, message?: string, options?: Partial<Omit<FeedbackMessage, "id" | "type" | "title" | "message">>) => string;
    loading: (title: string, message?: string, options?: Partial<Omit<FeedbackMessage, "id" | "type" | "title" | "message">>) => string;
};
export {};
