import './global.css';
import React, { useState } from 'react';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import RootNavigator from './src/navigation/RootNavigator';
import { SplashScreen } from './src/components/core';
import { AuthProvider } from './src/contexts/AuthContext';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (!fontsLoaded || showSplash) {
    return (
      <SplashScreen
        variant="loading"
        duration={3000} // 3 seconds - adjust this to your preference!
        onAnimationComplete={fontsLoaded ? handleSplashComplete : undefined}
        showLogo={true}
        showText={true}
      />
    );
  }

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
