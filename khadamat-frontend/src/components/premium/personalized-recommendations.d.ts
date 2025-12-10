import React from 'react';
export interface RecommendationItem {
    id: string;
    type: 'service' | 'professional' | 'deal' | 'trending';
    title: string;
    subtitle?: string;
    image?: string;
    rating?: number;
    price?: number;
    originalPrice?: number;
    discount?: number;
    distance?: number;
    availability?: string;
    reason: string;
    tags?: string[];
    urgency?: 'low' | 'medium' | 'high';
    popularity?: number;
    matchScore?: number;
}
interface PersonalizedRecommendationsProps {
    userId?: string;
    location?: string;
    preferences?: string[];
    maxItems?: number;
    className?: string;
    onItemClick?: (item: RecommendationItem) => void;
    onRefresh?: () => void;
}
export declare const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps>;
export {};
