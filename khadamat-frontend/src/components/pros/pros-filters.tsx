'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, Star, RotateCcw, CheckCircle, Crown } from 'lucide-react';
import { Input } from '@/components/ui/input';

// 👇 C'EST ICI : On récupère tes listes officielles
import { CITIES_LIST, SERVICES_LIST } from '@/lib/constants';

export function ProsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // États locaux
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [minRating, setMinRating] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [premiumOnly, setPremiumOnly] = useState(false);

  // 1. Lire l'URL au chargement pour remplir les filtres
  useEffect(() => {
    const cityFromUrl = searchParams.get('city');
    const serviceFromUrl = searchParams.get('service');
    const searchFromUrl = searchParams.get('search');
    
    // Si l'URL contient "Kénitra", on sélectionne "Kénitra" dans la liste
    if (cityFromUrl) setSelectedCity(cityFromUrl);
    if (serviceFromUrl) setSelectedService(serviceFromUrl);
    if (searchFromUrl) setSearchQuery(searchFromUrl);
    
  }, [searchParams]);

  // 2. Mettre à jour l'URL quand on change un filtre
  const applyFilters = (
    newCity = selectedCity, 
    newService = selectedService, 
    newSearch = searchQuery,
    newRating = minRating,
    newVerified = verifiedOnly,
    newPremium = premiumOnly
  ) => {
    const params = new URLSearchParams();

    if (newSearch) params.set('search', newSearch);
    // On envoie le NOM de la ville/service (ex: "Kénitra"), pas un ID
    if (newCity) params.set('city', newCity);
    if (newService) params.set('service', newService);
    
    if (newRating) params.set('rating', newRating.toString());
    if (newVerified) params.set('verified', 'true');
    if (newPremium) params.set('premium', 'true');

    router.push(`/pros?${params.toString()}`);
  };

  // Handlers
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCity(value);
    applyFilters(value, selectedService, searchQuery, minRating, verifiedOnly, premiumOnly);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedService(value);
    applyFilters(selectedCity, value, searchQuery, minRating, verifiedOnly, premiumOnly);
  };

  const handleRatingChange = (rating: number) => {
    const newVal = minRating === rating ? null : rating;
    setMinRating(newVal);
    applyFilters(selectedCity, selectedService, searchQuery, newVal, verifiedOnly, premiumOnly);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCity('');
    setSelectedService('');
    setMinRating(null);
    setVerifiedOnly(false);
    setPremiumOnly(false);
    router.push('/pros');
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24">
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filtres</h2>
        <button 
          onClick={handleReset}
          className="text-sm text-gray-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Réinitialiser
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Recherche Texte */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Recherche</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Nom, service..." 
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white transition-all rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyFilters(selectedCity, selectedService, searchQuery)}
            />
          </div>
        </div>

        {/* --- VILLE (Liste issue de constants.ts) --- */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Ville</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all cursor-pointer hover:bg-white appearance-none text-sm"
            >
              <option value="">Toutes les villes</option>
              {/* On map sur CITIES_LIST importé */}
              {CITIES_LIST.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* --- SERVICE (Liste issue de constants.ts) --- */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Type de service</label>
          <select
            value={selectedService}
            onChange={handleServiceChange}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all cursor-pointer hover:bg-white appearance-none text-sm"
          >
            <option value="">Tous les services</option>
            {/* On map sur SERVICES_LIST importé */}
            {SERVICES_LIST.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Note Minimale */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Note minimale</label>
          <div className="space-y-2">
            {[4.5, 4, 3.5, 3].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="rating"
                  checked={minRating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <div className="flex items-center text-sm text-gray-600 group-hover:text-gray-900">
                  <span className="font-medium mr-1">≥ {rating}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                </div>
              </label>
            ))}
            <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="rating"
                  checked={minRating === null}
                  onChange={() => handleRatingChange(0)} 
                  className="w-4 h-4 text-orange-600 border-gray-300 focus:ring-orange-500"
                />
                <span className="text-sm text-gray-600">Toutes les notes</span>
            </label>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <input 
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => {
                setVerifiedOnly(e.target.checked);
                applyFilters(selectedCity, selectedService, searchQuery, minRating, e.target.checked, premiumOnly);
              }}
              className="mt-1 w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
            />
            <div>
              <div className="flex items-center gap-1.5 font-medium text-sm text-gray-900">
                <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                Artisans vérifiés uniquement
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Profils vérifiés et assurés</p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group p-2 rounded-lg hover:bg-orange-50/50 transition-colors">
            <input 
              type="checkbox"
              checked={premiumOnly}
              onChange={(e) => {
                setPremiumOnly(e.target.checked);
                applyFilters(selectedCity, selectedService, searchQuery, minRating, verifiedOnly, e.target.checked);
              }}
              className="mt-1 w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500"
            />
            <div>
              <div className="flex items-center gap-1.5 font-medium text-sm text-gray-900">
                <Crown className="w-3.5 h-3.5 text-orange-500" />
                Artisans Premium uniquement
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Service haut de gamme</p>
            </div>
          </label>
        </div>

      </div>
    </div>
  );
}