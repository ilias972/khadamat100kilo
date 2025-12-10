import React from 'react';
import { BookingHistoryItem } from '@/types/performance-types';

interface PersonalizedRecommendationsProps {
    userId: string;
    bookingHistory?: BookingHistoryItem[];
    maxRecommendations?: number;
}
export declare const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps>;
export {};
