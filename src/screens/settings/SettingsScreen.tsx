import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Animated, Switch, Dimensions, Alert } from 'react-native';
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
import { authService } from '../../services/auth';

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
    id: 'settings',
    icon: ICON_NAMES.SETTINGS,
    label: 'Settings',
    route: 'Settings',
  },
  {
    id: 'emergency',
    icon: ICON_NAMES.EMERGENCY,
    label: 'Emergency',
    route: 'Emergency',
  },
];

interface SettingItem {
  id: string;
  icon: string;
  label: string;
  value: string;
  hasToggle?: boolean;
  isEnabled?: boolean;
  color?: string;
  onPress?: () => void;
}

interface SettingsScreenProps {
  hideNavigation?: boolean;
  navigateToScreen?: (screenId: string) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  hideNavigation = false,
  navigateToScreen,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('settings');
  const [smartReminders, setSmartReminders] = useState(true);
  const [focusMode, setFocusMode] = useState(true);
  const [cloudSync, setCloudSync] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  // Animation references for professional settings effects
  const navAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const profilePulse = useRef(new Animated.Value(1)).current;

  // Animate navigation and profile effects on mount
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
      // Gentle profile pulse for personalization
      Animated.loop(
        Animated.sequence([
          Animated.timing(profilePulse, {
            toValue: 1.02,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(profilePulse, {
            toValue: 1,
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
    if (tab.id !== 'settings') {
      if (navigateToScreen) {
        // Map route names to correct screen IDs
        const screenIdMap: { [key: string]: string } = {
          Home: 'home',
          Checkin: 'checkin',
          Insights: 'insights',
          Settings: 'settings',
          Emergency: 'emergency',
        };
        const screenId = screenIdMap[tab.route] || tab.id;
        console.log('🧭 SettingsScreen navigating to:', screenId, 'from route:', tab.route);
        navigateToScreen(screenId);
      } else {
        navigation.navigate(tab.route as never);
      }
    }
  };

  const handleToggle = (setting: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    switch (setting) {
      case 'reminders':
        setSmartReminders(!smartReminders);
        break;
      case 'focus':
        setFocusMode(!focusMode);
        break;
      case 'sync':
        setCloudSync(!cloudSync);
        break;
      case 'notifications':
        setNotificationsEnabled(!notificationsEnabled);
        break;
      case 'haptic':
        setHapticFeedback(!hapticFeedback);
        break;
    }
  };

  const adhdSettings: SettingItem[] = [
    {
      id: 'reminders',
      icon: 'notification',
      label: 'Smart Reminders',
      value: 'Gentle nudges only',
      hasToggle: true,
      isEnabled: smartReminders,
      color: '#9F7AEA',
      onPress: () => handleToggle('reminders'),
    },
    {
      id: 'focus',
      icon: 'moon',
      label: 'Focus Mode',
      value: 'Auto-detect hyperfocus',
      hasToggle: true,
      isEnabled: focusMode,
      color: '#EC4899',
      onPress: () => handleToggle('focus'),
    },
    {
      id: 'medication',
      icon: 'medication',
      label: 'Medication Tracking',
      value: 'Daily at 8 AM',
      hasToggle: false,
      color: '#10B981',
      onPress: () => {
        // Navigate to medication settings
      },
    },
    {
      id: 'time-tracking',
      icon: 'hourglass',
      label: 'Time Blindness Helper',
      value: 'Enabled with gentle alerts',
      hasToggle: false,
      color: '#F59E0B',
      onPress: () => {
        console.log('Navigate to time tracking settings');
      },
    },
  ];

  const systemSettings: SettingItem[] = [
    {
      id: 'notifications',
      icon: 'notification',
      label: 'Push Notifications',
      value: 'Calm & supportive tone',
      hasToggle: true,
      isEnabled: notificationsEnabled,
      color: '#06B6D4',
      onPress: () => handleToggle('notifications'),
    },
    {
      id: 'haptic',
      icon: 'haptic',
      label: 'Haptic Feedback',
      value: 'Gentle vibrations',
      hasToggle: true,
      isEnabled: hapticFeedback,
      color: '#8B5CF6',
      onPress: () => handleToggle('haptic'),
    },
    {
      id: 'appearance',
      icon: 'palette',
      label: 'Appearance',
      value: 'Nebula Calm theme',
      hasToggle: false,
      color: '#EC4899',
      onPress: () => {
        console.log('Navigate to appearance settings');
      },
    },
  ];

  const privacySettings: SettingItem[] = [
    {
      id: 'encryption',
      icon: 'lock',
      label: 'Data Encryption',
      value: 'End-to-end encrypted',
      hasToggle: false,
      color: '#10B981',
    },
    {
      id: 'sync',
      icon: 'cloud',
      label: 'Cloud Sync',
      value: 'Across all devices',
      hasToggle: true,
      isEnabled: cloudSync,
      color: '#3B82F6',
      onPress: () => handleToggle('sync'),
    },
    {
      id: 'analytics',
      icon: 'insights',
      label: 'Usage Analytics',
      value: 'Anonymous insights only',
      hasToggle: false,
      color: '#6B7280',
      onPress: () => {
        console.log('Navigate to analytics settings');
      },
    },
  ];

  const supportSettings: SettingItem[] = [
    {
      id: 'help',
      icon: 'support',
      label: 'Help & Support',
      value: 'FAQs, contact, guides',
      hasToggle: false,
      color: '#F59E0B',
      onPress: () => {
        console.log('Navigate to help');
      },
    },
    {
      id: 'feedback',
      icon: 'messages',
      label: 'Send Feedback',
      value: 'Help us improve Calma',
      hasToggle: false,
      color: '#EC4899',
      onPress: () => {
        console.log('Open feedback form');
      },
    },
    {
      id: 'about',
      icon: 'info',
      label: 'About Calma',
      value: 'Version 1.0.0',
      hasToggle: false,
      color: '#6B7280',
      onPress: () => {
        console.log('Navigate to about');
      },
    },
    {
      id: 'logout',
      icon: 'logout',
      label: 'Log Out',
      value: 'Sign out of your account',
      hasToggle: false,
      color: '#EF4444',
      onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

        Alert.alert(
          'Log Out',
          'Are you sure you want to log out?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
            },
            {
              text: 'Log Out',
              style: 'destructive',
              onPress: async () => {
                try {
                  await authService.signOut();
                  // Navigate to Welcome screen and clear navigation stack
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Welcome' as never }],
                  });
                } catch (error) {
                  console.error('Logout error:', error);
                  Alert.alert('Error', 'Failed to log out. Please try again.');
                }
              },
            },
          ],
          { cancelable: true }
        );
      },
    },
  ];

  const renderSettingItem = (setting: SettingItem, index: number, delay: number) => (
    <NebulaAnimated
      key={setting.id}
      animation="fadeIn"
      duration={400}
      delay={delay + index * 100}
      iterationCount={1}>
      <TouchableOpacity onPress={setting.onPress} activeOpacity={0.8}>
        <NebulaCard
          variant="default"
          style={{
            padding: 16,
            marginBottom: 12,
            backgroundColor: `${setting.color || '#9F7AEA'}08`,
            borderColor: `${setting.color || '#9F7AEA'}20`,
            borderWidth: 1,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: `${setting.color || '#9F7AEA'}20`,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}>
              <Icon 
                name={setting.icon as any}
                size={20}
                color={setting.color || '#9F7AEA'}
              />
            </View>

            <View style={{ flex: 1 }}>
              <NebulaText size="base" weight="bold" variant="primary" style={{ marginBottom: 2 }}>
                {setting.label}
              </NebulaText>
              <NebulaText size="sm" variant="secondary">
                {setting.value}
              </NebulaText>
            </View>

            {setting.hasToggle ? (
              <View
                style={{
                  width: 48,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: setting.isEnabled
                    ? `${setting.color}40`
                    : 'rgba(255, 255, 255, 0.1)',
                  justifyContent: 'center',
                  padding: 2,
                }}>
                <Animated.View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: '#FFFFFF',
                    marginLeft: setting.isEnabled ? 22 : 0,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 4,
                  }}
                />
              </View>
            ) : setting.id === 'encryption' ? (
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <NebulaText size="sm" style={{ color: '#10B981' }}>
                  ✓
                </NebulaText>
              </View>
            ) : (
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <NebulaText size="sm" variant="tertiary">
                  ›
                </NebulaText>
              </View>
            )}
          </View>
        </NebulaCard>
      </TouchableOpacity>
    </NebulaAnimated>
  );

