'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProsFilters } from '@/components/pros/pros-filters';
import { ProsResultSummary } from '@/components/pros/pros-result-summary';
import { ProsGrid } from '@/components/pros/pros-grid';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal, X } from 'lucide-react';
import { mockCities, mockCategories, type Professional } from '@/lib/mocks/services-mocks';
import { useProfessionals } from '@/hooks/use-professionals';

interface ProsFiltersState {
  cityId?: string;
  category?: string;
  search?: string;
  minRating?: number;
  onlyVerified?: boolean;
  onlyPremium?: boolean;
  page?: number;
}

function ProsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse URL parameters
  const [filters, setFilters] = useState<ProsFiltersState>({
    cityId: searchParams.get('cityId') || '',
    category: searchParams.get('category') || '',
    search: searchParams.get('search') || '',
    minRating: searchParams.get('rating') ? parseFloat(searchParams.get('rating')!) : undefined,
    onlyVerified: searchParams.get('verified') === 'true',
    onlyPremium: searchParams.get('premium') === 'true',
    page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
  });

  const [showFilters, setShowFilters] = useState(false);

  // Use the professionals hook
  const { professionals, pagination, isLoading } = useProfessionals(filters);

  // Update filters when URL params change
  useEffect(() => {
    const cityId = searchParams.get('cityId');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const rating = searchParams.get('rating');
    const verified = searchParams.get('verified');
    const premium = searchParams.get('premium');
    const page = searchParams.get('page');

    setFilters({
      cityId: cityId || '',
      category: category || '',
      search: search || '',
      minRating: rating ? parseFloat(rating) : undefined,
      onlyVerified: verified === 'true',
      onlyPremium: premium === 'true',
      page: page ? parseInt(page) : 1,
    });
  }, [searchParams]);

  const handleFiltersChange = (newFilters: Partial<ProsFiltersState>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 }; // Reset to page 1 when filters change
    setFilters(updatedFilters);

    // Update URL params
    const params = new URLSearchParams();
    if (updatedFilters.cityId) params.set('cityId', updatedFilters.cityId);
    if (updatedFilters.category) params.set('category', updatedFilters.category);
    if (updatedFilters.search) params.set('search', updatedFilters.search);
    if (updatedFilters.minRating) params.set('rating', updatedFilters.minRating.toString());
    if (updatedFilters.onlyVerified) params.set('verified', 'true');
    if (updatedFilters.onlyPremium) params.set('premium', 'true');
    if (updatedFilters.page && updatedFilters.page > 1) params.set('page', updatedFilters.page.toString());

    // Update URL without triggering navigation
    const newUrl = `/pros${params.toString() ? '?' + params.toString() : ''}`;
    router.replace(newUrl, { scroll: false });
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
    });
    router.replace('/pros', { scroll: false });
  };

  // Create filter summary for result summary
  const getActiveFiltersSummary = () => {
    const parts = [];
    if (filters.cityId) {
      const city = mockCities.find(c => c.id === filters.cityId);
      if (city) parts.push(city.name);
    }
    if (filters.category) {
      const category = mockCategories.find(c => c.id === filters.category);
      if (category) parts.push(category.name);
    }
    if (filters.minRating) parts.push(`Note ≥ ${filters.minRating}★`);
    if (filters.onlyVerified) parts.push('Pros vérifiés');
    if (filters.onlyPremium) parts.push('Pros premium');

    return parts;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Main Content */}
        <section className="pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Desktop Filters Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                    <ProsFilters
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      onClearFilters={clearFilters}
                      cities={mockCities}
                      categories={mockCategories}
                    />
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Mobile Filters Toggle */}
                <div className="lg:hidden mb-6">
                  <Button
                    onClick={() => setShowFilters(true)}
                    className="w-full bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] py-3 font-semibold transition-all duration-200"
                  >
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filtres
                  </Button>
                </div>

                {/* Result Summary */}
                <ProsResultSummary
                  totalResults={pagination?.total || 0}
                  activeFilters={getActiveFiltersSummary()}
                  onClearFilters={clearFilters}
                />

                {/* Professionals Grid */}
                <ProsGrid
                  professionals={professionals}
                  isLoading={isLoading}
                  isUsingMocks={false}
                  onPageChange={(page: number) => handleFiltersChange({ page })}
                  currentPage={pagination?.page || 1}
                  totalPages={pagination?.totalPages || 1}
                />

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                  <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                    <h3 className="text-h3 font-semibold text-text-primary mb-4 font-heading">
                      Vous êtes artisan ?
                    </h3>
                    <p className="text-body text-text-secondary mb-6 font-body">
                      Rejoignez Khadamat et développez votre activité en ligne.
                    </p>
                    <Button
                      onClick={() => router.push('/devenir-pro')}
                      className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-8 py-3 font-semibold transition-all duration-200 hover:shadow-lg"
                    >
                      Devenir professionnel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Filters Modal */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilters(false)} />
            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-background shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-border-light">
                <h3 className="text-lg font-semibold text-text-primary">Filtres</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-surface rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <ProsFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={clearFilters}
                  cities={mockCities}
                  categories={mockCategories}
                />
                <div className="mt-6">
                  <Button
                    onClick={() => setShowFilters(false)}
                    className="w-full"
                  >
                    Appliquer les filtres
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ProsPage() {
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
      <ProsPageContent />
    </Suspense>
  );
}