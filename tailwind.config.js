/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Nebula Calm Design System Colors
      colors: {
        // Cosmic Background System
        'deep-space': '#0A0A1F',
        'void-black': '#000000',
        'cosmic-mist': '#4B0082',

        // Nebula Gradient System - Primary Palette
        nebula: {
          purple: '#6A5ACD', // Primary accent - softer slate blue
          DEFAULT: '#6A5ACD',
        },
        cosmic: {
          pink: '#DB7093', // Mid-tone - muted palevioletred
          DEFAULT: '#DB7093',
        },
        starlight: {
          gold: '#FFD700', // End accent - warm gold
          DEFAULT: '#FFD700',
        },

        // Enhanced Surface Colors with Higher Opacity
        surface: {
          glass: 'rgba(255, 255, 255, 0.05)', // Increased for better visibility
          'glass-elevated': 'rgba(255, 255, 255, 0.08)',
          primary: 'rgba(106, 90, 205, 0.08)', // Nebula purple transparency
          secondary: 'rgba(106, 90, 205, 0.12)',
          cosmic: 'rgba(219, 112, 147, 0.06)', // Cosmic pink surface
          emergency: 'rgba(255, 69, 0, 0.08)', // Softer emergency red
          success: 'rgba(50, 205, 50, 0.08)', // Success green surface
        },

        // High-Contrast Text Hierarchy for ADHD
        text: {
          primary: '#FFFFFF', // Pure white for maximum contrast
          secondary: '#D3D3D3', // Light gray - 80% opacity equivalent
          tertiary: '#A9A9A9', // Medium gray - 60% opacity equivalent
          quaternary: '#808080', // Darker gray - 40% opacity equivalent
          muted: '#696969', // Subtle text for less important info
        },

        // Softer Semantic Colors for Calm
        semantic: {
          success: '#32CD32', // Lime green - warmer than previous
          warning: '#FFD700', // Gold - matches starlight theme
          error: '#FF4500', // Orange-red - less harsh than pure red
          info: '#4169E1', // Royal blue - confident but calm
        },

        // Positive Energy Level Colors
        energy: {
          high: '#90EE90', // Light green - encouraging
          medium: '#FFD700', // Gold - balanced
          low: '#FF7F50', // Coral - warm, not alarming
        },

        // Additional helpful colors
        white: '#FFFFFF',
        black: '#000000',
        transparent: 'transparent',
      },

      // Enhanced Spacing System (10px base unit for more whitespace)
      spacing: {
        unit: '10px',
        xs: '5px', // 0.5 * unit
        sm: '10px', // 1 * unit
        md: '20px', // 2 * unit
        lg: '30px', // 3 * unit
        xl: '50px', // 5 * unit
        '2xl': '80px', // 8 * unit
        '3xl': '120px', // 12 * unit for hero sections

        // Override defaults for enhanced spacing (10px increments)
        0: '0px',
        1: '5px',
        2: '10px',
        3: '15px',
        4: '20px',
        5: '25px',
        6: '30px',
        7: '35px',
        8: '40px',
        9: '45px',
        10: '50px',
        11: '55px',
        12: '60px',
        14: '70px',
        16: '80px',
        20: '100px',
        24: '120px',
        28: '140px',
        32: '160px',
        36: '180px',
        40: '200px',
        44: '220px',
        48: '240px',
        52: '260px',
        56: '280px',
        60: '300px',
        64: '320px',
        72: '360px',
        80: '400px',
        96: '480px',
      },

      // Poppins Typography System
      fontFamily: {
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
        system: ['system-ui', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },

      // Enhanced Font Sizes (Poppins optimized scale)
      fontSize: {
        xs: ['12px', { lineHeight: '1.5' }], // Labels
        sm: ['14px', { lineHeight: '1.6' }], // Body text
        base: ['16px', { lineHeight: '1.6' }], // Default
        md: ['16px', { lineHeight: '1.6' }], // Alias for base
        lg: ['20px', { lineHeight: '1.5' }], // Headings
        xl: ['24px', { lineHeight: '1.4' }], // Titles
        '2xl': ['32px', { lineHeight: '1.3' }], // Hero text
        '3xl': ['40px', { lineHeight: '1.2' }], // Display text
        '4xl': ['48px', { lineHeight: '1.1' }], // Large display
      },

      // Poppins Font Weight System
      fontWeight: {
        light: '300', // Airy, spacious feel
        normal: '400', // Standard body
        regular: '400', // Alias for normal
        medium: '500', // Emphasis
        semibold: '600', // Strong emphasis (legacy support)
        bold: '700', // Strong emphasis
      },

      // Enhanced Letter Spacing for Breathing Room
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.025em', // Slight breathing room
        wider: '0.05em', // More spacious
        widest: '0.1em',
      },

      // Enhanced Line Heights for Readability
      lineHeight: {
        none: '1',
        tight: '1.3', // Compact
        snug: '1.4',
        normal: '1.5', // Standard
        relaxed: '1.6', // Comfortable reading
        loose: '1.8', // Maximum comfort
      },

      // Organic Border Radius for Embracing Feel
      borderRadius: {
        none: '0',
        xs: '8px',
        sm: '16px',
        md: '24px', // Increased for softer feel
        lg: '32px', // Organic, embracing
        xl: '40px', // Large elements
        '2xl': '48px',
        '3xl': '64px',
        full: '9999px', // Pills and circles
      },

      // Gentle Animation Durations
      transitionDuration: {
        fast: '300ms', // Quick interactions
        normal: '400ms', // Standard transitions
        slow: '600ms', // Gentle, calming
        breathe: '5000ms', // Nebula breathe effect
      },

      // Natural Animation Timing Functions
      transitionTimingFunction: {
        natural: 'cubic-bezier(0.22, 1, 0.36, 1)', // Smooth, natural
        gentle: 'cubic-bezier(0.25, 0.1, 0.25, 1)', // Gentle acceleration
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Playful bounce
        'ease-default': 'cubic-bezier(0.4, 0, 0.2, 1)', // Legacy support
      },

      // Enhanced Box Shadow System with Nebula Glows
      boxShadow: {
        sm: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        DEFAULT: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        md: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
        lg: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
        // Nebula-themed glows
        'nebula-glow': '0 0 20px rgba(106, 90, 205, 0.1)',
        'cosmic-glow': '0 0 30px rgba(219, 112, 147, 0.15)',
        'starlight-glow': '0 0 25px rgba(255, 215, 0, 0.1)',
        'soft-glow': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'medium-glow': '0 8px 30px rgba(0, 0, 0, 0.15)',
        'strong-glow': '0 15px 40px rgba(0, 0, 0, 0.2)',
        // Legacy support
        glow: '0 0 80px rgba(106, 90, 205, 0.15)',
        'aurora-glow': '0 10px 30px rgba(106, 90, 205, 0.3)',
        'emergency-glow': '0 10px 30px rgba(255, 69, 0, 0.4)',
      },

      // Enhanced Backdrop Blur for Glass Effects
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '16px', // Standard glass effect
        lg: '24px', // Strong glass effect
        xl: '32px', // Intense glass effect
        '2xl': '48px',
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

      // Enhanced Keyframes for Nebula Animations
      keyframes: {
        'nebula-breathe': {
          '0%, 100%': {
            transform: 'scale(0.98)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'scale(1.02)',
            opacity: '1',
          },
        },
        'cosmic-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'gentle-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(106, 90, 205, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(106, 90, 205, 0)' },
        },
        'emergency-pulse': {
          '0%, 100%': { boxShadow: '0 10px 30px rgba(255, 69, 0, 0.4)' },
          '50%': { boxShadow: '0 10px 40px rgba(255, 69, 0, 0.6)' },
        },
        'cosmic-drift': {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-200px)' },
        },
        'starlight-shimmer': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
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
        // Legacy support
        breathe: {
          '0%, 100%': {
            transform: 'scale(0.98)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'scale(1.02)',
            opacity: '1',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-emergency': {
          '0%, 100%': { boxShadow: '0 10px 30px rgba(255, 69, 0, 0.4)' },
          '50%': { boxShadow: '0 10px 40px rgba(255, 69, 0, 0.6)' },
        },
      },

      // Enhanced Animation Classes
      animation: {
        'nebula-breathe': 'nebula-breathe 5s ease-in-out infinite',
        'cosmic-float': 'cosmic-float 4s ease-in-out infinite',
        'gentle-pulse': 'gentle-pulse 3s ease-in-out infinite',
        'emergency-pulse': 'emergency-pulse 3s ease-in-out infinite',
        'cosmic-drift': 'cosmic-drift 120s linear infinite',
        'starlight-shimmer': 'starlight-shimmer 2s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        // Legacy support
        breathe: 'nebula-breathe 5s ease-in-out infinite',
        float: 'cosmic-float 4s ease-in-out infinite',
        'pulse-emergency': 'emergency-pulse 3s ease-in-out infinite',
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

      // ADHD-Friendly Touch Target Sizes (Enhanced)
      minHeight: {
        touch: '60px', // Minimum touch target (increased)
        'touch-comfortable': '72px', // Comfortable size
        'touch-large': '88px', // Large, easy to hit
      },

      minWidth: {
        touch: '60px', // Minimum touch target (increased)
        'touch-comfortable': '72px', // Comfortable size
        'touch-large': '88px', // Large, easy to hit
      },

      // Aspect Ratios (React Native Compatible)
      aspectRatio: {
        auto: 'auto',
        square: '1',
        video: '1.777',
        phone: '0.5625',
      },
    },
  },
  plugins: [],
};
