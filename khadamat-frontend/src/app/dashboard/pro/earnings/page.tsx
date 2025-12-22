'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Download,
  Filter,
  CheckCircle,
  Info,
  TrendingDown
} from 'lucide-react';
import {
  mockCashTransactions,
  mockCashEarningsStats,
  getCashMonthlyTransactions,
  getCashRevenueByMonth,
  type CashTransaction
} from '@/lib/mocks/pro-earnings-mocks';

// --- COMPOSANT LOCAL : PRO STATS CARD (Pour éviter les erreurs d'import) ---
function ProStatsCard({ title, value, subtitle, icon: Icon, trend }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          
          {trend && (
            <div className={`flex items-center text-xs font-medium mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {/* ✅ CORRECTION ICI : toFixed(1) */}
              <span>{trend.isPositive ? '+' : ''}{Number(trend.value).toFixed(1)}%</span>
              <span className="text-gray-400 ml-1">vs mois dernier</span>
            </div>
          )}
          
          {subtitle && !trend && (
            <p className="text-xs text-gray-400 mt-2">{subtitle}</p>
          )}
        </div>
        
        <div className="p-3 bg-orange-50 rounded-xl text-[#F97B22]">
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

// Lazy load heavy chart component (Assure-toi que ce fichier existe, sinon commente-le)
const RevenueChart = React.lazy(() => import('@/components/charts/RevenueChart').then(mod => ({ default: mod.RevenueChart })));

export default function ProDashboardEarningsPage() {
   const [earningsStats] = useState(mockCashEarningsStats);
   const [transactions, setTransactions] = useState<CashTransaction[]>([]);
   const [revenueData] = useState(getCashRevenueByMonth());
   const [loading, setLoading] = useState(true);
   const [selectedMonth, setSelectedMonth] = useState<string>('all');
   const completedBookings = 42; 

   useEffect(() => {
     // Simulation API
     const loadEarnings = async () => {
       setLoading(true);
       setTransactions(mockCashTransactions);
       setLoading(false);
     };

     loadEarnings();
   }, []);

   const filteredTransactions = selectedMonth === 'all'
     ? transactions
     : getCashMonthlyTransactions(selectedMonth);

  // Calculs sécurisés
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
              <div key={i} className="h-32 bg-gray-100 rounded-[24px]"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 font-heading mb-2">
          Mon Activité Financière
        </h1>
        <p className="text-gray-500">
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

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-[24px] p-4 mb-6">
        <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
            <p className="text-blue-800 font-medium text-sm">
                Ce tableau récapitule les paiements que vous avez reçus directement des clients. Khadamat ne détient pas ces fonds.
            </p>
            </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 font-heading">
            Historique des paiements ({filteredTransactions.length})
            </h3>
            <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
            </Button>
            <Button className="bg-[#F97B22] text-white hover:bg-[#d95f0d]" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Télécharger
            </Button>
            </div>
        </div>

        {filteredTransactions.length > 0 ? (
            <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Montant</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Statut</th>
                </tr>
                </thead>
                <tbody>
                {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4 text-gray-500">
                        {new Date(transaction.paymentDate).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                        {transaction.clientName}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                        {transaction.serviceName}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#F97B22]">
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
            <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucune transaction
            </h3>
            <p className="text-gray-500">
                Vous n'avez pas encore enregistré de transactions.
            </p>
            </div>
        )}
      </div>

      {/* Performance Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4 font-heading">
            Statistiques de performance
            </h4>
            <div className="space-y-3">
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Ticket moyen</span>
                <span className="font-semibold text-[#F97B22]">{earningsStats.averageTicket} DH</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Taux de conversion</span>
                <span className="font-semibold text-green-600">87%</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Réservations terminées</span>
                <span className="font-semibold text-blue-600">{completedBookings}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Croissance mensuelle</span>
                <span className={`font-semibold ${monthlyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {monthlyGrowth >= 0 ? '+' : ''}{monthlyGrowth.toFixed(1)}%
                </span>
            </div>
            </div>
        </div>

        <div className="bg-[#F97B22]/10 rounded-[24px] p-6 border border-[#F97B22]/20">
            <h4 className="text-lg font-bold text-gray-900 mb-4 font-heading">
            💰 Conseils pour maximiser vos revenus
            </h4>
            <ul className="text-sm text-gray-600 space-y-2">
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