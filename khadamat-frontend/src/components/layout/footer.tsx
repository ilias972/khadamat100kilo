'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Phone, MapPin, Heart, ArrowUp, Send } from 'lucide-react';
import { useToast } from '@/lib/toast-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { success } = useToast();
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      success('Merci de votre inscription à notre newsletter !');
      setEmail('');
    }
  };

  const footerLinks = {
    services: [
      { name: 'Plomberie', href: '/services?service=Plomberie' },
      { name: 'Électricité', href: '/services?service=Électricité' },
      { name: 'Ménage', href: '/services?service=Ménage' },
      { name: 'Peinture', href: '/services?service=Peinture' },
      { name: 'Jardinage', href: '/services?service=Jardinage' },
      { name: 'Réparation', href: '/services?service=Réparation' },
    ],
    company: [
      { name: 'À propos', href: '/about' },
      { name: 'Comment ça marche', href: '/how-it-works' },
      { name: 'Devenir pro', href: '/devenir-pro' },
      { name: 'Carrières', href: '/careers' },
    ],
    support: [
      { name: 'Centre d\'aide', href: '/help' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Conditions', href: '/terms' },
      { name: 'Confidentialité', href: '/privacy' },
      { name: 'Sécurité', href: '/security' },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-background border-t border-primary-100 overflow-hidden mt-auto">
      {/* Texture de fond subtile */}
      <div className="absolute inset-0 bg-moroccan-pattern opacity-[0.03] pointer-events-none" />
      
      {/* Bandeau décoratif supérieur */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-primary-500 to-primary-200 opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* 1. Colonne Marque */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center space-x-3 group w-fit">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-2xl font-heading">K</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-heading text-text-primary tracking-tight">Khadamat</span>
                <span className="text-xs font-medium text-primary-600 font-body uppercase tracking-wider">Services à domicile</span>
              </div>
            </Link>

            <p className="text-text-secondary leading-relaxed font-body max-w-sm">
              La première plateforme marocaine de mise en relation avec des artisans de confiance. 
              <span className="block text-primary-600 font-medium mt-3 font-arabic text-lg" dir="rtl">
                أول منصة مغربية للربط مع الحرفيين الموثوقين
              </span>
            </p>

            <div className="flex gap-4 pt-2">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' }
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white border border-border-light flex items-center justify-center text-text-secondary hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Liens Services */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-text-primary mb-6 font-heading text-lg">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-primary-600 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Liens Entreprise */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-text-primary mb-6 font-heading text-lg">Khadamat</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-primary-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-text-secondary hover:text-primary-600 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-border-light shadow-sm">
              <h3 className="font-bold text-text-primary mb-2 font-heading">Restez informé</h3>
              <p className="text-text-secondary text-sm mb-4">
                Recevez nos offres exclusives et conseils bricolage.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-surface border border-border-medium rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition-all placeholder:text-text-placeholder"
                />
                <Button 
                  type="submit" 
                  size="md" 
                  disabled={!email.trim()}
                  className="rounded-xl px-4 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Coordonnées */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary-600" />
                </div>
                <span>+212 6XX XXX XXX</span>
              </div>
              <div className="flex items-center gap-3 text-text-secondary text-sm">
                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-primary-600" />
                </div>
                <span>Casablanca, Maroc</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bas */}
        <div className="pt-8 border-t border-border-light">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-text-muted text-center md:text-left">
              © {currentYear} Khadamat. Fait avec <Heart className="w-3 h-3 inline text-red-500 fill-red-500 mx-1" /> au Maroc
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-text-muted hover:text-primary-600 transition-colors hover:underline decoration-primary-300 underline-offset-4"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary-600 transition-colors"
            >
              Haut de page
              <div className="w-8 h-8 rounded-full bg-white border border-border-light flex items-center justify-center group-hover:border-primary-300 group-hover:bg-primary-50 transition-all">
                <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};