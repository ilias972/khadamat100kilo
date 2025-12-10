// Border radius and shadows for Khadamat
export const borders = {
  radius: {
    none: '0',
    sm: '0.25rem',     // 4px
    md: '0.5rem',      // 8px
    lg: '0.75rem',     // 12px
    xl: '1rem',        // 16px
    '2xl': '1.25rem',  // 20px
    '3xl': '1.5rem',   // 24px (MANDATORY for all components)
    full: '9999px',
  },

  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    'card': '0 8px 24px rgba(0, 0, 0, 0.08)', // Updated for brand consistency
    'card-hover': '0 8px 25px rgba(0, 0, 0, 0.12)',
    'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    'focus': '0 0 0 3px rgba(249, 123, 34, 0.1)',
  },
} as const;