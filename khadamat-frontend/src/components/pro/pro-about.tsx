'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { type ProfessionalDetail } from '@/lib/mocks/services-mocks';

interface ProAboutProps {
  professional: ProfessionalDetail;
}

export const ProAbout: React.FC<ProAboutProps> = ({ professional }) => {
  return (
    <Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <h3 className="text-h3 font-semibold text-text-primary mb-4 font-heading">À propos</h3>
      <p className="text-body text-text-secondary leading-relaxed mb-4">
        {professional.detailedBio}
      </p>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-success-500" />
          <span className="text-sm text-text-primary">{professional.availability}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-success-500" />
          <span className="text-sm text-text-primary">Langues: {professional.languages.join(', ')}</span>
        </div>
      </div>
    </Card>
  );
};