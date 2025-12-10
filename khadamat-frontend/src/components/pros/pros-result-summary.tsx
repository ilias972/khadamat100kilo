'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProsResultSummaryProps {
  totalResults: number;
  activeFilters: string[];
  onClearFilters: () => void;
}

export const ProsResultSummary: React.FC<ProsResultSummaryProps> = ({
  totalResults,
  activeFilters,
  onClearFilters,
}) => {
  if (totalResults === 0) return null;

  return (
    <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[16px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[rgba(249,123,34,0.1)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-text-primary">
          <span className="text-[#F97B22]">🟠</span>
          <span className="font-medium">
            {totalResults} professionnel{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
          </span>
          {activeFilters.length > 0 && (
            <>
              <span>•</span>
              <span>Filtré par :</span>
              {activeFilters.map((filter, index) => (
                <span key={index} className="font-medium text-[#F97B22]">
                  {filter}
                  {index < activeFilters.length - 1 && ','}
                </span>
              ))}
            </>
          )}
        </div>
        {activeFilters.length > 0 && (
          <Button
            onClick={onClearFilters}
            className="text-text-muted hover:text-[#F97B22] bg-transparent hover:bg-[#F97B22]/10 rounded-[12px] px-3 py-1 font-medium transition-all duration-200 text-sm"
          >
            <X className="w-4 h-4 mr-1" />
            Effacer les filtres
          </Button>
        )}
      </div>
    </div>
  );
};