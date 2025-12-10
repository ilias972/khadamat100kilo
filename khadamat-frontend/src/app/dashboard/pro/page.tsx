'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { bookingApi, proApi } from '@/lib/api-client';
import { BookingStatus } from '@/types/api';
import { Calendar, Clock, Star, TrendingUp, MessageSquare, Settings, User, DollarSign, CheckCircle, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { ProRoute } from '@/components/auth/ProtectedRoute';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'DollarSign': return DollarSign;
    case 'CheckCircle': return CheckCircle;
    case 'Star': return Star;
    case 'Clock': return Clock;
    default: return DollarSign;
  }
};

export default function ProDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [pendingBookings, setPendingBookings] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [monthlyEarnings, setMonthlyEarnings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Skip if user is not available
        if (!user) {
          setLoading(false);
          return;
        }
        const [bookingsRes, statsRes] = await Promise.all([
          bookingApi.getMyBookings(),
          proApi.getProStats(user.id)
        ]);
        // Filter pending bookings (assuming status 'PENDING')
        const pending = bookingsRes.filter((b: any) => b.status === 'PENDING');
        setPendingBookings(pending);
        setStats(statsRes);
        // For now, keep mock earnings or set empty
        setMonthlyEarnings([]);
      } catch (error) {
        toast.error('Erreur lors du chargement des données');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const maxAmount = monthlyEarnings.length > 0 ? Math.max(...monthlyEarnings.map(e => e.amount)) : 100;

  const handleAccept = async (bookingId: string) => {
    try {
      await bookingApi.updateBookingStatus(bookingId, BookingStatus.ACCEPTED);
      setPendingBookings(prev => prev.filter(b => b.id !== bookingId));
      toast.success('Demande acceptée');
    } catch (error) {
      toast.error('Erreur lors de l\'acceptation');
    }
  };

  const handleRefuse = async (bookingId: string) => {
    try {
      await bookingApi.updateBookingStatus(bookingId, BookingStatus.CANCELLED);
      setPendingBookings(prev => prev.filter(b => b.id !== bookingId));
      toast.success('Demande refusée');
    } catch (error) {
      toast.error('Erreur lors du refus');
    }
  };

  const handleCreateService = () => {
    router.push('/dashboard/pro/services');
  };

  return (
    <ProRoute>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-between items-center"
          >
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Bonjour, {user?.proProfile?.firstName || 'Professionnel'} ! 👋
              </h1>
              <p className="text-text-secondary">
                Gérez vos réservations et suivez vos performances
              </p>
            </div>
            <Button onClick={handleCreateService} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Créer un service</span>
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats && [
              {
                title: 'Réservations totales',
                value: stats.totalBookings,
                icon: 'CheckCircle',
                bgColor: 'bg-green-100',
                color: 'text-green-600'
              },
              {
                title: 'Revenus totaux',
                value: `${stats.totalEarnings} DH`,
                icon: 'DollarSign',
                bgColor: 'bg-blue-100',
                color: 'text-blue-600'
              },
              {
                title: 'Services actifs',
                value: stats.activeServices,
                icon: 'Settings',
                bgColor: 'bg-purple-100',
                color: 'text-purple-600'
              },
              {
                title: 'Note moyenne',
                value: stats.averageRating?.toFixed(1) || '0.0',
                icon: 'Star',
                bgColor: 'bg-yellow-100',
                color: 'text-yellow-600'
              }
            ].map((stat, index) => {
              const IconComponent = getIcon(stat.icon);
              return (
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
                        <IconComponent className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* À traiter */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-6">
                  À traiter
                </h2>
                <div className="space-y-4">
                  {pendingBookings.map((booking) => (
                    <div key={booking.id} className="p-4 border border-border-light rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-text-primary">
                            {booking.service}
                          </h3>
                          <p className="text-sm text-text-secondary">
                            {booking.client} • {booking.location}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {booking.date} à {booking.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-text-primary mb-2">
                            {booking.price}
                          </p>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              className="bg-green-500 hover:bg-green-600"
                              onClick={() => handleAccept(booking.id)}
                            >
                              Accepter
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleRefuse(booking.id)}
                            >
                              Refuser
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Revenus */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-6">
                  Revenus
                </h2>
                <div className="flex items-end justify-between h-64 space-x-2">
                  {monthlyEarnings.length > 0 ? monthlyEarnings.map((earning, index) => {
                    const height = (earning.amount / maxAmount) * 100;
                    return (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="w-full bg-primary-500 rounded-t"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs mt-2 text-text-secondary">
                          {earning.month}
                        </span>
                      </div>
                    );
                  }) : (
                    <div className="w-full flex items-center justify-center text-text-secondary">
                      Données de revenus non disponibles
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </ProRoute>
  );
}