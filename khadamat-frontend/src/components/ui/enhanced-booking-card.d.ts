import React from 'react';
export interface ClientBooking {
    id: string;
    clientId: string;
    professionalId?: string;
    professionalName: string;
    professionalAvatar?: string;
    serviceName: string;
    serviceCategory: string;
    status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    scheduledDate: string;
    scheduledTime: string;
    duration: string;
    price: number;
    location: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}
export interface ProfessionalBooking {
    id: string;
    clientId: string;
    clientName: string;
    clientAvatar?: string;
    clientPhone?: string;
    serviceId: string;
    serviceName: string;
    serviceCategory: string;
    status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
    scheduledDate: string;
    scheduledTime: string;
    duration: string;
    price: number;
    location: string;
    createdAt: string;
    updatedAt: string;
    unreadMessages: number;
    isUrgent?: boolean;
}
interface EnhancedBookingCardProps {
    variant?: 'default' | 'compact' | 'detailed' | 'mobile' | 'list';
    size?: 'sm' | 'md' | 'lg';
    booking: ClientBooking;
    onClick?: () => void;
    onContact?: () => void;
    onReschedule?: () => void;
    onCancel?: () => void;
    onRate?: () => void;
    onMessage?: () => void;
    onFavorite?: () => void;
    showPaymentInfo?: boolean;
    showNotes?: boolean;
    showTimeline?: boolean;
    interactive?: boolean;
    className?: string;
}
export declare function EnhancedBookingCard({ variant, size, booking, onClick, onContact, onReschedule, onCancel, onRate, onMessage, onFavorite, showPaymentInfo, showNotes, showTimeline, interactive, className }: EnhancedBookingCardProps): React.JSX.Element;
interface ProfessionalBookingCardProps {
    variant?: 'default' | 'compact' | 'detailed' | 'mobile' | 'list';
    size?: 'sm' | 'md' | 'lg';
    booking: ProfessionalBooking;
    onClick?: () => void;
    onStatusChange?: (status: ProfessionalBooking['status']) => void;
    onContact?: () => void;
    onMessage?: () => void;
    showPaymentInfo?: boolean;
    interactive?: boolean;
    className?: string;
}
export declare function ProfessionalBookingCard({ variant, size, booking, onClick, onStatusChange, onContact, onMessage, showPaymentInfo, interactive, className }: ProfessionalBookingCardProps): React.JSX.Element;
export {};
