import { type ClassValue } from 'clsx';
export declare function cn(...inputs: ClassValue[]): string;
export declare function formatCurrency(amount: number): string;
export declare function formatDate(date: string | Date): string;
export declare function formatRelativeTime(date: string | Date): string;
export declare function getInitials(firstName: string, lastName: string): string;
export declare function truncateText(text: string, maxLength: number): string;
export declare function isValidEmail(email: string): boolean;
export declare function isValidPhone(phone: string): boolean;
