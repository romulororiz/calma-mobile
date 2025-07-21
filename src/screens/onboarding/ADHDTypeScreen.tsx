import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { NebulaAnimated, NebulaCard, NebulaButton, NebulaText } from '../../components/core';
import OnboardingContainer from '../../components/onboarding/OnboardingContainer';

interface ADHDType {
  id: string;
  icon: string;
  label: string;
  description: string;
}

const adhdTypes: ADHDType[] = [
  {
    id: 'hyperactive',
    icon: '⚡',
    label: 'Hyperactive',
    description: 'Always on the go, fidgety',
  },
  {
    id: 'inattentive',
    icon: '💭',
    label: 'Inattentive',
    description: 'Mind wanders, easily distracted',
  },
  {
    id: 'combined',
    icon: '🌀',
    label: 'Combined',
    description: 'A bit of both',
  },
  {
    id: 'not-sure',
    icon: '🤷',
    label: 'Not Sure',
    description: 'Still figuring it out',
  },
];

const ADHDTypeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeSelect = (typeId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedType(typeId);
  };

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Save selected type and navigate
    navigation.navigate('Main' as never);
  };

  const handleStepNavigation = (step: number) => {
    // Define the onboarding flow
    const screens = ['SetupIntro', 'ADHDType', 'Checkin', 'Main'];

    if (step >= 0 && step < screens.length) {
      if (step === 0) {
        navigation.navigate('SetupIntro' as never);
      } else if (step === 1) {
        // Stay on current screen
        return;
      } else {
        navigation.navigate(screens[step] as never);
      }
    }
  };

  return (
    <OnboardingContainer currentStep={1} totalSteps={4} onStepChange={handleStepNavigation}>
      {/* Header */}
      <NebulaAnimated animation="slideUp" duration={700} delay={300} iterationCount={1}>
        <NebulaText
          size="xl"
          weight="bold"
          variant="primary"
          align="center"
          style={{ marginBottom: 8, marginTop: 20 }}>
          How does your ADHD show up?
        </NebulaText>
        <NebulaText size="base" variant="secondary" align="center" style={{ marginBottom: 30 }}>
          This helps me personalize your experience
        </NebulaText>
      </NebulaAnimated>

      {/* Type Options */}
      <View style={{ flex: 1, gap: 12 }}>
        {adhdTypes.map((type, index) => (
          <NebulaAnimated
            key={type.id}
            animation="slideUp"
            duration={500}
            delay={500 + index * 100}
            iterationCount={1}>
            <TouchableOpacity onPress={() => handleTypeSelect(type.id)} activeOpacity={0.7}>
              <NebulaCard
                variant={selectedType === type.id ? 'primary' : 'default'}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderWidth: selectedType === type.id ? 2 : 0,
                  borderColor: selectedType === type.id ? '#6A5ACD' : 'transparent',
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    backgroundColor: 'rgba(106, 90, 205, 0.15)',
                    marginRight: 12,
                  }}>
                  <NebulaText size="lg">{type.icon}</NebulaText>
                </View>
                <View style={{ flex: 1 }}>
                  <NebulaText
                    size="base"
                    weight="medium"
                    variant="primary"
                    style={{ marginBottom: 2 }}>
                    {type.label}
                  </NebulaText>
                  <NebulaText size="sm" variant="secondary">
                    {type.description}
                  </NebulaText>
                </View>
              </NebulaCard>
            </TouchableOpacity>
          </NebulaAnimated>
        ))}
      </View>

      {/* Continue Button */}
      <NebulaAnimated animation="slideUp" duration={600} delay={900} iterationCount={1}>
        <View style={{ paddingBottom: 30 }}>
          <NebulaButton
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="md"
            disabled={!selectedType}
            animated={false}
          />
        </View>
      </NebulaAnimated>
    </OnboardingContainer>
  );
};

export default ADHDTypeScreen;
