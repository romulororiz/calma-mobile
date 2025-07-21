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
} from '../../components/core';

const { width: screenWidth } = Dimensions.get('window');

// Modern navigation configuration (smaller design)
const navigationTabs = [
  {
    id: 'home',
    icon: '🏠',
    label: 'Home',
    route: 'Home',
    gradient: ['#9F7AEA', '#EC4899'],
  },
  {
    id: 'checkin',
    icon: '💝',
    label: 'Check-in',
    route: 'Checkin',
    gradient: ['#EC4899', '#F59E0B'],
  },
  {
    id: 'insights',
    icon: '📊',
    label: 'Insights',
    route: 'Insights',
    gradient: ['#F59E0B', '#10B981'],
  },
  {
    id: 'settings',
    icon: '⚙️',
    label: 'Settings',
    route: 'Settings',
    gradient: ['#10B981', '#06B6D4'],
  },
  {
    id: 'emergency',
    icon: '🆘',
    label: 'Emergency',
    route: 'Emergency',
    gradient: ['#EF4444', '#EC4899'],
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
        navigateToScreen(tab.id);
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
      icon: '🔔',
      label: 'Smart Reminders',
      value: 'Gentle nudges only',
      hasToggle: true,
      isEnabled: smartReminders,
      color: '#9F7AEA',
      onPress: () => handleToggle('reminders'),
    },
    {
      id: 'focus',
      icon: '🌙',
      label: 'Focus Mode',
      value: 'Auto-detect hyperfocus',
      hasToggle: true,
      isEnabled: focusMode,
      color: '#EC4899',
      onPress: () => handleToggle('focus'),
    },
    {
      id: 'medication',
      icon: '💊',
      label: 'Medication Tracking',
      value: 'Daily at 8 AM',
      hasToggle: false,
      color: '#10B981',
      onPress: () => {
        // Navigate to medication settings
        console.log('Navigate to medication settings');
      },
    },
    {
      id: 'time-tracking',
      icon: '⏰',
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
      icon: '📱',
      label: 'Push Notifications',
      value: 'Calm & supportive tone',
      hasToggle: true,
      isEnabled: notificationsEnabled,
      color: '#06B6D4',
      onPress: () => handleToggle('notifications'),
    },
    {
      id: 'haptic',
      icon: '📳',
      label: 'Haptic Feedback',
      value: 'Gentle vibrations',
      hasToggle: true,
      isEnabled: hapticFeedback,
      color: '#8B5CF6',
      onPress: () => handleToggle('haptic'),
    },
    {
      id: 'appearance',
      icon: '🎨',
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
      icon: '🔒',
      label: 'Data Encryption',
      value: 'End-to-end encrypted',
      hasToggle: false,
      color: '#10B981',
    },
    {
      id: 'sync',
      icon: '☁️',
      label: 'Cloud Sync',
      value: 'Across all devices',
      hasToggle: true,
      isEnabled: cloudSync,
      color: '#3B82F6',
      onPress: () => handleToggle('sync'),
    },
    {
      id: 'analytics',
      icon: '📊',
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
      icon: '❓',
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
      icon: '💌',
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
      icon: 'ℹ️',
      label: 'About Calma',
      value: 'Version 1.0.0',
      hasToggle: false,
      color: '#6B7280',
      onPress: () => {
        console.log('Navigate to about');
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
              <NebulaText size="lg">{setting.icon}</NebulaText>
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

  const renderSection = (title: string, settings: SettingItem[], icon: string, delay: number) => (
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
              <NebulaText size="sm">{icon}</NebulaText>
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
      <SafeAreaView style={{ flex: 1 }}>
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
          {renderSection('ADHD Preferences', adhdSettings, '🧠', 600)}

          {/* System Settings */}
          {renderSection('System Settings', systemSettings, '⚙️', 1000)}

          {/* Privacy & Data */}
          {renderSection('Privacy & Data', privacySettings, '🔒', 1400)}

          {/* Support */}
          {renderSection('Support', supportSettings, '🆘', 1800)}
        </ScrollView>
      </SafeAreaView>
    </NebulaGradient>
  );
};

export default SettingsScreen;
