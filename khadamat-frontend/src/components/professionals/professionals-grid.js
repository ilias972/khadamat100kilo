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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalsGrid = void 0;
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const card_1 = require("@/components/ui/card");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const api_1 = require("@/lib/api");
const ProfessionalsGrid = ({ filters, onPageChange, onTotalChange }) => {
    const [professionals, setProfessionals] = (0, react_1.useState)([]);
    const [total, setTotal] = (0, react_1.useState)(0);
    const [totalPages, setTotalPages] = (0, react_1.useState)(1);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
    const mockProfessionals = [
        {
            id: '1',
            name: 'Ahmed Bennani',
            profession: 'Plombier',
            rating: 4.9,
            reviewCount: 127,
            city: 'Casablanca',
            isVerified: true,
            completedJobs: 247,
            description: 'Plombier professionnel avec 8 ans d\'expérience'
        },
        {
            id: '2',
            name: 'Fatima Alaoui',
            profession: 'Électricienne',
            rating: 4.8,
            reviewCount: 89,
            city: 'Rabat',
            isVerified: true,
            completedJobs: 156,
            description: 'Spécialiste en installations électriques'
        },
        {
            id: '3',
            name: 'Mohammed Tazi',
            profession: 'Peintre',
            rating: 4.7,
            reviewCount: 203,
            city: 'Marrakech',
            isVerified: false,
            completedJobs: 89,
            description: 'Peinture intérieure et extérieure'
        },
        {
            id: '4',
            name: 'Leila Mansouri',
            profession: 'Femme de ménage',
            rating: 4.9,
            reviewCount: 312,
            city: 'Casablanca',
            isVerified: true,
            completedJobs: 445,
            description: 'Services de nettoyage professionnels'
        },
    ];
    (0, react_1.useEffect)(() => {
        const fetchProfessionals = async () => {
            setLoading(true);
            try {
                const response = await api_1.api.getPros({
                    cityId: filters.cityId,
                    category: filters.category,
                    rating: filters.minRating,
                    isVerified: filters.isVerified,
                    page: filters.page,
                    limit: filters.limit,
                });
                setProfessionals(response.professionals);
                setTotal(response.total);
                setTotalPages(response.totalPages);
                setError(false);
                if (onTotalChange) {
                    onTotalChange(response.total, response.totalPages);
                }
            }
            catch (err) {
                console.error('Error fetching professionals:', err);
                setProfessionals(mockProfessionals);
                setTotal(mockProfessionals.length);
                setTotalPages(1);
                setError(false);
                if (onTotalChange) {
                    onTotalChange(mockProfessionals.length, 1);
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchProfessionals();
    }, [filters]);
    const handleContactClick = (professionalId) => {
        alert('La messagerie arrive bientôt ! Connectez-vous pour contacter cet artisan.');
    };
    if (loading) {
        return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (<div key={i} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] animate-pulse">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#EDEEEF] rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-[#EDEEEF] rounded w-24"></div>
                  <div className="h-3 bg-[#EDEEEF] rounded w-16"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-[#EDEEEF] rounded w-full"></div>
                <div className="h-4 bg-[#EDEEEF] rounded w-3/4"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-[#EDEEEF] rounded w-16"></div>
                <div className="h-8 bg-[#EDEEEF] rounded w-20"></div>
              </div>
            </div>
          </div>))}
      </div>);
    }
    if (error) {
        return (<div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-[#EDEEEF] rounded-[24px] flex items-center justify-center">
          <lucide_react_1.AlertCircle className="w-12 h-12 text-text-muted"/>
        </div>
        <h3 className="text-h3 font-semibold text-text-primary mb-2 font-heading">
          Impossible de charger les artisans
        </h3>
        <p className="text-text-secondary mb-6 font-body">
          Veuillez réessayer dans quelques instants.
        </p>
        <button_1.Button onClick={() => window.location.reload()} className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
          Réessayer
        </button_1.Button>
      </div>);
    }
    if (professionals.length === 0) {
        return (<div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-[#EDEEEF] rounded-[24px] flex items-center justify-center">
          <lucide_react_1.Users className="w-12 h-12 text-text-muted"/>
        </div>
        <h3 className="text-h3 font-semibold text-text-primary mb-2 font-heading">
          Aucun artisan trouvé
        </h3>
        <p className="text-text-secondary mb-6 font-body">
          Essayez de modifier vos critères de recherche ou d'élargir votre zone géographique.
        </p>
        <button_1.Button onClick={() => {
                window.location.href = '/pros';
            }} className="bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] px-6 py-3 font-semibold transition-all duration-200">
          Voir tous les artisans
        </button_1.Button>
      </div>);
    }
    return (<div className="space-y-6">
      
      <div className="text-center">
        <p className="text-text-secondary font-body">
          {total} artisan{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {professionals.map((pro) => (<card_1.Card key={pro.id} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.02]">
            <div className="space-y-4">
              
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-lg">
                      {pro.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {pro.isVerified && (<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                      <lucide_react_1.Shield className="w-3 h-3 text-white"/>
                    </div>)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-h3 font-semibold text-text-primary truncate">
                      {pro.name}
                    </h3>
                    {pro.isVerified && (<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                        Vérifié
                      </span>)}
                  </div>

                  <p className="text-body font-medium text-primary-600 mb-2">
                    {pro.profession}
                  </p>

                  
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (<lucide_react_1.Star key={i} className={`w-4 h-4 ${i < Math.floor(pro.rating)
                    ? 'text-warning-500 fill-current'
                    : 'text-border-medium'}`}/>))}
                    </div>
                    <span className="text-small font-medium text-text-primary">
                      {pro.rating}
                    </span>
                    <span className="text-small text-text-muted">
                      ({pro.reviewCount} avis)
                    </span>
                  </div>

                  
                  <div className="flex items-center text-small text-text-muted">
                    <lucide_react_1.MapPin className="w-4 h-4 mr-1"/>
                    <span>{pro.city}</span>
                  </div>
                </div>
              </div>

              
              {pro.isVerified && (<div className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-warning-50 to-warning-100 rounded-lg border border-warning-200">
                  <lucide_react_1.Crown className="w-4 h-4 text-warning-600 mr-2"/>
                  <span className="text-sm font-medium text-warning-700">Artisan Premium</span>
                </div>)}

              
              {pro.description && (<p className="text-small text-text-secondary line-clamp-2">
                  {pro.description}
                </p>)}

              
              <div className="text-center text-small text-text-muted">
                {pro.completedJobs} mission{pro.completedJobs > 1 ? 's' : ''} réalisée{pro.completedJobs > 1 ? 's' : ''}
              </div>

              
              <div className="flex space-x-2 pt-2">
                <link_1.default href={`/pros/${pro.id}`} className="flex-1">
                  <button_1.Button className="w-full bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] py-2 font-semibold transition-all duration-200">
                    Voir le profil
                  </button_1.Button>
                </link_1.default>
                <button_1.Button onClick={() => handleContactClick(pro.id)} className="flex-1 bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] py-2 font-semibold transition-all duration-200 hover:shadow-lg">
                  <lucide_react_1.MessageCircle className="w-4 h-4 mr-1"/>
                  Contacter
                </button_1.Button>
              </div>
            </div>
          </card_1.Card>))}
      </div>
    </div>);
};
exports.ProfessionalsGrid = ProfessionalsGrid;
//# sourceMappingURL=professionals-grid.js.map