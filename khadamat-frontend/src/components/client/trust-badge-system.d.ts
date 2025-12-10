import React from 'react';
interface Professional {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    completedProjects: number;
    responseTime: number;
    verified: boolean;
    joinedDate: string;
}
interface TrustBadgeSystemProps {
    professional: Professional;
    showDescription?: boolean;
    variant?: 'default' | 'compact';
}
export declare const TrustBadgeSystem: React.FC<TrustBadgeSystemProps>;
interface SuccessStory {
    id: string;
    clientName: string;
    clientInitial?: string;
    service: string;
    rating: number;
    story: string;
    image?: string;
    verified: boolean;
    date: string;
    location?: string;
}
interface ClientSuccessStoriesProps {
    serviceCategory?: string;
    stories?: SuccessStory[];
    maxStories?: number;
}
export declare const ClientSuccessStories: React.FC<ClientSuccessStoriesProps>;
interface TrustIndicatorsProps {
    professional: Professional;
}
export declare const TrustIndicators: React.FC<TrustIndicatorsProps>;
export {};
