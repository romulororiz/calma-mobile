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
import CalmaLogo from '../../components/core/CalmaLogo';

const { width: screenWidth } = Dimensions.get('window');

// Modern navigation configuration with creative design
const navigationTabs = [
  {
    id: 'home',
    icon: '🏠',
    label: 'Home',
    gradient: ['#9F7AEA', '#EC4899'],
    route: 'Home',
  },
  {
    id: 'checkin',
    icon: '💝',
    label: 'Check-in',
    gradient: ['#EC4899', '#F59E0B'],
    route: 'Checkin',
  },
  {
    id: 'insights',
    icon: '📊',
    label: 'Insights',
    gradient: ['#F59E0B', '#10B981'],
    route: 'Insights',
  },
  {
    id: 'settings',
    icon: '⚙️',
    label: 'Settings',
    gradient: ['#10B981', '#9F7AEA'],
    route: 'Settings',
  },
];

const quickActions = [
  {
    id: 'time',
    icon: '⏰',
    title: 'Time Reality',
    subtitle: 'Ground yourself',
    color: '#9F7AEA',
    route: 'Time',
  },
  {
    id: 'chaos',
    icon: '🌀',
    title: 'Chaos→Clarity',
    subtitle: 'Organize thoughts',
    color: '#EC4899',
    route: 'ChaosToClarity',
  },
  {
    id: 'messages',
    icon: '💌',
    title: 'Message Check',
    subtitle: 'Quick responses',
    color: '#F59E0B',
    route: 'MessageCheck',
  },
  {
    id: 'lifeStory',
    icon: '🌍',
    title: 'Life Story',
    subtitle: 'Your journey',
    color: '#10B981',
    route: 'LifeStory',
  },
  {
    id: 'parent',
    icon: '👪',
    title: 'Parent Bridge',
    subtitle: 'Share your journey',
    color: '#10B981',
    route: 'ParentBridge',
  },
];

interface HomeScreenProps {
  hideNavigation?: boolean;
  navigateToScreen?: (screenId: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ hideNavigation = false, navigateToScreen }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('home');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Animation references for floating navigation
  const navAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

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

  const handleQuickAction = (action: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const actionItem = quickActions.find((item) => item.id === action);
    if (actionItem && navigateToScreen) {
      // Map route names to screen IDs for internal navigation
      const screenIdMap: { [key: string]: string } = {
        Time: 'time',
        ChaosToClarity: 'chaos',
        MessageCheck: 'messages',
        LifeStory: 'lifestory',
        ParentBridge: 'parentbridge',
      };
      const screenId = screenIdMap[actionItem.route] || actionItem.route.toLowerCase();
      navigateToScreen(screenId);
    } else if (actionItem) {
      navigation.navigate(actionItem.route as never);
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120 + insets.bottom,
            paddingHorizontal: 30,
            paddingTop: 40,
          }}>
          {/* Personalized Greeting */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={300} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={500} iterationCount={1}>
              <View style={{ marginBottom: 30 }}>
                <NebulaText
                  size="2xl"
                  weight="bold"
                  variant="primary"
                  align="center"
                  style={{ marginBottom: 8 }}>
                  {getGreeting()}, Beautiful
                </NebulaText>
                <NebulaText size="base" variant="secondary" align="center">
                  {formatDate()} • {formatTime()}
                </NebulaText>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* AI Insight Card */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={700} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={900} iterationCount={1}>
              <NebulaCard variant="primary" style={{ marginBottom: 30, padding: 25 }}>
                <NebulaText
                  size="xl"
                  weight="bold"
                  variant="primary"
                  style={{ marginBottom: 12, height: 40 }}
                  gradient="starlight">
                  Your energy peaks at 2 PM today
                </NebulaText>
                <NebulaText size="sm" variant="secondary" style={{ lineHeight: 24 }}>
                  Perfect time for that important email you&apos;ve been avoiding. I&apos;ll remind
                  you when the moment is right.
                </NebulaText>
              </NebulaCard>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Quick Stats */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1100} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1300} iterationCount={1}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 30,
                  gap: 16,
                }}>
                <View style={{ flex: 1 }}>
                  <NebulaCard
                    variant="default"
                    style={{ alignItems: 'center', paddingVertical: 25, paddingHorizontal: 20 }}>
                    <NebulaText
                      size="2xl"
                      weight="bold"
                      gradient="nebula"
                      style={{ marginBottom: 4 }}>
                      7
                    </NebulaText>
                    <NebulaText size="sm" variant="tertiary">
                      Day Streak
                    </NebulaText>
                  </NebulaCard>
                </View>
                <View style={{ flex: 1 }}>
                  <NebulaCard
                    variant="default"
                    style={{ alignItems: 'center', paddingVertical: 25, paddingHorizontal: 20 }}>
                    <NebulaText
                      size="2xl"
                      weight="bold"
                      gradient="nebula"
                      style={{ marginBottom: 4 }}>
                      85%
                    </NebulaText>
                    <NebulaText size="sm" variant="tertiary">
                      Mood Trend ↗
                    </NebulaText>
                  </NebulaCard>
                </View>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* Quick Actions Grid */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={1400} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1500} iterationCount={1}>
              <View style={{ marginBottom: 20 }}>
                <NebulaText size="lg" weight="bold" variant="primary">
                  Quick Actions
                </NebulaText>
              </View>
            </NebulaAnimated>
          </NebulaAnimated>

          <NebulaAnimated animation="fadeIn" duration={800} delay={1500} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={1600} iterationCount={1}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 16,
                  justifyContent: 'space-between',
                }}>
                {quickActions.map((action, index) => (
                  <NebulaAnimated
                    key={action.id}
                    animation="slideUp"
                    duration={500}
                    delay={1000 + index * 100}
                    iterationCount={1}>
                    <TouchableOpacity
                      onPress={() => handleQuickAction(action.id)}
                      activeOpacity={0.8}
                      style={{ width: (screenWidth - 76) / 2 }}>
                      <NebulaCard
                        variant="default"
                        style={{
                          paddingVertical: 25,
                          paddingHorizontal: 15,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            backgroundColor: `${action.color}20`,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 16,
                          }}>
                          <NebulaText size="xl">{action.icon}</NebulaText>
                        </View>
                        <NebulaText
                          size="base"
                          weight="medium"
                          variant="primary"
                          align="center"
                          style={{ marginBottom: 4 }}>
                          {action.title}
                        </NebulaText>
                        <NebulaText size="sm" variant="tertiary" align="center">
                          {action.subtitle}
                        </NebulaText>
                      </NebulaCard>
                    </TouchableOpacity>
                  </NebulaAnimated>
                ))}
              </View>
            </NebulaAnimated>
          </NebulaAnimated>
        </ScrollView>

        {/* Floating Emergency Button */}
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            if (navigateToScreen) {
              navigateToScreen('emergency');
            } else {
              navigation.navigate('Emergency' as never);
            }
          }}
          activeOpacity={0.8}
          style={{
            position: 'absolute',
            top: 20,
            right: 10,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: 'rgba(236, 72, 153, 0.15)',
            borderWidth: 2,
            borderColor: 'rgba(236, 72, 153, 0.3)',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#EC4899',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
          }}>
          <NebulaText size="lg">🆘</NebulaText>
        </TouchableOpacity>
      </SafeAreaView>
    </NebulaGradient>
  );
};

export default HomeScreen;
