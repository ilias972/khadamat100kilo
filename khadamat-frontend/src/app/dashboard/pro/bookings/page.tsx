'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/lib/toast-context';
import { mockProBookings, ProBooking } from '@/lib/mocks/pro-bookings-mocks';
import { Search, Check, X, Eye } from 'lucide-react';

type TabType = 'pending' | 'confirmed' | 'completed' | 'cancelled';

const tabLabels: Record<TabType, string> = {
  pending: 'En attente',
  confirmed: 'À venir',
  completed: 'Terminé',
  cancelled: 'Annulé',
};

const statusVariants: Record<ProBooking['status'], string> = {
  pending: 'warning',
  confirmed: 'info',
  completed: 'success',
  cancelled: 'error',
};

export default function ProBookingsPage() {
  const toast = useToast();
  const [bookings, setBookings] = useState<ProBooking[]>(mockProBookings);
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesTab = booking.status === activeTab;
      const matchesSearch = booking.clientName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [bookings, activeTab, searchQuery]);

  const handleAccept = (id: string) => {
    setProcessingId(id);
    try {
      setBookings(prev =>
        prev.map(booking =>
          booking.id === id ? { ...booking, status: 'confirmed' as const } : booking
        )
      );
      toast.success('Réservation acceptée');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = (id: string) => {
    setProcessingId(id);
    try {
      setBookings(prev =>
        prev.map(booking =>
          booking.id === id ? { ...booking, status: 'cancelled' as const } : booking
        )
      );
      toast.success('Réservation refusée');
    } finally {
      setProcessingId(null);
    }
  };

  const handleComplete = (id: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id ? { ...booking, status: 'completed' as const } : booking
      )
    );
    toast.success('Réservation marquée comme terminée');
  };

  const renderActions = (booking: ProBooking) => {
    const isProcessing = processingId === booking.id;
    switch (booking.status) {
      case 'pending':
        return (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => handleAccept(booking.id)}
              disabled={isProcessing}
              className="flex items-center space-x-1"
            >
              <Check className="h-4 w-4" />
              <span>Accepter</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleReject(booking.id)}
              disabled={isProcessing}
              className="flex items-center space-x-1"
            >
              <X className="h-4 w-4" />
              <span>Refuser</span>
            </Button>
          </div>
        );
      case 'confirmed':
        return (
          <div className="flex space-x-2">
            <Button
              size="sm"
              onClick={() => handleComplete(booking.id)}
              disabled={isProcessing}
              className="flex items-center space-x-1"
            >
              <Check className="h-4 w-4" />
              <span>Marquer comme terminé</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={isProcessing}
              className="flex items-center space-x-1"
            >
              <Eye className="h-4 w-4" />
              <span>Voir détails</span>
            </Button>
          </div>
        );
      case 'completed':
      case 'cancelled':
        return (
          <Button
            size="sm"
            variant="outline"
            disabled={isProcessing}
            className="flex items-center space-x-1"
          >
            <Eye className="h-4 w-4" />
            <span>Voir détails</span>
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Mes Réservations
          </h1>
          <p className="text-text-secondary">
            Gérez vos réservations et vos prestations
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <div className="max-w-md">
            <Input
              placeholder="Rechercher par nom de client..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startIcon={<Search className="h-4 w-4" />}
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex space-x-1 bg-surface rounded-lg p-1 border">
            {(Object.keys(tabLabels) as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-primary-500 text-white'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Bookings List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={booking.clientAvatar}
                    alt={booking.clientName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-1">
                      {booking.clientName}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2">
                      {booking.serviceName}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary mb-2">
                      <span>{booking.date}</span>
                      <span>à</span>
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-500">
                        {booking.price} DH
                      </span>
                      <Badge variant={statusVariants[booking.status] as any}>
                        {tabLabels[booking.status]}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                  <span>{booking.location}</span>
                </div>

                {renderActions(booking)}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredBookings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center py-12"
          >
            <p className="text-text-secondary">
              Aucune réservation trouvée pour cette catégorie.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}