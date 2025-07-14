import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import NavHeader from '../../components/core/NavHeader';
import GlassCard from '../../components/core/GlassCard';

interface SettingItem {
  id: string;
  icon: string;
  label: string;
  value: string;
  hasToggle?: boolean;
  isEnabled?: boolean;
  onPress?: () => void;
}

const SettingsScreen: React.FC = () => {
  const [smartReminders, setSmartReminders] = useState(true);
  const [focusMode, setFocusMode] = useState(true);
  const [cloudSync, setCloudSync] = useState(true);

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
      onPress: () => handleToggle('reminders'),
    },
    {
      id: 'focus',
      icon: '🌙',
      label: 'Focus Mode',
      value: 'Auto-detect hyperfocus',
      hasToggle: true,
      isEnabled: focusMode,
      onPress: () => handleToggle('focus'),
    },
    {
      id: 'medication',
      icon: '💊',
      label: 'Medication Tracking',
      value: 'Daily at 8 AM',
      hasToggle: false,
      onPress: () => {
        // Navigate to medication settings
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
    },
    {
      id: 'sync',
      icon: '☁️',
      label: 'Cloud Sync',
      value: 'Across all devices',
      hasToggle: true,
      isEnabled: cloudSync,
      onPress: () => handleToggle('sync'),
    },
  ];

  return (
    <View className="flex-1 bg-ink">
      <NavHeader title="Settings" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="items-center py-8">
          <LinearGradient
            colors={['rgba(159, 122, 234, 0.04)', 'transparent']}
            className="absolute inset-0"
          />

          <View className="mb-4 h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-aurora-start to-aurora-mid">
            <Text className="text-5xl">👩</Text>
          </View>

          <Text className="mb-1 text-2xl font-bold text-text-primary">Ana Silva</Text>
          <Text className="text-base text-text-secondary">ana@example.com</Text>
        </View>

        {/* ADHD Preferences */}
        <View className="mb-8 px-6">
          <Text className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
            ADHD PREFERENCES
          </Text>

          {adhdSettings.map((setting) => (
            <TouchableOpacity key={setting.id} onPress={setting.onPress} activeOpacity={0.7}>
              <GlassCard className="mb-2 flex-row items-center p-4">
                <View className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-surface-primary">
                  <Text className="text-xl">{setting.icon}</Text>
                </View>

                <View className="flex-1">
                  <Text className="mb-0.5 text-base font-semibold text-text-primary">
                    {setting.label}
                  </Text>
                  <Text className="text-sm text-text-secondary">{setting.value}</Text>
                </View>

                {setting.hasToggle ? (
                  <View
                    className={`relative h-7 w-12 rounded-full ${
                      setting.isEnabled ? 'bg-aurora-start' : 'bg-surface-secondary'
                    }`}>
                    <View
                      className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-all ${
                        setting.isEnabled ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </View>
                ) : (
                  <Text className="text-text-tertiary">›</Text>
                )}
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>

        {/* Privacy & Data */}
        <View className="mb-8 px-6">
          <Text className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
            PRIVACY & DATA
          </Text>

          {privacySettings.map((setting) => (
            <TouchableOpacity key={setting.id} onPress={setting.onPress} activeOpacity={0.7}>
              <GlassCard className="mb-2 flex-row items-center p-4">
                <View className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-surface-primary">
                  <Text className="text-xl">{setting.icon}</Text>
                </View>

                <View className="flex-1">
                  <Text className="mb-0.5 text-base font-semibold text-text-primary">
                    {setting.label}
                  </Text>
                  <Text className="text-sm text-text-secondary">{setting.value}</Text>
                </View>

                {setting.hasToggle ? (
                  <View
                    className={`relative h-7 w-12 rounded-full ${
                      setting.isEnabled ? 'bg-aurora-start' : 'bg-surface-secondary'
                    }`}>
                    <View
                      className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-all ${
                        setting.isEnabled ? 'left-5' : 'left-0.5'
                      }`}
                    />
                  </View>
                ) : setting.id === 'encryption' ? (
                  <Text className="text-success">✓</Text>
                ) : (
                  <Text className="text-text-tertiary">›</Text>
                )}
              </GlassCard>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
