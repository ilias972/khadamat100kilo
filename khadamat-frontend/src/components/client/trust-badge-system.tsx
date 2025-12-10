'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Star, 
  Award, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface TrustBadge {
  id: string;
  label: string;
  icon: React.ElementType;
  color: 'green' | 'yellow' | 'blue' | 'orange' | 'purple';
  description: string;
  earned?: boolean;
}

interface Professional {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  completedProjects: number;
  responseTime: number; // in hours
  verified: boolean;
  joinedDate: string;
}

interface TrustBadgeSystemProps {
  professional: Professional;
  showDescription?: boolean;
  variant?: 'default' | 'compact';
}

export const TrustBadgeSystem: React.FC<TrustBadgeSystemProps> = ({
  professional,
  showDescription = false,
  variant = 'default'
}) => {
  const badges: TrustBadge[] = [
    {
      id: 'verified',
      label: 'Vérifié',
      icon: ShieldCheck,
      color: 'green',
      description: 'Profil et documents vérifiés par Khadamat',
      earned: professional.verified
    },
    {
      id: 'top-rated',
      label: 'Top Rated',
      icon: Star,
      color: 'yellow',
      description: 'Note supérieure à 4.8/5',
      earned: professional.rating >= 4.8
    },
    {
      id: 'experienced',
      label: 'Expérimenté',
      icon: Award,
      color: 'blue',
      description: 'Plus de 100 projets réalisés',
      earned: professional.completedProjects >= 100
    },
    {
      id: 'responsive',
      label: 'Réactif',
      icon: Clock,
      color: 'orange',
      description: 'Répond en moins de 2h',
      earned: professional.responseTime <= 2
    },
    {
      id: 'rising-talent',
      label: 'Talent Émergent',
      icon: TrendingUp,
      color: 'purple',
      description: 'Nouveau professionnel prometteur',
      earned: professional.completedProjects >= 10 && professional.completedProjects < 50 && professional.rating >= 4.5
    }
  ];

  const earnedBadges = badges.filter(badge => badge.earned);

  if (earnedBadges.length === 0) {
    return null;
  }

  const colorClasses = {
    green: 'bg-green-100 text-green-700 border-green-200',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200'
  };

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap gap-2">
        {earnedBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={cn(
                'flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border',
                colorClasses[badge.color]
              )}
              title={badge.description}
            >
              <Icon className="w-3 h-3" />
              <span>{badge.label}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-[#3B3B3B]">
        Badges de confiance
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {earnedBadges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className={cn(
                'flex items-start space-x-3 p-3 rounded-xl border',
                colorClasses[badge.color]
              )}
            >
              <div className="flex-shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{badge.label}</p>
                {showDescription && (
                  <p className="text-xs opacity-80 mt-1">{badge.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Client Success Stories Component
interface SuccessStory {
  id: string;
  clientName: string;
  clientInitial?: string;
  service: string;
  rating: number;
  story: string;
  image?: string;
  verified: boolean;
  date: string;
  location?: string;
}

interface ClientSuccessStoriesProps {
  serviceCategory?: string;
  stories?: SuccessStory[];
  maxStories?: number;
}

export const ClientSuccessStories: React.FC<ClientSuccessStoriesProps> = ({
  serviceCategory,
  stories: providedStories,
  maxStories = 3
}) => {
  const mockStories: SuccessStory[] = [
    {
      id: '1',
      clientName: 'Sarah M.',
      clientInitial: 'S',
      service: 'Déménagement résidentiel',
      rating: 5,
      story: 'Excellent service ! L\'équipe était ponctuelle et très professionnelle. Tous mes meubles sont arrivés en parfait état.',
      verified: true,
      date: '2024-01-15',
      location: 'Casablanca'
    },
    {
      id: '2',
      clientName: 'Mohammed K.',
      clientInitial: 'M',
      service: 'Réparation plomberie',
      rating: 5,
      story: 'Intervention rapide et efficace. Le problème a été résolu en moins d\'une heure. Je recommande vivement !',
      verified: true,
      date: '2024-01-12',
      location: 'Rabat'
    },
    {
      id: '3',
      clientName: 'Amina B.',
      clientInitial: 'A',
      service: 'Nettoyage complet',
      rating: 4,
      story: 'Très bon travail, appartement impeccable. Seul petit bémol : arrivée avec 15 minutes de retard.',
      verified: true,
      date: '2024-01-10',
      location: 'Marrakech'
    }
  ];

  const stories = providedStories || mockStories;
  const displayStories = stories.slice(0, maxStories);

  return (
    <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] border border-[#EDEEEF] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#3B3B3B] font-heading">
          Témoignages clients
        </h3>
        <Badge variant="secondary" className="bg-[#F97B22]/10 text-[#F97B22]">
          {stories.length} avis
        </Badge>
      </div>

      <div className="space-y-4">
        {displayStories.map((story) => (
          <div
            key={story.id}
            className="bg-white/50 border border-[#EDEEEF] rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.clientName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F97B22] to-[#e66a1f] rounded-full flex items-center justify-center text-white font-semibold">
                    {story.clientInitial || story.clientName.charAt(0)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-[#3B3B3B]">
                      {story.clientName}
                    </span>
                    {story.verified && (
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-3 h-3',
                          i < story.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Service & Location */}
                <div className="flex items-center space-x-2 mb-2">
                  <p className="text-sm text-[#6B7280]">{story.service}</p>
                  {story.location && (
                    <>
                      <span className="text-[#EDEEEF]">•</span>
                      <p className="text-sm text-[#6B7280]">{story.location}</p>
                    </>
                  )}
                </div>

                {/* Story */}
                <p className="text-sm text-[#3B3B3B] leading-relaxed mb-2">
                  {story.story}
                </p>

                {/* Date */}
                <p className="text-xs text-[#6B7280]">
                  {new Date(story.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      {stories.length > maxStories && (
        <button className="w-full mt-4 py-2 text-sm text-[#F97B22] hover:text-[#e66a1f] font-medium transition-colors">
          Voir tous les témoignages ({stories.length})
        </button>
      )}
    </div>
  );
};

// Trust Indicators Component
interface TrustIndicatorsProps {
  professional: Professional;
}

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ professional }) => {
  const indicators = [
    {
      icon: CheckCircle,
      label: 'Taux de réussite',
      value: '98%',
      color: 'text-green-500'
    },
    {
      icon: Users,
      label: 'Clients satisfaits',
      value: professional.reviewCount.toString(),
      color: 'text-blue-500'
    },
    {
      icon: Zap,
      label: 'Temps de réponse',
      value: `${professional.responseTime}h`,
      color: 'text-orange-500'
    },
    {
      icon: Award,
      label: 'Projets terminés',
      value: professional.completedProjects.toString(),
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {indicators.map((indicator, index) => {
        const Icon = indicator.icon;
        return (
          <div
            key={index}
            className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm border border-[#EDEEEF] rounded-xl p-4 text-center"
          >
            <Icon className={cn('w-6 h-6 mx-auto mb-2', indicator.color)} />
            <p className="text-2xl font-bold text-[#3B3B3B] mb-1">
              {indicator.value}
            </p>
            <p className="text-xs text-[#6B7280]">{indicator.label}</p>
          </div>
        );
      })}
    </div>
  );
};
