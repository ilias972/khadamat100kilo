'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertCircle,
  Users,
  Search,
  Info,
  X
} from 'lucide-react';
import { api } from '@/lib/api';
import { mockCategories } from '@/lib/mocks/services-mocks';
import { ServiceCardGrid } from '@/components/ui/service-card';

// Icon mapping for categories (PNG files)
const iconMap: Record<string, string> = {
  'plomberie': '/plomberieICONE.png',
  'électricité': '/electricitéICONE.png',
  'ménage': '/menageICONE.png',
  'peinture': '/peintureICONE.png',
  'jardinage': '/jardinageICONE.png',
  'déménagement': '/demenagementICONE.png',
  'maçonnerie': '/maconnerieICONE.png',
  'photographie': '/photographieICONE.png',
  'default': '/plomberieICONE.png',
};

// Color mapping for categories
const colorMap: Record<string, string> = {
  'plomberie': 'text-primary-500',
  'électricité': 'text-secondary-500',
  'ménage': 'text-success-500',
  'peinture': 'text-warning-500',
  'jardinage': 'text-emerald-500',
  'maçonnerie': 'text-gray-600',
  'déménagement': 'text-blue-500',
  'photographie': 'text-purple-500',
  'default': 'text-primary-500',
};

interface ServiceGridProps {
  filters: {
    cityId?: string;
    serviceId?: string;
    searchTerm?: string;
  };
  categories: any[];
}

export const ServiceGrid: React.FC<ServiceGridProps> = React.memo(({ filters, categories: allCategories }) => {
  const router = useRouter();
  const [fetchedCategories, setFetchedCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);
  const [dismissedAlert, setDismissedAlert] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getCategories();
      const activeCategories = data.filter((cat: any) => cat.isActive);
      setFetchedCategories(activeCategories);
      setUsingMockData(false);
      setError(false);
    } catch (err) {
      // Use mock data when API fails (no console error logging)
      setFetchedCategories(mockCategories);
      setUsingMockData(true);
      setError(false); // Don't show error state, use mock data instead
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Normalize text for accent-insensitive search - memoized for performance
  const normalizeText = useCallback((text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }, []);

  // Filter categories based on search term and selected service - memoized for performance
  const filteredCategories = useMemo(() => {
    let filtered = fetchedCategories;

    // Filter by selected service first
    if (filters.serviceId) {
      filtered = fetchedCategories.filter((cat: any) => cat.id === filters.serviceId);
    }

    // Then filter by search term with accent normalization
    if (filters.searchTerm && filters.searchTerm.trim()) {
      const normalizedQuery = normalizeText(filters.searchTerm);
      filtered = filtered.filter((cat: any) =>
        normalizeText(cat.name).includes(normalizedQuery) ||
        (cat.description && normalizeText(cat.description).includes(normalizedQuery))
      );
    }

    return filtered;
  }, [fetchedCategories, filters.serviceId, filters.searchTerm, normalizeText]);
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] animate-pulse">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-[#EDEEEF] rounded-[24px] mx-auto"></div>
              <div className="h-6 bg-[#EDEEEF] rounded w-24 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-[#EDEEEF] rounded-[24px] flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-text-muted" />
        </div>
        <h3 className="text-h3 font-semibold text-text-primary mb-2 font-heading">
          Les services n'ont pas pu être chargés
        </h3>
        <p className="text-text-secondary mb-6 font-body">
          Veuillez réessayer dans quelques instants.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] px-6 py-3 font-semibold transition-all duration-200"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  if (fetchedCategories.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-[#EDEEEF] rounded-[24px] flex items-center justify-center">
          <Users className="w-12 h-12 text-text-muted" />
        </div>
        <h3 className="text-h3 font-semibold text-text-primary mb-2 font-heading">
          Les services arrivent bientôt sur Khadamat
        </h3>
        <p className="text-text-secondary mb-6 font-body">
          Nous préparons une sélection de services pour votre région.
        </p>
        <Link href="/">
          <Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Count */}
      {!loading && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F97B22]/10 border border-[#F97B22]/20 rounded-[16px] text-sm text-[#F97B22] font-medium">
            <span>🟠</span>
            <span>{filteredCategories.length} service{filteredCategories.length !== 1 ? 's' : ''} trouvé{filteredCategories.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      )}

      {/* Fallback Message */}
      {usingMockData && !dismissedAlert && (
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50 rounded-[16px] text-sm text-blue-700 backdrop-blur-sm">
            <Info className="w-4 h-4" />
            <span>Mode Démonstration : Données temporaires</span>
            <button
              onClick={() => setDismissedAlert(true)}
              className="ml-2 hover:bg-blue-200/50 rounded-full p-1 transition-colors"
              aria-label="Fermer l'alerte"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Services Grid */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#EDEEEF] to-[#F5F5F5] rounded-[32px] flex items-center justify-center shadow-lg">
            <Search className="w-16 h-16 text-text-muted" />
          </div>
          <h3 className="text-h3 font-semibold text-text-primary mb-3 font-heading">
            Aucun service trouvé
          </h3>
          <p className="text-body text-text-secondary mb-8 font-body max-w-md mx-auto">
            {filters.serviceId
              ? "Le service sélectionné n'est pas disponible pour le moment."
              : `Aucun service ne correspond à votre recherche "${filters.searchTerm}".`
            }
          </p>
          <Button
            onClick={() => {
              // Navigate back to services without filters
              router.push('/services');
            }}
            className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-8 py-4 font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            Voir tous les services
          </Button>
        </div>
      ) : (
        <ServiceCardGrid
          categories={filteredCategories}
          selectedCategoryId={filters.serviceId}
          cityId={filters.cityId}
        />
      )}
    </div>
  );
});