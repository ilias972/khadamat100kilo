interface ProsFiltersState {
    cityId?: string;
    serviceCategoryId?: string;
    search?: string;
    minRating?: number;
    onlyVerified?: boolean;
    onlyPremium?: boolean;
    page?: number;
}
export declare const useProfessionals: (filters: ProsFiltersState) => {
    professionals: Professional[];
    isLoading: boolean;
};
export {};
