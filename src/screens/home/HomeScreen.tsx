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
import CalmaLogo from '../../components/core/CalmaLogo';

const { width: screenWidth } = Dimensions.get('window');

// Navigation tabs configuration
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
];

const quickActions = [
  {
    id: 'time',
    icon: ICON_NAMES.TIME,
    title: 'Time Reality',
    subtitle: 'Ground yourself',
    color: '#9F7AEA',
    route: 'Time',
  },
  {
    id: 'chaos',
    icon: ICON_NAMES.CHAOS,
    title: 'Chaos→Clarity',
    subtitle: 'Organize thoughts',
    color: '#EC4899',
    route: 'ChaosToClarity',
  },
  {
    id: 'messages',
    icon: ICON_NAMES.MESSAGES,
    title: 'Message Check',
    subtitle: 'Quick responses',
    color: '#F59E0B',
    route: 'MessageCheck',
  },
  {
    id: 'lifeStory',
    icon: ICON_NAMES.LIFESTORY,
    title: 'Life Story',
    subtitle: 'Your journey',
    color: '#10B981',
    route: 'LifeStory',
  },
  {
    id: 'parent',
    icon: ICON_NAMES.PARENT,
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
    if (actionItem) {
      if (navigateToScreen) {
        // Map route names to screen IDs for internal navigation
        const screenIdMap: { [key: string]: string } = {
          Time: 'time',
          ChaosToClarity: 'chaos',
          MessageCheck: 'messages',
          LifeStory: 'lifestory',
          ParentBridge: 'parentbridge',
          Emergency: 'emergency',
        };
        const screenId = screenIdMap[actionItem.route] || actionItem.route.toLowerCase();
        console.log('🧭 Navigating to screen:', screenId, 'from route:', actionItem.route);
        navigateToScreen(screenId);
      } else {
        // Fallback for when not in MainContainer
        navigation.navigate(actionItem.route as never);
      }
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
                  size="xl"
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
                  gradient="nebula">
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
                    variant="primary"
                    style={{ 
                      alignItems: 'center', 
                      paddingVertical: 28, 
                      paddingHorizontal: 20,
                      position: 'relative',
                    }}>
                    {/* Icon overlay */}
                    <View style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      opacity: 0.3,
                    }}>
                      <Icon name="fire" size={30}/>
                    </View>
                    <NebulaText
                      size="3xl"
                      weight="bold"
                      gradient="cosmic"
                      style={{ marginBottom: 6, alignSelf: 'center' }}>
                      7
                    </NebulaText>
                    <NebulaText size="sm" variant="secondary" style={{ fontWeight: '600' }}>
                      Day Streak
                    </NebulaText>
                  </NebulaCard>
                </View>
                <View style={{ flex: 1 }}>
                  <NebulaCard
                    variant="cosmic"
                    style={{ 
                      alignItems: 'center', 
                      paddingVertical: 28, 
                      paddingHorizontal: 20,
                      position: 'relative',
                    }}>
                    {/* Icon overlay */}
                    <View style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      opacity: 0.3,
                    }}>
                      <Icon name="trending-up" size={30}/>
                    </View>
                    <NebulaText
                      size="3xl"
                      weight="bold"
                      gradient="cosmic"
                      style={{ marginBottom: 6, alignSelf: 'center' }}>
                      85%
                    </NebulaText>
                    <NebulaText size="sm" variant="secondary" style={{ fontWeight: '600' }}>
                      Mood Trend
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
                          <Icon 
                            name={action.icon as any}
                            size={24}
                            color="#FFFFFF"
                          />
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
    </NebulaGradient>
  );
};

export default HomeScreen;
