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

interface EnergyBar {
  id: string;
  height: 'low' | 'medium' | 'high';
  time: string;
  percentage: number;
}

const energyBars: EnergyBar[] = [
  { id: '1', height: 'low', time: '9AM', percentage: 30 },
  { id: '2', height: 'low', time: '', percentage: 25 },
  { id: '3', height: 'medium', time: '12PM', percentage: 60 },
  { id: '4', height: 'high', time: '', percentage: 85 },
  { id: '5', height: 'high', time: '3PM', percentage: 90 },
  { id: '6', height: 'medium', time: '', percentage: 65 },
  { id: '7', height: 'low', time: '6PM', percentage: 35 },
];

const insights = [
  {
    id: 'peak',
    icon: ICON_NAMES.LIGHTBULB,
    title: 'Peak Window: 2-5 PM',
    subtitle: 'Schedule important tasks here',
    color: '#10B981',
    type: 'success',
  },
  {
    id: 'warning',
    icon: ICON_NAMES.WARNING,
    title: 'Stress Pattern Detected',
    subtitle: '3 warning signs today. Take breaks.',
    color: '#EC4899',
    type: 'warning',
  },
  {
    id: 'focus',
    icon: ICON_NAMES.TARGET,
    title: 'Best Focus Time',
    subtitle: 'Mornings after coffee (9:30 AM)',
    color: '#9F7AEA',
    type: 'info',
  },
];

const weeklyPatterns = [
  'Best focus after morning coffee (9:30 AM)',
  'Energy crashes if lunch is skipped',
  'Creative ideas peak during walks',
  'Better sleep improves next-day performance',
];

interface InsightsScreenProps {
  hideNavigation?: boolean;
  navigateToScreen?: (screenId: string) => void;
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({
  hideNavigation = false,
  navigateToScreen,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('insights');

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

  const handleTabPress = (tab: (typeof navigationTabs)[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActiveTab(tab.id);
    if (tab.id !== 'insights') {
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
        console.log('🧭 InsightsScreen navigating to:', screenId, 'from route:', tab.route);
        navigateToScreen(screenId);
      } else {
        navigation.navigate(tab.route as never);
      }
    }
  };

  const getEnergyColor = (height: string) => {
    switch (height) {
      case 'low':
        return '#F87171';
      case 'medium':
        return '#FBBF24';
      case 'high':
        return '#34D399';
      default:
        return '#6B7280';
    }
  };

  const getInsightCardStyle = (type: string) => {
    switch (type) {
      case 'success':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          borderColor: 'rgba(16, 185, 129, 0.2)',
        };
      case 'warning':
        return {
          backgroundColor: 'rgba(236, 72, 153, 0.08)',
          borderColor: 'rgba(236, 72, 153, 0.2)',
        };
      case 'info':
        return {
          backgroundColor: 'rgba(159, 122, 234, 0.08)',
          borderColor: 'rgba(159, 122, 234, 0.2)',
        };
      default:
        return {};
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
          {/* Header */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={200} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={400} iterationCount={1}>
              <View style={{ marginBottom: 40, alignItems: 'center' }}>
                <NebulaText
                  size="2xl"
                  weight="bold"
                  variant="primary"
                  align="center"
                  style={{ marginBottom: 8 }}>
                  Tomorrow&apos;s Forecast
                </NebulaText>
                <NebulaText size="base" variant="secondary" align="center">
                  Based on your patterns
                </NebulaText>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Energy Chart */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={600} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={800} iterationCount={1}>
              <NebulaCard variant="primary" style={{ marginBottom: 30, padding: 25 }}>
                <NebulaText
                  size="sm"
                  weight="medium"
                  variant="tertiary"
                  style={{ marginBottom: 20, letterSpacing: 1, textTransform: 'uppercase' }}>
                  Energy Levels
                </NebulaText>

                {/* Chart */}
                <View style={{ height: 120, marginBottom: 16 }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      gap: 6,
                    }}>
                    {energyBars.map((bar, index) => (
                      <NebulaAnimated
                        key={bar.id}
                        animation="slideUp"
                        duration={600}
                        delay={1000 + index * 100}
                        iterationCount={1}>
                        <View
                          style={{
                            flex: 1,
                            height: `${bar.percentage}%`,
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            overflow: 'hidden',
                          }}>
                          <View
                            style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: '100%',
                              backgroundColor: getEnergyColor(bar.height),
                              opacity: 0.8,
                              borderRadius: 4,
                            }}
                          />
                        </View>
                      </NebulaAnimated>
                    ))}
                  </View>
                </View>

                {/* Time Labels */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {energyBars.map((bar) => (
                    <View key={bar.id} style={{ flex: 1, alignItems: 'center' }}>
                      {bar.time ? (
                        <NebulaText size="xs" variant="tertiary">
                          {bar.time}
                        </NebulaText>
                      ) : (
                        <View />
                      )}
                    </View>
                  ))}
                </View>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Insight Cards */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1400} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1600} iterationCount={1}>
              <View style={{ marginBottom: 30 }}>
                {insights.map((insight, index) => (
                  <NebulaAnimated
                    key={insight.id}
                    animation="fadeIn"
                    duration={500}
                    delay={1800 + index * 150}
                    iterationCount={1}>
                    <NebulaCard
                      variant="default"
                      style={{
                        marginBottom: 16,
                        padding: 20,
                        borderWidth: 1,
                        ...getInsightCardStyle(insight.type),
                      }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <View
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            backgroundColor: `${insight.color}20`,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Icon name={insight.icon} size={24} color={insight.color} />
                        </View>
                        <View style={{ flex: 1 }}>
                          <NebulaText
                            size="base"
                            weight="bold"
                            variant="primary"
                            style={{ marginBottom: 4 }}>
                            {insight.title}
                          </NebulaText>
                          <NebulaText size="sm" variant="secondary">
                            {insight.subtitle}
                          </NebulaText>
                        </View>
                      </View>
                    </NebulaCard>
                  </NebulaAnimated>
                ))}
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Weekly Patterns */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={2200} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={2400} iterationCount={1}>
              <NebulaCard variant="default" style={{ padding: 25 }}>
                <NebulaText size="lg" weight="bold" variant="primary" style={{ marginBottom: 20 }}>
                  This Week&apos;s Patterns
                </NebulaText>

                <View style={{ gap: 16 }}>
                  {weeklyPatterns.map((pattern, index) => (
                    <NebulaAnimated
                      key={index}
                      animation="fadeIn"
                      duration={400}
                      delay={2600 + index * 100}
                      iterationCount={1}>
                      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
                        <View
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#9F7AEA',
                            marginTop: 8,
                          }}
                        />
                        <NebulaText
                          size="sm"
                          variant="secondary"
                          style={{ flex: 1, lineHeight: 20 }}>
                          {pattern}
                        </NebulaText>
                      </View>
                    </NebulaAnimated>
                  ))}
                </View>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>
        </ScrollView>
    </NebulaGradient>
  );
};

export default InsightsScreen;
