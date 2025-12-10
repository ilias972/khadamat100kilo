export interface ProBooking {
    id: string;
    clientName: string;
    serviceName: string;
    date: string;
    time: string;
    location: string;
    price: number;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    clientAvatar: string;
}
export declare const mockProBookings: ProBooking[];
