import './global.css';
import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View className="bg-ink flex-1 items-center justify-center">
        <Text className="text-text-primary text-lg">Loading Calma...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-ink flex-1">
      <StatusBar style="light" backgroundColor="#0A0A0F" />

      {/* Aurora Background Gradient */}
      <LinearGradient colors={['#0A0A0F', '#0F0F1A']} className="absolute inset-0" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-lg py-xl">
          <View className="mb-lg flex-row items-center justify-between">
            <View className="bg-aurora-start h-12 w-12 items-center justify-center rounded-lg">
              <Text className="text-2xl">🧠</Text>
            </View>
            <Text className="text-text-primary font-nunito text-2xl font-bold">Calma</Text>
            <TouchableOpacity className="glass-card h-12 w-12 items-center justify-center">
              <Text className="text-xl">☰</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-text-primary mb-sm font-nunito text-3xl font-bold">
            Good morning, Ana ✨
          </Text>
          <Text className="text-text-secondary font-nunito text-lg">
            Thursday, July 12 • 9:41 AM
          </Text>
        </View>

        {/* AI Insight Card */}
        <View className="mx-lg mb-lg">
          <View className="glass-card-primary p-lg relative overflow-hidden rounded-lg">
            <LinearGradient
              colors={['rgba(159, 122, 234, 0.3)', 'transparent']}
              className="absolute right-0 top-0 h-32 w-32 rounded-full"
              style={{ transform: [{ translateX: 40 }, { translateY: -40 }] }}
            />
            <View className="bg-aurora-start mb-md h-16 w-16 items-center justify-center rounded-md">
              <Text className="text-3xl">💡</Text>
            </View>
            <Text className="text-text-primary mb-sm font-nunito text-xl font-semibold">
              Your energy peaks at 2 PM today
            </Text>
            <Text className="text-md text-text-secondary font-nunito">
              Perfect time for that important email you&apos;ve been avoiding. I&apos;ll remind you.
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="px-lg mb-lg flex-row">
          <View className="glass-card p-md mr-md flex-1 items-center rounded-lg">
            <Text className="text-aurora-start mb-xs font-nunito text-3xl font-bold">7</Text>
            <Text className="text-text-secondary font-nunito text-sm">Day Streak</Text>
          </View>
          <View className="glass-card p-md flex-1 items-center rounded-lg">
            <Text className="text-aurora-start mb-xs font-nunito text-3xl font-bold">85%</Text>
            <Text className="text-text-secondary font-nunito text-sm">Mood Trend ↑</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-lg mb-lg">
          <Text className="text-text-primary mb-md font-nunito text-xl font-semibold">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap">
            <TouchableOpacity className="p-sm w-1/2">
              <View className="glass-card p-lg gentle-hover items-center rounded-lg">
                <Text className="mb-sm text-4xl">😊</Text>
                <Text className="text-md text-text-primary font-nunito font-semibold">
                  Check In
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="p-sm w-1/2">
              <View className="glass-card p-lg gentle-hover items-center rounded-lg">
                <Text className="mb-sm text-4xl">⏰</Text>
                <Text className="text-md text-text-primary font-nunito font-semibold">
                  Time Check
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="p-sm w-1/2">
              <View className="glass-card p-lg gentle-hover items-center rounded-lg">
                <Text className="mb-sm text-4xl">📸</Text>
                <Text className="text-md text-text-primary font-nunito font-semibold">
                  Chaos→Clarity
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="p-sm w-1/2">
              <View className="glass-card p-lg gentle-hover items-center rounded-lg">
                <Text className="mb-sm text-4xl">💌</Text>
                <Text className="text-md text-text-primary font-nunito font-semibold">
                  Message Check
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Check-in Preview */}
        <View className="px-lg mb-lg">
          <Text className="text-text-primary mb-md font-nunito text-xl font-semibold">
            How&apos;s your beautiful mind today?
          </Text>
          <View className="mb-lg flex-row justify-center">
            <TouchableOpacity className="emotion-btn mx-sm">
              <Text className="text-4xl">😊</Text>
            </TouchableOpacity>
            <TouchableOpacity className="emotion-btn mx-sm">
              <Text className="text-4xl">😐</Text>
            </TouchableOpacity>
            <TouchableOpacity className="emotion-btn mx-sm">
              <Text className="text-4xl">🫂</Text>
            </TouchableOpacity>
          </View>

          <Text className="text-text-tertiary mb-md font-nunito text-center text-sm">
            ADD CONTEXT (OPTIONAL)
          </Text>
          <View className="flex-row flex-wrap justify-center">
            <TouchableOpacity className="context-pill m-1">
              <Text className="text-sm">💊</Text>
              <Text className="text-text-primary font-nunito text-sm">Meds taken</Text>
            </TouchableOpacity>
            <TouchableOpacity className="context-pill m-1">
              <Text className="text-sm">⚡</Text>
              <Text className="text-text-primary font-nunito text-sm">Energetic</Text>
            </TouchableOpacity>
            <TouchableOpacity className="context-pill m-1">
              <Text className="text-sm">🏠</Text>
              <Text className="text-text-primary font-nunito text-sm">At home</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Aurora Button */}
        <View className="px-lg mb-2xl">
          <TouchableOpacity className="aurora-btn aurora-btn-primary w-full">
            <Text className="font-nunito text-lg font-semibold text-white">
              Go to Check-in Flow
            </Text>
            <Text className="text-lg text-white">→</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Emergency Float Button */}
      <TouchableOpacity
        className="right-lg absolute bottom-24 h-14 w-14 items-center justify-center rounded-full"
        style={{
          backgroundColor: 'rgba(236, 72, 153, 0.9)',
          shadowColor: '#EC4899',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.4,
          shadowRadius: 30,
          elevation: 10,
        }}>
        <Text className="text-2xl">🆘</Text>
      </TouchableOpacity>

      {/* Bottom Navigation */}
      <View className="bg-surface-elevated px-sm py-sm absolute bottom-0 left-0 right-0 border-t border-white/5">
        <View className="flex-row justify-around">
          <TouchableOpacity className="nav-item nav-item-active">
            <Text className="mb-1 text-xl">🏠</Text>
            <Text className="font-nunito text-xs font-semibold">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="nav-item">
            <Text className="mb-1 text-xl">😊</Text>
            <Text className="font-nunito text-xs font-semibold">Mood</Text>
          </TouchableOpacity>
          <TouchableOpacity className="nav-item">
            <Text className="mb-1 text-xl">⏰</Text>
            <Text className="font-nunito text-xs font-semibold">Time</Text>
          </TouchableOpacity>
          <TouchableOpacity className="nav-item">
            <Text className="mb-1 text-xl">📊</Text>
            <Text className="font-nunito text-xs font-semibold">Insights</Text>
          </TouchableOpacity>
          <TouchableOpacity className="nav-item">
            <Text className="mb-1 text-xl">👤</Text>
            <Text className="font-nunito text-xs font-semibold">You</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
