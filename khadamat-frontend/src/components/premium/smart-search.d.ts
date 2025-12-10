import React from 'react';
export interface SearchResult {
    id: string;
    type: 'service' | 'professional' | 'location' | 'category';
    title: string;
    subtitle?: string;
    image?: string;
    rating?: number;
    price?: number;
    distance?: number;
    availability?: string;
    tags?: string[];
    metadata?: Record<string, any>;
}
interface SmartSearchProps {
    placeholder?: string;
    onSearch?: (query: string, filters: SearchFilters) => void;
    onResultSelect?: (result: SearchResult) => void;
    recentSearches?: string[];
    popularSearches?: string[];
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'premium' | 'minimal';
}
export interface SearchFilters {
    location?: string;
    category?: string;
    priceRange?: [number, number];
    rating?: number;
    availability?: string;
    distance?: number;
}
export declare const SmartSearch: React.FC<SmartSearchProps>;
export {};
