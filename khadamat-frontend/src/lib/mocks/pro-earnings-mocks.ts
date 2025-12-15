export interface CashTransaction {
  id: string;
  bookingId: string;
  clientName: string;
  serviceName: string;
  amount: number;
  type: 'cash_payment';
  status: 'completed';
  description: string;
  paymentDate: string;
  createdAt: string;
}

export interface CashEarningsStats {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  averageTicket: number;
  growthRate: number;
  totalTransactions: number;
}

export const mockCashTransactions: CashTransaction[] = [
  {
    id: 'cash-txn-1',
    bookingId: 'booking-1',
    clientName: 'Ahmed Bennani',
    serviceName: 'Réparation de fuite d\'eau',
    amount: 300,
    type: 'cash_payment',
    status: 'completed',
    description: "Paiement direct - Réparation de fuite d'eau Ahmed Bennani",
    paymentDate: '2024-11-20T16:00:00Z',
    createdAt: '2024-11-20T16:00:00Z'
  },
  {
    id: 'cash-txn-2',
    bookingId: 'booking-2',
    clientName: 'Fatima Alaoui',
    serviceName: 'Installation chauffe-eau',
    amount: 450,
    type: 'cash_payment',
    status: 'completed',
    description: "Paiement direct - Installation chauffe-eau Fatima Alaoui",
    paymentDate: '2024-11-18T14:00:00Z',
    createdAt: '2024-11-18T14:00:00Z'
  },
  {
    id: 'cash-txn-3',
    bookingId: 'booking-3',
    clientName: 'Mohammed Tazi',
    serviceName: 'Débouchage canalisation',
    amount: 150,
    type: 'cash_payment',
    status: 'completed',
    description: "Paiement direct - Débouchage canalisation Mohammed Tazi",
    paymentDate: '2024-11-15T12:00:00Z',
    createdAt: '2024-11-15T12:00:00Z'
  },
  {
    id: 'cash-txn-4',
    bookingId: 'booking-4',
    clientName: 'Leila Mansouri',
    serviceName: 'Réparation robinetterie',
    amount: 200,
    type: 'cash_payment',
    status: 'completed',
    description: "Paiement direct - Réparation robinetterie Leila Mansouri",
    paymentDate: '2024-11-22T16:00:00Z',
    createdAt: '2024-11-22T16:00:00Z'
  },
  {
    id: 'cash-txn-5',
    bookingId: 'booking-5',
    clientName: 'Youssef El Amrani',
    serviceName: 'Installation salle de bain',
    amount: 800,
    type: 'cash_payment',
    status: 'completed',
    description: "Paiement direct - Installation salle de bain Youssef El Amrani",
    paymentDate: '2024-10-15T19:00:00Z',
    createdAt: '2024-10-15T19:00:00Z'
  },
  {
    id: 'cash-txn-6',
    bookingId: 'booking-6',
    clientName: 'Amina Bouazza',
    serviceName: 'Entretien jardin mensuel',
    amount: 250,
    type: 'cash_payment',
    status: 'completed',
    description: "Paiement direct - Entretien jardin mensuel Amina Bouazza",
    paymentDate: '2024-11-10T11:00:00Z',
    createdAt: '2024-11-10T11:00:00Z'
  },
  {
    id: 'cash-txn-7',
    bookingId: 'booking-7',
    clientName: 'Karim Alaoui',
    serviceName: 'Peinture intérieure salon',
    amount: 600,
    type: 'cash_payment',
    status: 'completed',
    description: "Paiement direct - Peinture intérieure salon Karim Alaoui",
    paymentDate: '2024-10-25T17:00:00Z',
    createdAt: '2024-10-25T17:00:00Z'
  },
  {
    id: 'cash-txn-8',
    bookingId: 'booking-8',
    clientName: 'Sofia Benjelloun',
    serviceName: 'Réparation électrique',
    amount: 180,
    type: 'cash_payment',
    status: 'completed',
    description: "Paiement direct - Réparation électrique Sofia Benjelloun",
    paymentDate: '2024-11-05T15:30:00Z',
    createdAt: '2024-11-05T15:30:00Z'
  }
];

export const mockCashEarningsStats: CashEarningsStats = {
  totalRevenue: 2930, // Sum of all transaction amounts
  monthlyRevenue: 1350, // November transactions: 300 + 450 + 150 + 200 + 250 = 1350
  pendingPayments: 0, // No pending payments for cash
  averageTicket: 366, // totalRevenue / totalTransactions
  totalTransactions: 8,
  growthRate: 12.5 // Mock growth rate
};

export const getCashMonthlyTransactions = (month?: string): CashTransaction[] => {
  if (!month) {
    // Return current month transactions
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return mockCashTransactions.filter(txn =>
      txn.createdAt.startsWith(currentMonth)
    );
  }
  return mockCashTransactions.filter(txn =>
    txn.createdAt.startsWith(month)
  );
};

export const getCashRevenueByMonth = () => {
  // Mock monthly revenue data for the last 6 months
  return [
    { month: '2024-06', label: 'Juin', revenue: 2100, bookings: 12 },
    { month: '2024-07', label: 'Juillet', revenue: 2350, bookings: 14 },
    { month: '2024-08', label: 'Août', revenue: 2580, bookings: 16 },
    { month: '2024-09', label: 'Septembre', revenue: 2720, bookings: 18 },
    { month: '2024-10', label: 'Octobre', revenue: 2800, bookings: 19 },
    { month: '2024-11', label: 'Novembre', revenue: 2930, bookings: 21 }
  ];
};