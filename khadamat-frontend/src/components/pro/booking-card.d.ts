import React from 'react';
import { ProfessionalDetail } from '@/lib/mocks/services-mocks';
interface BookingCardProps {
    professional: ProfessionalDetail;
    onBookNow: () => void;
    onContact: () => void;
}
export declare function BookingCard({ professional, onBookNow, onContact }: BookingCardProps): React.JSX.Element;
export {};
