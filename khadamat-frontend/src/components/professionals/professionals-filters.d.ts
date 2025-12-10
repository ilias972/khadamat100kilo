import React from 'react';
interface ProfessionalsFiltersProps {
    filters: {
        cityId?: string;
        category?: string;
        minRating?: number;
        isVerified?: boolean;
        isPremium?: boolean;
    };
    onFiltersChange: (filters: Partial<ProfessionalsFiltersProps['filters']>) => void;
    onClearFilters: () => void;
}
export declare const ProfessionalsFilters: React.FC<ProfessionalsFiltersProps>;
export {};
