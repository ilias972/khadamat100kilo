'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProsEmptyState = void 0;
const react_1 = __importDefault(require("react"));
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const ProsEmptyState = () => {
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
};
exports.ProsEmptyState = ProsEmptyState;
//# sourceMappingURL=pros-empty-state.js.map