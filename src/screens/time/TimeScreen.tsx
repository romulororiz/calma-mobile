import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/theme';

const TimeScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-ink">
      <StatusBar style="light" backgroundColor={COLORS.ink[100]} />
      <LinearGradient colors={[COLORS.ink[100], '#0F0F1A']} className="absolute inset-0" />
      
      <View className="flex-1 items-center justify-center">
        <Text className="text-6xl mb-4">⏰</Text>
        <Text className="font-nunito text-xl font-bold text-text-primary">
          Time Reality Check
        </Text>
        <Text className="font-nunito text-md text-text-secondary mt-2">
          Coming soon...
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TimeScreen; 