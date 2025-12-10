import React from 'react';
interface ProfessionalsPaginationProps {
    filters: {
        page?: number;
        limit?: number;
    };
    onPageChange: (page: number) => void;
    total?: number;
    totalPages?: number;
}
export declare const ProfessionalsPagination: React.FC<ProfessionalsPaginationProps>;
export {};
