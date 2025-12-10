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
exports.ServiceGrid = void 0;
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const api_1 = require("@/lib/api");
const services_mocks_1 = require("@/lib/mocks/services-mocks");
const service_card_1 = require("@/components/ui/service-card");
const iconMap = {
    'plomberie': '/plomberieICONE.png',
    'électricité': '/electricitéICONE.png',
    'ménage': '/menageICONE.png',
    'peinture': '/peintureICONE.png',
    'jardinage': '/jardinageICONE.png',
    'déménagement': '/demenagementICONE.png',
    'maçonnerie': '/maconnerieICONE.png',
    'photographie': '/photographieICONE.png',
    'default': '/plomberieICONE.png',
};
const colorMap = {
    'plomberie': 'text-primary-500',
    'électricité': 'text-secondary-500',
    'ménage': 'text-success-500',
    'peinture': 'text-warning-500',
    'jardinage': 'text-emerald-500',
    'maçonnerie': 'text-gray-600',
    'déménagement': 'text-blue-500',
    'photographie': 'text-purple-500',
    'default': 'text-primary-500',
};
const ServiceGrid = ({ filters, categories: allCategories }) => {
    const router = (0, navigation_1.useRouter)();
    const [fetchedCategories, setFetchedCategories] = (0, react_1.useState)([]);
    const [filteredCategories, setFilteredCategories] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
    const [usingMockData, setUsingMockData] = (0, react_1.useState)(false);
    const [dismissedAlert, setDismissedAlert] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const data = await api_1.api.getCategories();
                const activeCategories = data.filter(cat => cat.isActive);
                setFetchedCategories(activeCategories);
                setUsingMockData(false);
                setError(false);
            }
            catch (err) {
                setFetchedCategories(services_mocks_1.mockCategories);
                setUsingMockData(true);
                setError(false);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);
    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    };
    (0, react_1.useEffect)(() => {
        let filtered = fetchedCategories;
        if (filters.serviceId) {
            filtered = fetchedCategories.filter(cat => cat.id === filters.serviceId);
        }
        if (filters.searchTerm && filters.searchTerm.trim()) {
            const normalizedQuery = normalizeText(filters.searchTerm);
            filtered = filtered.filter(cat => normalizeText(cat.name).includes(normalizedQuery) ||
                (cat.description && normalizeText(cat.description).includes(normalizedQuery)));
        }
        setFilteredCategories(filtered);
    }, [fetchedCategories, filters.serviceId, filters.searchTerm]);
    if (loading) {
        return (<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {[...Array(12)].map((_, i) => (<div key={i} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] animate-pulse">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-[#EDEEEF] rounded-[24px] mx-auto"></div>
              <div className="h-6 bg-[#EDEEEF] rounded w-24 mx-auto"></div>
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
          Les services n'ont pas pu être chargés
        </h3>
        <p className="text-text-secondary mb-6 font-body">
          Veuillez réessayer dans quelques instants.
        </p>
        <button_1.Button onClick={() => window.location.reload()} className="bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] px-6 py-3 font-semibold transition-all duration-200">
          Réessayer
        </button_1.Button>
      </div>);
    }
    if (fetchedCategories.length === 0) {
        return (<div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-[#EDEEEF] rounded-[24px] flex items-center justify-center">
          <lucide_react_1.Users className="w-12 h-12 text-text-muted"/>
        </div>
        <h3 className="text-h3 font-semibold text-text-primary mb-2 font-heading">
          Les services arrivent bientôt sur Khadamat
        </h3>
        <p className="text-text-secondary mb-6 font-body">
          Nous préparons une sélection de services pour votre région.
        </p>
        <link_1.default href="/">
          <button_1.Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
            Retour à l'accueil
          </button_1.Button>
        </link_1.default>
      </div>);
    }
    return (<div className="space-y-6">
      
      {!loading && (<div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F97B22]/10 border border-[#F97B22]/20 rounded-[16px] text-sm text-[#F97B22] font-medium">
            <span>🟠</span>
            <span>{filteredCategories.length} service{filteredCategories.length !== 1 ? 's' : ''} trouvé{filteredCategories.length !== 1 ? 's' : ''}</span>
          </div>
        </div>)}

      
      {usingMockData && !dismissedAlert && (<div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50 rounded-[16px] text-sm text-blue-700 backdrop-blur-sm">
            <lucide_react_1.Info className="w-4 h-4"/>
            <span>Mode Démonstration : Données temporaires</span>
            <button onClick={() => setDismissedAlert(true)} className="ml-2 hover:bg-blue-200/50 rounded-full p-1 transition-colors" aria-label="Fermer l'alerte">
              <lucide_react_1.X className="w-3 h-3"/>
            </button>
          </div>
        </div>)}

      
      {filteredCategories.length === 0 ? (<div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#EDEEEF] to-[#F5F5F5] rounded-[32px] flex items-center justify-center shadow-lg">
            <lucide_react_1.Search className="w-16 h-16 text-text-muted"/>
          </div>
          <h3 className="text-h3 font-semibold text-text-primary mb-3 font-heading">
            Aucun service trouvé
          </h3>
          <p className="text-body text-text-secondary mb-8 font-body max-w-md mx-auto">
            {filters.serviceId
                ? "Le service sélectionné n'est pas disponible pour le moment."
                : `Aucun service ne correspond à votre recherche "${filters.searchTerm}".`}
          </p>
          <button_1.Button onClick={() => {
                router.push('/services');
            }} className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-8 py-4 font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            Voir tous les services
          </button_1.Button>
        </div>) : (<service_card_1.ServiceCardGrid categories={filteredCategories} selectedCategoryId={filters.serviceId} cityId={filters.cityId}/>)}
    </div>);
};
exports.ServiceGrid = ServiceGrid;
//# sourceMappingURL=service-grid.js.map