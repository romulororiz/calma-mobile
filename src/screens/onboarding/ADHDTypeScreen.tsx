import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import Button from '../../components/core/Button';
import ProgressDots from '../../components/core/ProgressDots';

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

  return (
    <View className="flex-1 bg-ink">

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-20">
          {/* Progress Dots */}
          <View className="mb-10">
            <ProgressDots total={4} current={1} />
          </View>

          {/* Header */}
          <Text className="mb-2 text-center text-2xl font-bold text-text-primary">
            How does your ADHD show up?
          </Text>
          <Text className="mb-8 text-center text-base text-text-secondary">
            This helps me personalize your experience
          </Text>

          {/* Type Options */}
          <View className="space-y-4">
            {adhdTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                onPress={() => handleTypeSelect(type.id)}
                className={`flex-row items-center gap-4 rounded-2xl border-2 p-4 ${
                  selectedType === type.id
                    ? 'border-aurora-start bg-surface-primary'
                    : 'border-transparent bg-surface-glass'
                }`}
                activeOpacity={0.7}>
                <View className="h-12 w-12 items-center justify-center rounded-xl bg-surface-primary">
                  <Text className="text-2xl">{type.icon}</Text>
                </View>
                <View className="flex-1">
                  <Text className="mb-1 text-base font-semibold text-text-primary">
                    {type.label}
                  </Text>
                  <Text className="text-sm text-text-secondary">{type.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 pb-10">
        <Button
          title="Continue"
          onPress={handleContinue}
          variant="primary"
          disabled={!selectedType}
        />
      </View>
    </View>
  );
};

export default ADHDTypeScreen;
