import React from 'react';
interface Professional {
    id: string;
    fullName: string;
    title: string;
    rating: number;
    reviewCount: number;
    location: string;
    avatar?: string;
    verified: boolean;
    completedJobs: number;
    responseTime: string;
    startingPrice?: number;
    badges?: string[];
    isFavorite?: boolean;
    distance?: string;
}
interface ProfessionalCardProps {
    professional: Professional;
    index: number;
    variant?: 'default' | 'compact' | 'featured';
    showActions?: boolean;
    className?: string;
    onFavoriteToggle?: (id: string) => void;
    onMessage?: (id: string) => void;
}
export declare const ProfessionalCard: React.FC<ProfessionalCardProps>;
export {};
