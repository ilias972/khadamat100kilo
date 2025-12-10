interface ProsFiltersState {
    cityId?: string;
    category?: string;
    search?: string;
    minRating?: number;
    isVerified?: boolean;
    onlyPremium?: boolean;
    page?: number;
    limit?: number;
}
export declare const useProfessionals: (filters: ProsFiltersState) => {
    professionals: Professional[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    } | null;
    isLoading: boolean;
};
export {};
