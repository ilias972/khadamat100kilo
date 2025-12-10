'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, CheckCircle, Star, MapPin, Shield, Eye, Award, Heart } from 'lucide-react';
import { mockCompanyStats, mockTeamMembers, mockCompanyValues, type CompanyStats, type TeamMember, type CompanyValue } from '@/lib/mocks/services-mocks';

export default function AboutPage() {
  const [stats, setStats] = useState<CompanyStats | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [values, setValues] = useState<CompanyValue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const loadData = async () => {
      setLoading(true);
      // In real app, these would be API calls
      setStats(mockCompanyStats);
      setTeam(mockTeamMembers);
      setValues(mockCompanyValues);
      setLoading(false);
    };

    loadData();
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString('fr-MA');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse space-y-12">
              <div className="h-64 bg-surface rounded-[24px]"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-surface rounded-[24px]"></div>
                <div className="h-96 bg-surface rounded-[24px]"></div>
              </div>
              <div className="h-64 bg-surface rounded-[24px]"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 lg:py-24">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary-200/20 to-primary-300/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
            <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-br from-secondary-300/20 to-primary-500/15 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
          </div>

          <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-[640px] mx-auto lg:mx-0 bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 md:p-8 lg:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
              <h1 className="text-h1 font-bold text-text-primary leading-tight tracking-tight font-heading text-left mb-4">
                Khadamat, votre plateforme de services de confiance au Maroc
              </h1>
              <p className="text-body text-text-secondary leading-relaxed font-body text-left mb-6">
                Nous connectons particuliers et professionnels qualifiés pour des services de qualité, partout au Maroc. Notre mission : simplifier votre quotidien en vous donnant accès aux meilleurs artisans locaux.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services">
                  <Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-8 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
                    Découvrir les services
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/devenir-pro">
                  <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 rounded-[24px] px-8 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
                    Devenir professionnel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-h2 font-bold text-text-primary font-heading">
                  Notre mission & vision
                </h2>
                <div className="space-y-4 text-body text-text-secondary font-body leading-relaxed">
                  <p>
                    Khadamat est née d'un constat simple : au Maroc, trouver un artisan de confiance était trop compliqué. Entre les recommandations incertaines, les prix opaques et les délais imprévisibles, les particuliers perdaient du temps et de l'argent.
                  </p>
                  <p>
                    Notre vision : devenir la plateforme de référence pour les services à domicile au Maroc, en valorisant l'expertise locale et en garantissant une expérience exceptionnelle à tous nos utilisateurs.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-[#F97B22]/10 to-[#F97B22]/5 backdrop-blur-sm rounded-[16px] p-6 border border-[#F97B22]/20">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 font-heading">
                    Pourquoi Khadamat existe ?
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Pour redonner confiance dans les services locaux, valoriser le savoir-faire marocain et créer un écosystème où particuliers et professionnels se rencontrent en toute transparence.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <h3 className="text-xl font-bold text-text-primary mb-6 font-heading text-center">
                  Nos engagements
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">Vérification rigoureuse de tous nos professionnels</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">Prix transparents et justes</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">Support client disponible 7j/7</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">Garantie satisfaction sur tous les services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-surface">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-text-primary mb-4 font-heading">
                Khadamat en chiffres
              </h2>
              <p className="text-body text-text-secondary max-w-2xl mx-auto">
                Notre croissance reflète la confiance que nous accordent particuliers et professionnels marocains.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-center">
                <Users className="w-8 h-8 text-[#F97B22] mx-auto mb-4" />
                <div className="text-3xl font-bold text-text-primary mb-2">{formatNumber(stats?.prosCount || 0)}</div>
                <div className="text-sm text-text-secondary">Professionnels inscrits</div>
              </div>

              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-center">
                <CheckCircle className="w-8 h-8 text-[#F97B22] mx-auto mb-4" />
                <div className="text-3xl font-bold text-text-primary mb-2">{formatNumber(stats?.missionsCompleted || 0)}</div>
                <div className="text-sm text-text-secondary">Missions réalisées</div>
              </div>

              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-center">
                <Star className="w-8 h-8 text-[#F97B22] mx-auto mb-4" />
                <div className="text-3xl font-bold text-text-primary mb-2">{stats?.averageRating || 0}</div>
                <div className="text-sm text-text-secondary">Note moyenne</div>
              </div>

              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-center">
                <MapPin className="w-8 h-8 text-[#F97B22] mx-auto mb-4" />
                <div className="text-3xl font-bold text-text-primary mb-2">{stats?.citiesCovered || 0}</div>
                <div className="text-sm text-text-secondary">Villes couvertes</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-text-primary mb-4 font-heading">
                Nos valeurs
              </h2>
              <p className="text-body text-text-secondary max-w-2xl mx-auto">
                Ces principes guident chacune de nos décisions et définissent notre façon de travailler.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const IconComponent = value.iconName === 'Shield' ? Shield :
                                    value.iconName === 'Eye' ? Eye :
                                    value.iconName === 'Award' ? Award : Heart;

                return (
                  <div key={value.id} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1">
                    <IconComponent className="w-10 h-10 text-[#F97B22] mb-4" />
                    <h3 className="text-lg font-bold text-text-primary mb-3 font-heading">{value.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-surface">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-text-primary mb-4 font-heading">
                Rencontrez l'équipe
              </h2>
              <p className="text-body text-text-secondary max-w-2xl mx-auto">
                Une équipe passionnée, composée d'experts marocains déterminés à révolutionner les services locaux.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.id} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F97B22]/20 to-[#F97B22]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-[#F97B22]" />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary mb-1 font-heading">{member.fullName}</h3>
                  <p className="text-sm text-[#F97B22] font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-text-secondary leading-relaxed">{member.shortBio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-bold text-text-primary mb-4 font-heading">
                Pourquoi nous faire confiance ?
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Professionnels vérifiés</h3>
                    <p className="text-text-secondary">Chaque artisan est rigoureusement sélectionné et ses compétences validées.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Avis clients authentiques</h3>
                    <p className="text-text-secondary">Tous les avis sont vérifiés et proviennent de vrais clients satisfaits.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Support client 7j/7</h3>
                    <p className="text-text-secondary">Notre équipe vous accompagne à chaque étape de votre projet.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Paiement sécurisé</h3>
                    <p className="text-text-secondary">Vos transactions sont protégées par les meilleurs standards de sécurité.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Garantie satisfaction</h3>
                    <p className="text-text-secondary">Si le service ne vous convient pas, nous intervenons gratuitement.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Plateforme 100% marocaine</h3>
                    <p className="text-text-secondary">Nous connaissons les besoins locaux et valorisons l'expertise nationale.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#F97B22]/5 to-[#F97B22]/10">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 md:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-center">
              <h2 className="text-h2 font-bold text-text-primary mb-4 font-heading">
                Prêt à rejoindre l'aventure ?
              </h2>
              <p className="text-body text-text-secondary mb-8 max-w-2xl mx-auto">
                Que vous soyez particulier à la recherche d'un service de qualité ou professionnel souhaitant développer votre activité, Khadamat est là pour vous accompagner.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pros">
                  <Button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-8 py-4 font-semibold transition-all duration-200 hover:shadow-lg">
                    Trouver un professionnel
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/devenir-pro">
                  <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 rounded-[24px] px-8 py-4 font-semibold transition-all duration-200 hover:shadow-lg">
                    Devenir professionnel
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}