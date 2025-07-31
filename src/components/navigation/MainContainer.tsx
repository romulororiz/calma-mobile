import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { NebulaGradient, NebulaCard, NebulaText, Icon, ICON_NAMES } from '../core';

// Import screens
import HomeScreen from '../../screens/home/HomeScreen';
import CheckinScreen from '../../screens/checkin/CheckinScreen';
import InsightsScreen from '../../screens/insights/InsightsScreen';
import SettingsScreen from '../../screens/settings/SettingsScreen';
import TimeScreen from '../../screens/time/TimeScreen';
import EmergencyScreen from '../../screens/emergency/EmergencyScreen';
import ChaosToClarityScreen from '../../screens/ai/ChaosToClarityScreen';
import MessageCheckScreen from '../../screens/ai/MessageCheckScreen';
import LifeStoryScreen from '../../screens/ai/LifeStoryScreen';
import ParentBridgeScreen from '../../screens/support/ParentBridgeScreen';

const { width: screenWidth } = Dimensions.get('window');

// Main navigation tabs (always visible)
const mainNavigationTabs = [
  {
    id: 'home',
    icon: ICON_NAMES.HOME,
    label: 'Home',
    gradient: ['#9F7AEA', '#EC4899'],
  },
  {
    id: 'checkin',
    icon: ICON_NAMES.CHECKIN,
    label: 'Check-in',
    gradient: ['#EC4899', '#F59E0B'],
  },
  {
    id: 'insights',
    icon: ICON_NAMES.INSIGHTS,
    label: 'Insights',
    gradient: ['#F59E0B', '#10B981'],
  },
  {
    id: 'emergency',
    icon: ICON_NAMES.EMERGENCY,
    label: 'SOS',
    gradient: ['#EC4899', '#EF4444'],
  },
  {
    id: 'settings',
    icon: ICON_NAMES.SETTINGS,
    label: 'Settings',
    gradient: ['#10B981', '#06B6D4'],
  },
];

// All available screens mapping
const screenComponents = {
  home: HomeScreen,
  checkin: CheckinScreen,
  insights: InsightsScreen,
  settings: SettingsScreen,
  time: TimeScreen,
  emergency: EmergencyScreen,
  chaos: ChaosToClarityScreen,
  messages: MessageCheckScreen,
  lifestory: LifeStoryScreen,
  parentbridge: ParentBridgeScreen,
};

interface MainContainerProps {
  initialScreen?: keyof typeof screenComponents;
}

const MainContainer: React.FC<MainContainerProps> = ({ initialScreen = 'home' }) => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState<keyof typeof screenComponents>(initialScreen);

  // Animation references for professional navigation effects
  const navAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;

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

  const handleTabPress = (tab: (typeof mainNavigationTabs)[0]) => {
    if (tab.id === activeTab && currentScreen === tab.id) return; // Don't animate if same tab and screen

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Smooth content transition
    Animated.sequence([
      Animated.timing(contentOpacity, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setActiveTab(tab.id);
    setCurrentScreen(tab.id as keyof typeof screenComponents);
  };

  // Function to navigate to any screen (for use by child screens)
  const navigateToScreen = (screenId: keyof typeof screenComponents) => {
    if (screenId === currentScreen) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Smooth content transition
    Animated.sequence([
      Animated.timing(contentOpacity, {
        toValue: 0.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setCurrentScreen(screenId);

    // Update active tab if navigating to a main tab screen
    const mainTabForScreen = mainNavigationTabs.find((tab) => tab.id === screenId);
    if (mainTabForScreen) {
      setActiveTab(screenId);
    }
  };

  // Get current active component
  const ActiveComponent = screenComponents[currentScreen] || HomeScreen;

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Content Area */}
        <Animated.View
          style={{
            flex: 1,
            opacity: contentOpacity,
          }}>
          <ActiveComponent 
            navigateToScreen={navigateToScreen}
          />
        </Animated.View>

        {/* Fixed Bottom Navigation */}
        <Animated.View
          style={{
            position: 'absolute',
            bottom: insets.bottom + 16,
            left: 16,
            right: 16,
            transform: [
              {
                translateY: navAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          }}>
          <NebulaCard
            variant="elevated"
            padding={0}
            style={{
              borderRadius: 20,
              backgroundColor: 'rgba(26, 26, 36, 0.75)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.08)',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.3,
              shadowRadius: 24,
              elevation: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 12,
                paddingHorizontal: 16,
              }}>
              {mainNavigationTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => handleTabPress(tab)}
                    activeOpacity={0.7}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      paddingVertical: 10,
                      paddingHorizontal: 6,
                      borderRadius: 16,
                      overflow: 'hidden',
                    }}>
                    {isActive && (
                      <LinearGradient
                        colors={[`${tab.gradient[0]}15`, `${tab.gradient[1]}15`]}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          borderRadius: 16,
                        }}
                      />
                    )}
                    <Animated.View
                      style={{
                        alignItems: 'center',
                        transform: [
                          {
                            scale: isActive ? 1.05 : 1,
                          },
                        ],
                      }}>
                      <View
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 4,
                          overflow: 'hidden',
                        }}>
                        {isActive ? (
                          <LinearGradient
                            colors={[`${tab.gradient[0]}40`, `${tab.gradient[1]}40`]}
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                            }}
                          />
                        ) : (
                          <View
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            }}
                          />
                        )}
                        <Icon 
                          name={tab.icon as any}
                          size={16}
                          color={isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)'}
                        />
                      </View>
                      <NebulaText
                        size="xs"
                        weight={isActive ? 'medium' : 'regular'}
                        variant={isActive ? 'primary' : 'tertiary'}
                        align="center">
                        {tab.label}
                      </NebulaText>
                    </Animated.View>

                    {/* Active indicator */}
                    {isActive && (
                      <Animated.View
                        style={{
                          position: 'absolute',
                          bottom: -1,
                          width: 16,
                          height: 2,
                          borderRadius: 1,
                          backgroundColor: glowAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [`${tab.gradient[0]}60`, `${tab.gradient[1]}FF`],
                          }),
                        }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </NebulaCard>
        </Animated.View>
      </SafeAreaView>
    </NebulaGradient>
  );
};

export default MainContainer;
