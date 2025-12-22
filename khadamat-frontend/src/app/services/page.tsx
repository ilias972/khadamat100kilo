'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ServiceGrid } from '@/components/services/service-grid';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';
import { City, ServiceCategory } from '@/types/api';
import { CityUI, ServiceCategoryUI, mapCitiesApiToUI, mapServiceCategoriesApiToUI } from '@/types/api-dtos';
import { mockCities, mockCategories } from '@/lib/mocks/services-mocks';

interface ServiceFilters {
  cityId?: string;
  serviceId?: string;
  searchTerm?: string;
}

function ServicesPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<ServiceFilters>({
    cityId: searchParams.get('cityId') || '',
    serviceId: searchParams.get('serviceId') || '',
    searchTerm: searchParams.get('search') || '',
  });
  const [cities, setCities] = useState<CityUI[]>([]);
  const [categories, setCategories] = useState<ServiceCategoryUI[]>([]);
  const [loadingFilters, setLoadingFilters] = useState(true);

  // Load filter data
  useEffect(() => {
    const loadFiltersData = async () => {
      try {
        setLoadingFilters(true);
        const [citiesData, categoriesData] = await Promise.all([
          api.getCities(),
          api.getCategories()
        ]);
        // Map API responses to UI types and filter active ones
        const mappedCities = mapCitiesApiToUI(citiesData).filter(city => city.isActive);
        const mappedCategories = mapServiceCategoriesApiToUI(categoriesData).filter(cat => cat.isActive);
        setCities(mappedCities);
        setCategories(mappedCategories);
      } catch (err) {
        console.warn('API failed, using mock data:', err);
        setCities(mockCities);
        setCategories(mockCategories);
      } finally {
        setLoadingFilters(false);
      }
    };

    loadFiltersData();
  }, []);

  // Update filters when URL params change
  useEffect(() => {
    const cityId = searchParams.get('cityId');
    const serviceId = searchParams.get('serviceId');
    const search = searchParams.get('search');

    setFilters({
      cityId: cityId || '',
      serviceId: serviceId || '',
      searchTerm: search || '',
    });
  }, [searchParams]);

  const handleFiltersChange = (newFilters: Partial<ServiceFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Update URL without triggering navigation
    const params = new URLSearchParams();
    if (updatedFilters.cityId) params.set('cityId', updatedFilters.cityId);
    if (updatedFilters.serviceId) params.set('serviceId', updatedFilters.serviceId);
    if (updatedFilters.searchTerm) params.set('search', updatedFilters.searchTerm);

    const newUrl = `/services${params.toString() ? '?' + params.toString() : ''}`;
    router.replace(newUrl, { scroll: false });
  };

  const handleSearchChange = (searchTerm: string) => {
    handleFiltersChange({ searchTerm });
  };

  const clearFilters = () => {
    setFilters({ searchTerm: '' });
    router.replace('/services', { scroll: false });
  };

  const handleFindPros = () => {
    const params = new URLSearchParams();
    if (filters.cityId) params.set('cityId', filters.cityId);
    if (filters.serviceId) params.set('category', filters.serviceId);
    router.push(`/pros${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-primary-300/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
            <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-br from-secondary-300/20 to-primary-500/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-[length:24px_24px] opacity-20"></div>
          </div>

          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-h1 font-bold text-text-primary leading-tight tracking-tight font-heading mb-4">
                Tous les services disponibles sur Khadamat
              </h1>
              <p className="text-body text-text-secondary leading-relaxed font-body mb-8 max-w-2xl mx-auto">
                Choisissez un service et une ville pour découvrir les artisans disponibles près de chez vous.
              </p>

            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Main Content */}
              <div>



                {/* Services Grid */}
                <ServiceGrid filters={filters} categories={categories} />

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                  <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                    <h3 className="text-h3 font-semibold text-text-primary mb-4 font-heading">
                      Prêt à trouver votre artisan ?
                    </h3>
                    <p className="text-body text-text-secondary mb-6 font-body">
                      Utilisez nos filtres pour affiner votre recherche et découvrir les professionnels disponibles près de chez vous.
                    </p>
                    <Button
                      onClick={() => router.push('/')}
                      className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-8 py-3 font-semibold transition-all duration-200 hover:shadow-lg"
                    >
                      Commencer ma recherche
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-surface rounded w-1/3"></div>
              <div className="h-12 bg-surface rounded w-full"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-surface rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    }>
      <ServicesPageContent />
    </Suspense>
  );
}
