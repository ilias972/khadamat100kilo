'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { type ProfessionalDetail } from '@/lib/mocks/services-mocks';

interface ProCertificationsProps {
  professional: ProfessionalDetail;
}

export const ProCertifications: React.FC<ProCertificationsProps> = ({ professional }) => {
  return (
    <Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <h3 className="text-h3 font-semibold text-text-primary mb-4 font-heading flex items-center">
        <Award className="w-5 h-5 mr-2" />
        Certifications
      </h3>
      <div className="space-y-3">
        {professional.certifications.map((cert) => (
          <div key={cert.id} className="border-l-2 border-primary-300 pl-4">
            <h4 className="font-medium text-text-primary">{cert.title}</h4>
            <p className="text-sm text-text-muted">{cert.issuer} • {cert.year}</p>
            {cert.description && (
              <p className="text-sm text-text-secondary mt-1">{cert.description}</p>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};