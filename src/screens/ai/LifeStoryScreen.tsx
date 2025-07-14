import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import NavHeader from '../../components/core/NavHeader';
import GlassCard from '../../components/core/GlassCard';

interface Achievement {
  id: string;
  emoji: string;
  label: string;
}

const achievements: Achievement[] = [
  { id: '1', emoji: '💪', label: '3 difficult calls' },
  { id: '2', emoji: '🎨', label: '2 creative ideas' },
  { id: '3', emoji: '💜', label: 'Helped a friend' },
  { id: '4', emoji: '🌱', label: 'Started project' },
];

const LifeStoryScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-ink">
      <NavHeader title="Your Story" showMenu={true} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center px-6 pb-6 pt-8">
          <Text className="mb-2 text-3xl font-bold text-text-primary">This Week You...</Text>
          <Text className="text-base text-text-secondary">Accomplished more than you realize</Text>
        </View>

        {/* Achievement Stats */}
        <View className="mb-6 px-6">
          <GlassCard variant="primary" className="p-6">
            {/* Achievement Grid */}
            <View className="mb-6 flex-row flex-wrap gap-3">
              {achievements.map((achievement) => (
                <View
                  key={achievement.id}
                  className="w-[47%] items-center rounded-xl bg-surface-glass p-4">
                  <Text className="mb-2 text-3xl">{achievement.emoji}</Text>
                  <Text className="text-center text-sm text-text-primary">{achievement.label}</Text>
                </View>
              ))}
            </View>

            {/* Days Tracked */}
            <View className="items-center">
              <Text className="mb-2 text-5xl font-bold text-text-primary">365</Text>
              <Text className="text-base text-text-secondary">Days of growth tracked</Text>
            </View>
          </GlassCard>
        </View>

        {/* Memory Card */}
        <View className="px-6">
          <GlassCard className="p-6">
            <Text className="mb-3 text-base font-semibold text-text-primary">Remember when...</Text>
            <Text className="text-base leading-relaxed text-text-secondary">
              Last month you thought you couldn&apos;t handle that presentation? You did it beautifully.
              Your unique perspective made it memorable.
            </Text>
          </GlassCard>
        </View>

        {/* Life Story Prompt */}
        <View className="mt-6 px-6">
          <GlassCard className="items-center p-6">
            <Text className="mb-4 text-6xl">📖</Text>
            <Text className="mb-2 text-lg font-semibold text-text-primary">
              Your Life Story Keeper
            </Text>
            <Text className="text-center text-sm text-text-secondary">
              Every small win matters. Every challenge overcome is growth.
            </Text>
          </GlassCard>
        </View>
      </ScrollView>
    </View>
  );
};

export default LifeStoryScreen;
