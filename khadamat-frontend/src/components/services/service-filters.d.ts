import React from 'react';
interface ServiceFiltersProps {
    filters: {
        cityId?: string;
        serviceId?: string;
    };
    onFiltersChange: (filters: Partial<ServiceFiltersProps['filters']>) => void;
    onClearFilters: () => void;
}
export declare const ServiceFilters: React.FC<ServiceFiltersProps>;
export {};
