import React from 'react';
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    tooltip?: string;
    id?: string;
}
export declare const AccessibleButton: React.ForwardRefExoticComponent<AccessibleButtonProps & React.RefAttributes<HTMLButtonElement>>;
export declare function useEnhancedFocus(): {
    focusedElement: HTMLElement | null;
    focusElement: (element: HTMLElement | null) => void;
    restoreFocus: () => void;
    trapFocus: (container: HTMLElement) => () => void;
};
export declare function SkipNav(): React.JSX.Element;
interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    required?: boolean;
}
export declare const AccessibleInput: React.ForwardRefExoticComponent<AccessibleInputProps & React.RefAttributes<HTMLInputElement>>;
interface AccessibleModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    ariaLabel?: string;
}
export declare const AccessibleModal: React.FC<AccessibleModalProps>;
export declare function useScreenReader(): {
    announce: (message: string, priority?: "polite" | "assertive") => void;
};
export {};
