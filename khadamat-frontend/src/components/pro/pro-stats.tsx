'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { type ProfessionalDetail } from '@/lib/mocks/services-mocks';

interface ProStatsProps {
  professional: ProfessionalDetail;
}

export const ProStats: React.FC<ProStatsProps> = ({ professional }) => {
  return (
    <Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <h3 className="text-h3 font-semibold text-text-primary mb-4 font-heading">Statistiques</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-muted">Missions réalisées</span>
          <span className="font-semibold text-text-primary">{professional.completedJobs}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-muted">Taux de réponse</span>
          <span className="font-semibold text-text-primary">{professional.responseRate}%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-muted">Expérience</span>
          <span className="font-semibold text-text-primary">{professional.experienceYears} ans</span>
        </div>
      </div>
    </Card>
  );
};