import React from 'react';
interface AIInsight {
    id: string;
    category: 'revenue' | 'pricing' | 'client-acquisition' | 'seasonal' | 'competitor';
    priority: 'high' | 'medium' | 'low';
    title: string;
    description: string;
    icon: React.ElementType;
    predictedImpact: {
        revenue: number;
        percentage: number;
    };
    confidence: number;
    actionItems: string[];
    timeframe: string;
}
interface BusinessData {
    revenue: number;
    bookings: number;
    averageRating: number;
    completionRate: number;
}
interface AIBusinessInsightsProps {
    businessData: BusinessData;
    onImplement?: (insight: AIInsight) => void;
    onLearnMore?: (insight: AIInsight) => void;
}
export declare const AIBusinessInsights: React.FC<AIBusinessInsightsProps>;
export {};
