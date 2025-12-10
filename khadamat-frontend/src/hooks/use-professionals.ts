import { useState, useEffect } from 'react';
import { type Professional } from '@/lib/mocks/services-mocks';
import api from '@/lib/api-client';

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

export const useProfessionals = (filters: ProsFiltersState) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfessionals = async () => {
      setIsLoading(true);

      try {
        const response = await api.getPros({
          cityId: filters.cityId,
          category: filters.category,
          search: filters.search,
          minRating: filters.minRating,
          isVerified: filters.isVerified,
          page: filters.page || 1,
          limit: filters.limit || 12,
        });
        if (response && Array.isArray(response.professionals)) {
          // Transform API response to match UI Professional interface
          const transformedProfessionals: Professional[] = response.professionals.map((pro: any) => ({
            id: pro.userId, // Use userId as the professional ID
            fullName: `${pro.firstName} ${pro.lastName}`, // Combine first and last name
            avatarUrl: undefined, // Not provided by API
            cityId: pro.cityId,
            serviceCategoryId: Array.isArray(pro.proServices) && pro.proServices.length > 0 ? pro.proServices[0].serviceCategoryId : '', // Take first service category ID
            title: pro.profession || 'Professionnel',
            shortBio: pro.bio || '',
            rating: pro.averageRating || 0,
            reviewCount: pro.totalReviews || 0,
            isVerified: pro.isVerifiedPro || false,
            isPremium: pro.isPremium || false,
            startingPrice: Array.isArray(pro.proServices) && pro.proServices.length > 0 ? pro.proServices[0].basePrice : 100, // Use base price from first service
            experienceYears: 5, // Default value, not in API
            responseTime: 'Répond sous 24h',
            badgeLabels: pro.isVerifiedPro ? ['Vérifié'] : [],
            cityName: pro.city?.name, // City name from included city object
            serviceCategoryName: Array.isArray(pro.proServices) && pro.proServices.length > 0 ? pro.proServices[0].serviceCategory?.name : undefined, // Service category name
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
        } else {
          setProfessionals([]);
          setPagination(null);
        }
      } catch (error) {
        console.error('Error fetching professionals:', error);
        setProfessionals([]);
        setPagination(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionals();
  }, [filters]);

  return { professionals, pagination, isLoading };
};