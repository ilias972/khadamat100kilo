'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedBookingManager = void 0;
const react_1 = __importStar(require("react"));
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const enhanced_booking_card_1 = require("@/components/ui/enhanced-booking-card");
const AdvancedBookingManager = ({ bookings: initialBookings, onBookingAction }) => {
    const [filters, setFilters] = (0, react_1.useState)({
        status: 'all',
        dateRange: '30days',
        serviceCategory: 'all',
        priceRange: [0, 5000],
        searchQuery: ''
    });
    const [sortBy, setSortBy] = (0, react_1.useState)('date');
    const [viewMode, setViewMode] = (0, react_1.useState)('list');
    const [showFilters, setShowFilters] = (0, react_1.useState)(false);
    const mockBookings = [
        {
            id: '1',
            serviceName: 'Nettoyage complet appartement',
            serviceCategory: 'Ménage',
            professionalName: 'Fatima Z.',
            professionalId: 'p1',
            status: 'confirmed',
            date: '2024-01-20',
            time: '10:00',
            price: 250,
            location: 'Casablanca, Maarif',
            notes: 'Appartement 3 pièces',
            imageUrl: '/menageICONE.png'
        },
        {
            id: '2',
            serviceName: 'Réparation plomberie',
            serviceCategory: 'Plomberie',
            professionalName: 'Ahmed M.',
            professionalId: 'p2',
            status: 'pending',
            date: '2024-01-22',
            time: '14:00',
            price: 180,
            location: 'Casablanca, Anfa',
            imageUrl: '/plomberieICONE.png'
        },
        {
            id: '3',
            serviceName: 'Installation électrique',
            serviceCategory: 'Électricité',
            professionalName: 'Youssef K.',
            professionalId: 'p3',
            status: 'completed',
            date: '2024-01-15',
            time: '09:00',
            price: 300,
            location: 'Casablanca, Gauthier',
            rating: 5,
            imageUrl: '/electricitéICONE.png'
        },
        {
            id: '4',
            serviceName: 'Peinture salon',
            serviceCategory: 'Peinture',
            professionalName: 'Hassan B.',
            professionalId: 'p4',
            status: 'in_progress',
            date: '2024-01-18',
            time: '08:00',
            price: 800,
            location: 'Casablanca, Bourgogne',
            imageUrl: '/peintureICONE.png'
        }
    ];
    const bookings = initialBookings || mockBookings;
    const filteredBookings = (0, react_1.useMemo)(() => {
        let result = [...bookings];
        if (filters.status !== 'all') {
            result = result.filter(b => b.status === filters.status);
        }
        if (filters.serviceCategory !== 'all') {
            result = result.filter(b => b.serviceCategory === filters.serviceCategory);
        }
        result = result.filter(b => b.price >= filters.priceRange[0] && b.price <= filters.priceRange[1]);
        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            result = result.filter(b => b.serviceName.toLowerCase().includes(query) ||
                b.professionalName.toLowerCase().includes(query) ||
                b.location.toLowerCase().includes(query));
        }
        result.sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                case 'price':
                    return b.price - a.price;
                case 'status':
                    return a.status.localeCompare(b.status);
                default:
                    return 0;
            }
        });
        return result;
    }, [bookings, filters, sortBy]);
    const statusOptions = [
        { value: 'all', label: 'Tous les statuts' },
        { value: 'pending', label: 'En attente' },
        { value: 'confirmed', label: 'Confirmées' },
        { value: 'in_progress', label: 'En cours' },
        { value: 'completed', label: 'Terminées' },
        { value: 'cancelled', label: 'Annulées' }
    ];
    const categoryOptions = [
        { value: 'all', label: 'Toutes les catégories' },
        { value: 'Ménage', label: 'Ménage' },
        { value: 'Plomberie', label: 'Plomberie' },
        { value: 'Électricité', label: 'Électricité' },
        { value: 'Peinture', label: 'Peinture' },
        { value: 'Jardinage', label: 'Jardinage' },
        { value: 'Déménagement', label: 'Déménagement' }
    ];
    const dateRangeOptions = [
        { value: '7days', label: '7 derniers jours' },
        { value: '30days', label: '30 derniers jours' },
        { value: '90days', label: '90 derniers jours' },
        { value: 'all', label: 'Tout l\'historique' }
    ];
    const handleExport = () => {
        console.log('Exporting bookings...');
    };
    return (<div className="space-y-6">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#3B3B3B] font-heading">
            Mes réservations
          </h2>
          <p className="text-sm text-[#6B7280]">
            {filteredBookings.length} réservation{filteredBookings.length !== 1 ? 's' : ''} trouvée{filteredBookings.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button_1.Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
            <lucide_react_1.Filter className="w-4 h-4 mr-2"/>
            Filtres
          </button_1.Button>
          <button_1.Button variant="outline" size="sm" onClick={handleExport}>
            <lucide_react_1.Download className="w-4 h-4 mr-2"/>
            Exporter
          </button_1.Button>
        </div>
      </div>

      
      <card_1.Card className={`bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] p-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
        
        <div className="relative mb-4">
          <lucide_react_1.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]"/>
          <input type="text" placeholder="Rechercher par service, professionnel ou lieu..." value={filters.searchQuery} onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })} className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDEEEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent"/>
          {filters.searchQuery && (<button onClick={() => setFilters({ ...filters, searchQuery: '' })} className="absolute right-3 top-1/2 -translate-y-1/2">
              <lucide_react_1.X className="w-4 h-4 text-[#6B7280]"/>
            </button>)}
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          
          <div className="relative">
            <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })} className="w-full px-4 py-3 bg-white border border-[#EDEEEF] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent">
              {statusOptions.map(option => (<option key={option.value} value={option.value}>
                  {option.label}
                </option>))}
            </select>
            <lucide_react_1.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none"/>
          </div>

          
          <div className="relative">
            <select value={filters.dateRange} onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })} className="w-full px-4 py-3 bg-white border border-[#EDEEEF] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent">
              {dateRangeOptions.map(option => (<option key={option.value} value={option.value}>
                  {option.label}
                </option>))}
            </select>
            <lucide_react_1.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none"/>
          </div>

          
          <div className="relative">
            <select value={filters.serviceCategory} onChange={(e) => setFilters({ ...filters, serviceCategory: e.target.value })} className="w-full px-4 py-3 bg-white border border-[#EDEEEF] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent">
              {categoryOptions.map(option => (<option key={option.value} value={option.value}>
                  {option.label}
                </option>))}
            </select>
            <lucide_react_1.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none"/>
          </div>

          
          <div className="relative">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-3 bg-white border border-[#EDEEEF] rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#F97B22] focus:border-transparent">
              <option value="date">Trier par date</option>
              <option value="price">Trier par prix</option>
              <option value="status">Trier par statut</option>
            </select>
            <lucide_react_1.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none"/>
          </div>
        </div>

        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button_1.Button variant={viewMode === 'list' ? 'primary' : 'outline'} size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-[#F97B22] hover:bg-[#e66a1f]' : ''}>
              <lucide_react_1.List className="w-4 h-4 mr-2"/>
              Liste
            </button_1.Button>
            <button_1.Button variant={viewMode === 'grid' ? 'primary' : 'outline'} size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-[#F97B22] hover:bg-[#e66a1f]' : ''}>
              <lucide_react_1.Grid className="w-4 h-4 mr-2"/>
              Grille
            </button_1.Button>
            <button_1.Button variant={viewMode === 'calendar' ? 'primary' : 'outline'} size="sm" onClick={() => setViewMode('calendar')} className={viewMode === 'calendar' ? 'bg-[#F97B22] hover:bg-[#e66a1f]' : ''}>
              <lucide_react_1.Calendar className="w-4 h-4 mr-2"/>
              Calendrier
            </button_1.Button>
          </div>

          
          {(filters.status !== 'all' || filters.serviceCategory !== 'all' || filters.searchQuery) && (<button onClick={() => setFilters({
                status: 'all',
                dateRange: '30days',
                serviceCategory: 'all',
                priceRange: [0, 5000],
                searchQuery: ''
            })} className="text-sm text-[#F97B22] hover:underline">
              Réinitialiser les filtres
            </button>)}
        </div>
      </card_1.Card>

      
      {filteredBookings.length === 0 ? (<card_1.Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border-[#EDEEEF] p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-[#3B3B3B] mb-2">
            Aucune réservation trouvée
          </h3>
          <p className="text-[#6B7280] mb-6">
            Essayez de modifier vos filtres ou effectuez une nouvelle recherche.
          </p>
          <button_1.Button onClick={() => setFilters({
                status: 'all',
                dateRange: '30days',
                serviceCategory: 'all',
                priceRange: [0, 5000],
                searchQuery: ''
            })} className="bg-[#F97B22] hover:bg-[#e66a1f]">
            Réinitialiser les filtres
          </button_1.Button>
        </card_1.Card>) : (<div className={viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'}>
          {filteredBookings.map((booking) => (<enhanced_booking_card_1.EnhancedBookingCard key={booking.id} booking={{
                    id: booking.id,
                    clientId: 'current-user',
                    serviceName: booking.serviceName,
                    serviceCategory: booking.serviceCategory,
                    professionalName: booking.professionalName,
                    scheduledDate: booking.date,
                    scheduledTime: booking.time,
                    duration: '2h',
                    status: booking.status,
                    price: booking.price,
                    location: booking.location,
                    notes: booking.notes,
                    createdAt: booking.date,
                    updatedAt: booking.date
                }} variant={viewMode === 'grid' ? 'default' : 'list'} interactive onClick={() => onBookingAction?.('view', booking.id)} onContact={() => onBookingAction?.('contact', booking.id)} onMessage={() => onBookingAction?.('message', booking.id)} onCancel={() => onBookingAction?.('cancel', booking.id)} onRate={() => onBookingAction?.('rate', booking.id)}/>))}
        </div>)}
    </div>);
};
exports.AdvancedBookingManager = AdvancedBookingManager;
//# sourceMappingURL=advanced-booking-manager.js.map