import React from 'react';
import { Category } from '@/lib/api';
interface ServiceCardProps {
    category: Category;
    index: number;
    isSelected?: boolean;
    cityId?: string;
    className?: string;
}
export declare const ServiceCard: React.FC<ServiceCardProps>;
interface ServiceCardGridProps {
    categories: Category[];
    selectedCategoryId?: string;
    cityId?: string;
    className?: string;
}
export declare const ServiceCardGrid: React.FC<ServiceCardGridProps>;
export {};
