'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  Download, 
  Filter, 
  Grid, 
  List, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EnhancedBookingCard } from '@/components/ui/enhanced-booking-card';

interface BookingFilters {
  status: string;
  dateRange: string;
  serviceCategory: string;
  priceRange: [number, number];
  searchQuery: string;
}

interface Booking {
  id: string;
  serviceName: string;
  serviceCategory: string;
  professionalName: string;
  professionalId: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  time: string;
  price: number;
  location: string;
  notes?: string;
  rating?: number;
  imageUrl?: string;
}

interface AdvancedBookingManagerProps {
  bookings?: Booking[];
  onBookingAction?: (action: string, bookingId: string) => void;
}

export const AdvancedBookingManager: React.FC<AdvancedBookingManagerProps> = ({
  bookings: initialBookings,
  onBookingAction
}) => {
  const [filters, setFilters] = useState<BookingFilters>({
    status: 'all',
    dateRange: '30days',
    serviceCategory: 'all',
    priceRange: [0, 5000],
    searchQuery: ''
  });
  
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'calendar'>('list');
  const [showFilters, setShowFilters] = useState(false);

  // Mock bookings data
  const mockBookings: Booking[] = [
    {
      id: '1',
      serviceName: 'Nettoyage complet appartement',
      serviceCategory: 'Ménage',
      professionalName: 'Fatima Z.',
      professionalId: 'p1',
      status: 'confirmed',
      date: '2024-01-20',
      time: '10:00',
      price: 250,
      location: 'Casablanca, Maarif',
      notes: 'Appartement 3 pièces',
      imageUrl: '/menageICONE.png'
    },
    {
      id: '2',
      serviceName: 'Réparation plomberie',
      serviceCategory: 'Plomberie',
      professionalName: 'Ahmed M.',
      professionalId: 'p2',
      status: 'pending',
      date: '2024-01-22',
      time: '14:00',
      price: 180,
      location: 'Casablanca, Anfa',
      imageUrl: '/plomberieICONE.png'
    },
    {
      id: '3',
      serviceName: 'Installation électrique',
      serviceCategory: 'Électricité',
      professionalName: 'Youssef K.',
      professionalId: 'p3',
      status: 'completed',
      date: '2024-01-15',
      time: '09:00',
      price: 300,
      location: 'Casablanca, Gauthier',
      rating: 5,
      imageUrl: '/electricitéICONE.png'
    },
    {
      id: '4',
      serviceName: 'Peinture salon',
      serviceCategory: 'Peinture',
      professionalName: 'Hassan B.',
      professionalId: 'p4',
      status: 'in_progress',
      date: '2024-01-18',
      time: '08:00',
      price: 800,
      location: 'Casablanca, Bourgogne',
      imageUrl: '/peintureICONE.png'
    }
  ];

  const bookings = initialBookings || mockBookings;

  // Filter and sort bookings
  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    // Apply status filter
    if (filters.status !== 'all') {
      result = result.filter(b => b.status === filters.status);
    }

    // Apply category filter
    if (filters.serviceCategory !== 'all') {
      result = result.filter(b => b.serviceCategory === filters.serviceCategory);
    }

    // Apply price range filter
    result = result.filter(
      b => b.price >= filters.priceRange[0] && b.price <= filters.priceRange[1]
    );

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        b =>
          b.serviceName.toLowerCase().includes(query) ||
          b.professionalName.toLowerCase().includes(query) ||
          b.location.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'price':
          return b.price - a.price;
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return result;
  }, [bookings, filters, sortBy]);

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'pending', label: 'En attente' },
    { value: 'confirmed', label: 'Confirmées' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'completed', label: 'Terminées' },
    { value: 'cancelled', label: 'Annulées' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'Ménage', label: 'Ménage' },
    { value: 'Plomberie', label: 'Plomberie' },
    { value: 'Électricité', label: 'Électricité' },
    { value: 'Peinture', label: 'Peinture' },
    { value: 'Jardinage', label: 'Jardinage' },
    { value: 'Déménagement', label: 'Déménagement' }
  ];

  const dateRangeOptions = [
    { value: '7days', label: '7 derniers jours' },
    { value: '30days', label: '30 derniers jours' },
    { value: '90days', label: '90 derniers jours' },
    { value: 'all', label: 'Tout l\'historique' }
  ];

  const handleExport = () => {
    // Export functionality
    console.log('Exporting bookings...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#3B3B3B] font-heading">
            Mes réservations
          </h2>
          <p className="text-sm text-[#6B7280]">
            {filteredBookings.length} réservation{filteredBookings.length !== 1 ? 's' : ''} trouvée{filteredBookings.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtres
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Filters & Controls */}
      <Card className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] p-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Rechercher par service, professionnel ou lieu..."
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDEEEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent"
          />
          {filters.searchQuery && (
            <button
              onClick={() => setFilters({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-[#6B7280]" />
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Status Filter */}
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-[#EDEEEF] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
          </div>

          {/* Date Range Filter */}
          <div className="relative">
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-[#EDEEEF] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent"
            >
              {dateRangeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={filters.serviceCategory}
              onChange={(e) => setFilters({ ...filters, serviceCategory: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-[#EDEEEF] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
          </div>

          {/* Sort By */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#EDEEEF] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent"
            >
              <option value="date">Trier par date</option>
              <option value="price">Trier par prix</option>
              <option value="status">Trier par statut</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none" />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-[#F97B22] hover:bg-[#e66a1f]' : ''}
            >
              <List className="w-4 h-4 mr-2" />
              Liste
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-[#F97B22] hover:bg-[#e66a1f]' : ''}
            >
              <Grid className="w-4 h-4 mr-2" />
              Grille
            </Button>
            <Button
              variant={viewMode === 'calendar' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className={viewMode === 'calendar' ? 'bg-[#F97B22] hover:bg-[#e66a1f]' : ''}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Calendrier
            </Button>
          </div>

          {/* Active Filters Count */}
          {(filters.status !== 'all' || filters.serviceCategory !== 'all' || filters.searchQuery) && (
            <button
              onClick={() => setFilters({
                status: 'all',
                dateRange: '30days',
                serviceCategory: 'all',
                priceRange: [0, 5000],
                searchQuery: ''
              })}
              className="text-sm text-[#F97B22] hover:underline"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      </Card>

      {/* Bookings Display */}
      {filteredBookings.length === 0 ? (
        <Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-[#3B3B3B] mb-2">
            Aucune réservation trouvée
          </h3>
          <p className="text-[#6B7280] mb-6">
            Essayez de modifier vos filtres ou effectuez une nouvelle recherche.
          </p>
          <Button
            onClick={() => setFilters({
              status: 'all',
              dateRange: '30days',
              serviceCategory: 'all',
              priceRange: [0, 5000],
              searchQuery: ''
            })}
            className="bg-[#F97B22] hover:bg-[#e66a1f]"
          >
            Réinitialiser les filtres
          </Button>
        </Card>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredBookings.map((booking) => (
            <EnhancedBookingCard
              key={booking.id}
              booking={{
                id: booking.id,
                clientId: 'current-user',
                serviceName: booking.serviceName,
                serviceCategory: booking.serviceCategory,
                professionalName: booking.professionalName,
                scheduledDate: booking.date,
                scheduledTime: booking.time,
                duration: '2h',
                status: booking.status,
                price: booking.price,
                location: booking.location,
                notes: booking.notes,
                createdAt: booking.date,
                updatedAt: booking.date
              }}
              variant={viewMode === 'grid' ? 'default' : 'list'}
              interactive
              onClick={() => onBookingAction?.('view', booking.id)}
              onContact={() => onBookingAction?.('contact', booking.id)}
              onMessage={() => onBookingAction?.('message', booking.id)}
              onCancel={() => onBookingAction?.('cancel', booking.id)}
              onRate={() => onBookingAction?.('rate', booking.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
