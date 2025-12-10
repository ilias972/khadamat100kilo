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
exports.ProfessionalsFilters = void 0;
const react_1 = __importStar(require("react"));
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const api_1 = require("@/lib/api");
const ProfessionalsFilters = ({ filters, onFiltersChange, onClearFilters, }) => {
    const [cities, setCities] = (0, react_1.useState)([]);
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
    const mockCities = [
        { id: '1', name: 'Casablanca', region: 'Grand Casablanca', isActive: true },
        { id: '2', name: 'Rabat', region: 'Rabat-Salé-Zemmour-Zaër', isActive: true },
        { id: '3', name: 'Marrakech', region: 'Marrakech-Tensift-Al Haouz', isActive: true },
        { id: '4', name: 'Fès', region: 'Fès-Boulemane', isActive: true },
        { id: '5', name: 'Tanger', region: 'Tanger-Tétouan', isActive: true },
    ];
    const mockCategories = [
        { id: '1', name: 'Plomberie', description: 'Réparations et installations de plomberie', icon: 'Wrench', isActive: true },
        { id: '2', name: 'Électricité', description: 'Travaux électriques et installations', icon: 'Zap', isActive: true },
        { id: '3', name: 'Ménage', description: 'Services de nettoyage et entretien', icon: 'Home', isActive: true },
        { id: '4', name: 'Peinture', description: 'Peinture intérieure et extérieure', icon: 'Palette', isActive: true },
        { id: '5', name: 'Jardinage', description: 'Entretien d\'espaces verts', icon: 'Scissors', isActive: true },
        { id: '6', name: 'Maçonnerie', description: 'Travaux de maçonnerie et construction', icon: 'Hammer', isActive: true },
    ];
    (0, react_1.useEffect)(() => {
        const loadFiltersData = async () => {
            try {
                setLoading(true);
                const [citiesData, categoriesData] = await Promise.all([
                    api_1.api.getCities(),
                    api_1.api.getCategories()
                ]);
                setCities(citiesData.filter(city => city.isActive));
                setCategories(categoriesData.filter(cat => cat.isActive));
                setError(false);
            }
            catch (err) {
                console.error('Error loading filters data:', err);
                setCities(mockCities);
                setCategories(mockCategories);
                setError(false);
            }
            finally {
                setLoading(false);
            }
        };
        loadFiltersData();
    }, []);
    return (<div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-h3 font-semibold text-text-primary font-heading">Filtres</h3>
        <button_1.Button onClick={onClearFilters} className="text-text-muted hover:text-[#F97B22] bg-transparent hover:bg-[#F97B22]/10 rounded-[24px] px-4 py-2 font-medium transition-all duration-200">
          <lucide_react_1.RotateCcw className="w-4 h-4 mr-1"/>
          Réinitialiser
        </button_1.Button>
      </div>

      
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-3">
          Ville
        </label>
        <div className="relative">
          <lucide_react_1.MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted"/>
          {loading ? (<div className="w-full pl-12 pr-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] animate-pulse"></div>) : error ? (<div className="w-full pl-12 pr-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-muted flex items-center">
              <lucide_react_1.AlertCircle className="w-4 h-4 mr-2"/>
              Impossible de charger les villes
            </div>) : (<select value={filters.cityId || ''} onChange={(e) => onFiltersChange({ cityId: e.target.value || undefined })} className="w-full pl-12 pr-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200">
              <option value="">Toutes les villes</option>
              {cities.map((city) => (<option key={city.id} value={city.id}>
                  {city.name}
                </option>))}
            </select>)}
        </div>
      </div>

      
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-3">
          Type de service
        </label>
        {loading ? (<div className="w-full h-12 bg-[#EDEEEF] rounded-[24px] animate-pulse"></div>) : error ? (<div className="w-full px-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-muted flex items-center">
            <lucide_react_1.AlertCircle className="w-4 h-4 mr-2"/>
            Impossible de charger les services
          </div>) : (<select value={filters.category || ''} onChange={(e) => onFiltersChange({ category: e.target.value || undefined })} className="w-full px-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200">
            <option value="">Tous les services</option>
            {categories.map((category) => (<option key={category.id} value={category.id}>
                {category.name}
              </option>))}
          </select>)}
      </div>

      
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-3">
          Note minimale
        </label>
        <div className="space-y-2">
          {[
            { value: undefined, label: 'Toutes les notes' },
            { value: 4.5, label: '≥ 4.5★' },
            { value: 4, label: '≥ 4★' },
            { value: 3, label: '≥ 3★' },
        ].map((option) => (<label key={option.value || 'all'} className="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="minRating" value={option.value || ''} checked={filters.minRating === option.value} onChange={(e) => onFiltersChange({
                minRating: e.target.value ? parseFloat(e.target.value) : undefined
            })} className="w-4 h-4 text-[#F97B22] border-[#EDEEEF] focus:ring-[#F97B22] focus:ring-2"/>
              <span className="text-sm text-text-primary">{option.label}</span>
            </label>))}
        </div>
      </div>

      
      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" checked={filters.isVerified || false} onChange={(e) => onFiltersChange({ isVerified: e.target.checked })} className="w-4 h-4 text-[#F97B22] border-[#EDEEEF] focus:ring-[#F97B22] focus:ring-2 rounded"/>
          <lucide_react_1.Shield className="w-4 h-4 text-success-500"/>
          <span className="text-sm font-medium text-text-primary">Artisans vérifiés uniquement</span>
        </label>
        <p className="text-xs text-text-muted mt-1 ml-6">
          Profils vérifiés et assurés
        </p>
      </div>

      
      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" checked={filters.isPremium || false} onChange={(e) => onFiltersChange({ isPremium: e.target.checked })} className="w-4 h-4 text-[#F97B22] border-[#EDEEEF] focus:ring-[#F97B22] focus:ring-2 rounded"/>
          <lucide_react_1.Crown className="w-4 h-4 text-warning-500"/>
          <span className="text-sm font-medium text-text-primary">Artisans Premium uniquement</span>
        </label>
        <p className="text-xs text-text-muted mt-1 ml-6">
          Service haut de gamme
        </p>
      </div>
    </div>);
};
exports.ProfessionalsFilters = ProfessionalsFilters;
//# sourceMappingURL=professionals-filters.js.map