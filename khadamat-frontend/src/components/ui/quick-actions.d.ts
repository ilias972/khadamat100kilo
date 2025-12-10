import React from 'react';
interface QuickActionsProps {
    context?: 'home' | 'dashboard' | 'services' | 'booking';
    user?: any;
    className?: string;
}
export declare const QuickActions: React.FC<QuickActionsProps>;
export declare const useQuickActions: () => {
    isVisible: boolean;
};
export {};
