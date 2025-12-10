import React from 'react';
import { ProService } from '@/types/api';
interface BookingModalProps {
    selectedService: ProService;
    isOpen: boolean;
    onClose: () => void;
}
export declare const BookingModal: React.FC<BookingModalProps>;
export {};
