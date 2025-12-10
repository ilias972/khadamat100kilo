import React from 'react';
import { type Professional } from '@/lib/mocks/services-mocks';
interface ProsGridProps {
    professionals: Professional[];
    isLoading?: boolean;
    isUsingMocks?: boolean;
    onPageChange: (page: number) => void;
    currentPage: number;
    totalPages: number;
}
export declare const ProsGrid: React.FC<ProsGridProps>;
export {};
