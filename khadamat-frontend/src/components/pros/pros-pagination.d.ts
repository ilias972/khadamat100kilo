import React from 'react';
interface ProsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
export declare const ProsPagination: React.FC<ProsPaginationProps>;
export {};
