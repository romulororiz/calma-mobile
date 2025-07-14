/// <reference types="nativewind/types" />

// Extend React Native component props to support className
declare module 'react-native' {
  interface ViewProps {
    className?: string;
  }

  interface TextProps {
    className?: string;
  }

  interface ScrollViewProps {
    className?: string;
  }

  interface TouchableOpacityProps {
    className?: string;
  }

  interface SafeAreaViewProps {
    className?: string;
  }

  interface ImageProps {
    className?: string;
  }

  interface FlatListProps<ItemT> {
    className?: string;
  }

  interface SectionListProps<ItemT, SectionT> {
    className?: string;
  }
}

// Extend Expo Linear Gradient
declare module 'expo-linear-gradient' {
  interface LinearGradientProps {
    className?: string;
  }
}

// Custom theme interface for NativeWind
declare module 'nativewind/types' {
  interface CustomTheme {
    colors: {
      ink: {
        DEFAULT: string;
        100: string;
        90: string;
        80: string;
        70: string;
      };
      aurora: {
        start: string;
        mid: string;
        end: string;
      };
      surface: {
        primary: string;
        secondary: string;
        elevated: string;
        glass: string;
        emergency: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
      };
      semantic: {
        success: string;
        warning: string;
        error: string;
        info: string;
      };
      energy: {
        high: string;
        medium: string;
        low: string;
      };
    };
    spacing: {
      unit: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    fontFamily: {
      nunito: string[];
      system: string[];
    };
  }
}

// Global CSS class names for NativeWind
declare global {
  namespace NativeWind {
    interface Theme extends CustomTheme {}
  }
}
