'use client';

import React from 'react';

interface ProsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const ProsPagination: React.FC<ProsPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Précédent
      </button>

      <div className="flex items-center space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-[12px] font-medium transition-all duration-200 ${
              page === currentPage
                ? 'bg-[#F97B22] text-white'
                : 'bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Suivant
      </button>
    </div>
  );
};