import React from 'react';
interface ProsResultSummaryProps {
    totalResults: number;
    activeFilters: string[];
    onClearFilters: () => void;
}
export declare const ProsResultSummary: React.FC<ProsResultSummaryProps>;
export {};
