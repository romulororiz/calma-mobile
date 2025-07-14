import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';

import NavHeader from '../../components/core/NavHeader';
import GlassCard from '../../components/core/GlassCard';
import Button from '../../components/core/Button';

const ParentBridgeScreen: React.FC = () => {
  const handleGenerateGuide = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Generate PDF guide
  };

  return (
    <View className="flex-1 bg-ink">
      <NavHeader title="Share My ADHD" showMenu={true} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center px-6 pb-6 pt-8">
          <Text className="mb-2 text-2xl font-bold text-text-primary">Help Them Understand</Text>
          <Text className="text-base text-text-secondary">Bridge the gap with love</Text>
        </View>

        <View className="px-6">
          {/* When I Say Section */}
          <GlassCard className="mb-4 p-6">
            <Text className="mb-4 text-lg font-semibold text-aurora-start">
              When I say &quot;I forgot&quot;...
            </Text>

            <View className="mb-3 rounded-xl bg-surface-primary p-4">
              <Text className="text-sm text-text-primary">
                <Text className="font-semibold">My experience:</Text> The thought was there, then
                something grabbed my attention, and it vanished completely.
              </Text>
            </View>

            <View className="bg-success/5 rounded-xl p-4">
              <Text className="text-sm text-text-primary">
                <Text className="font-semibold">What helps:</Text> Visual reminders work best. Text
                me right before, not hours ahead.
              </Text>
            </View>
          </GlassCard>

          {/* Weekly Wins */}
          <GlassCard variant="primary" className="mb-6 p-6">
            <Text className="mb-4 text-base font-semibold text-text-primary">
              This week&apos;s wins to share:
            </Text>

            <View className="space-y-2">
              <Text className="text-sm text-text-primary">✓ Managed all appointments on time</Text>
              <Text className="text-sm text-text-primary">✓ Remembered to eat lunch daily</Text>
              <Text className="text-sm text-text-primary">
                ✓ Used coping strategies successfully
              </Text>
              <Text className="text-sm text-text-primary">✓ Asked for help when needed</Text>
            </View>
          </GlassCard>

          {/* Generate Guide Button */}
          <Button
            title="Generate My ADHD Guide"
            onPress={handleGenerateGuide}
            variant="primary"
            icon="📤"
            iconPosition="left"
          />

          <Text className="mt-3 text-center text-sm text-text-tertiary">
            Creates a personalized PDF explaining your specific ADHD
          </Text>

          {/* Understanding Cards */}
          <View className="mt-8 space-y-3">
            <GlassCard className="p-4">
              <Text className="mb-2 text-base font-semibold text-text-primary">
                It&apos;s not laziness
              </Text>
              <Text className="text-sm text-text-secondary">
                My brain literally processes dopamine differently. Tasks that seem simple can feel
                impossible without the right support.
              </Text>
            </GlassCard>

            <GlassCard className="p-4">
              <Text className="mb-2 text-base font-semibold text-text-primary">
                Time blindness is real
              </Text>
              <Text className="text-sm text-text-secondary">
                I&apos;m not being disrespectful when I&apos;m late. My brain doesn&apos;t track time like yours
                does.
              </Text>
            </GlassCard>

            <GlassCard className="p-4">
              <Text className="mb-2 text-base font-semibold text-text-primary">I care deeply</Text>
              <Text className="text-sm text-text-secondary">
                When I forget something important to you, it hurts me too. It&apos;s not a reflection of
                how much I care.
              </Text>
            </GlassCard>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ParentBridgeScreen;
