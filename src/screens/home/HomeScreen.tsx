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
        <View className="px-lg py-xl">
          <View className="mb-lg flex-row items-center justify-between">
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

          <Text className="mb-sm font-nunito text-3xl font-bold text-text-primary">
            Good morning, Ana ✨
          </Text>
          <Text className="font-nunito text-lg text-text-secondary">
            Thursday, July 12 • 9:41 AM
          </Text>
        </View>

        {/* AI Insight Card */}
        <View className="mx-lg mb-lg">
          <GlassCard variant="primary" className="relative overflow-hidden">
            <LinearGradient
              colors={[`${COLORS.aurora.start}33`, 'transparent']}
              className="absolute right-0 top-0 h-32 w-32 rounded-full"
              style={{ transform: [{ translateX: 40 }, { translateY: -40 }] }}
            />
            <View className="mb-md h-16 w-16 items-center justify-center rounded-md bg-aurora-start">
              <Text className="text-3xl">💡</Text>
            </View>
            <Text className="mb-sm font-nunito text-xl font-semibold text-text-primary">
              Your energy peaks at 2 PM today
            </Text>
            <Text className="font-nunito text-md text-text-secondary">
              Perfect time for that important email you've been avoiding. I'll remind you.
            </Text>
          </GlassCard>
        </View>

        {/* Quick Stats */}
        <View className="mx-lg mb-lg">
          <View className="flex-row gap-md">
            <GlassCard className="flex-1 items-center py-md">
              <Text 
                className="mb-xs text-4xl font-bold"
                style={{ color: COLORS.aurora.start }}
              >
                7
              </Text>
              <Text className="font-nunito text-sm text-text-secondary">
                Day Streak
              </Text>
            </GlassCard>
            
            <GlassCard className="flex-1 items-center py-md">
              <Text 
                className="mb-xs text-4xl font-bold"
                style={{ color: COLORS.aurora.start }}
              >
                85%
              </Text>
              <Text className="font-nunito text-sm text-text-secondary">
                Mood Trend ↑
              </Text>
            </GlassCard>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mx-lg">
          <Text className="mb-md font-nunito text-lg font-semibold text-text-primary">
            Quick Actions
          </Text>
          
          <View className="flex-row flex-wrap gap-md">
            <TouchableOpacity
              className="flex-1 min-w-[160px]"
              onPress={() => handleQuickAction('checkin')}
            >
              <GlassCard className="items-center py-lg">
                <Text className="mb-sm text-4xl">😊</Text>
                <Text className="font-nunito text-md font-semibold text-text-primary">
                  Check In
                </Text>
              </GlassCard>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-1 min-w-[160px]"
              onPress={() => handleQuickAction('time')}
            >
              <GlassCard className="items-center py-lg">
                <Text className="mb-sm text-4xl">⏰</Text>
                <Text className="font-nunito text-md font-semibold text-text-primary">
                  Time Check
                </Text>
              </GlassCard>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-1 min-w-[160px]"
              onPress={() => handleQuickAction('chaos')}
            >
              <GlassCard className="items-center py-lg">
                <Text className="mb-sm text-4xl">📸</Text>
                <Text className="font-nunito text-md font-semibold text-text-primary">
                  Chaos→Clarity
                </Text>
              </GlassCard>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-1 min-w-[160px]"
              onPress={() => handleQuickAction('messages')}
            >
              <GlassCard className="items-center py-lg">
                <Text className="mb-sm text-4xl">💌</Text>
                <Text className="font-nunito text-md font-semibold text-text-primary">
                  Message Check
                </Text>
              </GlassCard>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Emergency Float Button */}
      <TouchableOpacity
        className="absolute bottom-32 right-lg h-14 w-14 items-center justify-center rounded-full"
        style={{
          backgroundColor: `${COLORS.aurora.mid}E6`, // 90% opacity
          shadowColor: COLORS.aurora.mid,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 8,
        }}
        onPress={handleEmergency}
      >
        <Text className="text-2xl">🆘</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen; 