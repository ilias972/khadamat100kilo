import { type ClassValue } from "clsx";
export declare function cn(...inputs: ClassValue[]): string;
export declare function formatCurrency(amount: number, currency?: string): string;
export declare function formatDate(date: Date | string): string;
export declare function formatRelativeTime(date: Date | string): string;
export declare function truncateText(text: string, maxLength: number): string;
export declare function generateSlug(text: string): string;
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
