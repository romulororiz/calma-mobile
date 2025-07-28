import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/theme';

const MoodHistoryScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-ink">
      <LinearGradient colors={[COLORS.ink[100], '#0F0F1A']} className="absolute inset-0" />
      
      <View className="flex-1 items-center justify-center">
        <Text className="text-6xl mb-4">📊</Text>
        <Text className="font-nunito text-xl font-bold text-text-primary">
          Mood History
        </Text>
        <Text className="font-nunito text-md text-text-secondary mt-2">
          Coming soon...
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default MoodHistoryScreen; 