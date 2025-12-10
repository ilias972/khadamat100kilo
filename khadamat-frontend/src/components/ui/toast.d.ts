import React from 'react';
interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    onClose?: () => void;
    duration?: number;
}
export declare const Toast: React.FC<ToastProps>;
export {};
