// Motion Design System Components for Khadamat
// Moroccan-inspired animations and transitions

export { WarmGradientMesh } from './warm-gradient-mesh';
export { MoroccanPattern } from './moroccan-pattern';
export {
  FadeInStagger,
  FadeInStaggerUp,
  FadeInStaggerDown,
  FadeInStaggerLeft,
  FadeInStaggerRight,
  FadeInStaggerGrid
} from './fade-in-stagger';

// Scroll smoothing with Lenis (optional)
export { ScrollSmoother, useLenis, scrollToElement } from './scroll-smoother';

// Re-export motion tokens for convenience
export { motion as motionTokens } from '@/lib/design-tokens/motion';