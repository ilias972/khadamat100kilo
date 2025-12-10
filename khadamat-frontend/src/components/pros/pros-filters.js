'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProsFilters = void 0;
const react_1 = __importDefault(require("react"));
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const lucide_react_1 = require("lucide-react");
const ProsFilters = ({ filters, onFiltersChange, onClearFilters, cities, categories, }) => {
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
          Recherche
        </label>
        <div className="relative">
          <lucide_react_1.Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted"/>
          <input_1.Input type="text" placeholder="Nom, service..." value={filters.search || ''} onChange={(e) => onFiltersChange({ search: e.target.value || undefined })} className="pl-12 pr-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200"/>
        </div>
      </div>

      
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-3">
          Ville
        </label>
        <div className="relative">
          <lucide_react_1.MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted"/>
          <select value={filters.cityId || ''} onChange={(e) => onFiltersChange({ cityId: e.target.value || undefined })} className="w-full pl-12 pr-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200">
            <option value="">Toutes les villes</option>
            {cities.filter(city => city.isActive).map((city) => (<option key={city.id} value={city.id}>
                {city.name}
              </option>))}
          </select>
        </div>
      </div>

      
      <div className="mb-6">
        <label className="block text-sm font-medium text-text-primary mb-3">
          Type de service
        </label>
        <select value={filters.category || ''} onChange={(e) => onFiltersChange({ category: e.target.value || undefined })} className="w-full px-4 py-3 bg-[#EDEEEF] border-0 rounded-[24px] text-text-primary font-medium focus:outline-none focus:ring-2 focus:ring-primary-300 transition-all duration-200">
          <option value="">Tous les services</option>
          {categories.filter(cat => cat.isActive).map((category) => (<option key={category.id} value={category.id}>
              {category.name}
            </option>))}
        </select>
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
            { value: 3.5, label: '≥ 3.5★' },
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
          <input type="checkbox" checked={filters.onlyVerified || false} onChange={(e) => onFiltersChange({ onlyVerified: e.target.checked })} className="w-4 h-4 text-[#F97B22] border-[#EDEEEF] focus:ring-[#F97B22] focus:ring-2 rounded"/>
          <lucide_react_1.Shield className="w-4 h-4 text-success-500"/>
          <span className="text-sm font-medium text-text-primary">Artisans vérifiés uniquement</span>
        </label>
        <p className="text-xs text-text-muted mt-1 ml-6">
          Profils vérifiés et assurés
        </p>
      </div>

      
      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input type="checkbox" checked={filters.onlyPremium || false} onChange={(e) => onFiltersChange({ onlyPremium: e.target.checked })} className="w-4 h-4 text-[#F97B22] border-[#EDEEEF] focus:ring-[#F97B22] focus:ring-2 rounded"/>
          <lucide_react_1.Crown className="w-4 h-4 text-warning-500"/>
          <span className="text-sm font-medium text-text-primary">Artisans Premium uniquement</span>
        </label>
        <p className="text-xs text-text-muted mt-1 ml-6">
          Service haut de gamme
        </p>
      </div>
    </div>);
};
exports.ProsFilters = ProsFilters;
//# sourceMappingURL=pros-filters.js.map