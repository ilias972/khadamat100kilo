import React from 'react';
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';
interface TooltipAdvancedProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: TooltipPosition;
    delay?: number;
    disabled?: boolean;
    maxWidth?: number;
    variant?: 'default' | 'premium' | 'minimal';
    showArrow?: boolean;
    interactive?: boolean;
    className?: string;
}
export declare const TooltipAdvanced: React.FC<TooltipAdvancedProps>;
interface TooltipGroupProps {
    children: React.ReactNode;
    delay?: number;
}
export declare const TooltipGroup: React.FC<TooltipGroupProps>;
export declare const InfoTooltip: React.FC<Omit<TooltipAdvancedProps, 'content' | 'variant'>>;
export declare const HelpTooltip: React.FC<Omit<TooltipAdvancedProps, 'content' | 'variant'>>;
export declare const PremiumTooltip: React.FC<Omit<TooltipAdvancedProps, 'content' | 'variant'>>;
export {};
