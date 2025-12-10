import React from 'react';
import { HTMLMotionProps } from 'framer-motion';
interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size"> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'premium';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    fullWidth?: boolean;
    premium?: boolean;
}
export declare const Button: React.FC<ButtonProps>;
export {};
