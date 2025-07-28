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
  {
    id: 'time',
    icon: ICON_NAMES.TIME,
    label: 'Time',
    route: 'Time',
  },
];

interface EmergencyOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  priority: 'high' | 'medium' | 'low';
  action: () => void;
}

interface EmergencyScreenProps {
  hideNavigation?: boolean;
  navigateToScreen?: (screenId: string) => void;
}

const EmergencyScreen: React.FC<EmergencyScreenProps> = ({
  hideNavigation = false,
  navigateToScreen,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('emergency');

  // Animation references for smaller navigation and emergency effects
  const navAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animate navigation and breathing effect on mount
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
      // Gentle breathing animation for calming effect
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.02,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const handleOption = (action: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    action();
  };

  const handleTabPress = (tab: (typeof navigationTabs)[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActiveTab(tab.id);
    if (tab.id !== 'emergency') {
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
        console.log('🧭 EmergencyScreen navigating to:', screenId, 'from route:', tab.route);
        navigateToScreen(screenId);
      } else {
        navigation.navigate(tab.route as never);
      }
    }
  };

  const emergencyOptions: EmergencyOption[] = [
    {
      id: 'calm',
      icon: 'calm',
      title: 'Your Calm Sequence',
      description: 'Brown noise + Box breathing + Visuals',
      color: '#10B981',
      priority: 'high',
      action: () => {
        // Navigate to calm sequence
        console.log('Calm sequence activated');
      },
    },
    {
      id: 'decision',
      icon: 'target',
      title: 'Decision Helper',
      description: 'Break the paralysis step by step',
      color: '#9F7AEA',
      priority: 'high',
      action: () => {
        // Navigate to decision helper
        console.log('Decision helper activated');
      },
    },
    {
      id: 'text',
      icon: 'text',
      title: 'Text Your Person',
      description: 'Send: "Need support, I\'m safe"',
      color: '#F59E0B',
      priority: 'medium',
      action: () => {
        // Send pre-written text
        console.log('Support text sent');
      },
    },
    {
      id: 'hotline',
      icon: 'phone',
      title: 'Crisis Hotline',
      description: 'Connect with trained support',
      color: '#EC4899',
      priority: 'medium',
      action: () => {
        // Call crisis hotline
        console.log('Crisis hotline called');
      },
    },
  ];

  const getCardStyle = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          borderColor: 'rgba(16, 185, 129, 0.2)',
        };
      case 'medium':
        return {
          backgroundColor: 'rgba(236, 72, 153, 0.08)',
          borderColor: 'rgba(236, 72, 153, 0.2)',
        };
      default:
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
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
          {/* Calming Header */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={200} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={400} iterationCount={1}>
              <Animated.View
                style={{
                  marginBottom: 40,
                  alignItems: 'center',
                  transform: [{ scale: pulseAnim }],
                }}>
                <NebulaText
                  size="2xl"
                  weight="bold"
                  variant="primary"
                  align="center"
                  style={{ marginBottom: 8 }}>
                  I&apos;m here with you 🫂
                </NebulaText>
                <NebulaText size="base" variant="secondary" align="center">
                  Let&apos;s get through this together
                </NebulaText>
              </Animated.View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Emergency Options */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={600} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={800} iterationCount={1}>
              <View>
                {emergencyOptions.map((option, index) => (
                  <NebulaAnimated
                    key={option.id}
                    animation="fadeIn"
                    duration={500}
                    delay={1000 + index * 150}
                    iterationCount={1}>
                    <TouchableOpacity
                      onPress={() => handleOption(option.action)}
                      activeOpacity={0.8}
                      style={{ marginBottom: 16 }}>
                      <NebulaCard
                        variant="default"
                        style={{
                          padding: 20,
                          borderWidth: 1,
                          ...getCardStyle(option.priority),
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                          <View
                            style={{
                              width: 56,
                              height: 56,
                              borderRadius: 16,
                              backgroundColor: `${option.color}20`,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Icon 
                              name={option.icon as any}
                              size={28}
                              color={option.color}
                            />
                          </View>
                          <View style={{ flex: 1 }}>
                            <NebulaText
                              size="base"
                              weight="bold"
                              variant="primary"
                              style={{ marginBottom: 4 }}>
                              {option.title}
                            </NebulaText>
                            <NebulaText size="sm" variant="secondary">
                              {option.description}
                            </NebulaText>
                          </View>
                          <View
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 12,
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <NebulaText size="sm" variant="tertiary">
                              →
                            </NebulaText>
                          </View>
                        </View>
                      </NebulaCard>
                    </TouchableOpacity>
                  </NebulaAnimated>
                ))}
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Reassurance Message */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1800} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={2000} iterationCount={1}>
              <NebulaCard
                variant="primary"
                style={{
                  padding: 25,
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}>
                  <NebulaText size="xl">💚</NebulaText>
                </View>
                <NebulaText
                  size="base"
                  variant="primary"
                  align="center"
                  weight="medium"
                  style={{ lineHeight: 24 }}>
                  This feeling is temporary.{'\n'}
                  You&apos;ve survived 100% of your hardest days.
                </NebulaText>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Quick Breathing Reminder */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={2200} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={2400} iterationCount={1}>
              <NebulaCard
                variant="default"
                style={{
                  padding: 20,
                  alignItems: 'center',
                  backgroundColor: 'rgba(159, 122, 234, 0.05)',
                  borderColor: 'rgba(159, 122, 234, 0.2)',
                  borderWidth: 1,
                }}>
                <NebulaText
                  size="sm"
                  weight="medium"
                  variant="tertiary"
                  align="center"
                  style={{ marginBottom: 8 }}>
                  Quick Breathing Exercise
                </NebulaText>
                <NebulaText size="sm" variant="secondary" align="center" style={{ lineHeight: 20 }}>
                  Breathe in for 4... Hold for 4... Out for 4... Hold for 4
                </NebulaText>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>
        </ScrollView>
    </NebulaGradient>
  );
};

export default EmergencyScreen;
