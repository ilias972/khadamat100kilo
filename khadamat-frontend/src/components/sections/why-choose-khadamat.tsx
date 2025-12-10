'use client';

import React from 'react';
import { Shield, Star, MessageSquare, Truck } from 'lucide-react';

export const WhyChooseKhadamat: React.FC = () => {
  const features = [
    {
      id: 'verified',
      title: 'Artisans vérifiés',
      description: 'Tous nos professionnels sont contrôlés et certifiés pour votre sécurité.',
      icon: Shield,
      gradient: 'bg-gradient-to-br from-green-50 to-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 'authentic-reviews',
      title: 'Avis 100% authentiques',
      description: 'Chaque avis est vérifié et provient de vrais clients satisfaits.',
      icon: Star,
      gradient: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      iconColor: 'text-yellow-500',
    },
    {
      id: 'secure-messaging',
      title: 'Messagerie sécurisée',
      description: 'Échangez en toute confidentialité avec vos artisans via notre plateforme.',
      icon: MessageSquare,
      gradient: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconColor: 'text-orange-500',
    },
    {
      id: 'fast-intervention',
      title: 'Intervention rapide partout au Maroc',
      description: 'Des artisans disponibles dans toutes les villes du royaume.',
      icon: Truck,
      gradient: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-semibold text-text-primary mb-4">
            Pourquoi choisir Khadamat ?
          </h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Découvrez ce qui fait de Khadamat la plateforme de confiance pour trouver votre artisan au Maroc.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110`}>
                <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};