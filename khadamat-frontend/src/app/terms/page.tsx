'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FileText, ChevronRight, Hash } from 'lucide-react';

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      let current = '';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = section.getAttribute('data-section') || '';
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tableOfContents = [
    { id: 'acceptation', title: 'Acceptation des conditions', level: 1 },
    { id: 'services', title: 'Description des services', level: 1 },
    { id: 'obligations-utilisateur', title: 'Obligations de l\'utilisateur', level: 1 },
    { id: 'obligations-plateforme', title: 'Obligations de la plateforme', level: 1 },
    { id: 'tarifs', title: 'Tarifs et paiement', level: 1 },
    { id: 'annulation', title: 'Annulation et remboursement', level: 1 },
    { id: 'responsabilite', title: 'Responsabilité', level: 1 },
    { id: 'propriete-intellectuelle', title: 'Propriété intellectuelle', level: 1 },
    { id: 'donnees-personnelles', title: 'Données personnelles', level: 1 },
    { id: 'securite', title: 'Sécurité', level: 1 },
    { id: 'litiges', title: 'Résolution des litiges', level: 1 },
    { id: 'modification', title: 'Modification des conditions', level: 1 },
    { id: 'droit-applicable', title: 'Droit applicable', level: 1 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 md:py-20 lg:py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-[#F97B22]/10 rounded-full flex items-center justify-center">
                <FileText className="w-10 h-10 text-[#F97B22]" />
              </div>
              <h1 className="text-h1 font-bold text-text-primary leading-tight tracking-tight font-heading mb-6">
                Conditions générales d'utilisation
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed font-body mb-8">
                Dernière mise à jour : 15 novembre 2024
              </p>
              <p className="text-lg text-text-secondary font-body">
                Ces conditions régissent votre utilisation de la plateforme Khadamat.
                Veuillez les lire attentivement avant d'utiliser nos services.
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Table of Contents - Sticky */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6">
                    <h3 className="text-lg font-bold text-text-primary mb-4 font-heading">
                      Table des matières
                    </h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                            activeSection === item.id
                              ? 'bg-[#F97B22]/10 text-[#F97B22] font-medium'
                              : 'text-text-secondary hover:text-[#F97B22] hover:bg-[#F97B22]/5'
                          }`}
                          style={{ paddingLeft: `${item.level * 12 + 12}px` }}
                        >
                          {item.title}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] p-6 md:p-8 lg:p-12">
                  <div className="prose prose-lg max-w-none font-body text-text-primary">
                    <section data-section="acceptation" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        1. Acceptation des conditions
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        En accédant et en utilisant la plateforme Khadamat, vous acceptez d'être lié par les présentes conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
                      </p>
                      <p className="mb-4 leading-relaxed">
                        Khadamat est une plateforme digitale qui met en relation des clients et des professionnels du bâtiment et des services au Maroc. Nous facilitons la réservation de services tout en assurant la qualité et la sécurité des transactions.
                      </p>
                    </section>

                    <section data-section="services" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        2. Description des services
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Khadamat propose une plateforme en ligne permettant :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          La recherche et la découverte de professionnels qualifiés
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          La réservation de services en ligne
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Le paiement sécurisé des prestations
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          La gestion des avis et commentaires
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Le support client et la résolution des litiges
                        </li>
                      </ul>
                    </section>

                    <section data-section="obligations-utilisateur" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        3. Obligations de l'utilisateur
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        En utilisant Khadamat, vous vous engagez à :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Fournir des informations exactes et à jour
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Respecter les droits des autres utilisateurs
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Utiliser la plateforme de manière légale et responsable
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Ne pas porter atteinte à la sécurité de la plateforme
                        </li>
                      </ul>
                    </section>

                    <section data-section="obligations-plateforme" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        4. Obligations de la plateforme
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Khadamat s'engage à :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Assurer la disponibilité et la sécurité de la plateforme
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Vérifier la qualité des professionnels inscrits
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Faciliter la résolution des litiges
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Protéger les données personnelles des utilisateurs
                        </li>
                      </ul>
                    </section>

                    <section data-section="tarifs" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        5. Tarifs et paiement
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Les tarifs des services sont fixés librement par les professionnels. Khadamat prélève une commission de 10% sur chaque transaction pour couvrir les frais de plateforme et assurer la qualité du service.
                      </p>
                      <p className="mb-4 leading-relaxed">
                        Le paiement est effectué en ligne via notre système sécurisé. Les fonds sont bloqués jusqu'à confirmation de la réalisation du service par le client.
                      </p>
                    </section>

                    <section data-section="annulation" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        6. Annulation et remboursement
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Les conditions d'annulation varient selon le délai avant le rendez-vous :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Plus de 24h :</strong> Annulation gratuite et remboursement intégral
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>24h à 2h avant :</strong> Frais d'annulation de 20%
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Moins de 2h avant :</strong> Frais d'annulation de 50%
                        </li>
                      </ul>
                    </section>

                    <section data-section="responsabilite" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        7. Responsabilité
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Khadamat agit en tant qu'intermédiaire technique entre clients et professionnels. Nous ne pouvons être tenus responsables des actes, omissions ou négligences des professionnels.
                      </p>
                      <p className="mb-4 leading-relaxed">
                        Cependant, nous nous engageons à vérifier la qualité des professionnels inscrits et à faciliter la résolution des litiges.
                      </p>
                    </section>

                    <section data-section="propriete-intellectuelle" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        8. Propriété intellectuelle
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        La plateforme Khadamat, ses contenus, logos, marques et bases de données sont protégés par les droits de propriété intellectuelle. Toute reproduction ou utilisation sans autorisation est interdite.
                      </p>
                    </section>

                    <section data-section="donnees-personnelles" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        9. Données personnelles
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Le traitement de vos données personnelles est régi par notre politique de confidentialité. Nous nous engageons à protéger vos données et à respecter la réglementation en vigueur.
                      </p>
                    </section>

                    <section data-section="securite" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        10. Sécurité
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour assurer la sécurité de vos données et transactions.
                      </p>
                    </section>

                    <section data-section="litiges" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        11. Résolution des litiges
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        En cas de litige, nous encourageons d'abord la résolution amiable. Notre équipe de médiation est à votre disposition pour faciliter le dialogue.
                      </p>
                    </section>

                    <section data-section="modification" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        12. Modification des conditions
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront informés des changements majeurs par email ou notification sur la plateforme.
                      </p>
                    </section>

                    <section data-section="droit-applicable" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        13. Droit applicable
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Ces conditions sont régies par le droit marocain. Tout litige sera soumis à la compétence des tribunaux marocains.
                      </p>
                      <p className="mb-4 leading-relaxed">
                        Pour toute question concernant ces conditions, contactez notre support à l'adresse : legal@khadamat.ma
                      </p>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}