'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProfessionalsPaginationProps {
  filters: {
    page?: number;
    limit?: number;
  };
  onPageChange: (page: number) => void;
  total?: number;
  totalPages?: number;
}

export const ProfessionalsPagination: React.FC<ProfessionalsPaginationProps> = ({
  filters,
  onPageChange,
  total = 0,
  totalPages = 1
}) => {
  const currentPage = filters.page || 1;
  const limit = filters.limit || 12;

  // Calculate total pages if not provided
  const calculatedTotalPages = totalPages > 1 ? totalPages : Math.ceil(total / limit);

  if (calculatedTotalPages <= 1) {
    return null; // Don't show pagination if only one page
  }

  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(calculatedTotalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < calculatedTotalPages - 1) {
      rangeWithDots.push('...', calculatedTotalPages);
    } else if (calculatedTotalPages > 1) {
      rangeWithDots.push(calculatedTotalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-2 bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Page précédente"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-text-muted">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-4 py-2 rounded-[24px] font-medium transition-all duration-200 ${
                  page === currentPage
                    ? 'bg-[#F97B22] text-white shadow-lg'
                    : 'bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary'
                }`}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= calculatedTotalPages}
        className="px-3 py-2 bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        aria-label="Page suivante"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Page Info */}
      <div className="ml-6 text-small text-text-muted font-body">
        Page {currentPage} sur {calculatedTotalPages}
      </div>
    </div>
  );
};