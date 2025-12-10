'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ClipboardList, Star, Calendar, ArrowRight } from 'lucide-react';
import { GlassContainer } from '@/components/ui/glass-container';
import { MoroccanPattern } from '@/components/motion/moroccan-pattern';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const parallaxY1 = useTransform(scrollY, [0, 1000], [0, -60]);
  const parallaxY2 = useTransform(scrollY, [0, 1000], [0, -30]);
  const parallaxY3 = useTransform(scrollY, [0, 1000], [0, -90]);

  const steps = [
    {
      id: 1,
      title: 'Décrivez votre besoin',
      description: 'Choisissez votre service, votre ville et expliquez ce dont vous avez besoin.',
      icon: ClipboardList,
      color: 'text-primary-500',
      bgColor: 'bg-primary-100',
      hoverBgColor: 'hover:bg-primary-200',
    },
    {
      id: 2,
      title: 'Comparez les artisans',
      description: 'Consultez les profils, avis clients et badges vérifiés pour choisir en confiance.',
      icon: Star,
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-100',
      hoverBgColor: 'hover:bg-secondary-200',
    },
    {
      id: 3,
      title: 'Réservez en toute sérénité',
      description: 'Validez la mission, échangez via la messagerie et notez l\'intervention.',
      icon: Calendar,
      color: 'text-success-500',
      bgColor: 'bg-success-100',
      hoverBgColor: 'hover:bg-success-200',
    },
  ];

  // GSAP ScrollTrigger effects for parallax
  useEffect(() => {
    if (sectionRef.current) {
      // Safe checks for GSAP targets
      const parallax1 = document.querySelector('.howitworks-parallax-1');
      const parallax2 = document.querySelector('.howitworks-parallax-2');
      const parallax3 = document.querySelector('.howitworks-parallax-3');

      if (parallax1) gsap.set('.howitworks-parallax-1', { y: 0 });
      if (parallax2) gsap.set('.howitworks-parallax-2', { y: 0 });
      if (parallax3) gsap.set('.howitworks-parallax-3', { y: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (parallax1) gsap.set('.howitworks-parallax-1', { y: progress * -60 });
          if (parallax2) gsap.set('.howitworks-parallax-2', { y: progress * -30 });
          if (parallax3) gsap.set('.howitworks-parallax-3', { y: progress * -90 });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="pt-0 pb-20 bg-background relative overflow-hidden">
      {/* Visual Connector - Curved dashed line connecting the steps */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl pointer-events-none z-0">
        <svg viewBox="0 0 800 200" className="w-full h-32 opacity-30">
          <path
            d="M 100 100 Q 267 50 400 100 Q 533 150 700 100"
            fill="none"
            stroke="url(#connectorGradient)"
            strokeWidth="2"
            strokeDasharray="8,4"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97B22" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#FFA559" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-h2 font-semibold text-text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Comment ça marche ?
          </motion.h2>
          <motion.p
            className="text-body text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Réservez un artisan en 3 étapes simples. Notre plateforme vous guide à chaque étape pour une expérience sans stress.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="text-center group cursor-pointer relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Glass Card Background */}
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white/20 group-hover:bg-white/70 group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                {/* Watermark Number */}
                <div className="absolute top-4 right-4 text-6xl font-black text-primary-500/10 select-none">
                  {step.id}
                </div>

                {/* Icon with enhanced shadow */}
                <motion.div
                  className={`w-24 h-24 ${step.bgColor} rounded-3xl flex items-center justify-center mx-auto mb-6 relative`}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  <step.icon className={`w-12 h-12 ${step.color} drop-shadow-lg`} />
                  {/* Colored shadow based on step */}
                  <div className={`absolute inset-0 rounded-3xl ${
                    step.id === 1 ? 'shadow-orange-200' :
                    step.id === 2 ? 'shadow-yellow-200' :
                    'shadow-green-200'
                  } shadow-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
                </motion.div>

                <motion.h3
                  className="text-h3 font-semibold text-text-primary mb-3 group-hover:text-primary-600 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {step.title}
                </motion.h3>
                <motion.p
                  className="text-text-secondary text-sm font-body leading-relaxed group-hover:text-text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.01 }}
                >
                  {step.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <Link href="/auth/signup">
            <motion.button
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-3xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105"
              whileHover={{
                boxShadow: "0 20px 40px rgba(249, 123, 34, 0.3)",
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer maintenant
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};