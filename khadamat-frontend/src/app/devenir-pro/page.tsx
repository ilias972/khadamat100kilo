'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Check, Star, Crown, Zap } from 'lucide-react';

export default function DevenirProPage() {
  const freeFeatures = [
    'Création de profil',
    'Visibilité dans les recherches',
    'Gestion des réservations',
    'Support client basique',
  ];

  const premiumFeatures = [
    'Badge Premium visible',
    'Priorité dans les résultats',
    'Statistiques détaillées',
    'Support prioritaire 24/7',
    'Référencement optimisé',
    'Outils de marketing',
    'Formation continue',
    'Assurance responsabilité civile incluse',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-[640px] mx-auto lg:mx-0 bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 md:p-8 lg:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <h1 className="text-h1 font-bold text-text-primary leading-tight tracking-tight font-heading text-left mb-4">
                Devenez professionnel sur Khadamat
              </h1>
              <p className="text-body text-text-secondary leading-relaxed font-body text-left mb-6">
                Rejoignez notre communauté d'artisans vérifiés et développez votre activité.
                Des milliers de clients vous attendent.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-8 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
                  <Star className="w-5 h-5 mr-2" />
                  Commencer gratuitement
                </Button>
                <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 rounded-[24px] px-8 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
                  <Crown className="w-5 h-5 mr-2" />
                  Passer Premium
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-text-primary mb-4">Choisissez votre formule</h2>
              <p className="text-body text-text-secondary max-w-2xl mx-auto">
                Deux options adaptées à vos besoins : gratuit pour commencer, premium pour vous démarquer.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <div className="text-center mb-8">
                  <h3 className="text-h3 font-bold text-text-primary mb-2">Gratuit</h3>
                  <div className="text-3xl font-bold text-text-primary mb-4">0 MAD<span className="text-lg font-normal">/mois</span></div>
                  <Button className="w-full bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] py-3 font-semibold">
                    Commencer
                  </Button>
                </div>
                <ul className="space-y-3">
                  {freeFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-text-secondary">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium Plan */}
              <div className="bg-gradient-to-br from-yellow-50/80 to-orange-50/50 backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border-2 border-yellow-200 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold flex items-center">
                    <Crown className="w-4 h-4 mr-2" />
                    POPULAIRE
                  </div>
                </div>
                <div className="text-center mb-8">
                  <h3 className="text-h3 font-bold text-text-primary mb-2">Premium</h3>
                  <div className="text-3xl font-bold text-text-primary mb-4">199 MAD<span className="text-lg font-normal">/mois</span></div>
                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 rounded-[24px] py-3 font-semibold transition-all duration-200 hover:shadow-lg">
                    <Zap className="w-4 h-4 mr-2" />
                    S'abonner
                  </Button>
                </div>
                <ul className="space-y-3">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-text-secondary">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}