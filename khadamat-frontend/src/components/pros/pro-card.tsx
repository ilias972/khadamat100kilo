'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Shield, Crown, MessageCircle } from 'lucide-react';
import { type Professional } from '@/lib/mocks/services-mocks';

interface ProCardProps {
  professional: Professional;
}

export const ProCard: React.FC<ProCardProps> = ({ professional }) => {
  const handleContactClick = () => {
    alert('La messagerie arrive bientôt ! Connectez-vous pour contacter cet artisan.');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-200 hover:scale-[1.02] border-0 flex flex-col h-full">
      <div className="flex flex-col h-full">
        {/* Content Area - Takes up available space */}
        <div className="flex-1 space-y-4">
          {/* Header with Avatar and Badges */}
          <div className="flex items-start space-x-3">
            <div className="relative">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-lg">
                  {getInitials(professional.fullName)}
                </span>
              </div>
              {professional.isVerified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-h3 font-semibold text-text-primary truncate">
                  {professional.fullName}
                </h3>
                {professional.isVerified && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-700">
                    Vérifié
                  </span>
                )}
              </div>

              <p className="text-body font-medium text-primary-600 mb-2">
                {professional.title}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(professional.rating)
                          ? 'text-warning-500 fill-current'
                          : 'text-border-medium'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-small font-medium text-text-primary">
                  {professional.rating}
                </span>
                <span className="text-small text-text-muted">
                  ({professional.reviewCount} avis)
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center text-small text-text-muted">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="truncate">{professional.cityName || professional.cityId}</span>
              </div>
            </div>
          </div>

          {/* Premium Badge */}
          {professional.isPremium && (
            <div className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-warning-50 to-warning-100 rounded-lg border border-warning-200">
              <Crown className="w-4 h-4 text-warning-600 mr-2" />
              <span className="text-sm font-medium text-warning-700">Artisan Premium</span>
            </div>
          )}

          {/* Description */}
          {professional.shortBio && (
            <p className="text-small text-text-secondary line-clamp-2">
              {professional.shortBio}
            </p>
          )}

          {/* Stats */}
          <div className="text-center text-small text-text-muted">
            À partir de {professional.startingPrice} MAD • {professional.experienceYears} ans d'expérience
          </div>

          {/* Response Time */}
          <div className="text-center text-small text-text-muted">
            {professional.responseTime}
          </div>

          {/* Badges */}
          {professional.badgeLabels && professional.badgeLabels.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center">
              {professional.badgeLabels.map((badge, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 truncate max-w-full">
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions - Always at bottom */}
        <div className="flex space-x-2 pt-4 mt-auto">
          <Link href={`/pro/${professional.id}`} className="flex-1">
            <Button className="w-full bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] py-2 font-semibold transition-all duration-200">
              Voir le profil
            </Button>
          </Link>
          <Button
            onClick={handleContactClick}
            className="flex-1 bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] py-2 font-semibold transition-all duration-200 hover:shadow-lg"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            Contacter
          </Button>
        </div>
      </div>
    </Card>
  );
};