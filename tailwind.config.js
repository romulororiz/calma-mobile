/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Aurora Glass Design System Colors
      colors: {
        // Base Colors - Ink System
        ink: {
          DEFAULT: '#0A0A0F',
          100: '#0A0A0F',
          90: '#1A1A24',
          80: '#2A2A38',
          70: '#3A3A4C',
        },

        // Aurora Gradient System
        aurora: {
          start: '#9F7AEA',
          mid: '#EC4899',
          end: '#F59E0B',
        },

        // Surface Colors
        surface: {
          primary: '#9F7AEA0A',
          secondary: '#9F7AEA14',
          elevated: '#1A1A2499',
          glass: '#FFFFFF05',
          emergency: '#EC489914',
        },

        // Text Hierarchy
        text: {
          primary: '#FFFFFF',
          secondary: '#FFFFFFB3',
          tertiary: '#FFFFFF80',
          quaternary: '#FFFFFF4D',
        },

        // Semantic Colors
        semantic: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#3B82F6',
        },

        // Energy Levels
        energy: {
          high: '#34D399',
          medium: '#FBBF24',
          low: '#F87171',
        },
      },

      // Spacing System (8px base unit)
      spacing: {
        unit: '8px',
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
        '2xl': '64px',
      },

      // Typography System
      fontFamily: {
        nunito: ['Nunito', 'system-ui', 'sans-serif'],
      },

      // Font Sizes
      fontSize: {
        xs: '13px',
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '25px',
        '2xl': '31px',
      },

      // Border Radius
      borderRadius: {
        sm: '12px',
        md: '20px',
        lg: '28px',
        xl: '40px',
      },

      // Animation Durations
      transitionDuration: {
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
      },

      // Simple animations that work with React Native
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(0.95)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
        'gentle-pulse': {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },

      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        'gentle-pulse': 'gentle-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
