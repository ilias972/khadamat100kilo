'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/ui/toast';
import { useAuth } from '@/lib/auth-context';
import { mockClientBookings, mockClientFavorites } from '@/lib/mocks/services-mocks';
// ✅ CORRECTION 1 : Import du bon service
import { bookingService } from '@/services/booking.service';
import { Calendar, Clock, Star, TrendingUp, MessageSquare, Settings, User } from 'lucide-react';

export default function ClientDashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);

    useEffect(() => {
      const loadBookings = async () => {
        try {
          // ✅ CORRECTION 2 : Appel via le service connecté au Backend 4000
          const data = await bookingService.getMyBookings();
          setBookings(data);
          setError(null);
        } catch (err) {
          console.error('Failed to load bookings:', err);
          setError('Erreur lors du chargement des réservations');
          setToast({ message: 'Erreur lors du chargement des réservations', type: 'error' });
        } finally {
          setLoading(false);
        }
      };

      loadBookings();
    }, []);

    // Calculate stats from real data or fallback to mock
    const activeBookingsCount = bookings.length > 0
      ? bookings.filter(booking => ['QUOTED', 'CONFIRMED', 'IN_PROGRESS'].includes(booking.status)).length
      : mockClientBookings.filter(booking => ['pending', 'confirmed', 'in_progress'].includes(booking.status)).length;

    const completedBookingsCount = bookings.length > 0
      ? bookings.filter(booking => booking.status === 'COMPLETED').length
      : mockClientBookings.filter(booking => booking.status === 'completed').length;

    const totalSpent = bookings.length > 0
      ? bookings.filter(booking => booking.status === 'COMPLETED').reduce((sum, booking) => sum + (booking.finalPrice || 0), 0)
      : mockClientBookings.filter(booking => booking.status === 'completed').reduce((sum, booking) => sum + booking.price, 0);

    const favoritesCount = mockClientFavorites.length;

    const stats = [
      {
        title: 'Réservations actives',
        value: activeBookingsCount.toString(),
        icon: Calendar,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        title: 'Services utilisés',
        value: completedBookingsCount.toString(),
        icon: Clock,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        title: 'Note moyenne',
        value: '4.8',
        icon: Star,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      },
      {
        title: 'Économies réalisées',
        value: `${totalSpent.toLocaleString()} DH`,
        icon: TrendingUp,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50'
      }
    ];

    const recentBookings = (bookings.length > 0 ? bookings.slice(0, 3) : mockClientBookings.slice(0, 3)).map(booking => ({
      id: booking.id,
      service: booking.serviceCategory?.name || booking.serviceName,
      pro: booking.pro?.proProfile?.firstName + ' ' + booking.pro?.proProfile?.lastName || booking.professionalName,
      date: booking.scheduledDate || booking.date,
      status: booking.status === 'CONFIRMED' ? 'Confirmé' :
              booking.status === 'IN_PROGRESS' ? 'En cours' :
              booking.status === 'QUOTED' ? 'Planifié' :
              booking.status === 'COMPLETED' ? 'Terminé' :
              booking.status === 'confirmed' ? 'Confirmé' :
              booking.status === 'in_progress' ? 'En cours' :
              booking.status === 'pending' ? 'Planifié' :
              booking.status === 'completed' ? 'Terminé' : 'Annulé',
      price: `${booking.finalPrice || booking.price} DH`
    }));

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
            Bonjour, {user?.clientProfile?.firstName || 'Client'} ! 👋
          </h1>
          <p className="text-text-secondary">
            Bienvenue sur votre tableau de bord Khadamat
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-text-secondary mb-1">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-text-primary">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Mes réservations récentes
                </h2>
                <Button variant="outline" size="sm">
                  Voir tout
                </Button>
              </div>

              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between p-4 border border-border-light rounded-lg hover:bg-surface-secondary transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-text-primary">
                          {booking.service}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {booking.pro} • {booking.date}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-text-primary">
                        {booking.price}
                      </p>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        booking.status === 'Confirmé'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'En cours'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-6">
                Actions rapides
              </h2>

              <div className="space-y-3">
                <Link href="/services" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Nouvelle réservation
                  </Button>
                </Link>

                <Link href="/dashboard/client/messages" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Mes messages
                  </Button>
                </Link>

                <Link href="/dashboard/client/history" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Star className="h-4 w-4 mr-2" />
                    Mes avis
                  </Button>
                </Link>

                <Link href="/dashboard/client/profile" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Mon profil
                  </Button>
                </Link>

                {/* ✅ CORRECTION 3 : Ajout du Link pour les paramètres */}
                <Link href="/settings" className="block">
                  <Button className="w-full justify-start" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}