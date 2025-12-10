'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { type ProfessionalDetail } from '@/lib/mocks/services-mocks';

interface ProReviewsProps {
  professional: ProfessionalDetail;
}

export const ProReviews: React.FC<ProReviewsProps> = ({ professional }) => {
  return (
    <Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <h2 className="text-h2 font-semibold text-text-primary mb-6 font-heading">Avis clients</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {professional.reviews.map((review) => (
          <div key={review.id} className="bg-surface rounded-lg p-6 border border-border-light">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-semibold text-sm">
                  {review.clientName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-text-primary">{review.clientName}</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-warning-500 fill-current'
                            : 'text-border-medium'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-text-muted mb-2">
                  {new Date(review.date).toLocaleDateString('fr-FR')}
                </p>
                <Badge variant="default" className="text-xs">{review.serviceName}</Badge>
              </div>
            </div>
            <p className="text-body text-text-secondary leading-relaxed">{review.comment}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};