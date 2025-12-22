'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 👇 IMPORT DES LISTES CENTRALISÉES
import { CITIES_LIST, SERVICES_LIST } from '@/lib/constants';

export function ProsHeroFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // États locaux
  const [selectedService, setSelectedService] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 🔄 SYNCHRONISATION : On remplit les filtres si l'URL contient des paramètres
  useEffect(() => {
    const serviceFromUrl = searchParams.get('service');
    const cityFromUrl = searchParams.get('city');

    if (serviceFromUrl) setSelectedService(serviceFromUrl);
    if (cityFromUrl) setSelectedCity(cityFromUrl);
  }, [searchParams]);

  // Lancer la recherche
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedService) params.append('service', selectedService);
    if (selectedCity) params.append('city', selectedCity);
    
    router.push(`/pros?${params.toString()}`);
  };

  // Effacer les filtres
  const clearFilters = () => {
    setSelectedService('');
    setSelectedCity('');
    router.push('/pros');
  };

  const hasActiveFilters = selectedService || selectedCity;

  return (
    <div className="bg-white border-b sticky top-16 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* --- VERSION BUREAU --- */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Filtre Service */}
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-orange-500" />
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all cursor-pointer hover:bg-white appearance-none text-sm"
            >
              <option value="">Tous les services</option>
              {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Filtre Ville */}
          <div className="relative flex-1 group">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-orange-500" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all cursor-pointer hover:bg-white appearance-none text-sm"
            >
              <option value="">Toutes les villes</option>
              {CITIES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Boutons */}
          <Button 
            onClick={handleSearch}
            className="bg-gray-900 text-white hover:bg-orange-600 px-6 rounded-xl h-[42px]"
          >
            Filtrer
          </Button>

          {hasActiveFilters && (
            <button 
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 px-2"
            >
              <X className="w-4 h-4" /> Effacer
            </button>
          )}
        </div>

        {/* --- VERSION MOBILE --- */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200"
          >
            <span className="font-medium text-gray-700 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> 
              Filtres {hasActiveFilters && <span className="w-2 h-2 bg-orange-500 rounded-full"/>}
            </span>
            <span className="text-xs text-gray-500">
              {hasActiveFilters ? 'Modifier' : 'Sélectionner'}
            </span>
          </button>

          {isFilterOpen && (
            <div className="mt-4 space-y-3 p-4 bg-white border rounded-xl shadow-lg absolute left-4 right-4 z-50">
               <div>
                 <label className="text-xs font-semibold text-gray-500 mb-1 block">Service</label>
                 <select 
                    value={selectedService} 
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-lg border"
                 >
                   <option value="">Tous</option>
                   {SERVICES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
               </div>
               <div>
                 <label className="text-xs font-semibold text-gray-500 mb-1 block">Ville</label>
                 <select 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-lg border"
                 >
                   <option value="">Toutes</option>
                   {CITIES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
               </div>
               <div className="flex gap-2 pt-2">
                 <Button onClick={() => { handleSearch(); setIsFilterOpen(false); }} className="flex-1 bg-orange-600">
                   Appliquer
                 </Button>
                 {hasActiveFilters && (
                   <Button variant="outline" onClick={() => { clearFilters(); setIsFilterOpen(false); }}>
                     Effacer
                   </Button>
                 )}
               </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}