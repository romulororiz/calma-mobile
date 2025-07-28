import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import {
  NebulaGradient,
  NebulaAnimated,
  NebulaCard,
  NebulaButton,
  NebulaText,
  Icon,
  ICON_NAMES,
} from '../../components/core';

const { width: screenWidth } = Dimensions.get('window');

// Navigation configuration
const navigationTabs = [
  {
    id: 'home',
    icon: ICON_NAMES.HOME,
    label: 'Home',
    route: 'Home',
  },
  {
    id: 'checkin',
    icon: ICON_NAMES.CHECKIN,
    label: 'Check-in',
    route: 'Checkin',
  },
  {
    id: 'insights',
    icon: ICON_NAMES.INSIGHTS,
    label: 'Insights',
    route: 'Insights',
  },
  {
    id: 'emergency',
    icon: ICON_NAMES.EMERGENCY,
    label: 'Emergency',
    route: 'Emergency',
  },
];

interface Emotion {
  id: string;
  icon: string;
  label: string;
  color: string;
}

interface Context {
  id: string;
  icon: string;
  label: string;
  color: string;
}

const emotions: Emotion[] = [
  { id: 'happy', icon: 'happy', label: 'Happy', color: '#10B981' },
  { id: 'excited', icon: 'excited', label: 'Excited', color: '#9F7AEA' },
  { id: 'calm', icon: 'calm-emotion', label: 'Calm', color: '#10B981' },
  { id: 'sad', icon: 'sad', label: 'Sad', color: '#EF4444' },
  { id: 'angry', icon: 'angry', label: 'Angry', color: '#F59E0B' },
  { id: 'anxious', icon: 'anxious', label: 'Anxious', color: '#EC4899' },
  { id: 'loved', icon: 'loved', label: 'Loved', color: '#FF0000' },
];

const contexts: Context[] = [
  { id: 'meds', icon: 'medication', label: 'Meds taken', color: '#10B981' },
  { id: 'tired', icon: 'tired', label: 'Tired', color: '#EF4444' },
  { id: 'energetic', icon: 'energy', label: 'Energetic', color: '#9F7AEA' },
  { id: 'home', icon: 'home', label: 'At home', color: '#10B981' },
  { id: 'working', icon: 'work', label: 'Working', color: '#9F7AEA' },
  { id: 'caffeinated', icon: 'coffee', label: 'Caffeinated', color: '#10B981' },
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
        // Map route names to correct screen IDs
        const screenIdMap: { [key: string]: string } = {
          Home: 'home',
          Checkin: 'checkin',
          Insights: 'insights',
          Emergency: 'emergency',
          Time: 'time',
        };
        const screenId = screenIdMap[tab.route] || tab.id;
        console.log('🧭 CheckinScreen navigating to:', screenId, 'from route:', tab.route);
        navigateToScreen(screenId);
      } else {
        navigation.navigate(tab.route as never);
      }
    }
  };

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
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
                            width: 70,
                            height: 70,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: selectedEmotion === emotion.id ? 1 : 1,
                            borderColor: selectedEmotion === emotion.id ? '#9F7AEA' : 'transparent',
                          }}>
                          <Icon 
                            name={emotion.icon as any}
                            size={28}
                            color={emotion.color}
                          />
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
              <View style={{ marginBottom: 20 }}>
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
                            <Icon 
                              name={context.icon as any}
                              size={18}
                              color="#FFFFFF"
                            />
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
              <View style={{ paddingTop: 20, paddingHorizontal: 40 }}>
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
    </NebulaGradient>
  );
};

export default CheckinScreen;
