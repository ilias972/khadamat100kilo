'use client';

import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { FavoriteCard } from '@/components/dashboard/dashboard-components';
import { Button } from '@/components/ui/button';
import { Heart, Search, Star, MapPin } from 'lucide-react';
import {
  mockClient,
  mockClientFavorites,
  type ClientFavorite
} from '@/lib/mocks/services-mocks';

export default function ClientDashboardFavoritesPage() {
  const [client] = useState(mockClient);
  const [favorites, setFavorites] = useState<ClientFavorite[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<ClientFavorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate API call
    const loadFavorites = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      setFavorites(mockClientFavorites);
      setLoading(false);
    };

    loadFavorites();
  }, []);

  useEffect(() => {
    let filtered = favorites;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(favorite =>
        favorite.professionalName.toLowerCase().includes(query) ||
        favorite.serviceCategory.toLowerCase().includes(query) ||
        favorite.cityName.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(favorite => favorite.serviceCategory === categoryFilter);
    }

    // Sort by added date (most recent first)
    filtered = filtered.sort((a, b) =>
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    );

    setFilteredFavorites(filtered);
  }, [favorites, searchQuery, categoryFilter]);

  const handleRemoveFavorite = (favoriteId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== favoriteId));
  };

  const categoryOptions = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'Plomberie', label: 'Plomberie' },
    { value: 'Électricité', label: 'Électricité' },
    { value: 'Ménage', label: 'Ménage' },
    { value: 'Jardinage', label: 'Jardinage' },
    { value: 'Peinture', label: 'Peinture' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex h-screen">
          <DashboardSidebar
            userType="client"
            userName={client.fullName}
            userAvatar={client.avatar}
          />
          <div className="flex-1 flex flex-col overflow-hidden">
            <DashboardHeader
              title="Favoris"
              subtitle="Vos professionnels préférés"
            />
            <main className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="animate-pulse space-y-6">
                  <div className="h-16 bg-surface rounded-[24px]"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-48 bg-surface rounded-[24px]"></div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <DashboardSidebar
          userType="client"
          userName={client.fullName}
          userAvatar={client.avatar}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader
            title="Favoris"
            subtitle="Vos professionnels préférés"
          />

          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Filters and Search */}
              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Rechercher par nom, service ou ville..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-border-light rounded-[24px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-[#F97B22]/20 focus:border-[#F97B22] transition-all duration-200"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="relative">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-4 py-3 bg-white/50 backdrop-blur-sm border border-border-light rounded-[24px] text-text-primary focus:outline-none focus:ring-2 focus:ring-[#F97B22]/20 focus:border-[#F97B22] transition-all duration-200"
                    >
                      {categoryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Results Summary */}
                <div className="mt-4 pt-4 border-t border-border-light">
                  <p className="text-sm text-text-secondary">
                    {filteredFavorites.length} professionnel{filteredFavorites.length !== 1 ? 's' : ''} en favori{filteredFavorites.length !== 1 ? 's' : ''}
                    {categoryFilter !== 'all' && (
                      <span> dans la catégorie "{categoryFilter}"</span>
                    )}
                    {searchQuery && (
                      <span> pour "{searchQuery}"</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Favorites Grid */}
              {filteredFavorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFavorites.map((favorite) => (
                    <FavoriteCard
                      key={favorite.id}
                      favorite={favorite}
                      onRemove={() => handleRemoveFavorite(favorite.id)}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-4 bg-[#EDEEEF] rounded-[24px] flex items-center justify-center">
                    <Heart className="w-12 h-12 text-text-muted" />
                  </div>
                  <h3 className="text-h3 font-bold text-text-primary mb-2 font-heading">
                    Aucun favori trouvé
                  </h3>
                  <p className="text-body text-text-secondary mb-6 font-body">
                    {favorites.length === 0
                      ? "Vous n'avez pas encore ajouté de professionnels à vos favoris. Commencez à explorer les services disponibles !"
                      : "Essayez de modifier vos critères de recherche ou consultez tous vos favoris."
                    }
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {favorites.length > 0 && (
                      <Button
                        onClick={() => {
                          setCategoryFilter('all');
                          setSearchQuery('');
                        }}
                        variant="outline"
                        className="border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10"
                      >
                        Voir tous les favoris
                      </Button>
                    )}
                    <Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white">
                      Découvrir des services
                    </Button>
                  </div>
                </div>
              )}

              {/* Tips Section */}
              {filteredFavorites.length > 0 && (
                <div className="mt-12 bg-gradient-to-br from-[#F97B22]/10 to-[#F97B22]/5 backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(249,123,34,0.1)] p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F97B22]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-[#F97B22]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary mb-2 font-heading">
                        Astuce pour vos favoris
                      </h3>
                      <ul className="text-sm text-text-secondary space-y-1">
                        <li>• Contactez directement vos professionnels favoris pour des réservations prioritaires</li>
                        <li>• Recevez des notifications sur leurs nouvelles disponibilités</li>
                        <li>• Bénéficiez de tarifs préférentiels sur vos réservations répétées</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}