import React from 'react';
interface DashboardSidebarProps {
    userType: 'client' | 'pro';
    userName: string;
    userAvatar?: string;
    unreadMessages?: number;
    onClose?: () => void;
}
export declare function DashboardSidebar({ userType, userName, userAvatar, unreadMessages, onClose }: DashboardSidebarProps): React.JSX.Element;
export {};
