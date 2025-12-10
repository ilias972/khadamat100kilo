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
export declare const mockCashTransactions: CashTransaction[];
export declare const mockCashEarningsStats: CashEarningsStats;
export declare const getCashMonthlyTransactions: (month?: string) => CashTransaction[];
export declare const getCashRevenueByMonth: () => {
    month: string;
    revenue: number;
}[];
