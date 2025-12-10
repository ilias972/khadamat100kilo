import React from 'react';
import { ProService } from '@/lib/mocks/pro-services-mocks';
interface ServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (service: Omit<ProService, 'id'> | ProService) => void;
    editingService: ProService | null;
}
export declare const ServiceModal: React.FC<ServiceModalProps>;
export {};
