export declare enum Role {
    CLIENT = "CLIENT",
    PRO = "PRO",
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR"
}
export declare enum BookingStatus {
    QUOTED = "quoted",
    ACCEPTED = "accepted",
    SCHEDULED = "scheduled",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    DISPUTED = "disputed",
    CANCELLED = "cancelled"
}
export interface ClientProfile {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    address?: string;
    cityId?: string;
    preferredLanguage: string;
}
export interface ProProfile {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    profession: string;
    bio?: string;
    cityId?: string;
    isVerifiedPro: boolean;
    isPremium: boolean;
    averageRating?: number;
    totalReviews: number;
}
export interface User {
    id: string;
    email: string;
    phone: string;
    role: Role;
    status: string;
    isEmailVerified: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    clientProfile?: ClientProfile;
    proProfile?: ProProfile;
}
export interface ServiceCategory {
    id: string;
    name: string;
    description?: string;
    icon?: string;
    isActive: boolean;
}
export interface City {
    id: string;
    name: string;
    region?: string;
    isActive: boolean;
}
export interface ProService {
    id: string;
    proProfileId: string;
    serviceCategoryId: string;
    cityId: string;
    basePrice: number;
    minPrice?: number;
    maxPrice?: number;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface Booking {
    id: string;
    clientId: string;
    proId: string;
    serviceCategoryId: string;
    cityId: string;
    description: string;
    photos: string;
    scheduledDate?: Date;
    timeSlot?: string;
    priceEstimate?: number;
    finalPrice?: number;
    status: BookingStatus;
    createdAt: Date;
    updatedAt: Date;
}
export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}
export interface AuthResponse {
    user: User;
    access_token: string;
    refresh_token: string;
}
export interface LoginResponse {
    user: User;
    accessToken: string;
}
