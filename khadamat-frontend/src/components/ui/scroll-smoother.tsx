'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

interface ScrollSmootherProviderProps {
  children: React.ReactNode;
}

export const ScrollSmootherProvider: React.FC<ScrollSmootherProviderProps> = ({ children }) => {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    // Initialize ScrollSmoother
    const ctx = gsap.context(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
    });

    return () => {
      // Cleanup
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
      ctx.revert();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
};

export default ScrollSmootherProvider;