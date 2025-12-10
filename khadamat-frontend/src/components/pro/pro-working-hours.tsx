'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { type ProfessionalDetail } from '@/lib/mocks/services-mocks';

interface ProWorkingHoursProps {
  professional: ProfessionalDetail;
}

export const ProWorkingHours: React.FC<ProWorkingHoursProps> = ({ professional }) => {
  const days = [
    { key: 'monday', label: 'Lundi' },
    { key: 'tuesday', label: 'Mardi' },
    { key: 'wednesday', label: 'Mercredi' },
    { key: 'thursday', label: 'Jeudi' },
    { key: 'friday', label: 'Vendredi' },
    { key: 'saturday', label: 'Samedi' },
    { key: 'sunday', label: 'Dimanche' },
  ];

  return (
    <Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <h3 className="text-h3 font-semibold text-text-primary mb-4 font-heading flex items-center">
        <Clock className="w-5 h-5 mr-2" />
        Horaires de travail
      </h3>
      <div className="space-y-2">
        {days.map((day) => (
          <div key={day.key} className="flex justify-between items-center">
            <span className="text-sm text-text-primary">{day.label}</span>
            <span className="text-sm text-text-muted">
              {professional.workingHours[day.key as keyof typeof professional.workingHours]}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};