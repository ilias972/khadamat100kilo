'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, FileText, AlertTriangle, TrendingUp, Calendar, DollarSign, MessageSquare } from 'lucide-react';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Utilisateurs actifs', value: '12,847', change: '+12%', icon: Users, color: 'text-blue-500' },
    { title: 'Réservations ce mois', value: '3,429', change: '+8%', icon: Calendar, color: 'text-green-500' },
    { title: 'Revenus totaux', value: '245,678 MAD', change: '+15%', icon: DollarSign, color: 'text-yellow-500' },
    { title: 'Taux de satisfaction', value: '94.2%', change: '+2%', icon: TrendingUp, color: 'text-purple-500' },
  ];

  const recentActivities = [
    { type: 'user', message: 'Nouveau professionnel inscrit: Ahmed Bennani', time: '2 min' },
    { type: 'booking', message: 'Réservation #1234 confirmée', time: '5 min' },
    { type: 'payment', message: 'Paiement de 850 MAD reçu', time: '12 min' },
    { type: 'review', message: 'Nouvel avis 5★ posté', time: '18 min' },
    { type: 'support', message: 'Ticket #456 résolu', time: '25 min' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-h1 font-bold text-text-primary mb-2">Tableau de bord administrateur</h1>
            <p className="text-body text-text-secondary">Vue d'ensemble de la plateforme Khadamat</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-text-secondary font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                    <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                  </div>
                  <div className="p-3 bg-[#EDEEEF] rounded-[16px]">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Charts Placeholder */}
              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <h2 className="text-h3 font-bold text-text-primary mb-6">Statistiques de performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64 bg-[#EDEEEF] rounded-[16px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-text-muted mx-auto mb-2" />
                      <p className="text-text-muted">Graphique des réservations</p>
                    </div>
                  </div>
                  <div className="h-64 bg-[#EDEEEF] rounded-[16px] flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-text-muted mx-auto mb-2" />
                      <p className="text-text-muted">Évolution des revenus</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Bookings Table */}
              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <h2 className="text-h3 font-bold text-text-primary mb-6">Réservations récentes</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#EDEEEF]">
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Client</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Service</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Montant</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Statut</th>
                        <th className="text-left py-3 px-4 font-semibold text-text-primary">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { client: 'Fatima Alaoui', service: 'Plomberie', amount: '250 MAD', status: 'Confirmée' },
                        { client: 'Youssef Tazi', service: 'Électricité', amount: '450 MAD', status: 'En cours' },
                        { client: 'Sara Bennani', service: 'Ménage', amount: '180 MAD', status: 'Terminée' },
                      ].map((booking, index) => (
                        <tr key={index} className="border-b border-[#EDEEEF]">
                          <td className="py-3 px-4 text-text-primary">{booking.client}</td>
                          <td className="py-3 px-4 text-text-secondary">{booking.service}</td>
                          <td className="py-3 px-4 text-text-primary font-semibold">{booking.amount}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'Confirmée' ? 'bg-green-100 text-green-700' :
                              booking.status === 'En cours' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm" className="text-[#F97B22] hover:bg-[#F97B22]/10">
                              Détails
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <h3 className="text-h4 font-bold text-text-primary mb-4">Actions rapides</h3>
                <div className="space-y-3">
                  <Button className="w-full bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Valider professionnels
                  </Button>
                  <Button className="w-full bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Tickets support
                  </Button>
                  <Button className="w-full bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Rapports
                  </Button>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <h3 className="text-h4 font-bold text-text-primary mb-4">Activités récentes</h3>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#F97B22] rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm text-text-primary">{activity.message}</p>
                        <p className="text-xs text-text-muted mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-gradient-to-br from-red-50/80 to-orange-50/50 backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-red-200">
                <div className="flex items-center space-x-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  <h3 className="text-h4 font-bold text-red-700">Alertes</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-red-100 rounded-[16px]">
                    <p className="text-sm text-red-700">5 réservations en attente de validation</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-[16px]">
                    <p className="text-sm text-yellow-700">2 tickets support non résolus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}