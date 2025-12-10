// Typography system for Khadamat
export const typography = {
  fonts: {
    heading: ['Poppins', 'sans-serif'],
    body: ['Manrope', 'sans-serif'],
    arabic: ['Tajawal', 'sans-serif'], // For future RTL support
  },

  sizes: {
    display: {
      fontSize: '3rem',    // 48px
      lineHeight: '3.25rem', // 52px
      letterSpacing: '-0.025em',
    },
    h1: {
      fontSize: '2.625rem', // 42px
      lineHeight: '2.75rem',  // 44px
      letterSpacing: '-0.025em',
    },
    h2: {
      fontSize: '1.875rem', // 30px
      lineHeight: '2.25rem',  // 36px
      letterSpacing: '-0.025em',
      fontWeight: '600', // semibold
    },
    h3: {
      fontSize: '1.375rem', // 22px
      lineHeight: '1.75rem',  // 28px
      letterSpacing: '-0.025em',
    },
    h4: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.5rem',   // 24px
      letterSpacing: '-0.025em',
    },
    body: {
      fontSize: '1rem',      // 16px
      lineHeight: '1.5rem',   // 24px
      letterSpacing: '0em',
    },
    small: {
      fontSize: '0.875rem',  // 14px
      lineHeight: '1.25rem',  // 20px
      letterSpacing: '0em',
    },
    caption: {
      fontSize: '0.8125rem', // 13px
      lineHeight: '1rem',     // 16px
      letterSpacing: '0.025em',
    },
  },

  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;