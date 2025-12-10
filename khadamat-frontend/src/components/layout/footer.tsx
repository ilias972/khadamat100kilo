'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';
import { useToast } from '@/lib/toast-context';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { success } = useToast();
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // Simulate success
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
      { name: 'Signaler un problème', href: '/report' },
    ],
    legal: [
      { name: 'Conditions générales', href: '/terms' },
      { name: 'Politique de confidentialité', href: '/privacy' },
      { name: 'Sécurité', href: '/security' },
    ],
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl blur opacity-20"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold font-heading">Khadamat</span>
                <span className="text-sm text-gray-400 font-body">Services à domicile</span>
              </div>
            </Link>

            <p className="text-gray-300 mb-8 max-w-sm leading-relaxed font-body">
              La première plateforme marocaine de mise en relation avec des artisans de confiance.
              Réservez vos services à domicile en toute sécurité et simplicité.
              <span className="block text-sm text-primary-300 mt-2 font-arabic" dir="rtl">
                أول منصة مغربية للربط مع الحرفيين الموثوقين
              </span>
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Artisans vérifiés</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-300">Paiement sécurisé</span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span>+212 6XX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>contact@khadamat.ma</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span>Casablanca, Maroc</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-6 font-heading">Services populaires</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-6 font-heading">Entreprise</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-body"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-6 font-heading">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="font-semibold text-white mb-6 font-heading">Restez connecté</h3>
            <p className="text-gray-400 text-sm mb-4">
              Recevez nos dernières actualités et offres exclusives.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:border-blue-500 focus:outline-none text-white text-sm placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={!email.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-400">
              <span>© {currentYear} Khadamat. Tous droits réservés.</span>
              <span className="hidden sm:block">•</span>
              <span>Fait avec <Heart className="w-4 h-4 inline text-red-500 mx-1" /> au Maroc</span>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
            >
              <ArrowUp className="w-4 h-4" />
              Retour en haut
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};