'use client';

import React, { useState, useEffect, Suspense } from 'react';
// ❌ IMPORT SUPPRIMÉ : DashboardSidebar
import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Search, Filter, Loader2 } from 'lucide-react';
// ✅ IMPORT DU CLIENT API
import apiClientInstance from '@/lib/api-client';

function ClientDashboardHistoryContent() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        // ✅ Appel Backend
        const data = await apiClientInstance.getMyBookings();
        setBookings(data);
      } catch (err) {
        console.error("Erreur chargement historique:", err);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  // Filtrage
  const filteredBookings = bookings.filter(booking => {
     // 1. Recherche texte
     const searchLower = searchQuery.toLowerCase();
     const serviceName = booking.serviceCategory?.name?.toLowerCase() || '';
     const proName = booking.pro?.proProfile?.firstName?.toLowerCase() || '';
     const matchesSearch = serviceName.includes(searchLower) || proName.includes(searchLower);

     // 2. Filtre statut
     let matchesStatus = true;
     if (statusFilter !== 'all') {
        // On compare en majuscules pour éviter les erreurs (ex: 'COMPLETED' vs 'completed')
        matchesStatus = booking.status === statusFilter;
     }

     return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'PENDING', label: 'En attente' },
    { value: 'CONFIRMED', label: 'Confirmé' },
    { value: 'IN_PROGRESS', label: 'En cours' },
    { value: 'COMPLETED', label: 'Terminé' },
    { value: 'CANCELLED', label: 'Annulé' },
  ];

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
         <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    );
  }

  // ✅ STRUCTURE NETTOYÉE : S'intègre dans le Layout parent
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)]">
      
      <DashboardHeader
        title="Historique"
        subtitle="Vos services passés et terminés"
      />

      <main className="flex-1 overflow-y-auto p-6">
        
        {/* Filtres et Recherche */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
           <div className="flex flex-col md:flex-row gap-4">
              {/* Barre de recherche */}
              <div className="flex-1 relative">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <input
                   type="text"
                   placeholder="Rechercher par service ou professionnel..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                 />
              </div>

              {/* Sélecteur de statut */}
              <div className="relative min-w-[200px]">
                 <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                 <select
                   value={statusFilter}
                   onChange={(e) => setStatusFilter(e.target.value)}
                   className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 appearance-none cursor-pointer"
                 >
                   {statusOptions.map((option) => (
                     <option key={option.value} value={option.value}>
                       {option.label}
                     </option>
                   ))}
                 </select>
              </div>
           </div>
        </div>

        {/* Liste des réservations */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Aucune réservation trouvée</h3>
              <p className="text-gray-500 mt-1">Essayez de modifier vos filtres.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <Card key={booking.id} className="p-6 hover:shadow-md transition-all duration-200 border-gray-100">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  {/* Info Principale */}
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {booking.serviceCategory?.name || 'Service inconnu'}
                      </h3>
                      <p className="text-gray-500 font-medium">
                        {booking.pro?.proProfile ? `${booking.pro.proProfile.firstName} ${booking.pro.proProfile.lastName}` : 'Professionnel non assigné'}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                          <Clock size={14} /> 
                          {booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString('fr-FR') : 'Date à définir'}
                        </span>
                        {booking.city && (
                            <span className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md">
                            <MapPin size={14} /> 
                            {booking.city.name}
                            </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Statut et Prix */}
                  <div className="text-left md:text-right flex flex-col justify-between min-w-[120px]">
                    <div className="mb-2">
                       {booking.status === 'COMPLETED' ? (
                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide">
                           <CheckCircle size={12} /> Terminé
                         </span>
                       ) : booking.status === 'CANCELLED' ? (
                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wide">
                           <XCircle size={12} /> Annulé
                         </span>
                       ) : (
                         <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                           {booking.status === 'CONFIRMED' ? 'Confirmé' : 'En cours'}
                         </span>
                       )}
                    </div>
                    
                    <div>
                        <p className="font-bold text-xl text-gray-900">
                            {booking.finalPrice ? `${booking.finalPrice} DH` : 'Sur devis'}
                        </p>
                        <Button variant="ghost" size="sm" className="mt-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 p-0 h-auto font-medium">
                          Voir le détail &rarr;
                        </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default function ClientDashboardHistoryPage() {
  return (
    <Suspense fallback={
      <div className="flex h-full items-center justify-center">
         <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
      </div>
    }>
      <ClientDashboardHistoryContent />
    </Suspense>
  );
}