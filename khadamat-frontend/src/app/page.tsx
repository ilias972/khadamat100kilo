'use client';

import { Header } from '@/components/layout/header';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { LazySection } from '@/components/ui/lazy-section';
import { FadeInStagger } from '@/components/motion/fade-in-stagger';
import dynamic from 'next/dynamic';

// Critical components
import { Hero } from '@/components/sections/hero';

// Lazy loaded components
const PopularServices = dynamic(() => import('@/components/sections/popular-services').then(mod => ({ default: mod.PopularServices })), {
  loading: () => <div className="h-96 bg-gray-100/50 animate-pulse rounded-3xl mx-4 my-8"></div>
});
const ServicesByCity = dynamic(() => import('@/components/sections/services-by-city').then(mod => ({ default: mod.ServicesByCity })), {
  loading: () => <div className="h-96 bg-gray-100/50 animate-pulse rounded-3xl mx-4 my-8"></div>
});

// Autres sections (gardées telles quelles, mais lazy loadées)
const HowItWorks = dynamic(() => import('@/components/sections/how-it-works').then(mod => ({ default: mod.HowItWorks })));
const FeaturedProfessionals = dynamic(() => import('@/components/sections/featured-professionals').then(mod => ({ default: mod.FeaturedProfessionals })));
const WhyChooseKhadamat = dynamic(() => import('@/components/sections/why-choose-khadamat').then(mod => ({ default: mod.WhyChooseKhadamat })));
const SocialProof = dynamic(() => import('@/components/sections/social-proof').then(mod => ({ default: mod.SocialProof })));
const BlogAstuces = dynamic(() => import('@/components/sections/blog-astuces').then(mod => ({ default: mod.BlogAstuces })));
const MiniFaq = dynamic(() => import('@/components/sections/mini-faq').then(mod => ({ default: mod.MiniFaq })));
const JoinAsPro = dynamic(() => import('@/components/sections/join-as-pro').then(mod => ({ default: mod.JoinAsPro })));
const FinalCta = dynamic(() => import('@/components/sections/final-cta').then(mod => ({ default: mod.FinalCta })));

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#FDFBF7]">
      
      {/* --- FOND MAÎTRE (MASTER BACKGROUND) --- */}
      {/* Ce fond reste fixe et unifie toutes les sections */}
      <div className="fixed inset-0 pointer-events-none z-0">
        
        {/* 1. Motif Zellige Subtil (SVG en data URI pour la perf) */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z' fill='%23F97B22' fill-opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* 2. Lueurs colorées (Blobs) */}
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-orange-200/20 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[-10%] w-[600px] h-[600px] bg-blue-100/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[700px] h-[700px] bg-green-50/20 rounded-full blur-[100px]" />
      </div>

      <Header />
      
      <main className="relative z-10 space-y-0">
        {/* Hero est transparent pour montrer le fond maître */}
        <Hero />
        
        <FadeInStagger direction="up" staggerDelay={0.1}>
          <PopularServices />
        </FadeInStagger>

        {/* Autres sections... */}
        <LazySection>
          <FadeInStagger direction="up" staggerDelay={0.1}>
            <FeaturedProfessionals />
          </FadeInStagger>
        </LazySection>

        <FadeInStagger direction="up" staggerDelay={0.1}>
          <HowItWorks />
        </FadeInStagger>

        <LazySection>
           <FadeInStagger direction="up" staggerDelay={0.1}>
             <ServicesByCity />
           </FadeInStagger>
        </LazySection>

        {/* Le reste des sections lazy loadées */}
        <LazySection><WhyChooseKhadamat /></LazySection>
        <LazySection><SocialProof /></LazySection>
        <LazySection><BlogAstuces /></LazySection>
        <LazySection><MiniFaq /></LazySection>
        <LazySection><JoinAsPro /></LazySection>
        <LazySection><FinalCta /></LazySection>
      </main>
    </div>
  );
}