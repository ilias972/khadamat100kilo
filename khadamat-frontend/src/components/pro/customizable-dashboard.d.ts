import React from 'react';
interface Widget {
    id: string;
    title: string;
    component: string;
    size: 'small' | 'medium' | 'large';
    description: string;
    icon: React.ElementType;
}
interface DashboardLayout {
    widgets: Widget[];
}
interface CustomizableDashboardProps {
    initialLayout?: DashboardLayout;
    onLayoutChange?: (layout: DashboardLayout) => void;
}
export declare const CustomizableDashboard: React.FC<CustomizableDashboardProps>;
export {};
