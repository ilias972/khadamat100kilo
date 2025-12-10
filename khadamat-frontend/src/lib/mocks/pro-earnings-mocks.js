"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCashRevenueByMonth = exports.getCashMonthlyTransactions = exports.mockCashEarningsStats = exports.mockCashTransactions = void 0;
exports.mockCashTransactions = [
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
exports.mockCashEarningsStats = {
    totalRevenue: 2930,
    monthlyRevenue: 1350,
    pendingPayments: 0,
    averageTicket: 366,
    totalTransactions: 8,
    growthRate: 12.5
};
const getCashMonthlyTransactions = (month) => {
    if (!month) {
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        return exports.mockCashTransactions.filter(txn => txn.createdAt.startsWith(currentMonth));
    }
    return exports.mockCashTransactions.filter(txn => txn.createdAt.startsWith(month));
};
exports.getCashMonthlyTransactions = getCashMonthlyTransactions;
const getCashRevenueByMonth = () => {
    return [
        { month: '2024-06', revenue: 2100 },
        { month: '2024-07', revenue: 2350 },
        { month: '2024-08', revenue: 2580 },
        { month: '2024-09', revenue: 2720 },
        { month: '2024-10', revenue: 2800 },
        { month: '2024-11', revenue: 2930 }
    ];
};
exports.getCashRevenueByMonth = getCashRevenueByMonth;
//# sourceMappingURL=pro-earnings-mocks.js.map