import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import {
  NebulaGradient,
  NebulaAnimated,
  NebulaCard,
  NebulaButton,
  NebulaText,
} from '../../components/core';

const { width: screenWidth } = Dimensions.get('window');

// Modern navigation configuration (smaller design)
const navigationTabs = [
  {
    id: 'home',
    icon: '🏠',
    label: 'Home',
    route: 'Home',
  },
  {
    id: 'checkin',
    icon: '💝',
    label: 'Check-in',
    route: 'Checkin',
  },
  {
    id: 'insights',
    icon: '📊',
    label: 'Insights',
    route: 'Insights',
  },
  {
    id: 'emergency',
    icon: '🆘',
    label: 'Emergency',
    route: 'Emergency',
  },
];

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

interface CheckinScreenProps {
  hideNavigation?: boolean;
  navigateToScreen?: (screenId: string) => void;
}

const CheckinScreen: React.FC<CheckinScreenProps> = ({
  hideNavigation = false,
  navigateToScreen,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('checkin');
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [selectedContexts, setSelectedContexts] = useState<string[]>([]);

  // Animation references for smaller navigation
  const navAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Animate navigation on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(navAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ),
    ]).start();
  }, []);

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

  const handleTabPress = (tab: (typeof navigationTabs)[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActiveTab(tab.id);
    if (tab.id !== 'checkin') {
      if (navigateToScreen) {
        navigateToScreen(tab.id);
      } else {
        navigation.navigate(tab.route as never);
      }
    }
  };

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: 100 + insets.bottom,
            paddingHorizontal: 30,
            paddingTop: 40,
          }}
          showsVerticalScrollIndicator={false}>
          {/* Header Text */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={200} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={400} iterationCount={1}>
              <NebulaText
                size="2xl"
                weight="bold"
                variant="primary"
                align="center"
                style={{ marginBottom: 40, lineHeight: 36 }}>
                How&apos;s your beautiful{'\n'}mind today?
              </NebulaText>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Emotion Grid */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={600} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={800} iterationCount={1}>
              <View style={{ marginBottom: 40, alignItems: 'center' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 16,
                    maxWidth: 300,
                  }}>
                  {emotions.map((emotion, index) => (
                    <NebulaAnimated
                      key={emotion.id}
                      animation="fadeIn"
                      duration={500}
                      delay={1000 + index * 100}
                      iterationCount={1}>
                      <TouchableOpacity
                        onPress={() => handleEmotionSelect(emotion.id)}
                        activeOpacity={0.8}>
                        <NebulaCard
                          variant={selectedEmotion === emotion.id ? 'primary' : 'default'}
                          style={{
                            width: 72,
                            height: 72,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: selectedEmotion === emotion.id ? 2 : 0,
                            borderColor: selectedEmotion === emotion.id ? '#9F7AEA' : 'transparent',
                          }}>
                          <NebulaText size="xl">{emotion.emoji}</NebulaText>
                        </NebulaCard>
                      </TouchableOpacity>
                    </NebulaAnimated>
                  ))}
                </View>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Context Section */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1400} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1600} iterationCount={1}>
              <View style={{ marginBottom: 40 }}>
                <NebulaText
                  size="base"
                  weight="medium"
                  variant="secondary"
                  align="center"
                  style={{ marginBottom: 20 }}>
                  Add some context
                </NebulaText>

                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 12,
                  }}>
                  {contexts.map((context, index) => (
                    <NebulaAnimated
                      key={context.id}
                      animation="fadeIn"
                      duration={400}
                      delay={1800 + index * 80}
                      iterationCount={1}>
                      <TouchableOpacity
                        onPress={() => handleContextToggle(context.id)}
                        activeOpacity={0.8}>
                        <View
                          style={{
                            borderRadius: 20,
                            paddingHorizontal: 14,
                            paddingVertical: 8,
                            backgroundColor: selectedContexts.includes(context.id)
                              ? 'rgba(159, 122, 234, 0.2)'
                              : 'rgba(255, 255, 255, 0.05)',
                            borderWidth: 1,
                            borderColor: selectedContexts.includes(context.id)
                              ? 'rgba(159, 122, 234, 0.4)'
                              : 'rgba(255, 255, 255, 0.1)',
                          }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                            <NebulaText size="sm">{context.emoji}</NebulaText>
                            <NebulaText size="sm" weight="medium" variant="primary">
                              {context.label}
                            </NebulaText>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </NebulaAnimated>
                  ))}
                </View>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Save Button */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={2200} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={2400} iterationCount={1}>
              <View style={{ paddingTop: 20 }}>
                <NebulaButton
                  title="Save Check-in"
                  onPress={handleSaveCheckin}
                  variant="primary"
                  size="md"
                  disabled={!selectedEmotion}
                  animated={false}
                />
              </View>
            </NebulaAnimated>
          </NebulaAnimated>
        </ScrollView>
      </SafeAreaView>
    </NebulaGradient>
  );
};

export default CheckinScreen;
