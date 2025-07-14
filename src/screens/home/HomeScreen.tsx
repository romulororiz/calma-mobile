import React from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import CalmaLogo from '../../components/core/CalmaLogo';
import GlassCard from '../../components/core/GlassCard';
import { COLORS, SPACING, LAYOUT, TYPOGRAPHY } from '../../constants/theme';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;

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
        // Navigate to chaos to clarity feature
        break;
      case 'messages':
        // Navigate to message analyzer
        break;
      default:
        break;
    }
  };

  const handleEmergency = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    // Navigate to emergency mode
  };

  return (
    <SafeAreaView className="flex-1 bg-ink">
      <StatusBar style="light" backgroundColor={COLORS.ink[100]} />
      
      {/* Aurora Background Gradient */}
      <LinearGradient colors={[COLORS.ink[100], '#0F0F1A']} className="absolute inset-0" />
      
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {/* Header */}
        <View className="px-6 py-10">
          <View className="mb-6 flex-row items-center justify-between">
            <CalmaLogo size="md" />
            <Text className="flex-1 text-center font-nunito text-2xl font-bold text-text-primary">
              Calma
            </Text>
            <TouchableOpacity 
              className="h-12 w-12 items-center justify-center rounded-lg"
              style={{ backgroundColor: COLORS.surface.glass }}
              onPress={() => {/* Navigate to menu */}}
            >
              <Text className="text-xl">☰</Text>
            </TouchableOpacity>
          </View>

          <Text className="mb-2 font-nunito text-3xl font-bold text-text-primary">
            Good morning, Ana ✨
          </Text>
          <Text className="font-nunito text-lg text-text-secondary">
            Thursday, July 12 • 9:41 AM
          </Text>
        </View>

        {/* AI Insight Card */}
        <View className="px-6 mb-8">
          <GlassCard variant="primary" className="relative overflow-hidden">
            <LinearGradient
              colors={[`${COLORS.aurora.start}10`, `${COLORS.aurora.mid}05`]}
              className="absolute inset-0"
            />
            <View className="p-6">
              <Text className="mb-2 font-nunito font-semibold text-text-primary">
                🔮 AI Insight
              </Text>
              <Text className="mb-4 font-nunito text-sm text-text-secondary leading-relaxed">
                Your energy patterns show you're most focused between 9-11 AM. Consider 
                scheduling important tasks during this window.
              </Text>
              <TouchableOpacity
                className="self-start"
                onPress={() => {/* Navigate to insights */}}
              >
                <Text className="font-nunito font-semibold text-sm" style={{ color: COLORS.aurora.start }}>
                  View Full Analysis →
                </Text>
              </TouchableOpacity>
            </View>
          </GlassCard>
        </View>

        {/* Quick Stats */}
        <View className="px-6 mb-8">
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <GlassCard className="items-center py-6">
                <Text className="mb-1 font-nunito text-2xl font-bold text-text-primary">
                  7
                </Text>
                <Text className="font-nunito text-sm text-text-secondary">
                  Day Streak
                </Text>
              </GlassCard>
            </View>
            <View className="flex-1">
              <GlassCard className="items-center py-6">
                <Text className="mb-1 font-nunito text-2xl font-bold" style={{ color: COLORS.aurora.start }}>
                  📈
                </Text>
                <Text className="font-nunito text-sm text-text-secondary">
                  Mood Trend
                </Text>
              </GlassCard>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-8">
          <Text className="mb-6 font-nunito text-lg font-semibold text-text-primary">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-4">
            <View className="w-[48%]">
              <GlassCard
                variant="primary"
                onPress={() => handleQuickAction('checkin')}
                className="p-6 items-center min-h-[120px] justify-center"
              >
                <Text className="mb-2 text-3xl">😊</Text>
                <Text className="font-nunito font-semibold text-text-primary text-center">
                  Check In
                </Text>
                <Text className="font-nunito text-xs text-text-secondary text-center mt-1">
                  How are you feeling?
                </Text>
              </GlassCard>
            </View>
            
            <View className="w-[48%]">
              <GlassCard
                variant="elevated"
                onPress={() => handleQuickAction('time')}
                className="p-6 items-center min-h-[120px] justify-center"
              >
                <Text className="mb-2 text-3xl">⏰</Text>
                <Text className="font-nunito font-semibold text-text-primary text-center">
                  Time Check
                </Text>
                <Text className="font-nunito text-xs text-text-secondary text-center mt-1">
                  Reality anchor
                </Text>
              </GlassCard>
            </View>
            
            <View className="w-[48%]">
              <GlassCard
                variant="elevated"
                onPress={() => handleQuickAction('chaos')}
                className="p-6 items-center min-h-[120px] justify-center"
              >
                <Text className="mb-2 text-3xl">🌪️</Text>
                <Text className="font-nunito font-semibold text-text-primary text-center">
                  Chaos→Clarity
                </Text>
                <Text className="font-nunito text-xs text-text-secondary text-center mt-1">
                  Organize thoughts
                </Text>
              </GlassCard>
            </View>
            
            <View className="w-[48%]">
              <GlassCard
                variant="elevated"
                onPress={() => handleQuickAction('messages')}
                className="p-6 items-center min-h-[120px] justify-center"
              >
                <Text className="mb-2 text-3xl">💬</Text>
                <Text className="font-nunito font-semibold text-text-primary text-center">
                  Message Check
                </Text>
                <Text className="font-nunito text-xs text-text-secondary text-center mt-1">
                  Tone analyzer
                </Text>
              </GlassCard>
            </View>
          </View>
        </View>

        {/* Emergency Button */}
        <View className="px-6">
          <GlassCard
            variant="emergency"
            onPress={handleEmergency}
            className="p-6 items-center"
          >
            <Text className="mb-2 text-2xl">🚨</Text>
            <Text className="font-nunito font-bold text-text-primary text-center">
              Emergency Support
            </Text>
            <Text className="font-nunito text-xs text-text-secondary text-center mt-1">
              24/7 crisis support
            </Text>
          </GlassCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen; 