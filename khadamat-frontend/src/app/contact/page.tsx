'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['05 35 00 00 00', 'Support 7j/7'],
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@khadamat.ma', 'Réponse sous 24h'],
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['Casablanca, Maroc', 'Siège social'],
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: ['Lun-Ven: 8h-20h', 'Sam-Dim: 9h-18h'],
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
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
                Contactez-nous
              </h1>
              <p className="text-body text-text-secondary leading-relaxed font-body text-left">
                Notre équipe est à votre écoute pour répondre à toutes vos questions.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="pb-16">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                <h2 className="text-h3 font-bold text-text-primary mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Nom complet
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-[#EDEEEF] border-0 rounded-[24px] focus:ring-2 focus:ring-primary-300"
                        placeholder="Votre nom"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-[#EDEEEF] border-0 rounded-[24px] focus:ring-2 focus:ring-primary-300"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Sujet
                    </label>
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="bg-[#EDEEEF] border-0 rounded-[24px] focus:ring-2 focus:ring-primary-300"
                      placeholder="Objet de votre message"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Message
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="bg-[#EDEEEF] border-0 rounded-[24px] focus:ring-2 focus:ring-primary-300 min-h-[120px]"
                      placeholder="Votre message..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#F97B22] hover:bg-[#e66a1f] text-white rounded-[24px] py-3 font-semibold transition-all duration-200 hover:shadow-lg"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </Button>
                </form>
              </div>

              {/* Contact Info & Map */}
              <div className="space-y-8">
                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      <div className={`w-12 h-12 ${info.bgColor} rounded-[16px] flex items-center justify-center mb-4`}>
                        <info.icon className={`w-6 h-6 ${info.color}`} />
                      </div>
                      <h3 className="text-h4 font-bold text-text-primary mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-text-secondary text-sm">{detail}</p>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-[rgba(250,247,242,0.8)] to-[rgba(255,255,255,0.5)] backdrop-blur-sm rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                  <h3 className="text-h4 font-bold text-text-primary mb-4">Nous trouver</h3>
                  <div className="h-64 bg-[#EDEEEF] rounded-[16px] flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-text-muted mx-auto mb-2" />
                      <p className="text-text-muted">Carte interactive</p>
                      <p className="text-sm text-text-secondary">Casablanca, Maroc</p>
                    </div>
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