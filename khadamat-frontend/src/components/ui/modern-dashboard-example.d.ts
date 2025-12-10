import React from 'react';
interface ModernDashboardProps {
    type: 'client' | 'pro';
    children?: React.ReactNode;
}
export declare function ModernDashboardLayout({ type, children }: ModernDashboardProps): React.JSX.Element;
export declare function ExampleClientDashboard(): React.JSX.Element;
export declare function ExampleProDashboard(): React.JSX.Element;
export declare function ResponsiveDashboardExample(): React.JSX.Element;
export {};
