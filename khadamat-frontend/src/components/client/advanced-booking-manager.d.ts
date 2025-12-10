import React from 'react';
interface Booking {
    id: string;
    serviceName: string;
    serviceCategory: string;
    professionalName: string;
    professionalId: string;
    status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    date: string;
    time: string;
    price: number;
    location: string;
    notes?: string;
    rating?: number;
    imageUrl?: string;
}
interface AdvancedBookingManagerProps {
    bookings?: Booking[];
    onBookingAction?: (action: string, bookingId: string) => void;
}
export declare const AdvancedBookingManager: React.FC<AdvancedBookingManagerProps>;
export {};
