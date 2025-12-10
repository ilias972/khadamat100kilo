'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Users } from 'lucide-react';

export const ProsEmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 bg-[#EDEEEF] rounded-[24px] flex items-center justify-center">
        <Users className="w-12 h-12 text-text-muted" />
      </div>
      <h3 className="text-h3 font-semibold text-text-primary mb-2 font-heading">
        Aucun artisan trouvé
      </h3>
      <p className="text-text-secondary mb-6 font-body">
        Essayez de modifier vos critères de recherche ou d'élargir votre zone géographique.
      </p>
      <Button
        onClick={() => {
          // Reset filters to show all professionals
          window.location.href = '/pros';
        }}
        className="bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] px-6 py-3 font-semibold transition-all duration-200"
      >
        Voir tous les artisans
      </Button>
    </div>
  );
};