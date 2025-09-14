module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5D87FF',
          light: '#ECF2FF',
          dark: '#4570EA',
        },
        secondary: {
          DEFAULT: '#49BEFF',
          light: '#E8F7FF',
          dark: '#23afdb',
        },
        success: {
          DEFAULT: '#13DEB9',
          light: '#E6FFFA',
          dark: '#02b3a9',
        },
        info: {
          DEFAULT: '#539BFF',
          light: '#EBF3FE',
          dark: '#1682d4',
        },
        error: {
          DEFAULT: '#FA896B',
          light: '#FDEDE8',
          dark: '#f3704d',
        },
        warning: {
          DEFAULT: '#FFAE1F',
          light: '#FEF5E5',
          dark: '#ae8e59',
        },
        purple: {
          A50: '#EBF3FE',
          A100: '#6610f2',
          A200: '#557fb9',
        },
        grey: {
          100: '#F2F6FA',
          200: '#EAEFF4',
          300: '#DFE5EF',
          400: '#7C8FAC',
          500: '#5A6A85',
          600: '#2A3547',
        },
        text: {
          primary: '#2A3547',
          secondary: '#5A6A85',
        },
        divider: '#e5eaef',
      },
      boxShadow: {
        'custom': '0px 8px 24px rgba(0,0,0,0.12)',
        sm: '0px 2px 3px rgba(0,0,0,0.10)',
        md: '0 0 1px 0 rgba(0,0,0,0.31), 0 2px 2px -2px rgba(0,0,0,0.25)',
        lg: '0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
        xl: '0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
        '2xl': '0 9px 17.5px rgb(0,0,0,0.05)',
        custom1: 'rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
        // ...add more as needed, using unique names
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      fontSize: {
        h1: ['2.25rem', { lineHeight: '2.75rem', fontWeight: '600' }],
        h2: ['1.875rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        h3: ['1.5rem', { lineHeight: '1.75rem', fontWeight: '600' }],
        h4: ['1.3125rem', { lineHeight: '1.6rem', fontWeight: '600' }],
        h5: ['1.125rem', { lineHeight: '1.6rem', fontWeight: '600' }],
        h6: ['1rem', { lineHeight: '1.2rem', fontWeight: '600' }],
        body1: ['0.875rem', { lineHeight: '1.334rem', fontWeight: '400' }],
        body2: ['0.75rem', { lineHeight: '1rem', fontWeight: '400', letterSpacing: '0rem' }],
        subtitle1: ['0.875rem', { fontWeight: '400' }],
        subtitle2: ['0.875rem', { fontWeight: '400' }],
      },
      textTransform: {
        'capitalize': 'capitalize',
      },
    },
  },
  darkMode: 'class',
};
