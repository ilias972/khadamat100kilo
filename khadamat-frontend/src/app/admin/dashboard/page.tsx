'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth, useUserRole } from '@/lib/auth-context';
import { Users, Calendar, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Settings, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const roles = useUserRole();

  const stats = [
    {
      title: 'Utilisateurs actifs',
      value: '1,247',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%'
    },
    {
      title: 'Réservations ce mois',
      value: '3,456',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%'
    },
    {
      title: 'Revenus totaux',
      value: '245,890 DH',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+15%'
    },
    {
      title: 'Taux de satisfaction',
      value: '94.2%',
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      change: '+2%'
    }
  ];

  const pendingValidations = [
    {
      id: 1,
      name: 'Ahmed Bennani',
      type: 'Professionnel',
      service: 'Plomberie',
      date: '2025-01-15',
      status: 'En attente'
    },
    {
      id: 2,
      name: 'Fatima Alaoui',
      type: 'Professionnel',
      service: 'Peinture',
      date: '2025-01-16',
      status: 'En attente'
    },
    {
      id: 3,
      name: 'Mohammed Tazi',
      type: 'Professionnel',
      service: 'Jardinage',
      date: '2025-01-17',
      status: 'En attente'
    }
  ];

  const recentDisputes = [
    {
      id: 1,
      bookingId: 'BK-001',
      client: 'Client A',
      pro: 'Pro X',
      issue: 'Service non conforme',
      status: 'En cours',
      priority: 'Haute'
    },
    {
      id: 2,
      bookingId: 'BK-002',
      client: 'Client B',
      pro: 'Pro Y',
      issue: 'Retard de livraison',
      status: 'Résolu',
      priority: 'Moyenne'
    }
  ];

  return (
    <div className="min-h-screen bg-surface pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-text-secondary">
            Gérez la plateforme Khadamat et supervisez les opérations
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
                    <p className="text-sm text-green-600 font-medium">
                      {stat.change} ce mois
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Validations */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Validations en attente
                </h2>
                <Button variant="outline" size="sm">
                  Voir tout
                </Button>
              </div>

              <div className="space-y-4">
                {pendingValidations.map((validation) => (
                  <motion.div
                    key={validation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between p-4 border border-border-light rounded-lg hover:bg-surface-secondary transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-text-primary">
                          {validation.name}
                        </h3>
                        <p className="text-sm text-text-secondary">
                          {validation.service} • {validation.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        {validation.status}
                      </span>
                      <Button size="sm" variant="outline">
                        Valider
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Disputes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  Litiges récents
                </h2>
                <Button variant="outline" size="sm">
                  Gérer
                </Button>
              </div>

              <div className="space-y-4">
                {recentDisputes.map((dispute) => (
                  <motion.div
                    key={dispute.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 border border-border-light rounded-lg hover:bg-surface-secondary transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-text-primary">
                        {dispute.bookingId}
                      </span>
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        dispute.priority === 'Haute'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {dispute.priority}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary mb-2">
                      {dispute.client} vs {dispute.pro}
                    </p>

                    <p className="text-sm text-text-primary mb-3">
                      {dispute.issue}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        dispute.status === 'Résolu'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {dispute.status}
                      </span>
                      <Button size="sm" variant="outline">
                        Voir détails
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Admin Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Actions Administratives
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex-col" variant="outline">
                <BarChart3 className="h-6 w-6 mb-2" />
                <span className="text-sm">Rapports</span>
              </Button>

              <Button className="h-20 flex-col" variant="outline">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm">Gestion Users</span>
              </Button>

              <Button className="h-20 flex-col" variant="outline">
                <Settings className="h-6 w-6 mb-2" />
                <span className="text-sm">Configuration</span>
              </Button>

              <Button className="h-20 flex-col" variant="outline">
                <AlertTriangle className="h-6 w-6 mb-2" />
                <span className="text-sm">Alertes</span>
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}