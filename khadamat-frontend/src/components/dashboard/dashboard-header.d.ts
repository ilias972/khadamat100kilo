import React from 'react';
interface DashboardHeaderProps {
    title: string;
    subtitle?: string;
    onMenuClick?: () => void;
    unreadNotifications?: number;
}
export declare function DashboardHeader({ title, subtitle, onMenuClick, unreadNotifications }: DashboardHeaderProps): React.JSX.Element;
export {};
