import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
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
    id: 'time',
    icon: ICON_NAMES.TIME,
    label: 'Time',
    route: 'Time',
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

interface TimeTask {
  id: string;
  icon: string;
  name: string;
  estimatedTime: string;
  actualTime: string;
  isUrgent?: boolean;
  urgentMessage?: string;
  leaveIn?: string;
  severity: 'low' | 'medium' | 'high';
}

interface TimeScreenProps {
  hideNavigation?: boolean;
  navigateToScreen?: (screenId: string) => void;
}

const TimeScreen: React.FC<TimeScreenProps> = ({ hideNavigation = false, navigateToScreen }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('time');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Animation references for smaller navigation and time effects
  const navAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const clockPulse = useRef(new Animated.Value(1)).current;

  // Animate navigation and time effects on mount
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
      // Gentle clock pulse for time awareness
      Animated.loop(
        Animated.sequence([
          Animated.timing(clockPulse, {
            toValue: 1.03,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(clockPulse, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();

    // Update time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timeInterval);
  }, []);

  const handleTabPress = (tab: (typeof navigationTabs)[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActiveTab(tab.id);
    if (tab.id !== 'time') {
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
        console.log('🧭 TimeScreen navigating to:', screenId, 'from route:', tab.route);
        navigateToScreen(screenId);
      } else {
        navigation.navigate(tab.route as never);
      }
    }
  };

  const getTimeOfDay = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return 'Late night';
    if (hour < 12) return 'Morning focus window';
    if (hour < 17) return 'Afternoon energy';
    if (hour < 21) return 'Evening wind-down';
    return 'Night time';
  };

  const tasks: TimeTask[] = [
    {
      id: '1',
      icon: '📧',
      name: 'Email responses',
      estimatedTime: '15 min',
      actualTime: '1 hour',
      severity: 'medium',
    },
    {
      id: '2',
      icon: '🚿',
      name: 'Morning routine',
      estimatedTime: '20 min',
      actualTime: '45 min',
      severity: 'low',
    },
    {
      id: '3',
      icon: '🚗',
      name: 'Doctor appointment',
      estimatedTime: '',
      actualTime: '',
      isUrgent: true,
      leaveIn: '23 minutes',
      urgentMessage: 'Includes ADHD tax + parking time',
      severity: 'high',
    },
    {
      id: '4',
      icon: '💻',
      name: 'Project deadline',
      estimatedTime: '2 hours',
      actualTime: '5 hours',
      severity: 'high',
    },
    {
      id: '5',
      icon: '🛒',
      name: 'Grocery shopping',
      estimatedTime: '30 min',
      actualTime: '1.5 hours',
      severity: 'low',
    },
  ];

  const getTaskCardStyle = (severity: string, isUrgent?: boolean) => {
    if (isUrgent) {
      return {
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        borderWidth: 1,
      };
    }

    switch (severity) {
      case 'high':
        return {
          backgroundColor: 'rgba(236, 72, 153, 0.08)',
          borderColor: 'rgba(236, 72, 153, 0.2)',
          borderWidth: 1,
        };
      case 'medium':
        return {
          backgroundColor: 'rgba(245, 158, 11, 0.08)',
          borderColor: 'rgba(245, 158, 11, 0.2)',
          borderWidth: 1,
        };
      default:
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          borderColor: 'rgba(16, 185, 129, 0.2)',
          borderWidth: 1,
        };
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return '#EC4899';
      case 'medium':
        return '#F59E0B';
      default:
        return '#10B981';
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
          {/* Time Display Header */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={200} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={400} iterationCount={1}>
              <Animated.View
                style={{
                  marginBottom: 40,
                  alignItems: 'center',
                  transform: [{ scale: clockPulse }],
                }}>
                <NebulaText
                  size="3xl"
                  weight="light"
                  variant="primary"
                  align="center"
                  style={{ marginBottom: 8, letterSpacing: 2 }}>
                  {format(currentTime, 'h:mm a')}
                </NebulaText>
                <NebulaText size="lg" variant="secondary" align="center">
                  {getTimeOfDay()}
                </NebulaText>
              </Animated.View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* AI Time Insight */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={600} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={800} iterationCount={1}>
              <NebulaCard
                variant="primary"
                style={{
                  padding: 25,
                  marginBottom: 40,
                  backgroundColor: 'rgba(159, 122, 234, 0.08)',
                  borderColor: 'rgba(159, 122, 234, 0.2)',
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: 'rgba(159, 122, 234, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}>
                    <NebulaText size="lg">🧠</NebulaText>
                  </View>
                  <NebulaText
                    size="sm"
                    weight="bold"
                    variant="tertiary"
                    style={{ textTransform: 'uppercase', letterSpacing: 1.2 }}>
                    AI Time Insight
                  </NebulaText>
                </View>
                <NebulaText
                  size="base"
                  variant="primary"
                  weight="medium"
                  style={{ lineHeight: 24 }}>
                  You&apos;re in hyperfocus mode for{' '}
                  <NebulaText size="base" weight="bold" variant="primary">
                    1h 47min
                  </NebulaText>
                  . Remember to take a break and hydrate. 💧
                </NebulaText>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Time Reality Check Header */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1000} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1200} iterationCount={1}>
              <View style={{ marginBottom: 20 }}>
                <NebulaText size="xl" weight="bold" variant="primary" style={{ marginBottom: 8 }}>
                  Today&apos;s Time Reality
                </NebulaText>
                <NebulaText size="sm" variant="secondary">
                  Building awareness of your time patterns
                </NebulaText>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Task Reality Cards */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1400} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1600} iterationCount={1}>
              <View style={{ marginBottom: 40 }}>
                {tasks.map((task, index) => (
                  <NebulaAnimated
                    key={task.id}
                    animation="fadeIn"
                    duration={500}
                    delay={1800 + index * 150}
                    iterationCount={1}>
                    <NebulaCard
                      variant="default"
                      style={{
                        padding: 20,
                        marginBottom: 16,
                        ...getTaskCardStyle(task.severity, task.isUrgent),
                      }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                        <View
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            backgroundColor: `${getSeverityColor(task.severity)}20`,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <NebulaText size="xl">{task.icon}</NebulaText>
                        </View>

                        <View style={{ flex: 1 }}>
                          <NebulaText
                            size="base"
                            weight="bold"
                            variant="primary"
                            style={{ marginBottom: 6 }}>
                            {task.name}
                          </NebulaText>

                          {task.isUrgent ? (
                            <View>
                              <NebulaText
                                size="base"
                                weight="bold"
                                style={{ color: '#EF4444', marginBottom: 4 }}>
                                Leave in: {task.leaveIn}
                              </NebulaText>
                              <NebulaText size="xs" variant="secondary">
                                {task.urgentMessage}
                              </NebulaText>
                            </View>
                          ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              <NebulaText size="sm" variant="secondary">
                                You think: {task.estimatedTime}
                              </NebulaText>
                              <NebulaText size="sm" variant="tertiary">
                                →
                              </NebulaText>
                              <NebulaText
                                size="sm"
                                weight="medium"
                                style={{ color: getSeverityColor(task.severity) }}>
                                Actually: {task.actualTime}
                              </NebulaText>
                            </View>
                          )}
                        </View>

                        {/* Severity indicator */}
                        <View
                          style={{
                            width: 4,
                            height: 32,
                            borderRadius: 2,
                            backgroundColor: getSeverityColor(task.severity),
                            opacity: 0.8,
                          }}
                        />
                      </View>
                    </NebulaCard>
                  </NebulaAnimated>
                ))}
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Time Awareness Tips */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={2800} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={3000} iterationCount={1}>
              <NebulaCard
                variant="default"
                style={{
                  padding: 20,
                  alignItems: 'center',
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                  borderWidth: 1,
                }}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 12,
                  }}>
                  <NebulaText size="lg">💡</NebulaText>
                </View>
                <NebulaText
                  size="sm"
                  weight="medium"
                  variant="tertiary"
                  align="center"
                  style={{ marginBottom: 8 }}>
                  Time Blindness Tip
                </NebulaText>
                <NebulaText size="sm" variant="secondary" align="center" style={{ lineHeight: 20 }}>
                  Set timers for every task, even ones you think will be quick. Your brain will
                  start learning real time patterns.
                </NebulaText>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>
        </ScrollView>
    </NebulaGradient>
  );
};

export default TimeScreen;
