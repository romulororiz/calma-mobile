import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import GlassCard from '../../components/core/GlassCard';

interface EmergencyOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: () => void;
}

const EmergencyScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const handleOption = (action: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    action();
  };

  const emergencyOptions: EmergencyOption[] = [
    {
      id: 'calm',
      icon: '🌊',
      title: 'Your Calm Sequence',
      description: 'Brown noise + Box breathing + Visuals',
      action: () => {
        // Navigate to calm sequence
      },
    },
    {
      id: 'decision',
      icon: '🎯',
      title: 'Decision Helper',
      description: 'Break the paralysis step by step',
      action: () => {
        // Navigate to decision helper
      },
    },
    {
      id: 'text',
      icon: '💬',
      title: 'Text Your Person',
      description: 'Send: "Need support, I\'m safe"',
      action: () => {
        // Send pre-written text
      },
    },
    {
      id: 'hotline',
      icon: '📞',
      title: 'Crisis Hotline',
      description: 'Connect with trained support',
      action: () => {
        // Call crisis hotline
      },
    },
  ];

  return (
    <View className="flex-1 bg-ink">
      {/* Emergency Background Gradient */}
      <LinearGradient
        colors={['rgba(236, 72, 153, 0.1)', '#0A0A0F']}
        className="absolute inset-0"
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center px-6 pb-8" style={{ paddingTop: insets.top + 20 }}>
          <Text className="mb-2 text-3xl font-bold text-text-primary">I&apos;m here with you</Text>
          <Text className="text-lg text-text-secondary">Let&apos;s get through this together</Text>
        </View>

        {/* Emergency Options */}
        <View className="px-6">
          {emergencyOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleOption(option.action)}
              activeOpacity={0.8}>
              <GlassCard
                variant="emergency"
                className="relative mb-4 flex-row items-center gap-4 overflow-hidden p-4">
                {/* Animated scan line */}
                {/* <View className="absolute left-0 right-0 top-0 h-0.5 bg-aurora-mid opacity-40" /> */}

                <View className="h-14 w-14 items-center justify-center rounded-2xl bg-aurora-mid/20">
                  <Text className="text-3xl">{option.icon}</Text>
                </View>

                <View className="flex-1">
                  <Text className="mb-1 text-lg font-semibold text-text-primary">
                    {option.title}
                  </Text>
                  <Text className="text-sm text-text-secondary">{option.description}</Text>
                </View>
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>

        {/* Reassurance Message */}
        <View className="mt-8 px-6">
          <Text className="text-center text-base leading-relaxed text-text-secondary">
            This feeling is temporary.{'\n'}
            You&apos;ve survived 100% of your hardest days.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmergencyScreen;
