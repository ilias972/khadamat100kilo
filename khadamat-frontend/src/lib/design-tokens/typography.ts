// Design Tokens - Typography
// This file defines the typography scale and text styles for the Khadamat design system

export const typography = {
  // Font families
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },

  // Font sizes
  fontSize: {
    h1: ['3rem', { lineHeight: '1.1', fontWeight: '700' }], // 48px
    h2: ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }], // 36px
    h3: ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }], // 30px
    h4: ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }], // 24px
    h5: ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }], // 20px
    h6: ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }], // 18px
    body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }], // 16px
    small: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
    xs: ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }], // 12px
  },

  // Font weights
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Letter spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Line heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
};