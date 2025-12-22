'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// On importe le client API au cas où tu voudrais charger les vraies catégories plus tard
import apiClient from '@/lib/api-client';

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

const iconMap: Record<string, string> = {
  'plomberie': '/plomberieICONE.png',
  'électricité': '/electricitéICONE.png',
  'electricite': '/electricitéICONE.png',
  'ménage': '/menageICONE.png',
  'menage': '/menageICONE.png',
  'peinture': '/peintureICONE.png',
  'jardinage': '/jardinageICONE.png',
  'maçonnerie': '/maconnerieICONE.png',
  'maconnerie': '/maconnerieICONE.png',
  'default': '/plomberieICONE.png',
};

const mockCategories = [
  { id: '1', name: 'Plomberie' }, { id: '2', name: 'Électricité' },
  { id: '3', name: 'Ménage' }, { id: '4', name: 'Peinture' },
  { id: '5', name: 'Jardinage' }, { id: '6', name: 'Maçonnerie' },
];

export const PopularServices: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Parallax Values (Framer Motion)
  const parallaxY1 = useTransform(scrollY, [0, 1000], [0, -80]);
  const parallaxY2 = useTransform(scrollY, [0, 1000], [0, -40]);
  const parallaxY3 = useTransform(scrollY, [0, 1000], [0, -120]);

  useEffect(() => {
    // Si tu veux utiliser l'API plus tard :
    // apiClient.getCategories().then(setCategories).catch(() => setCategories(mockCategories));
    setCategories(mockCategories);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom', end: 'bottom top', scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // On vérifie que les éléments existent avant d'animer pour éviter les erreurs
            if (document.querySelector('.services-parallax-1')) gsap.set('.services-parallax-1', { y: p * -80 });
            if (document.querySelector('.services-parallax-2')) gsap.set('.services-parallax-2', { y: p * -40 });
            if (document.querySelector('.services-parallax-3')) gsap.set('.services-parallax-3', { y: p * -120 });
          }
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-transparent relative overflow-hidden">
      
      {/* ✅ CORRECTION : Ajout des éléments DOM manquants pour GSAP */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Élément 1 : Carré (Déjà là) */}
        <motion.div className="services-parallax-1 absolute top-20 left-10 opacity-10" style={{ y: parallaxY1 }}>
          <svg width="180" height="180" viewBox="0 0 200 200" className="text-orange-600">
             <rect width="180" height="180" fill="currentColor" fillOpacity="0.1" rx="20"/>
          </svg>
        </motion.div>

        {/* Élément 2 : Cercle (AJOUTÉ) */}
        <motion.div className="services-parallax-2 absolute top-40 right-10 opacity-10" style={{ y: parallaxY2 }}>
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-blue-500">
             <circle cx="60" cy="60" r="50" fill="currentColor" fillOpacity="0.1" />
          </svg>
        </motion.div>

        {/* Élément 3 : Triangle (AJOUTÉ) */}
        <motion.div className="services-parallax-3 absolute bottom-20 left-1/3 opacity-10" style={{ y: parallaxY3 }}>
          <svg width="150" height="150" viewBox="0 0 150 150" className="text-green-500">
             <path d="M75 15 L135 135 L15 135 Z" fill="currentColor" fillOpacity="0.1" />
          </svg>
        </motion.div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4 font-heading" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Services populaires
          </motion.h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-body">
            Découvrez nos services les plus demandés.
          </p>
        </div>

        {loading ? (
           <div className="grid grid-cols-2 md:grid-cols-6 gap-8 animate-pulse">
             {[...Array(6)].map((_, i) => <div key={i} className="h-40 bg-gray-200/50 rounded-3xl"></div>)}
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {categories.map((category, index) => {
              const iconKey = category.name.toLowerCase();
              const iconSrc = iconMap[iconKey] || iconMap['default'];
              return (
                <motion.div key={category.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="flex flex-col items-center">
                  <Link href={`/services/${iconKey}`} className="group block text-center cursor-pointer w-full">
                    <motion.div className="w-24 h-24 mx-auto bg-white/60 backdrop-blur-md rounded-[2rem] ring-1 ring-white flex items-center justify-center mb-4 transition-all duration-300 shadow-sm" whileHover={{ y: -8, boxShadow: "0 10px 25px rgba(249, 123, 34, 0.2)", backgroundColor: "#FFF" }}>
                      <img src={iconSrc} alt={`${category.name}`} className="w-16 h-16 object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"/>
                    </motion.div>
                    <h3 className="text-lg font-medium text-gray-800 group-hover:text-orange-600 transition-colors">{category.name}</h3>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-16">
          <Link href="/services">
            <motion.button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg" whileHover={{ scale: 1.05 }}>
              Explorer tous les services
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};