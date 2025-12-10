'use client';

import React from 'react';
import { Star, Shield, Users, Award } from 'lucide-react';

export const SocialProof: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[rgba(250,247,242,0.8)] backdrop-blur-sm rounded-3xl p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
          {/* Global Rating */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-warning-500 fill-current" />
                ))}
              </div>
              <span className="text-2xl font-bold text-text-primary ml-2">4.9/5</span>
            </div>
            <p className="text-body text-text-secondary">
              Basé sur 1200 avis vérifiés de clients satisfaits
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-success-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-h3 font-semibold text-text-primary mb-2">
                100% Sécurisé
              </h3>
              <p className="text-text-secondary text-sm">
                Paiement protégé et données chiffrées
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-h3 font-semibold text-text-primary mb-2">
                15,000+ Artisans
              </h3>
              <p className="text-text-secondary text-sm">
                Vérifiés et actifs dans tout le Maroc
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-warning-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-h3 font-semibold text-text-primary mb-2">
                Qualité Garantie
              </h3>
              <p className="text-text-secondary text-sm">
                Satisfaction client ou remboursement
              </p>
            </div>
          </div>

          {/* Testimonials Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning-500 fill-current" />
                ))}
              </div>
              <p className="text-text-secondary mb-4 italic">
                "Excellent service ! L'artisan est arrivé à l'heure et le travail était impeccable.
                Je recommande vivement Khadamat."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold text-sm">MA</span>
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">Marie A.</p>
                  <p className="text-text-muted text-xs">Casablanca</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-card">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-warning-500 fill-current" />
                ))}
              </div>
              <p className="text-text-secondary mb-4 italic">
                "Très satisfait du plombier trouvé via Khadamat. Prix correct et travail de qualité.
                L'application est facile à utiliser."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                  <span className="text-secondary-600 font-bold text-sm">RB</span>
                </div>
                <div>
                  <p className="font-semibold text-text-primary text-sm">Rachid B.</p>
                  <p className="text-text-muted text-xs">Rabat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};