"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProfessionals = void 0;
const react_1 = require("react");
const client_1 = __importDefault(require("../../lib/api/client"));
const useProfessionals = (filters) => {
    const [professionals, setProfessionals] = (0, react_1.useState)([]);
    const [pagination, setPagination] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchProfessionals = async () => {
            setIsLoading(true);
            try {
                const response = await client_1.default.getPros({
                    cityId: filters.cityId,
                    category: filters.category,
                    search: filters.search,
                    minRating: filters.minRating,
                    isVerified: filters.isVerified,
                    page: filters.page || 1,
                    limit: filters.limit || 12,
                });
                if (response && Array.isArray(response.professionals)) {
                    const transformedProfessionals = response.professionals.map((pro) => ({
                        id: pro.userId,
                        fullName: `${pro.firstName} ${pro.lastName}`,
                        avatarUrl: undefined,
                        cityId: pro.cityId,
                        serviceCategoryId: Array.isArray(pro.proServices) && pro.proServices.length > 0 ? pro.proServices[0].serviceCategoryId : '',
                        title: pro.profession || 'Professionnel',
                        shortBio: pro.bio || '',
                        rating: pro.averageRating || 0,
                        reviewCount: pro.totalReviews || 0,
                        isVerified: pro.isVerifiedPro || false,
                        isPremium: pro.isPremium || false,
                        startingPrice: Array.isArray(pro.proServices) && pro.proServices.length > 0 ? pro.proServices[0].basePrice : 100,
                        experienceYears: 5,
                        responseTime: 'Répond sous 24h',
                        badgeLabels: pro.isVerifiedPro ? ['Vérifié'] : [],
                        cityName: pro.city?.name,
                        serviceCategoryName: Array.isArray(pro.proServices) && pro.proServices.length > 0 ? pro.proServices[0].serviceCategory?.name : undefined,
                        portfolioImages: [],
                    }));
                    setProfessionals(transformedProfessionals);
                    setPagination({
                        total: response.total,
                        page: response.page,
                        pageSize: response.pageSize,
                        totalPages: response.totalPages,
                        hasNext: response.hasNext,
                        hasPrev: response.hasPrev,
                    });
                }
                else {
                    setProfessionals([]);
                    setPagination(null);
                }
            }
            catch (error) {
                console.error('Error fetching professionals:', error);
                setProfessionals([]);
                setPagination(null);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchProfessionals();
    }, [filters]);
    return { professionals, pagination, isLoading };
};
exports.useProfessionals = useProfessionals;
//# sourceMappingURL=use-professionals.js.map