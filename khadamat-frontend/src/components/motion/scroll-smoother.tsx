'use client';

import { ReactNode, useEffect, useRef, createContext, useContext } from 'react';
import Lenis from 'lenis';

// Context for sharing Lenis instance
const LenisContext = createContext<Lenis | null>(null);

interface ScrollSmootherProps {
  children: ReactNode;
  options?: {
    duration?: number;
    easing?: (t: number) => number;
    direction?: 'vertical' | 'horizontal';
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
    smooth?: boolean;
    mouseMultiplier?: number;
    smoothTouch?: boolean;
    touchMultiplier?: number;
    infinite?: boolean;
  };
}

export const ScrollSmoother: React.FC<ScrollSmootherProps> = ({
  children,
  options = {}
}) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with Moroccan-inspired smooth scrolling
    const lenis = new Lenis({
      duration: 1.2, // Slightly slower for elegance
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      ...options,
    });

    lenisRef.current = lenis;

    // Animation frame loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  // Expose lenis instance for potential external use
  useEffect(() => {
    if (lenisRef.current) {
      // Make lenis available globally for debugging or advanced usage
      (window as any).lenis = lenisRef.current;
    }
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
};

// Hook to access Lenis instance
export const useLenis = () => {
  const lenis = useContext(LenisContext);
  return lenis;
};

// Utility function for smooth scrolling to elements
export const scrollToElement = (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
  const lenis = useContext(LenisContext);
  if (lenis) {
    lenis.scrollTo(target, {
      offset: options?.offset || 0,
      duration: options?.duration || 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }
};