"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsChart = BookingsChart;
exports.BookingsBarChart = BookingsBarChart;
exports.BookingsStatusChart = BookingsStatusChart;
const react_1 = __importDefault(require("react"));
const recharts_1 = require("recharts");
const lucide_react_1 = require("lucide-react");
const ChartContainer_1 = require("./ChartContainer");
function BookingsChart({ data, loading = false, error = null, showTrends = true, timeRange = '30d', className, height = 350 }) {
    const chartData = data.map(item => {
        const totalBookings = item.bookings;
        const completionRate = totalBookings > 0
            ? Math.round((item.completed / totalBookings) * 100)
            : 0;
        return {
            ...item,
            dateFormatted: new Date(item.date).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit'
            }),
            totalBookings,
            completionRate,
            pendingRate: totalBookings > 0
                ? Math.round((item.pending / totalBookings) * 100)
                : 0
        };
    });
    const totalBookings = data.reduce((sum, item) => sum + item.bookings, 0);
    const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0);
    const totalCancelled = data.reduce((sum, item) => sum + item.cancelled, 0);
    const completionRate = totalBookings > 0 ? Math.round((totalCompleted / totalBookings) * 100) : 0;
    const colors = {
        completed: '#22c55e',
        cancelled: '#ef4444',
        pending: '#f59e0b',
        total: '#F97B22',
        grid: '#F1F5F9',
        text: '#64748b',
        line: '#3b82f6'
    };
    const tooltipFormatter = (value, name) => {
        const labelMap = {
            completed: 'Terminées',
            cancelled: 'Annulées',
            pending: 'En attente',
            total: 'Total',
            completionRate: 'Taux de complétion'
        };
        const label = labelMap[name] || name;
        const formattedValue = name.includes('Rate')
            ? `${value}%`
            : `${value} réservation${value > 1 ? 's' : ''}`;
        return [formattedValue, label];
    };
    const timeRangeLabels = {
        '7d': '7 derniers jours',
        '30d': '30 derniers jours',
        '90d': '3 derniers mois'
    };
    const legendItems = [
        { label: 'Terminées', color: colors.completed, value: totalCompleted },
        { label: 'En attente', color: colors.pending, value: data.reduce((sum, item) => sum + item.pending, 0) },
        { label: 'Annulées', color: colors.cancelled, value: totalCancelled }
    ];
    return (<ChartContainer_1.ChartContainer title="Évolution des réservations" subtitle={timeRangeLabels[timeRange]} loading={loading} error={error} className={className} height={height} actions={<div className="flex items-center space-x-2">
          <lucide_react_1.CheckCircle className="w-4 h-4 text-green-500"/>
          <span className="text-sm font-medium text-green-600">
            {completionRate}% terminées
          </span>
        </div>}>
      <recharts_1.ResponsiveContainer width="100%" height="100%">
        <recharts_1.ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <recharts_1.CartesianGrid strokeDasharray="3 3" stroke={colors.grid} opacity={0.5}/>
          
          <recharts_1.XAxis dataKey="dateFormatted" axisLine={false} tickLine={false} tick={{
            fill: colors.text,
            fontSize: 12,
            fontWeight: 500
        }}/>
          
          <recharts_1.YAxis axisLine={false} tickLine={false} tick={{
            fill: colors.text,
            fontSize: 12,
            fontWeight: 500
        }}/>

          
          <recharts_1.Bar dataKey="completed" stackId="bookings" fill={colors.completed} radius={[0, 0, 0, 0]}/>
          
          <recharts_1.Bar dataKey="pending" stackId="bookings" fill={colors.pending} radius={[0, 0, 0, 0]}/>
          
          <recharts_1.Bar dataKey="cancelled" stackId="bookings" fill={colors.cancelled} radius={[2, 2, 0, 0]}/>

          
          {showTrends && (<recharts_1.Line type="monotone" dataKey="completionRate" stroke={colors.line} strokeWidth={2} dot={false} activeDot={{
                r: 4,
                stroke: colors.line,
                strokeWidth: 2,
                fill: '#ffffff'
            }} yAxisId="right"/>)}

          
          {showTrends && (<recharts_1.YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{
                fill: colors.text,
                fontSize: 12,
                fontWeight: 500
            }} tickFormatter={(value) => `${value}%`}/>)}

          <recharts_1.Tooltip content={<ChartContainer_1.ChartTooltip formatter={tooltipFormatter}/>}/>
        </recharts_1.ComposedChart>
      </recharts_1.ResponsiveContainer>

      
      <div className="mt-4 grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#F97B22]">{totalBookings}</div>
          <div className="text-sm text-text-secondary">Total réservations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{totalCompleted}</div>
          <div className="text-sm text-text-secondary">Terminées</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-600">{data.reduce((sum, item) => sum + item.pending, 0)}</div>
          <div className="text-sm text-text-secondary">En attente</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{totalCancelled}</div>
          <div className="text-sm text-text-secondary">Annulées</div>
        </div>
      </div>

      <ChartContainer_1.ChartLegend items={legendItems}/>
    </ChartContainer_1.ChartContainer>);
}
function BookingsBarChart({ data, className, height = 200 }) {
    const totalBookings = data.reduce((sum, item) => sum + item.bookings, 0);
    const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0);
    const completionRate = totalBookings > 0 ? Math.round((totalCompleted / totalBookings) * 100) : 0;
    return (<div className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-medium text-text-primary">Réservations ce mois</h4>
          <p className="text-2xl font-bold text-[#F97B22]">
            {totalBookings}
          </p>
        </div>
        <div className="flex items-center space-x-1">
          <lucide_react_1.CheckCircle className="w-4 h-4 text-green-500"/>
          <span className="text-sm font-medium text-green-500">
            {completionRate}%
          </span>
        </div>
      </div>
      
      <recharts_1.ResponsiveContainer width="100%" height={height - 60}>
        <recharts_1.BarChart data={data.slice(-7)}> 
          <recharts_1.Bar dataKey="completed" fill="#22c55e" radius={[2, 2, 0, 0]}/>
          <recharts_1.XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })} hide/>
          <recharts_1.YAxis hide/>
          <recharts_1.Tooltip formatter={(value) => [`${value} réservations`, 'Terminées']} labelFormatter={(label) => new Date(label).toLocaleDateString('fr-FR')}/>
        </recharts_1.BarChart>
      </recharts_1.ResponsiveContainer>
    </div>);
}
function BookingsStatusChart({ data, className, size = 200 }) {
    const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0);
    const totalCancelled = data.reduce((sum, item) => sum + item.cancelled, 0);
    const totalPending = data.reduce((sum, item) => sum + item.pending, 0);
    const total = totalCompleted + totalCancelled + totalPending;
    const completionRate = total > 0 ? Math.round((totalCompleted / total) * 100) : 0;
    return (<div className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 ${className}`}>
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold text-text-primary">Répartition des réservations</h4>
        <p className="text-3xl font-bold text-[#F97B22] mt-2">{completionRate}%</p>
        <p className="text-sm text-text-secondary">Taux de réussite</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <lucide_react_1.CheckCircle className="w-4 h-4 text-green-500"/>
            <span className="text-sm text-text-secondary">Terminées</span>
          </div>
          <span className="text-sm font-medium text-text-primary">{totalCompleted}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <lucide_react_1.Clock className="w-4 h-4 text-amber-500"/>
            <span className="text-sm text-text-secondary">En attente</span>
          </div>
          <span className="text-sm font-medium text-text-primary">{totalPending}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <lucide_react_1.XCircle className="w-4 h-4 text-red-500"/>
            <span className="text-sm text-text-secondary">Annulées</span>
          </div>
          <span className="text-sm font-medium text-text-primary">{totalCancelled}</span>
        </div>
      </div>
    </div>);
}
//# sourceMappingURL=BookingsChart.js.map