import React from 'react';
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'verified' | 'pro-verified' | 'client-verified';
    size?: 'sm' | 'md' | 'lg';
}
export declare const Badge: React.FC<BadgeProps>;
export {};
