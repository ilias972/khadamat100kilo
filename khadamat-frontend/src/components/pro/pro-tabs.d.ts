import React from 'react';
interface ProTabsProps {
    activeTab: string;
    onChange: (tab: string) => void;
}
export declare function ProTabs({ activeTab, onChange }: ProTabsProps): React.JSX.Element;
export {};
