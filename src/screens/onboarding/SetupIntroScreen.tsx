import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { NebulaAnimated, NebulaCard, NebulaButton, NebulaText } from '../../components/core';
import OnboardingContainer from '../../components/onboarding/OnboardingContainer';

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

  const handleStepNavigation = (step: number) => {
    // Define the onboarding flow
    const screens = ['SetupIntro', 'ADHDType', 'Checkin', 'Main'];

    if (step >= 0 && step < screens.length) {
      if (step <= 0) {
        // Stay on current screen or go back to welcome
        return;
      } else {
        navigation.navigate(screens[step] as never);
      }
    }
  };

  return (
    <OnboardingContainer currentStep={0} totalSteps={4} onStepChange={handleStepNavigation}>
      {/* Welcome Card */}
      <NebulaAnimated animation="fadeIn" duration={800} delay={300} iterationCount={1}>
        <NebulaCard
          variant="primary"
          style={{ marginBottom: 40, alignItems: 'center', marginTop: 20 }}
          padding={40}>
          <NebulaAnimated animation="fadeIn" duration={600} delay={600} iterationCount={1}>
            <NebulaText size="3xl" style={{ marginBottom: 25 }}>
              👋
            </NebulaText>
          </NebulaAnimated>
          <NebulaAnimated animation="slideUp" duration={600} delay={800} iterationCount={1}>
            <NebulaText
              size="2xl"
              weight="bold"
              variant="primary"
              align="center"
              style={{ marginBottom: 20 }}>
              Hi, I&apos;m Calma
            </NebulaText>
          </NebulaAnimated>
          <NebulaAnimated animation="fadeIn" duration={600} delay={1000} iterationCount={1}>
            <NebulaText size="base" variant="secondary" align="center" style={{ lineHeight: 24 }}>
              I&apos;m here to help you understand your beautiful ADHD mind. Let&apos;s set things
              up in a way that works for YOU.
            </NebulaText>
          </NebulaAnimated>
        </NebulaCard>
      </NebulaAnimated>

      {/* Spacer */}
      <View style={{ flex: 1 }} />

      {/* Actions */}
      <NebulaAnimated animation="slideUp" duration={600} delay={1200} iterationCount={1}>
        <View>
          <NebulaButton
            title="Next"
            onPress={handleNext}
            variant="primary"
            size="md"
            icon="→"
            iconPosition="right"
            animated={false}
            style={{ marginBottom: 15 }}
          />

          <NebulaButton
            title="Skip Setup (Use Defaults)"
            onPress={handleSkip}
            variant="secondary"
            size="md"
            animated={false}
          />
        </View>
      </NebulaAnimated>
    </OnboardingContainer>
  );
};

export default SetupIntroScreen;
