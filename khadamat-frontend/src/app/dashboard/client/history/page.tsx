'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { BookingCard, StatusPill } from '@/components/dashboard/dashboard-components';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, Search } from 'lucide-react';
import {
  mockClient,
  mockClientBookings,
  type ClientBooking
} from '@/lib/mocks/services-mocks';

function ClientDashboardHistoryContent() {
  const searchParams = useSearchParams();
  const selectedBookingId = searchParams.get('booking');

  const [client] = useState(mockClient);
  const [bookings, setBookings] = useState<ClientBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<ClientBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate API call
    const loadBookings = async () => {
      setLoading(true);
      // In a real app, this would be an API call
      setBookings(mockClientBookings);
      setLoading(false);
    };

    loadBookings();
  }, []);

  useEffect(() => {
    let filtered = bookings;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(booking =>
        booking.professionalName.toLowerCase().includes(query) ||
        booking.serviceName.toLowerCase().includes(query) ||
        booking.location.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Sort by date (most recent first)
    filtered = filtered.sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredBookings(filtered);
  }, [bookings, searchQuery, statusFilter]);

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'pending', label: 'En attente' },
    { value: 'confirmed', label: 'Confirmé' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'completed', label: 'Terminé' },
    { value: 'cancelled', label: 'Annulé' },
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
              title="Historique"
              subtitle="Toutes vos réservations"
            />
            <main className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="animate-pulse space-y-6">
                  <div className="h-16 bg-surface rounded-[24px]"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
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
            title="Historique"
            subtitle="Toutes vos réservations"
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
                      placeholder="Rechercher par professionnel, service ou lieu..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-border-light rounded-[24px] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-[#F97B22]/20 focus:border-[#F97B22] transition-all duration-200"
                    />
                  </div>

                  {/* Status Filter */}
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-10 pr-8 py-3 bg-white/50 backdrop-blur-sm border border-border-light rounded-[24px] text-text-primary focus:outline-none focus:ring-2 focus:ring-[#F97B22]/20 focus:border-[#F97B22] transition-all duration-200 appearance-none"
                    >
                      {statusOptions.map((option) => (
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
                    {filteredBookings.length} réservation{filteredBookings.length !== 1 ? 's' : ''} trouvée{filteredBookings.length !== 1 ? 's' : ''}
                    {statusFilter !== 'all' && (
                      <span> avec le statut <StatusPill status={statusFilter as ClientBooking['status']} className="inline-flex ml-1" /></span>
                    )}
                    {searchQuery && (
                      <span> pour "{searchQuery}"</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Bookings List */}
              {filteredBookings.length > 0 ? (
                <div className="space-y-6">
                  {filteredBookings.map((booking) => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      className={selectedBookingId === booking.id ? 'ring-2 ring-[#F97B22]' : ''}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-4 bg-[#EDEEEF] rounded-[24px] flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-text-muted" />
                  </div>
                  <h3 className="text-h3 font-bold text-text-primary mb-2 font-heading">
                    Aucune réservation trouvée
                  </h3>
                  <p className="text-body text-text-secondary mb-6 font-body">
                    Essayez de modifier vos critères de recherche ou créez une nouvelle réservation.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <Button
                      onClick={() => {
                        setStatusFilter('all');
                        setSearchQuery('');
                      }}
                      variant="outline"
                      className="border-[#F97B22]/20 text-[#F97B22] hover:bg-[#F97B22]/10"
                    >
                      Voir toutes les réservations
                    </Button>
                    <Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white">
                      Nouvelle réservation
                    </Button>
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

export default function ClientDashboardHistoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background">
        <div className="flex h-screen">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="animate-pulse space-y-6">
                  <div className="h-16 bg-surface rounded-[24px]"></div>
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-48 bg-surface rounded-[24px]"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <ClientDashboardHistoryContent />
    </Suspense>
  );
}