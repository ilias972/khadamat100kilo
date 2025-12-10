'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalsPagination = void 0;
const react_1 = __importDefault(require("react"));
const button_1 = require("@/components/ui/button");
const lucide_react_1 = require("lucide-react");
const ProfessionalsPagination = ({ filters, onPageChange, total = 0, totalPages = 1 }) => {
    const currentPage = filters.page || 1;
    const limit = filters.limit || 12;
    const calculatedTotalPages = totalPages > 1 ? totalPages : Math.ceil(total / limit);
    if (calculatedTotalPages <= 1) {
        return null;
    }
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(calculatedTotalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }
        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        }
        else {
            rangeWithDots.push(1);
        }
        rangeWithDots.push(...range);
        if (currentPage + delta < calculatedTotalPages - 1) {
            rangeWithDots.push('...', calculatedTotalPages);
        }
        else if (calculatedTotalPages > 1) {
            rangeWithDots.push(calculatedTotalPages);
        }
        return rangeWithDots;
    };
    const visiblePages = getVisiblePages();
    return (<div className="flex items-center justify-center space-x-2 mt-12">
      
      <button_1.Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} className="px-3 py-2 bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" aria-label="Page précédente">
        <lucide_react_1.ChevronLeft className="w-4 h-4"/>
      </button_1.Button>

      
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (<react_1.default.Fragment key={index}>
            {page === '...' ? (<span className="px-3 py-2 text-text-muted">...</span>) : (<button onClick={() => onPageChange(page)} className={`px-4 py-2 rounded-[24px] font-medium transition-all duration-200 ${page === currentPage
                    ? 'bg-[#F97B22] text-white shadow-lg'
                    : 'bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary'}`} aria-label={`Page ${page}`} aria-current={page === currentPage ? 'page' : undefined}>
                {page}
              </button>)}
          </react_1.default.Fragment>))}
      </div>

      
      <button_1.Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= calculatedTotalPages} className="px-3 py-2 bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" aria-label="Page suivante">
        <lucide_react_1.ChevronRight className="w-4 h-4"/>
      </button_1.Button>

      
      <div className="ml-6 text-small text-text-muted font-body">
        Page {currentPage} sur {calculatedTotalPages}
      </div>
    </div>);
};
exports.ProfessionalsPagination = ProfessionalsPagination;
//# sourceMappingURL=professionals-pagination.js.map