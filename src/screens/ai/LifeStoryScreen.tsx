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
    id: 'lifestory',
    icon: ICON_NAMES.LIFESTORY,
    label: 'Life Story',
    route: 'LifeStory',
  },
  {
    id: 'emergency',
    icon: ICON_NAMES.EMERGENCY,
    label: 'Emergency',
    route: 'Emergency',
  },
];

interface Achievement {
  id: string;
  icon: string;
  label: string;
  description: string;
  date: string;
  impact: 'small' | 'medium' | 'large';
}

const achievements: Achievement[] = [
  {
    id: '1',
    icon: 'energy',
    label: '3 difficult calls',
    description: 'Made important phone calls despite anxiety',
    date: 'Today',
    impact: 'large',
  },
  {
    id: '2',
    icon: 'palette',
    label: '2 creative ideas',
    description: 'Brainstormed solutions for work project',
    date: 'Yesterday',
    impact: 'medium',
  },
  {
    id: '3',
    icon: 'heart',
    label: 'Helped a friend',
    description: 'Listened and provided emotional support',
    date: '2 days ago',
    impact: 'large',
  },
  {
    id: '4',
    icon: 'star',
    label: 'Started project',
    description: 'Began organizing digital photos',
    date: 'This week',
    impact: 'medium',
  },
  {
    id: '5',
    icon: 'energy',
    label: 'Morning walk',
    description: 'Went for a 20-minute walk despite low energy',
    date: 'Today',
    impact: 'small',
  },
  {
    id: '6',
    icon: 'meditation',
    label: 'Mindful moment',
    description: 'Practiced breathing exercise for 5 minutes',
    date: 'Yesterday',
    impact: 'small',
  },
];

interface LifeStoryScreenProps {
  hideNavigation?: boolean;
  navigateToScreen?: (screenId: string) => void;
}

