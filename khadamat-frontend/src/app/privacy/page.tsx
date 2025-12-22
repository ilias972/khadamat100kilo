'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Shield, ChevronRight, Hash, Eye, Lock, Database, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
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
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'donnees-collectees', title: 'Données collectées', level: 1 },
    { id: 'finalites-traitement', title: 'Finalités du traitement', level: 1 },
    { id: 'base-legale', title: 'Base légale', level: 1 },
    { id: 'partage-donnees', title: 'Partage des données', level: 1 },
    { id: 'securite-donnees', title: 'Sécurité des données', level: 1 },
    { id: 'droits-utilisateur', title: 'Vos droits', level: 1 },
    { id: 'cookies', title: 'Cookies et traceurs', level: 1 },
    { id: 'conservation-donnees', title: 'Conservation des données', level: 1 },
    { id: 'transferts-internationaux', title: 'Transferts internationaux', level: 1 },
    { id: 'modifications', title: 'Modifications de la politique', level: 1 },
    { id: 'contact', title: 'Contact', level: 1 }
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
                <Shield className="w-10 h-10 text-[#F97B22]" />
              </div>
              <h1 className="text-h1 font-bold text-text-primary leading-tight tracking-tight font-heading mb-6">
                Politique de confidentialité
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed font-body mb-8">
                Dernière mise à jour : 15 novembre 2024
              </p>
              <p className="text-lg text-text-secondary font-body">
                Votre confidentialité est notre priorité. Découvrez comment nous protégeons et utilisons vos données personnelles.
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
                    <section data-section="introduction" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        1. Introduction
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Khadamat s'engage à protéger votre vie privée et vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons, stockons et protégeons vos informations.
                      </p>
                      <p className="mb-4 leading-relaxed">
                        En utilisant nos services, vous acceptez les pratiques décrites dans cette politique. Nous nous conformons au RGPD (Règlement Général sur la Protection des Données) et aux lois marocaines sur la protection des données.
                      </p>
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                        <div className="flex items-start">
                          <Eye className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-blue-700">
                              <strong>Notre engagement :</strong> Transparence, sécurité et respect de vos droits.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section data-section="donnees-collectees" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        2. Données collectées
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Nous collectons différents types de données pour vous offrir nos services :
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                            <UserCheck className="w-4 h-4 mr-2 text-[#F97B22]" />
                            Données d'identification
                          </h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Nom et prénom</li>
                            <li>• Adresse email</li>
                            <li>• Numéro de téléphone</li>
                            <li>• Adresse postale</li>
                          </ul>
                        </div>

                        <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                            <Database className="w-4 h-4 mr-2 text-[#F97B22]" />
                            Données de service
                          </h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Historique des réservations</li>
                            <li>• Avis et commentaires</li>
                            <li>• Préférences de service</li>
                            <li>• Communications avec les pros</li>
                          </ul>
                        </div>
                      </div>

                      <p className="mb-4 leading-relaxed">
                        Nous collectons également des données techniques automatiquement :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Adresse IP et informations de localisation
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Type d'appareil et navigateur
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Pages visitées et durée de session
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          Cookies et technologies similaires
                        </li>
                      </ul>
                    </section>

                    <section data-section="finalites-traitement" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        3. Finalités du traitement
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Vos données sont utilisées pour :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Fournir nos services :</strong> Créer votre compte, traiter vos réservations, faciliter les paiements
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Améliorer l'expérience :</strong> Personnaliser les recommandations, optimiser l'interface
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Assurer la sécurité :</strong> Prévenir la fraude, vérifier les identités, sécuriser les transactions
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Respecter nos obligations :</strong> Conformité légale, résolution des litiges, comptabilité
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Communications :</strong> Informations sur vos réservations, support client, mises à jour
                        </li>
                      </ul>
                    </section>

                    <section data-section="base-legale" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        4. Base légale
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Le traitement de vos données repose sur :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Exécution du contrat :</strong> Nécessaire pour fournir nos services
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Intérêt légitime :</strong> Amélioration des services, prévention de la fraude
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Obligation légale :</strong> Respect des réglementations en vigueur
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Consentement :</strong> Pour les communications marketing (facultatif)
                        </li>
                      </ul>
                    </section>

                    <section data-section="partage-donnees" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        5. Partage des données
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Nous partageons vos données uniquement dans les cas suivants :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Professionnels :</strong> Informations nécessaires pour réaliser les services (nom, téléphone, adresse)
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Prestataires de paiement :</strong> Données bancaires pour traiter les transactions
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Autorités légales :</strong> Sur demande judiciaire ou pour prévenir des activités illégales
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Sous-traitants :</strong> Prestataires techniques (hébergement, support) sous contrat strict
                        </li>
                      </ul>
                      <div className="bg-green-50 border-l-4 border-green-400 p-4 my-6">
                        <div className="flex items-start">
                          <Lock className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-green-700">
                              <strong>Nous ne vendons jamais vos données personnelles à des tiers.</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section data-section="securite-donnees" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        6. Sécurité des données
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Nous mettons en œuvre des mesures de sécurité avancées :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Chiffrement :</strong> Toutes les données sensibles sont chiffrées (SSL/TLS, AES-256)
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Accès contrôlé :</strong> Système de droits d'accès stricts pour notre personnel
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Surveillance :</strong> Détection et réponse aux incidents de sécurité 24h/24
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Audits réguliers :</strong> Contrôles de sécurité périodiques par des experts externes
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Formation :</strong> Notre équipe est formée aux meilleures pratiques de sécurité
                        </li>
                      </ul>
                    </section>

                    <section data-section="droits-utilisateur" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        7. Vos droits
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Conformément au RGPD, vous disposez des droits suivants :
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold text-text-primary mb-2">Droits d'accès</h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Accéder à vos données</li>
                            <li>• Connaître leur utilisation</li>
                            <li>• Obtenir une copie</li>
                          </ul>
                        </div>
                        <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold text-text-primary mb-2">Droits de rectification</h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Corriger des données inexactes</li>
                            <li>• Compléter des données incomplètes</li>
                            <li>• Mettre à jour vos informations</li>
                          </ul>
                        </div>
                        <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold text-text-primary mb-2">Droits de suppression</h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Supprimer vos données</li>
                            <li>• "Droit à l'oubli"</li>
                            <li>• Fermeture de compte</li>
                          </ul>
                        </div>
                        <div className="bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm rounded-lg p-4">
                          <h4 className="font-semibold text-text-primary mb-2">Autres droits</h4>
                          <ul className="text-sm text-text-secondary space-y-1">
                            <li>• Opposition au traitement</li>
                            <li>• Limitation du traitement</li>
                            <li>• Portabilité des données</li>
                          </ul>
                        </div>
                      </div>
                      <p className="mb-4 leading-relaxed">
                        Pour exercer vos droits, contactez-nous à : privacy@khadamat.ma
                      </p>
                    </section>

                    <section data-section="cookies" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        8. Cookies et traceurs
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Nous utilisons des cookies pour améliorer votre expérience :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site (authentification, sécurité)
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Cookies analytiques :</strong> Mesure d'audience et amélioration des services
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Cookies fonctionnels :</strong> Mémorisation de vos préférences
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Cookies marketing :</strong> Personnalisation des publicités (avec consentement)
                        </li>
                      </ul>
                      <p className="mb-4 leading-relaxed">
                        Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur ou via notre bannière de consentement.
                      </p>
                    </section>

                    <section data-section="conservation-donnees" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        9. Conservation des données
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Nous conservons vos données pendant la durée nécessaire :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Données de compte :</strong> Durée de votre inscription + 3 ans après suppression
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Historique des réservations :</strong> 10 ans (obligations légales)
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Données de paiement :</strong> 13 mois (normes PCI DSS)
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Cookies analytiques :</strong> 13 mois maximum
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Données de litige :</strong> 5 ans après résolution
                        </li>
                      </ul>
                    </section>

                    <section data-section="transferts-internationaux" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        10. Transferts internationaux
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Vos données sont principalement stockées au Maroc. Dans certains cas, elles peuvent être transférées vers :
                      </p>
                      <ul className="mb-4 space-y-2">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>Prestataires européens :</strong> Hébergement sécurisé, services de paiement
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mt-1 mr-2 text-[#F97B22] flex-shrink-0" />
                          <strong>États-Unis :</strong> Services cloud (avec garanties de protection équivalentes)
                        </li>
                      </ul>
                      <p className="mb-4 leading-relaxed">
                        Tous les transferts sont sécurisés et respectent les standards internationaux de protection des données.
                      </p>
                    </section>

                    <section data-section="modifications" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        11. Modifications de la politique
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Nous pouvons modifier cette politique pour refléter les évolutions de nos services ou des réglementations. Les changements majeurs vous seront notifiés par email ou notification sur la plateforme.
                      </p>
                      <p className="mb-4 leading-relaxed">
                        La version mise à jour sera publiée sur cette page avec la date de dernière modification.
                      </p>
                    </section>

                    <section data-section="contact" className="mb-12">
                      <h2 className="text-h2 font-bold text-text-primary mb-6 font-heading flex items-center">
                        <Hash className="w-6 h-6 mr-3 text-[#F97B22]" />
                        12. Contact
                      </h2>
                      <p className="mb-4 leading-relaxed">
                        Pour toute question concernant cette politique ou vos données personnelles :
                      </p>
                      <div className="bg-gradient-to-br from-[#F97B22]/5 to-[#F97B22]/10 backdrop-blur-sm rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-text-primary mb-2">Délégué à la protection des données</h4>
                            <p className="text-text-secondary text-sm">privacy@khadamat.ma</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-text-primary mb-2">Support technique</h4>
                            <p className="text-text-secondary text-sm">support@khadamat.ma</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-text-primary mb-2">Adresse postale</h4>
                            <p className="text-text-secondary text-sm">Khadamat SARL<br />123 Boulevard Mohammed V<br />Casablanca, Maroc</p>
                          </div>
                          <div>
                            <h4 className="font-semibold text-text-primary mb-2">Téléphone</h4>
                            <p className="text-text-secondary text-sm">+212 6 12 34 56 78</p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-text-secondary">
                        Nous nous engageons à répondre à vos demandes dans un délai de 30 jours maximum.
                      </p>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}