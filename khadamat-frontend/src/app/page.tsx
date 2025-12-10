'use client';

import { Header } from '@/components/layout/header';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Footer } from '@/components/layout/footer';
import { LazySection } from '@/components/ui/lazy-section';
import { FadeInStagger } from '@/components/motion/fade-in-stagger';
import { MoroccanPattern } from '@/components/motion/moroccan-pattern';
import dynamic from 'next/dynamic';

// Critical components loaded immediately
import { Hero } from '@/components/sections/hero';

// Non-critical components lazy loaded
const HowItWorks = dynamic(() => import('@/components/sections/how-it-works').then(mod => ({ default: mod.HowItWorks })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});
const PopularServices = dynamic(() => import('@/components/sections/popular-services').then(mod => ({ default: mod.PopularServices })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});
const ServicesByCity = dynamic(() => import('@/components/sections/services-by-city').then(mod => ({ default: mod.ServicesByCity })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});
const WhyChooseKhadamat = dynamic(() => import('@/components/sections/why-choose-khadamat').then(mod => ({ default: mod.WhyChooseKhadamat })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});
const FeaturedProfessionals = dynamic(() => import('@/components/sections/featured-professionals').then(mod => ({ default: mod.FeaturedProfessionals })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});
const SocialProof = dynamic(() => import('@/components/sections/social-proof').then(mod => ({ default: mod.SocialProof })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});
const BlogAstuces = dynamic(() => import('@/components/sections/blog-astuces').then(mod => ({ default: mod.BlogAstuces })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});
const MiniFaq = dynamic(() => import('@/components/sections/mini-faq').then(mod => ({ default: mod.MiniFaq })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});
const JoinAsPro = dynamic(() => import('@/components/sections/join-as-pro').then(mod => ({ default: mod.JoinAsPro })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});
const FinalCta = dynamic(() => import('@/components/sections/final-cta').then(mod => ({ default: mod.FinalCta })), {
  loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>
});

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="space-y-0">
        <Hero />
        <FadeInStagger direction="up" staggerDelay={0.1}>
          <PopularServices />
        </FadeInStagger>

        {/* Top Artisans - Immediate social proof after services */}
        <LazySection>
          <FadeInStagger direction="up" staggerDelay={0.1}>
            <FeaturedProfessionals />
          </FadeInStagger>
        </LazySection>

        <FadeInStagger direction="up" staggerDelay={0.1}>
          <HowItWorks />
        </FadeInStagger>

        {/* Lazy loaded sections */}
        <LazySection>
          <FadeInStagger direction="up" staggerDelay={0.1}>
            <WhyChooseKhadamat />
          </FadeInStagger>
        </LazySection>

        <LazySection>
          <FadeInStagger direction="up" staggerDelay={0.1}>
            <ServicesByCity />
          </FadeInStagger>
        </LazySection>

        <LazySection>
          <FadeInStagger direction="up" staggerDelay={0.1}>
            <SocialProof />
          </FadeInStagger>
        </LazySection>

        <LazySection>
          <FadeInStagger direction="up" staggerDelay={0.1}>
            <BlogAstuces />
          </FadeInStagger>
        </LazySection>

        <LazySection>
          <FadeInStagger direction="up" staggerDelay={0.1}>
            <MiniFaq />
          </FadeInStagger>
        </LazySection>

        <LazySection>
          <FadeInStagger direction="up" staggerDelay={0.1}>
            <JoinAsPro />
          </FadeInStagger>
        </LazySection>

        <LazySection>
          <FadeInStagger direction="up" staggerDelay={0.1}>
            <FinalCta />
          </FadeInStagger>
        </LazySection>
      </main>
      <Footer />
    </div>
  );
}