  const renderSection = (title: string, settings: SettingItem[], iconName: string, delay: number) => (
    <NebulaAnimated animation="fadeIn" duration={800} delay={delay} iterationCount={1}>
      <NebulaAnimated animation="slideUp" duration={600} delay={delay + 200} iterationCount={1}>
        <View style={{ marginBottom: 30 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                backgroundColor: 'rgba(159, 122, 234, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}>
              <Icon 
                name={iconName as any}
                size={16}
                color="#9F7AEA"
              />
            </View>
            <NebulaText
              size="sm"
              weight="bold"
              variant="tertiary"
              style={{ textTransform: 'uppercase', letterSpacing: 1.2 }}>
              {title}
            </NebulaText>
          </View>

          <View>
            {settings.map((setting, index) => renderSettingItem(setting, index, delay + 400))}
          </View>
        </View>
      </NebulaAnimated>
    </NebulaAnimated>
  );

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
          {/* Profile Header */}
          <NebulaAnimated animation="fadeIn" duration={800} delay={200} iterationCount={1}>
            <NebulaAnimated animation="slideUp" duration={600} delay={400} iterationCount={1}>
              <Animated.View
                style={{
                  marginBottom: 40,
                  alignItems: 'center',
                  transform: [{ scale: profilePulse }],
                }}>
                <NebulaCard
                  variant="primary"
                  style={{
                    padding: 30,
                    alignItems: 'center',
                    backgroundColor: 'rgba(159, 122, 234, 0.08)',
                    borderColor: 'rgba(159, 122, 234, 0.2)',
                    borderWidth: 1,
                  }}>
                  <View
                    style={{
                      width: 96,
                      height: 96,
                      borderRadius: 48,
                      backgroundColor: 'rgba(159, 122, 234, 0.2)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                      borderWidth: 3,
                      borderColor: 'rgba(159, 122, 234, 0.3)',
                    }}>
                    <NebulaText size="3xl">👩</NebulaText>
                  </View>
                  <NebulaText
                    size="2xl"
                    weight="bold"
                    variant="primary"
                    style={{ marginBottom: 4 }}>
                    Ana Silva
                  </NebulaText>
                  <NebulaText size="base" variant="secondary">
                    ana@example.com
                  </NebulaText>
                </NebulaCard>
              </Animated.View>
            </NebulaAnimated>
          </NebulaAnimated>

          {/* ADHD Preferences */}
          {renderSection('ADHD Preferences', adhdSettings, 'brain', 600)}

          {/* System Settings */}
          {renderSection('System Settings', systemSettings, 'settings', 1000)}

          {/* Privacy & Data */}
          {renderSection('Privacy & Data', privacySettings, 'lock', 1400)}

          {/* Support */}
          {renderSection('Support', supportSettings, 'emergency', 1800)}
        </ScrollView>
    </NebulaGradient>
  );
};

export default SettingsScreen;
