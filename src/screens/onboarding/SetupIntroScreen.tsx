import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import Button from '../../components/core/Button';
import GlassCard from '../../components/core/GlassCard';
import ProgressDots from '../../components/core/ProgressDots';

const SetupIntroScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('ADHDType' as never);
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Main' as never);
  };

  return (
    <View className="flex-1 bg-ink">

      <View className="flex-1 px-6 pb-10 pt-20">
        {/* Progress Dots */}
        <View className="mb-10">
          <ProgressDots total={4} current={0} />
        </View>

        {/* Welcome Card */}
        <GlassCard className="mb-8 items-center p-8">
          <Text className="mb-6 text-6xl">👋</Text>
          <Text className="mb-4 text-center text-2xl font-bold text-text-primary">
            Hi, I&apos;m Calma
          </Text>
          <Text className="text-center text-base leading-relaxed text-text-secondary">
            I&apos;m here to help you understand your beautiful ADHD mind. Let&apos;s set things up in a way
            that works for YOU.
          </Text>
        </GlassCard>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Actions */}
        <View>
          <Button
            title="Next"
            onPress={handleNext}
            variant="primary"
            icon="→"
            iconPosition="right"
          />

          <Button
            title="Skip Setup (Use Defaults)"
            onPress={handleSkip}
            variant="secondary"
            className="mt-3"
          />
        </View>
      </View>
    </View>
  );
};

export default SetupIntroScreen;
