import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import GlassCard from '../../components/core/GlassCard';
import MenuOverlay from '../../components/navigation/MenuOverlay';
import CalmaLogo from '../../components/core/CalmaLogo';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [showMenu, setShowMenu] = useState(false);

  const handleQuickAction = (action: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    switch (action) {
      case 'checkin':
        navigation.navigate('Checkin' as never);
        break;
      case 'time':
        navigation.navigate('Time' as never);
        break;
      case 'chaos':
        navigation.navigate('ChaosToClarity' as never);
        break;
      case 'messages':
        navigation.navigate('MessageCheck' as never);
        break;
    }
  };

  const handleEmergency = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate('Emergency' as never);
  };

  return (
    <View className="flex-1 bg-ink">
      {/* Background Gradient */}
      <LinearGradient colors={['#0A0A0F', '#0F0F1A']} className="absolute inset-0" />

      {/* Header */}
      {/* <View
        className="flex-row items-center justify-between border-b border-white/5 bg-ink px-6 pb-4"
        style={{
          paddingTop: insets.top + 12,
        }}>
        <View className="h-12 w-12 items-center justify-center">
          <CalmaLogo size="lg" />
        </View>
        <TouchableOpacity
          onPress={() => setShowMenu(true)}
          className="h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-surface-glass"
          style={{ minWidth: 48, minHeight: 48 }}>
          <Text className="text-xl font-bold text-text-primary">⋯</Text>
        </TouchableOpacity>
      </View> */}

      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}>

        {/* Greeting */}
        <View className="px-6 pb-8 pt-6">
          <Text className="mb-1 text-2xl font-bold text-text-primary">Good morning, Ana ✨</Text>
          <Text className="text-base text-text-secondary">Thursday, July 12 • 9:41 AM</Text>
        </View>
        {/* AI Insight Card */}
        <View className="mb-6 px-6">
          <GlassCard variant="primary" className="p-6">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-aurora-start/20">
              <Text className="text-3xl">💡</Text>
            </View>
            <Text className="mb-2 text-xl font-bold text-text-primary">
              Your energy peaks at 2 PM today
            </Text>
            <Text className="text-base leading-relaxed text-text-secondary">
              Perfect time for that important email you&apos;ve been avoiding. I&apos;ll remind you.
            </Text>
          </GlassCard>
        </View>
        {/* Quick Stats */}
        <View className="mb-6 flex-row gap-4 px-6">
          <View className="flex-1">
            <GlassCard className="items-center py-6">
              <Text className="mb-1 text-3xl font-bold text-aurora-start">7</Text>
              <Text className="text-sm text-text-secondary">Day Streak</Text>
            </GlassCard>
          </View>
          <View className="flex-1">
            <GlassCard className="items-center py-6">
              <Text className="mb-1 text-3xl font-bold text-aurora-start">85%</Text>
              <Text className="text-sm text-text-secondary">Mood Trend ↑</Text>
            </GlassCard>
          </View>
        </View>
        {/* Quick Actions */}
        <View className="px-6">
          <Text className="mb-4 text-lg font-semibold text-text-primary">Quick Actions</Text>
          <View className="flex-row flex-wrap gap-4">
            <TouchableOpacity onPress={() => handleQuickAction('checkin')} className="w-[47%]">
              <GlassCard className="items-center py-6">
                <Text className="mb-2 text-4xl">😊</Text>
                <Text className="text-base font-semibold text-text-primary">Check In</Text>
              </GlassCard>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleQuickAction('time')} className="w-[47%]">
              <GlassCard className="items-center py-6">
                <Text className="mb-2 text-4xl">⏰</Text>
                <Text className="text-base font-semibold text-text-primary">Time Check</Text>
              </GlassCard>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleQuickAction('chaos')} className="w-[47%]">
              <GlassCard className="items-center py-6">
                <Text className="mb-2 text-4xl">📸</Text>
                <Text className="text-base font-semibold text-text-primary">Chaos→Clarity</Text>
              </GlassCard>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleQuickAction('messages')} className="w-[47%]">
              <GlassCard className="items-center py-6">
                <Text className="mb-2 text-4xl">💌</Text>
                <Text className="text-base font-semibold text-text-primary">Message Check</Text>
              </GlassCard>
            </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Emergency Float Button */}
      <TouchableOpacity
        onPress={handleEmergency}
        className="absolute right-6 h-14 w-14 items-center justify-center rounded-full bg-aurora-mid"
        style={{
          bottom: insets.bottom + 80,
          shadowColor: '#EC4899',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.4,
          shadowRadius: 30,
          elevation: 10,
        }}>
        <Text className="text-2xl">🆘</Text>
      </TouchableOpacity>

      {/* Menu Overlay */}
      {showMenu && <MenuOverlay onClose={() => setShowMenu(false)} />}
    </View>
  );
};

export default HomeScreen;
