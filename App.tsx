import './global.css';
import React from 'react';
import { View, Text } from 'react-native';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className="bg-deep-space flex-1 items-center justify-center">
        <Text className="text-lg text-text-primary">Loading Calma...</Text>
      </View>
    );
  }

  return <RootNavigator />;
}
