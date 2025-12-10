import React from 'react';
import { type City, type Category } from '@/lib/api';
interface ProsFiltersProps {
    filters: {
        cityId?: string;
        category?: string;
        search?: string;
        minRating?: number;
        onlyVerified?: boolean;
        onlyPremium?: boolean;
    };
    onFiltersChange: (filters: Partial<ProsFiltersProps['filters']>) => void;
    onClearFilters: () => void;
    cities: City[];
    categories: Category[];
}
export declare const ProsFilters: React.FC<ProsFiltersProps>;
export {};
