'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassContainer } from '@/components/ui/glass-container';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FinalCta: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const parallaxY1 = useTransform(scrollY, [0, 1000], [0, -70]);
  const parallaxY2 = useTransform(scrollY, [0, 1000], [0, -35]);

  // GSAP ScrollTrigger effects for parallax
  useEffect(() => {
    if (sectionRef.current) {
      gsap.set('.finalcta-parallax-1', { y: 0 });
      gsap.set('.finalcta-parallax-2', { y: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set('.finalcta-parallax-1', { y: progress * -70 });
          gsap.set('.finalcta-parallax-2', { y: progress * -35 });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 relative overflow-hidden">
      {/* Parallax SVG Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Elegant arabesque pattern */}
        <motion.div
          className="finalcta-parallax-1 absolute top-10 left-10 opacity-8"
          style={{ y: parallaxY1 }}
        >
          <svg width="140" height="140" viewBox="0 0 200 200" className="text-primary-400">
            <defs>
              <pattern id="finalcta-arabesque" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
                <path d="M17.5 5 Q25 5 25 12.5 Q25 20 17.5 20 Q10 20 10 12.5 Q10 5 17.5 5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5"/>
                <circle cx="17.5" cy="12.5" r="1" fill="currentColor" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="140" height="140" fill="url(#finalcta-arabesque)"/>
          </svg>
        </motion.div>

        {/* Decorative star pattern */}
        <motion.div
          className="finalcta-parallax-2 absolute bottom-10 right-10 opacity-6"
          style={{ y: parallaxY2 }}
        >
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-secondary-400">
            <defs>
              <pattern id="finalcta-star" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <polygon points="10,2 12.5,7.5 18,7.5 13.5,11.5 15,17 10,14 5,17 6.5,11.5 2,7.5 7.5,7.5" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#finalcta-star)"/>
          </svg>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GlassContainer className="text-center p-12">
          <h2 className="text-h1 font-bold text-text-primary mb-4">
            Prêt à trouver un artisan de confiance ?
          </h2>

          <p className="text-body text-text-secondary mb-8 max-w-2xl mx-auto">
            Gratuit, sans engagement, artisans vérifiés. Commencez dès maintenant et trouvez
            le professionnel qu'il vous faut pour tous vos travaux.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-primary-500 hover:bg-primary-600 text-white font-bold shadow-xl hover:shadow-2xl px-12 py-4 rounded-3xl transform hover:scale-105 transition-all duration-200 text-lg"
              >
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary-200 text-primary-700 hover:bg-primary-50 px-12 py-4 rounded-3xl text-lg"
              >
                Explorer les services
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-success-500" />
              <span>Gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500" />
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-warning-500" />
              <span>Artisans vérifiés</span>
            </div>
          </div>
        </GlassContainer>
      </div>
    </section>
  );
};