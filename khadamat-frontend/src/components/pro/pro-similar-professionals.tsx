'use client';

import React from 'react';
import Link from 'next/link';
import { ProfessionalCard } from '@/components/ui/professional-card';
import { mockProfessionalDetails, type ProfessionalDetail } from '@/lib/mocks/services-mocks';

interface ProSimilarProfessionalsProps {
  currentProfessional: ProfessionalDetail;
}

export const ProSimilarProfessionals: React.FC<ProSimilarProfessionalsProps> = ({
  currentProfessional,
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const similarProfessionals = Object.values(mockProfessionalDetails)
    .filter(p => p.id !== currentProfessional.id && p.serviceCategoryId === currentProfessional.serviceCategoryId)
    .slice(0, 3);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-h2 font-semibold text-text-primary mb-4 font-heading">
            Autres professionnels similaires
          </h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Découvrez d'autres professionnels dans le même domaine près de chez vous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProfessionals.map((similarPro, index) => (
            <Link key={similarPro.id} href={`/pro/${similarPro.id}`}>
              <ProfessionalCard
                professional={{
                  id: similarPro.id,
                  fullName: similarPro.fullName,
                  title: similarPro.title,
                  rating: similarPro.rating,
                  reviewCount: similarPro.reviewCount || 0,
                  location: 'Casablanca',
                  verified: similarPro.isVerified || false,
                  completedJobs: 0,
                  responseTime: '< 1h',
                  startingPrice: 150,
                  isFavorite: false
                }}
                index={index}
                variant="compact"
                showActions={false}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};