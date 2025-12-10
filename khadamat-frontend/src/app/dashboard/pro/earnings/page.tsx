'use client';

import React, { useState, useEffect } from 'react';
import { ProStatsCard } from '@/components/dashboard/dashboard-components';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Download,
  Filter,
  CheckCircle,
  Info
} from 'lucide-react';
import {
  mockCashTransactions,
  mockCashEarningsStats,
  getCashMonthlyTransactions,
  getCashRevenueByMonth,
  type CashTransaction
} from '@/lib/mocks/pro-earnings-mocks';

// Lazy load heavy chart component
const RevenueChart = React.lazy(() => import('@/components/charts/RevenueChart').then(mod => ({ default: mod.RevenueChart })));

export default function ProDashboardEarningsPage() {
   const [earningsStats] = useState(mockCashEarningsStats);
   const [transactions, setTransactions] = useState<CashTransaction[]>([]);
   const [revenueData] = useState(getCashRevenueByMonth());
   const [loading, setLoading] = useState(true);
   const [selectedMonth, setSelectedMonth] = useState<string>('all');
   const completedBookings = 42; // Mock value for completed bookings

   useEffect(() => {
     // Simulate API call
     const loadEarnings = async () => {
       setLoading(true);
       // In a real app, this would be an API call
       setTransactions(mockCashTransactions);
       setLoading(false);
     };

     loadEarnings();
   }, []);

   const filteredTransactions = selectedMonth === 'all'
     ? transactions
     : getCashMonthlyTransactions(selectedMonth);

  const currentMonthRevenue = revenueData[revenueData.length - 1]?.revenue || 0;
  const previousMonthRevenue = revenueData[revenueData.length - 2]?.revenue || 0;
  const monthlyGrowth = previousMonthRevenue > 0
    ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100
    : 0;

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-surface rounded-[24px]"></div>
            ))}
          </div>
          <div className="h-64 bg-surface rounded-[24px]"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-surface rounded-[24px]"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary font-heading mb-2">
          Mon Activité Financière
        </h1>
        <p className="text-text-secondary">
          Suivez vos revenus et paiements reçus en espèces
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <ProStatsCard
          title="Chiffre d'affaires estimé"
          value={`${earningsStats.totalRevenue} DH`}
          subtitle="Montants perçus en espèces"
          icon={DollarSign}
        />
        <ProStatsCard
          title="Ce mois-ci"
          value={`${earningsStats.monthlyRevenue} DH`}
          subtitle={`${filteredTransactions.filter(t => t.status === 'completed').length} transactions`}
          icon={Calendar}
          trend={{ value: monthlyGrowth, isPositive: monthlyGrowth >= 0 }}
        />
        <ProStatsCard
          title="En attente"
          value={`${earningsStats.pendingPayments} DH`}
          subtitle="Paiements à recevoir"
          icon={TrendingUp}
        />
      </div>

              {/* Revenue Chart - Lazy loaded */}
              <React.Suspense fallback={
                <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 mb-8">
                  <div className="h-64 bg-gradient-to-br from-[#F97B22]/5 to-[#F97B22]/10 rounded-lg flex items-center justify-center animate-pulse">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-[#F97B22] mx-auto mb-2" />
                      <p className="text-text-secondary">
                        Chargement du graphique...
                      </p>
                    </div>
                  </div>
                </div>
              }>
                <RevenueChart
                  data={revenueData}
                  loading={false}
                  showTarget={false}
                  showGrowth={true}
                  className="mb-8"
                  height={300}
                />
              </React.Suspense>

              {/* Info Alert */}
              <div className="bg-blue-50 border border-blue-200 rounded-[24px] p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 font-medium">
                      Ce tableau récapitule les paiements que vous avez reçus directement des clients. Khadamat ne détient pas ces fonds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-text-primary font-heading">
                    Historique des paiements ({filteredTransactions.length})
                  </h3>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrer
                    </Button>
                    <Button variant="primary" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger mon relevé
                    </Button>
                  </div>
                </div>

                {filteredTransactions.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border-light">
                          <th className="text-left py-3 px-4 font-semibold text-text-primary">Date</th>
                          <th className="text-left py-3 px-4 font-semibold text-text-primary">Client</th>
                          <th className="text-left py-3 px-4 font-semibold text-text-primary">Service</th>
                          <th className="text-left py-3 px-4 font-semibold text-text-primary">Montant</th>
                          <th className="text-left py-3 px-4 font-semibold text-text-primary">Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTransactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b border-border-light/50 hover:bg-white/50">
                            <td className="py-3 px-4 text-text-secondary">
                              {new Date(transaction.paymentDate).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="py-3 px-4 font-medium text-text-primary">
                              {transaction.clientName}
                            </td>
                            <td className="py-3 px-4 text-text-secondary">
                              {transaction.serviceName}
                            </td>
                            <td className="py-3 px-4 font-semibold text-[#F97B22]">
                              {transaction.amount} DH
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Payé sur place
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <DollarSign className="w-12 h-12 text-text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      Aucune transaction
                    </h3>
                    <p className="text-text-secondary">
                      {selectedMonth === 'all'
                        ? "Vous n'avez pas encore de transactions."
                        : `Aucune transaction pour le mois sélectionné.`
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Performance Insights */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6">
                  <h4 className="text-lg font-bold text-text-primary mb-4 font-heading">
                    Statistiques de performance
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Ticket moyen</span>
                      <span className="font-semibold text-[#F97B22]">{earningsStats.averageTicket} DH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Taux de conversion</span>
                      <span className="font-semibold text-green-600">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Réservations terminées</span>
                      <span className="font-semibold text-blue-600">{completedBookings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Croissance mensuelle</span>
                      <span className={`font-semibold ${monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {monthlyGrowth >= 0 ? '+' : ''}{monthlyGrowth.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#F97B22]/10 to-[#F97B22]/5 backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(249,123,34,0.1)] p-6">
                  <h4 className="text-lg font-bold text-text-primary mb-4 font-heading">
                    💰 Conseils pour maximiser vos revenus
                  </h4>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li>• <strong>Augmentez vos prix</strong> : Vos tarifs sont 15% en dessous de la moyenne</li>
                    <li>• <strong>Améliorez vos avis</strong> : +0.2 étoile = +12% de réservations</li>
                    <li>• <strong>Répondez plus vite</strong> : Objectif moins de 30min pour +8% de conversion</li>
                    <li>• <strong>Ajoutez des services</strong> : Plus d'options = plus de valeur</li>
                  </ul>
                </div>
              </div>
            </div>
  );
}