import { Professional } from '@/lib/mocks/services-mocks';
interface UseProDetailReturn {
    professional: Professional | null;
    isLoading: boolean;
    error: string | null;
}
export declare function useProDetail(id: string): UseProDetailReturn;
export {};
