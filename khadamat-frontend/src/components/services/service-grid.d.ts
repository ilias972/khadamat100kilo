import React from 'react';
import { Category } from '@/lib/api';
interface ServiceGridProps {
    filters: {
        cityId?: string;
        serviceId?: string;
        searchTerm?: string;
    };
    categories: Category[];
}
export declare const ServiceGrid: React.FC<ServiceGridProps>;
export {};