const LifeStoryScreen: React.FC<LifeStoryScreenProps> = ({
  hideNavigation = false,
  navigateToScreen,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('lifestory');

  // Animation references for professional life story effects
  const navAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  // Animate navigation and shimmer effects on mount
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
      // Gentle shimmer for achievements
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  const handleTabPress = (tab: (typeof navigationTabs)[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActiveTab(tab.id);
    if (tab.id !== 'lifestory') {
      if (navigateToScreen) {
        // Map route names to correct screen IDs
        const screenIdMap: { [key: string]: string } = {
          Home: 'home',
          Checkin: 'checkin',
          Insights: 'insights',
          Emergency: 'emergency',
          LifeStory: 'lifestory',
        };
        const screenId = screenIdMap[tab.route] || tab.id;
        console.log('🧭 LifeStory navigating to:', screenId, 'from route:', tab.route);
        navigateToScreen(screenId);
      } else {
        navigation.navigate(tab.route as never);
      }
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'large':
        return '#EC4899';
      case 'medium':
        return '#F59E0B';
      default:
        return '#10B981';
    }
  };

  const getImpactSize = (impact: string) => {
    switch (impact) {
      case 'large':
        return 'large';
      case 'medium':
        return 'medium';
      default:
        'small';
    }
  };

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: hideNavigation ? 40 : 100 + insets.bottom,
            paddingHorizontal: 30,
            paddingTop: 40,
          }}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={200} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={400} iterationCount={1}>
              <View style={{ marginBottom: 40, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <Icon 
                    name="book"
                    size={24}
                    color="#FFFFFF"
                    style={{ marginRight: 8 }}
                  />
                  <NebulaText
                    size="2xl"
                    weight="bold"
                    variant="primary">
                    Your Life Story
                  </NebulaText>
                </View>
                <NebulaText size="base" variant="secondary" align="center">
                  Every small win matters. Here&apos;s your proof.
                </NebulaText>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Today's Achievements Summary */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={600} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={800} iterationCount={1}>
              <NebulaCard
                variant="primary"
                style={{
                  padding: 25,
                  marginBottom: 30,
                  backgroundColor: 'rgba(159, 122, 234, 0.08)',
                  borderColor: 'rgba(159, 122, 234, 0.2)',
                  borderWidth: 1,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: 'rgba(159, 122, 234, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    borderWidth: 2,
                    borderColor: 'rgba(159, 122, 234, 0.3)',
                  }}>
                  <NebulaText size="2xl">🌟</NebulaText>
                </View>
                <NebulaText
                  size="xl"
                  weight="bold"
                  variant="primary"
                  align="center"
                  style={{ marginBottom: 8 }}>
                  Today&apos;s Wins: 3
                </NebulaText>
                <NebulaText size="sm" variant="secondary" align="center">
                  You&apos;re building momentum, one achievement at a time
                </NebulaText>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Achievements Timeline */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1000} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1200} iterationCount={1}>
              <View style={{ marginBottom: 30 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: 'rgba(236, 72, 153, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,
                    }}>
                    <NebulaText size="sm">🏆</NebulaText>
                  </View>
                  <NebulaText
                    size="sm"
                    weight="bold"
                    variant="tertiary"
                    style={{ textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    Recent Achievements
                  </NebulaText>
                </View>

                <View style={{ gap: 16 }}>
                  {achievements.map((achievement, index) => (
                    <NebulaAnimated
                      key={achievement.id}
                      animation="fadeIn"
                      duration={500}
                      delay={1400 + index * 150}
                      iterationCount={1}>
                      <NebulaCard
                        variant="default"
                        style={{
                          padding: 20,
                          backgroundColor: `${getImpactColor(achievement.impact)}08`,
                          borderColor: `${getImpactColor(achievement.impact)}20`,
                          borderWidth: 1,
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                          <View
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 12,
                              backgroundColor: `${getImpactColor(achievement.impact)}20`,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: 16,
                            }}>
                            <Icon 
                                name={achievement.icon as any}
                                size={24}
                                color={getImpactColor(achievement.impact)}
                              />
                          </View>

                          <View style={{ flex: 1 }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 4,
                              }}>
                              <NebulaText size="base" weight="bold" variant="primary">
                                {achievement.label}
                              </NebulaText>
                              <View
                                style={{
                                  paddingHorizontal: 8,
                                  paddingVertical: 3,
                                  borderRadius: 12,
                                  backgroundColor: `${getImpactColor(achievement.impact)}20`,
                                }}>
                                <NebulaText
                                  size="xs"
                                  weight="medium"
                                  style={{ color: getImpactColor(achievement.impact) }}>
                                  {achievement.date}
                                </NebulaText>
                              </View>
                            </View>
                            <NebulaText size="sm" variant="secondary" style={{ marginBottom: 8 }}>
                              {achievement.description}
                            </NebulaText>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: 3,
                                  backgroundColor: getImpactColor(achievement.impact),
                                  marginRight: 6,
                                }}
                              />
                              <NebulaText
                                size="xs"
                                weight="medium"
                                style={{
                                  color: getImpactColor(achievement.impact),
                                  textTransform: 'capitalize',
                                }}>
                                {achievement.impact} impact
                              </NebulaText>
                            </View>
                          </View>
                        </View>
                      </NebulaCard>
                    </NebulaAnimated>
                  ))}
                </View>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Encouragement Message */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={2400} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={2600} iterationCount={1}>
              <NebulaCard
                variant="default"
                style={{
                  padding: 25,
                  alignItems: 'center',
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                  borderWidth: 1,
                }}>
                <Animated.View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                    transform: [
                      {
                        scale: shimmerAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.05],
                        }),
                      },
                    ],
                  }}>
                  <NebulaText size="xl">💚</NebulaText>
                </Animated.View>
                <NebulaText
                  size="base"
                  weight="medium"
                  variant="primary"
                  align="center"
                  style={{ marginBottom: 8 }}>
                  You&apos;re Stronger Than You Know
                </NebulaText>
                <NebulaText size="sm" variant="secondary" align="center" style={{ lineHeight: 20 }}>
                  Each achievement, no matter how small, is proof of your resilience. Keep building
                  your story, one win at a time.
                </NebulaText>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>
        </ScrollView>
    </NebulaGradient>
  );
};

export default LifeStoryScreen;
