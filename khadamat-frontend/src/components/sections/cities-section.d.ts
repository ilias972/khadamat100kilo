import React from 'react';
interface CitiesSectionProps {
    onCitySelect?: (cityId: string) => void;
    selectedCityId?: string;
}
export declare const CitiesSection: React.FC<CitiesSectionProps>;
export {};
