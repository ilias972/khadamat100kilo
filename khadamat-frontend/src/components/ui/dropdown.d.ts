import React from 'react';
interface DropdownProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
export declare function Dropdown({ trigger, children, className }: DropdownProps): React.JSX.Element;
interface DropdownItemProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}
export declare function DropdownItem({ children, onClick, className, disabled }: DropdownItemProps): React.JSX.Element;
interface DropdownDividerProps {
    className?: string;
}
export declare function DropdownDivider({ className }: DropdownDividerProps): React.JSX.Element;
export {};
