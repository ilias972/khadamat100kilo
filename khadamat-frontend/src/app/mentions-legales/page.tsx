'use client';

import React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { FileText, Shield, Users, CreditCard } from 'lucide-react';

export default function LegalPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Conditions Générales d\'Utilisation',
      content: `
        <p className="mb-4">Les présentes conditions générales régissent l'utilisation de la plateforme Khadamat.</p>
        <h4 className="font-semibold mb-2">1. Objet</h4>
        <p className="mb-4">Khadamat est une plateforme digitale mettant en relation des clients particuliers avec des professionnels du bâtiment et des services à la personne.</p>
        <h4 className="font-semibold mb-2">2. Inscription</h4>
        <p className="mb-4">L'inscription est gratuite et ouverte à toute personne physique majeure. Les professionnels doivent fournir une pièce d'identité et un justificatif d'activité.</p>
        <h4 className="font-semibold mb-2">3. Services</h4>
        <p>Khadamat facilite la mise en relation mais n'est pas partie aux contrats conclus entre clients et professionnels.</p>
      `
    },
    {
      icon: Shield,
      title: 'Politique de Confidentialité',
      content: `
        <p className="mb-4">Khadamat s'engage à protéger vos données personnelles conformément au RGPD.</p>
        <h4 className="font-semibold mb-2">Données collectées</h4>
        <p className="mb-4">Nous collectons : nom, email, téléphone, adresse, données de paiement (cryptées), historique des transactions.</p>
        <h4 className="font-semibold mb-2">Utilisation des données</h4>
        <p className="mb-4">Vos données servent à : traitement des commandes, communication, amélioration du service, conformité légale.</p>
        <h4 className="font-semibold mb-2">Droits</h4>
        <p>Vous disposez d'un droit d'accès, rectification, suppression et portabilité de vos données.</p>
      `
    },
    {
      icon: Users,
      title: 'Droits et Devoirs des Utilisateurs',
      content: `
        <h4 className="font-semibold mb-2">Droits des clients</h4>
        <p className="mb-4">Accès aux profils vérifiés, paiement sécurisé, service client, médiation en cas de litige.</p>
        <h4 className="font-semibold mb-2">Devoirs des clients</h4>
        <p className="mb-4">Fournir informations exactes, respecter les conditions d'annulation, payer les prestations.</p>
        <h4 className="font-semibold mb-2">Droits des professionnels</h4>
        <p className="mb-4">Visibilité sur la plateforme, outils de gestion, support technique, paiement rapide.</p>
        <h4 className="font-semibold mb-2">Devoirs des professionnels</h4>
        <p>Fournir prestations de qualité, respecter devis, être assuré, maintenir profil à jour.</p>
      `
    },
    {
      icon: CreditCard,
      title: 'Conditions de Paiement',
      content: `
        <h4 className="font-semibold mb-2">Moyens de paiement</h4>
        <p className="mb-4">Carte bancaire, virement, espèces (selon accord avec le professionnel).</p>
        <h4 className="font-semibold mb-2">Sécurisation</h4>
        <p className="mb-4">Tous les paiements sont sécurisés par cryptage SSL et tokenisation.</p>
        <h4 className="font-semibold mb-2">Délais</h4>
        <p className="mb-4">Paiement à la commande pour réservation, à la livraison pour exécution.</p>
        <h4 className="font-semibold mb-2">Litiges</h4>
        <p>Remboursement possible sous 48h en cas de problème, après validation de notre équipe.</p>
      `
    }
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
                Mentions légales
              </h1>
              <p className="text-body text-text-secondary leading-relaxed font-body text-left">
                Informations légales et conditions d'utilisation de Khadamat.
              </p>
            </div>
          </div>
        </section>

        {/* Legal Content */}
        <section className="pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-[#EDEEEF] rounded-[16px]">
                      <section.icon className="w-8 h-8 text-[#F97B22]" />
                    </div>
                    <h2 className="text-h2 font-bold text-text-primary">{section.title}</h2>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  </div>
                </div>
              ))}

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <h2 className="text-h2 font-bold text-text-primary mb-6">Informations sur l'entreprise</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">Khadamat SARL</h3>
                    <p className="text-text-secondary mb-4">
                      Siège social : Casablanca, Maroc<br />
                      RC : 123456789<br />
                      ICE : 123456789000
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-2">Contact</h3>
                    <p className="text-text-secondary">
                      Email : legal@khadamat.ma<br />
                      Tél : 05 35 00 00 00
                    </p>
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