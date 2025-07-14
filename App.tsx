import './global.css';
import React from 'react';
import { View, Text } from 'react-native';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-ink">
        <Text className="text-lg text-text-primary">Loading Calma...</Text>
      </View>
    );
  }

  return <RootNavigator />;
}
