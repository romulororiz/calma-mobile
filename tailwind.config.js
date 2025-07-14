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

        // Surface Colors with Alpha
        surface: {
          primary: '#9F7AEA0A',      // rgba(159, 122, 234, 0.04)
          secondary: '#9F7AEA14',    // rgba(159, 122, 234, 0.08)
          elevated: '#1A1A2499',     // rgba(26, 26, 36, 0.6)
          glass: '#FFFFFF05',        // rgba(255, 255, 255, 0.02)
          emergency: '#EC489914',    // rgba(236, 72, 153, 0.08)
        },

        // Text Hierarchy
        text: {
          primary: '#FFFFFF',
          secondary: '#FFFFFFB3',    // rgba(255, 255, 255, 0.7)
          tertiary: '#FFFFFF80',     // rgba(255, 255, 255, 0.5)
          quaternary: '#FFFFFF4D',   // rgba(255, 255, 255, 0.3)
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

        // Additional helpful colors
        white: '#FFFFFF',
        black: '#000000',
        transparent: 'transparent',
      },

      // Spacing System (8px base unit)
      spacing: {
        unit: '8px',
        xs: '4px',    // 0.5 * unit
        sm: '8px',    // 1 * unit  
        md: '16px',   // 2 * unit
        lg: '24px',   // 3 * unit
        xl: '40px',   // 5 * unit
        '2xl': '64px', // 8 * unit
        
        // Override defaults for consistency
        0: '0px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        14: '56px',
        16: '64px',
        20: '80px',
        24: '96px',
        28: '112px',
        32: '128px',
        36: '144px',
        40: '160px',
        44: '176px',
        48: '192px',
        52: '208px',
        56: '224px',
        60: '240px',
        64: '256px',
        72: '288px',
        80: '320px',
        96: '384px',
      },

      // Typography System
      fontFamily: {
        nunito: ['Nunito', 'system-ui', 'sans-serif'],
        system: ['system-ui', 'sans-serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },

      // Font Sizes (using 1.25 scale)
      fontSize: {
        xs: ['12.8px', { lineHeight: '1.4' }],
        sm: ['14.2px', { lineHeight: '1.5' }],
        md: ['16px', { lineHeight: '1.5' }],
        base: ['16px', { lineHeight: '1.5' }],
        lg: ['20px', { lineHeight: '1.4' }],
        xl: ['25px', { lineHeight: '1.3' }],
        '2xl': ['31.25px', { lineHeight: '1.2' }],
        '3xl': ['39px', { lineHeight: '1.1' }],
        '4xl': ['49px', { lineHeight: '1.1' }],
      },

      // Font Weight System
      fontWeight: {
        normal: '400',
        semibold: '600',
        bold: '700',
      },

      // Letter Spacing
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.02em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },

      // Line Heights
      lineHeight: {
        none: '1',
        tight: '1.2',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.6',
        loose: '1.75',
      },

      // Border Radius System
      borderRadius: {
        none: '0',
        sm: '12px',
        md: '20px',
        lg: '28px',
        xl: '40px',
        '2xl': '60px',
        '3xl': '80px',
        full: '9999px',
      },

      // Animation Durations
      transitionDuration: {
        fast: '200ms',
        normal: '300ms',
        slow: '500ms',
        breathe: '4000ms',
      },

      // Animation Timing Functions
      transitionTimingFunction: {
        'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'ease-smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },

      // Box Shadow System
      boxShadow: {
        sm: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        DEFAULT: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        md: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
        lg: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
        glow: '0 0 80px rgba(159, 122, 234, 0.15)',
        'aurora-glow': '0 10px 30px rgba(159, 122, 234, 0.3)',
        'emergency-glow': '0 10px 30px rgba(236, 72, 153, 0.4)',
      },

      // Backdrop Blur
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },

      // Gradient Color Stops
      gradientColorStops: {
        'aurora-start': '#9F7AEA',
        'aurora-mid': '#EC4899',
        'aurora-end': '#F59E0B',
        'surface-start': 'rgba(159, 122, 234, 0.04)',
        'surface-end': 'rgba(159, 122, 234, 0.08)',
      },

      // Keyframes for animations
      keyframes: {
        breathe: {
          '0%, 100%': { 
            transform: 'scale(0.95)', 
            opacity: '0.7' 
          },
          '50%': { 
            transform: 'scale(1.05)', 
            opacity: '1' 
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-emergency': {
          '0%, 100%': { boxShadow: '0 10px 30px rgba(236, 72, 153, 0.4)' },
          '50%': { boxShadow: '0 10px 40px rgba(236, 72, 153, 0.6)' },
        },
        'gentle-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(159, 122, 234, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(159, 122, 234, 0)' },
        },
        rotate: {
          to: { transform: 'rotate(360deg)' },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },

      // Animation classes
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
        'pulse-emergency': 'pulse-emergency 3s ease-in-out infinite',
        'gentle-pulse': 'gentle-pulse 2s ease-in-out infinite',
        rotate: 'rotate 60s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },

      // Screen sizes for responsive design
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },

      // Z-index scale
      zIndex: {
        auto: 'auto',
        0: '0',
        10: '10',
        20: '20',
        30: '30',
        40: '40',
        50: '50',
        nav: '100',
        modal: '200',
        tooltip: '300',
        emergency: '400',
      },

      // Touch target sizes for ADHD-friendly interactions
      minHeight: {
        touch: '44px',
        'touch-comfortable': '48px',
        'touch-large': '56px',
      },

      minWidth: {
        touch: '44px',
        'touch-comfortable': '48px',
        'touch-large': '56px',
      },

      // Aspect ratios
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
        phone: '9 / 16',
      },
    },
  },
  plugins: [],
};
