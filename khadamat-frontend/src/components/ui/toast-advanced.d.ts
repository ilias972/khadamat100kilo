import React from 'react';
import { HTMLMotionProps } from 'framer-motion';
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';
export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}
interface ToastAdvancedProps extends Omit<HTMLMotionProps<"div">, "onAnimationStart" | "onAnimationComplete"> {
    toast: Toast;
    onRemove: (id: string) => void;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}
export declare const ToastAdvanced: React.FC<ToastAdvancedProps>;
interface ToastContainerProps {
    toasts: Toast[];
    onRemove: (id: string) => void;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
    className?: string;
}
export declare const ToastContainer: React.FC<ToastContainerProps>;
export declare const useToastAdvanced: () => {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, "id">) => string;
    removeToast: (id: string) => void;
    clearAll: () => void;
    success: (title: string, description?: string, options?: Partial<Omit<Toast, "id" | "type" | "title" | "description">>) => string;
    error: (title: string, description?: string, options?: Partial<Omit<Toast, "id" | "type" | "title" | "description">>) => string;
    warning: (title: string, description?: string, options?: Partial<Omit<Toast, "id" | "type" | "title" | "description">>) => string;
    info: (title: string, description?: string, options?: Partial<Omit<Toast, "id" | "type" | "title" | "description">>) => string;
    loading: (title: string, description?: string, options?: Partial<Omit<Toast, "id" | "type" | "title" | "description">>) => string;
};
export {};
