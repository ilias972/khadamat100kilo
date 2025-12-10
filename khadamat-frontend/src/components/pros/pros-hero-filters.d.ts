import React from 'react';
import { type City, type Category } from '@/lib/api';
interface ProsHeroFiltersProps {
    filters: {
        cityId?: string;
        category?: string;
        search?: string;
        minRating?: number;
        onlyVerified?: boolean;
        onlyPremium?: boolean;
        page?: number;
    };
    onFiltersChange: (filters: Partial<ProsHeroFiltersProps['filters']>) => void;
    cities: City[];
    categories: Category[];
}
export declare const ProsHeroFilters: React.FC<ProsHeroFiltersProps>;
export {};
