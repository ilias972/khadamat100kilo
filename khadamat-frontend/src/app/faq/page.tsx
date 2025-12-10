'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ChevronDown, Wrench, Shield, CreditCard, MessageSquare } from 'lucide-react';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      icon: Wrench,
      title: 'Services & Réservations',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100',
      questions: [
        {
          question: 'Comment réserver un service ?',
          answer: 'Pour réserver un service, recherchez le professionnel de votre choix, consultez son profil et cliquez sur "Réserver maintenant". Vous pourrez alors choisir la date et l\'heure qui vous conviennent.'
        },
        {
          question: 'Puis-je annuler une réservation ?',
          answer: 'Oui, vous pouvez annuler une réservation jusqu\'à 24h avant l\'intervention prévue. Passé ce délai, des frais d\'annulation peuvent s\'appliquer.'
        },
        {
          question: 'Comment contacter un professionnel ?',
          answer: 'Vous pouvez contacter un professionnel directement via la messagerie intégrée de la plateforme ou par téléphone si le numéro est affiché sur son profil.'
        }
      ]
    },
    {
      icon: Shield,
      title: 'Sécurité & Garanties',
      color: 'text-green-500',
      bgColor: 'bg-green-100',
      questions: [
        {
          question: 'Les professionnels sont-ils vérifiés ?',
          answer: 'Oui, tous nos professionnels sont vérifiés : identité, qualifications, assurances et références client. Un badge de vérification apparaît sur leur profil.'
        },
        {
          question: 'Que faire en cas de problème ?',
          answer: 'En cas de litige, contactez notre service client dans les 48h suivant l\'intervention. Nous intervenons en médiation et pouvons rembourser si nécessaire.'
        }
      ]
    },
    {
      icon: CreditCard,
      title: 'Paiement & Tarifs',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100',
      questions: [
        {
          question: 'Comment sont fixés les prix ?',
          answer: 'Les prix sont fixés librement par chaque professionnel. Ils sont transparents et affichés clairement sur chaque profil.'
        },
        {
          question: 'Quand suis-je débité ?',
          answer: 'Le paiement est effectué à la fin de l\'intervention, une fois le service réalisé et validé par vos soins.'
        }
      ]
    },
    {
      icon: MessageSquare,
      title: 'Support & Aide',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
      questions: [
        {
          question: 'Comment contacter le support ?',
          answer: 'Notre équipe est disponible 7j/7 de 8h à 20h au 05 35 00 00 00 ou par email à support@khadamat.ma.'
        },
        {
          question: 'Puis-je laisser un avis ?',
          answer: 'Oui, vous pouvez noter et commenter chaque intervention. Les avis aident les autres clients dans leur choix.'
        }
      ]
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
                Questions fréquentes
              </h1>
              <p className="text-body text-text-secondary leading-relaxed font-body text-left">
                Trouvez rapidement les réponses à vos questions sur Khadamat.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`p-3 rounded-[16px] ${category.bgColor}`}>
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <h2 className="text-h3 font-bold text-text-primary">{category.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {category.questions.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 10 + itemIndex;
                      const isOpen = openItems.includes(globalIndex);

                      return (
                        <div key={itemIndex} className="border border-[#EDEEEF] rounded-[16px] overflow-hidden">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-[#EDEEEF] transition-colors duration-200"
                          >
                            <span className="font-semibold text-text-primary pr-4">{item.question}</span>
                            <ChevronDown className={`w-5 h-5 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4">
                              <p className="text-text-secondary leading-relaxed">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)] max-w-2xl mx-auto">
                <h3 className="text-h3 font-bold text-text-primary mb-4">Vous n'avez pas trouvé votre réponse ?</h3>
                <p className="text-text-secondary mb-6">
                  Notre équipe est là pour vous aider. Contactez-nous directement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] px-6 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
                    Contacter le support
                  </button>
                  <button className="bg-[#EDEEEF] hover:bg-[#F97B22]/10 text-text-primary rounded-[24px] px-6 py-3 font-semibold transition-all duration-200">
                    Consulter l'aide
                  </button>
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