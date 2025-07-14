import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import NavHeader from '../../components/core/NavHeader';
import GlassCard from '../../components/core/GlassCard';
import Button from '../../components/core/Button';

interface Emotion {
  id: string;
  emoji: string;
  label: string;
}

interface Context {
  id: string;
  emoji: string;
  label: string;
}

const emotions: Emotion[] = [
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
  { id: 'sad', emoji: '😔', label: 'Sad' },
  { id: 'angry', emoji: '😤', label: 'Angry' },
  { id: 'anxious', emoji: '😰', label: 'Anxious' },
  { id: 'loved', emoji: '🫂', label: 'Loved' },
];

const contexts: Context[] = [
  { id: 'meds', emoji: '💊', label: 'Meds taken' },
  { id: 'tired', emoji: '😴', label: 'Tired' },
  { id: 'energetic', emoji: '⚡', label: 'Energetic' },
  { id: 'home', emoji: '🏠', label: 'At home' },
  { id: 'working', emoji: '💼', label: 'Working' },
  { id: 'caffeinated', emoji: '☕', label: 'Caffeinated' },
];

const CheckinScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedContexts, setSelectedContexts] = useState<string[]>([]);

  const handleEmotionSelect = (emotionId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedEmotion(emotionId);
  };

  const handleContextToggle = (contextId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedContexts((prev) =>
      prev.includes(contextId) ? prev.filter((id) => id !== contextId) : [...prev, contextId]
    );
  };

  const handleSaveCheckin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Save check-in data
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-ink">
      <NavHeader title="Daily Check-in" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        <View className="items-center px-6 py-8">
          <Text className="mb-8 text-center text-3xl font-bold text-text-primary">
            How&apos;s your beautiful{'\n'}mind today?
          </Text>

          {/* Emotion Grid */}
          <View className="mb-10 w-full max-w-[300px]">
            <View className="flex-row flex-wrap justify-center gap-6">
              {emotions.map((emotion) => (
                <TouchableOpacity
                  key={emotion.id}
                  onPress={() => handleEmotionSelect(emotion.id)}
                  className={`h-20 w-20 items-center justify-center rounded-2xl border-2 ${
                    selectedEmotion === emotion.id
                      ? 'border-aurora-start bg-surface-primary'
                      : 'border-transparent bg-surface-glass'
                  }`}
                  activeOpacity={0.7}>
                  <Text className="text-4xl">{emotion.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Context Section */}
          <View className="w-full">
            <Text className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-text-tertiary">
              ADD CONTEXT (OPTIONAL)
            </Text>

            <View className="flex-row flex-wrap justify-center gap-2">
              {contexts.map((context) => (
                <TouchableOpacity
                  key={context.id}
                  onPress={() => handleContextToggle(context.id)}
                  className={`rounded-full border px-4 py-2 ${
                    selectedContexts.includes(context.id)
                      ? 'border-transparent bg-aurora-start'
                      : 'border-white/5 bg-surface-glass'
                  }`}
                  activeOpacity={0.7}>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm">{context.emoji}</Text>
                    <Text
                      className={`text-sm ${
                        selectedContexts.includes(context.id)
                          ? 'font-semibold text-white'
                          : 'text-text-primary'
                      }`}>
                      {context.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View className="px-6 pb-8">
        <Button
          title="Save Check-in"
          onPress={handleSaveCheckin}
          variant="primary"
          disabled={!selectedEmotion}
        />
      </View>
    </View>
  );
};

export default CheckinScreen;
