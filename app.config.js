import 'dotenv/config';

export default {
  expo: {
    name: 'calma-mobile',
    slug: 'calma-mobile',
    version: '1.0.0',
    scheme: 'calma',
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    experiments: {
      tsconfigPaths: true,
    },
    plugins: [],
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'ai.calma-app',
      usesAppleSignIn: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'ai.calma-app',
    },
    extra: {
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
};
