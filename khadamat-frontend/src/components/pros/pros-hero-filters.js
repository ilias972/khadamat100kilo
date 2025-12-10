'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProsHeroFilters = void 0;
const react_1 = __importDefault(require("react"));
const button_1 = require("@/components/ui/button");
const navigation_1 = require("next/navigation");
const ProsHeroFilters = ({ filters, onFiltersChange, cities, categories, }) => {
    const router = (0, navigation_1.useRouter)();
    const handleFindPros = () => {
        const params = new URLSearchParams();
        if (filters.cityId)
            params.set('cityId', filters.cityId);
        if (filters.category)
            params.set('category', filters.category);
        router.push(`/pros${params.toString() ? '?' + params.toString() : ''}`);
    };
    return (<section className="relative py-12 md:py-16">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-primary-300/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-br from-secondary-300/20 to-primary-500/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.02)_1px,transparent_0)] bg-[length:24px_24px] opacity-20"></div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-h1 font-bold text-text-primary leading-tight tracking-tight font-heading mb-4">
            Artisans vérifiés près de chez vous
          </h1>
          <p className="text-body text-text-secondary leading-relaxed font-body mb-8 max-w-2xl mx-auto">
            Trouvez rapidement des professionnels qualifiés partout au Maroc.
          </p>

          
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] md:static sticky top-20 z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              
              <div className="text-left">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Ville
                </label>
                <select value={filters.cityId || ''} onChange={(e) => onFiltersChange({ cityId: e.target.value || undefined })} className="w-full px-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200">
                  <option value="">Toutes les villes</option>
                  {cities.filter(city => city.isActive).map((city) => (<option key={city.id} value={city.id}>
                      {city.name}
                    </option>))}
                </select>
              </div>

              
              <div className="text-left">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Type de service
                </label>
                <select value={filters.category || ''} onChange={(e) => onFiltersChange({ category: e.target.value || undefined })} className="w-full px-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200">
                  <option value="">Tous les services</option>
                  {categories.filter(cat => cat.isActive).map((category) => (<option key={category.id} value={category.id}>
                      {category.name}
                    </option>))}
                </select>
              </div>

              
              <div className="text-left">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Note minimale
                </label>
                <select value={filters.minRating || ''} onChange={(e) => onFiltersChange({ minRating: e.target.value ? parseFloat(e.target.value) : undefined })} className="w-full px-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200">
                  <option value="">Toutes les notes</option>
                  <option value="4.5">4.5★ et plus</option>
                  <option value="4">4★ et plus</option>
                  <option value="3.5">3.5★ et plus</option>
                </select>
              </div>
            </div>

            
            <button_1.Button onClick={handleFindPros} disabled={!filters.cityId && !filters.category && !filters.minRating} className="w-full bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] py-4 px-6 font-semibold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
              Voir les professionnels
            </button_1.Button>
          </div>
        </div>
      </div>
    </section>);
};
exports.ProsHeroFilters = ProsHeroFilters;
//# sourceMappingURL=pros-hero-filters.js.map