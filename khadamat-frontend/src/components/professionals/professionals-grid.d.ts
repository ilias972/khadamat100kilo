import React from 'react';
interface ProfessionalsGridProps {
    filters: {
        cityId?: string;
        category?: string;
        minRating?: number;
        isVerified?: boolean;
        isPremium?: boolean;
        page?: number;
        limit?: number;
    };
    onPageChange: (page: number) => void;
    onTotalChange?: (total: number, totalPages: number) => void;
}
export declare const ProfessionalsGrid: React.FC<ProfessionalsGridProps>;
export {};
