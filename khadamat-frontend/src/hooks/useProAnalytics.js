"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProAnalytics = useProAnalytics;
const react_1 = require("react");
const generateMockAnalytics = (period) => {
    const months = ['Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre'];
    const currentDate = new Date();
    const revenue = months.map((month, index) => {
        const baseRevenue = 15000 + (index * 2000) + (Math.random() * 3000);
        const bookings = Math.floor(25 + (index * 3) + (Math.random() * 8));
        return {
            month: `2024-${(5 + index).toString().padStart(2, '0')}`,
            label: month,
            revenue: Math.floor(baseRevenue),
            bookings,
            target: Math.floor(baseRevenue * 1.1),
            growth: index > 0 ? Math.floor((Math.random() * 20) - 5) : undefined
        };
    });
    const bookings = Array.from({ length: 30 }, (_, index) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - index));
        const total = Math.floor(Math.random() * 5) + 1;
        const completed = Math.floor(total * (0.8 + Math.random() * 0.15));
        const cancelled = Math.floor(total * (Math.random() * 0.1));
        const pending = total - completed - cancelled;
        return {
            date: date.toISOString().split('T')[0],
            bookings: total,
            completed,
            cancelled,
            pending
        };
    });
    const performance = {
        completionRate: 87 + Math.random() * 10,
        cancellationRate: 5 + Math.random() * 8,
        responseTime: 0.5 + Math.random() * 2,
        customerSatisfaction: 4.2 + Math.random() * 0.6,
        repeatCustomers: 65 + Math.random() * 25,
        averageRating: 4.3 + Math.random() * 0.5,
        totalReviews: Math.floor(50 + Math.random() * 100)
    };
    const trends = [
        {
            label: 'Revenus ce mois',
            value: revenue[revenue.length - 1].revenue,
            percentage: 12.5,
            isPositive: true,
            icon: '💰',
            color: 'green'
        },
        {
            label: 'Réservations',
            value: revenue[revenue.length - 1].bookings,
            percentage: 8.3,
            isPositive: true,
            icon: '📅',
            color: 'blue'
        },
        {
            label: 'Taux de réponse',
            value: 95,
            percentage: -2.1,
            isPositive: false,
            icon: '⚡',
            color: 'orange'
        },
        {
            label: 'Note moyenne',
            value: 4.6,
            percentage: 5.2,
            isPositive: true,
            icon: '⭐',
            color: 'green'
        }
    ];
    const benchmarks = [
        {
            category: 'Taux de complétion',
            userValue: performance.completionRate,
            averageValue: 82,
            topPerformersValue: 95,
            percentile: 75
        },
        {
            category: 'Temps de réponse',
            userValue: performance.responseTime,
            averageValue: 1.8,
            topPerformersValue: 0.5,
            percentile: 85
        },
        {
            category: 'Note client',
            userValue: performance.averageRating,
            averageValue: 4.1,
            topPerformersValue: 4.8,
            percentile: 80
        }
    ];
    const insights = [
        {
            type: 'success',
            title: 'Excellente progression !',
            description: 'Vos revenus ont augmenté de 12.5% ce mois par rapport au précédent.',
            actionable: false,
            priority: 'medium'
        },
        {
            type: 'opportunity',
            title: 'Améliorer le taux de réponse',
            description: 'Votre temps de réponse de 1.2h peut être amélioré. Les top performers répondent en moins de 30 minutes.',
            actionable: true,
            priority: 'high',
            recommendation: 'Activez les notifications pour répondre plus rapidement aux demandes.'
        },
        {
            type: 'info',
            title: 'Pic de demande détecté',
            description: 'Les réservations augmentent traditionnellement en fin de semaine. Considérez ajuster vos disponibilités.',
            actionable: true,
            priority: 'low',
            recommendation: 'Proposez plus de créneaux le vendredi et samedi.'
        }
    ];
    const totalRevenue = revenue.reduce((sum, month) => sum + month.revenue, 0);
    const totalBookings = revenue.reduce((sum, month) => sum + month.bookings, 0);
    return {
        revenue,
        bookings,
        performance,
        trends,
        benchmarks,
        insights,
        summary: {
            totalRevenue,
            totalBookings,
            averageBookingValue: Math.floor(totalRevenue / totalBookings),
            growthRate: 12.5,
            period: '6 derniers mois'
        }
    };
};
function useProAnalytics(period = '6m') {
    const [analytics, setAnalytics] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const loadAnalytics = async () => {
            try {
                setLoading(true);
                setError(null);
                await new Promise(resolve => setTimeout(resolve, 800));
                const data = generateMockAnalytics(period);
                setAnalytics(data);
            }
            catch (err) {
                setError('Erreur lors du chargement des données analytics');
                console.error('Analytics loading error:', err);
            }
            finally {
                setLoading(false);
            }
        };
        loadAnalytics();
    }, [period]);
    const refreshAnalytics = () => {
        const data = generateMockAnalytics(period);
        setAnalytics(data);
    };
    return {
        analytics,
        loading,
        error,
        refreshAnalytics,
        getRevenueData: () => analytics?.revenue || [],
        getBookingsData: () => analytics?.bookings || [],
        getPerformanceMetrics: () => analytics?.performance,
        getTrends: () => analytics?.trends || [],
        getInsights: () => analytics?.insights || [],
        getBenchmarks: () => analytics?.benchmarks || [],
        getSummary: () => analytics?.summary
    };
}
//# sourceMappingURL=useProAnalytics.js.map