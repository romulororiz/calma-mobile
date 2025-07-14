import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import EmotionSelector from '../../components/adhd/EmotionSelector';
import ContextPills from '../../components/adhd/ContextPills';
import AuroraButton from '../../components/core/AuroraButton';
import { COLORS, SPACING } from '../../constants/theme';

// Default context options
const CONTEXT_OPTIONS = [
  // Medication
  { id: 'med-taken', label: 'Meds Taken', icon: '💊', category: 'medication' as const },
  { id: 'med-missed', label: 'Missed Meds', icon: '⚠️', category: 'medication' as const },
  { id: 'med-late', label: 'Late Meds', icon: '🕐', category: 'medication' as const },
  
  // Energy
  { id: 'energy-high', label: 'High Energy', icon: '⚡', category: 'energy' as const },
  { id: 'energy-low', label: 'Low Energy', icon: '🔋', category: 'energy' as const },
  { id: 'energy-crash', label: 'Energy Crash', icon: '📉', category: 'energy' as const },
  
  // Location
  { id: 'home', label: 'Home', icon: '🏠', category: 'location' as const },
  { id: 'work', label: 'Work', icon: '💼', category: 'location' as const },
  { id: 'social', label: 'Social', icon: '👥', category: 'location' as const },
  
  // Activity
  { id: 'working', label: 'Working', icon: '💻', category: 'activity' as const },
  { id: 'resting', label: 'Resting', icon: '😴', category: 'activity' as const },
  { id: 'exercising', label: 'Exercising', icon: '🏃', category: 'activity' as const },
  { id: 'studying', label: 'Studying', icon: '📚', category: 'activity' as const },
  { id: 'eating', label: 'Eating', icon: '🍽️', category: 'activity' as const },
  { id: 'stressed', label: 'Stressed', icon: '😰', category: 'activity' as const },
];

interface CheckinScreenProps {
  onSubmit?: (data: { emotion: string; context: string[]; timestamp: Date }) => void;
  onEmergency?: () => void;
}

export default function CheckinScreen({
  onSubmit,
  onEmergency,
}: CheckinScreenProps) {
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [selectedContext, setSelectedContext] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const screenWidth = Dimensions.get('window').width;

  // Emergency emotions that should trigger emergency mode
  const emergencyEmotions = ['anxious', 'overwhelmed', 'crisis'];
  const isEmergency = emergencyEmotions.includes(selectedEmotion);

  const canSubmit = selectedEmotion !== '';

  const handleEmotionChange = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  const handleContextChange = (context: string[]) => {
    setSelectedContext(context);
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const data = {
        emotion: selectedEmotion,
        context: selectedContext,
        timestamp: new Date(),
      };

      if (isEmergency && onEmergency) {
        onEmergency();
      } else if (onSubmit) {
        onSubmit(data);
      }

      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={[COLORS.ink[100], COLORS.ink[90], COLORS.ink[80]]}
        className="flex-1"
      >
        <StatusBar style='light' />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: SPACING.lg,
            paddingVertical: SPACING.xl,
            // Ensure 70% whitespace - content takes max 30% of screen width
            maxWidth: screenWidth * 0.7,
            alignSelf: 'center',
            width: '100%',
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          {/* Header */}
          <View className="items-center mb-16 pt-10">
            <Text className="text-center text-text-primary font-nunito text-2xl font-bold mb-2 leading-tight">
              How are you right now?
            </Text>

            <Text className="text-center text-text-secondary font-nunito text-base leading-relaxed">
              Just pick what feels right
            </Text>
          </View>

          {/* Emotion Selection */}
          <View className="mb-16 items-center">
            <EmotionSelector
              selected={selectedEmotion}
              onChange={handleEmotionChange}
              size='lg'
              showLabels={true}
              hapticFeedback={true}
            />
          </View>

          {/* Context Selection - Only show if emotion is selected */}
          {selectedEmotion && (
            <View className="mb-16 items-center">
              <ContextPills
                title='Add context (optional)'
                options={CONTEXT_OPTIONS}
                selected={selectedContext}
                onChange={handleContextChange}
                maxSelections={3}
                hapticFeedback={true}
              />
            </View>
          )}

          {/* Spacer to push button to bottom */}
          <View className="flex-1" style={{ minHeight: SPACING.xl }} />

          {/* Submit Button */}
          <View className="pt-6 items-center">
            <AuroraButton
              variant={isEmergency ? 'emergency' : 'primary'}
              size='lg'
              fullWidth
              onPress={handleSubmit}
              disabled={!canSubmit}
              loading={isSubmitting}
              glowEffect={isEmergency}
              hapticFeedback={true}
            >
              {isEmergency ? 'Get Support' : 'Continue'}
            </AuroraButton>

            {/* Skip option for those who change their mind */}
            {selectedEmotion && (
              <AuroraButton
                variant='ghost'
                size='md'
                onPress={() => {
                  setSelectedEmotion('');
                  setSelectedContext([]);
                }}
                className="mt-4"
              >
                Start Over
              </AuroraButton>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
