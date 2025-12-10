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
exports.ServiceFilters = void 0;
const react_1 = __importStar(require("react"));
const navigation_1 = require("next/navigation");
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const api_1 = require("@/lib/api");
const services_mocks_1 = require("@/lib/mocks/services-mocks");
const ServiceFilters = ({ filters, onFiltersChange, onClearFilters, }) => {
    const router = (0, navigation_1.useRouter)();
    const [cities, setCities] = (0, react_1.useState)([]);
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(false);
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
                setCities(services_mocks_1.mockCities);
                setCategories(services_mocks_1.mockCategories);
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
          Type de service
        </label>
        {loading ? (<div className="w-full h-12 bg-[#EDEEEF] rounded-[24px] animate-pulse"></div>) : error ? (<div className="w-full px-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-muted flex items-center">
            <lucide_react_1.AlertCircle className="w-4 h-4 mr-2"/>
            Impossible de charger les services
          </div>) : (<select value={filters.serviceId || ''} onChange={(e) => onFiltersChange({ serviceId: e.target.value || undefined })} className="w-full px-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200">
            <option value="">Tous les services</option>
            {categories.map((category) => (<option key={category.id} value={category.id}>
                {category.name}
              </option>))}
          </select>)}
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

      
      <button_1.Button onClick={() => {
            const params = new URLSearchParams();
            if (filters.cityId)
                params.set('cityId', filters.cityId);
            if (filters.serviceId)
                params.set('category', filters.serviceId);
            router.push(`/pros${params.toString() ? '?' + params.toString() : ''}`);
        }} disabled={!filters.cityId && !filters.serviceId} className="w-full bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] py-3 font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
        Trouver des artisans
      </button_1.Button>
    </div>);
};
exports.ServiceFilters = ServiceFilters;
//# sourceMappingURL=service-filters.js.map