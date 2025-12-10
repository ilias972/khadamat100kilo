'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Star, Clock, RotateCcw, AlertCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { mockCities, mockCategories } from '@/lib/mocks/services-mocks';

interface ServiceFiltersProps {
  filters: {
    cityId?: string;
    serviceId?: string;
  };
  onFiltersChange: (filters: Partial<ServiceFiltersProps['filters']>) => void;
  onClearFilters: () => void;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const router = useRouter();
  const [cities, setCities] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadFiltersData = async () => {
      try {
        setLoading(true);
        const [citiesData, categoriesData] = await Promise.all([
          api.getCities(),
          api.getCategories()
        ]);
        setCities(citiesData.filter((city: any) => city.isActive));
        setCategories(categoriesData.filter((cat: any) => cat.isActive));
        setError(false);
      } catch (err) {
        // Use mock data when API fails (no console error logging)
        setCities(mockCities);
        setCategories(mockCategories);
        setError(false); // Don't show error state, use mock data instead
      } finally {
        setLoading(false);
      }
    };

    loadFiltersData();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-h3 font-semibold text-text-primary font-heading">Filtres</h3>
        <Button
          onClick={onClearFilters}
          className="text-text-muted hover:text-[#F97B22] bg-transparent hover:bg-[#F97B22]/10 rounded-[24px] px-4 py-2 font-medium transition-all duration-200"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Réinitialiser
        </Button>
      </div>

      {/* Service Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-3">
          Type de service
        </label>
        {loading ? (
          <div className="w-full h-12 bg-[#EDEEEF] rounded-[24px] animate-pulse"></div>
        ) : error ? (
          <div className="w-full px-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-muted flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Impossible de charger les services
          </div>
        ) : (
          <select
            value={filters.serviceId || ''}
            onChange={(e) => onFiltersChange({ serviceId: e.target.value || undefined })}
            className="w-full px-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200"
          >
            <option value="">Tous les services</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* City Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-3">
          Ville
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
          {loading ? (
            <div className="w-full pl-12 pr-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] animate-pulse"></div>
          ) : error ? (
            <div className="w-full pl-12 pr-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-muted flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Impossible de charger les villes
            </div>
          ) : (
            <select
              value={filters.cityId || ''}
              onChange={(e) => onFiltersChange({ cityId: e.target.value || undefined })}
              className="w-full pl-12 pr-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200"
            >
              <option value="">Toutes les villes</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Apply Filters Button */}
      <Button
        onClick={() => {
          const params = new URLSearchParams();
          if (filters.cityId) params.set('cityId', filters.cityId);
          if (filters.serviceId) params.set('category', filters.serviceId);
          router.push(`/pros${params.toString() ? '?' + params.toString() : ''}`);
        }}
        disabled={!filters.cityId && !filters.serviceId}
        className="w-full bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] py-3 font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Trouver des artisans
      </Button>
    </div>
  );
};