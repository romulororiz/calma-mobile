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
      <View className="flex-1 items-center justify-center bg-ink">
        <Text className="text-lg text-text-primary">Loading Calma...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-ink">
      <StatusBar style="light" backgroundColor="#0A0A0F" />

      {/* Aurora Background Gradient */}
      <LinearGradient colors={['#0A0A0F', '#0F0F1A']} className="absolute inset-0" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-lg py-xl">
          <View className="mb-lg flex-row items-center justify-between">
            <View className="h-12 w-12 items-center justify-center rounded-lg bg-aurora-start">
              <Text className="text-2xl">🧠</Text>
            </View>
            <Text className="font-nunito text-2xl font-bold text-text-primary">Calma</Text>
            <TouchableOpacity className="glass-card h-12 w-12 items-center justify-center">
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
          <View className="glass-card-primary relative overflow-hidden rounded-lg p-lg">
            <LinearGradient
              colors={['rgba(159, 122, 234, 0.3)', 'transparent']}
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
              Perfect time for that important email you&apos;ve been avoiding. I&apos;ll remind you.
            </Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="mb-lg flex-row px-lg">
          <View className="glass-card mr-md flex-1 items-center rounded-lg p-md">
            <Text className="mb-xs font-nunito text-3xl font-bold text-aurora-start">7</Text>
            <Text className="font-nunito text-sm text-text-secondary">Day Streak</Text>
          </View>
          <View className="glass-card flex-1 items-center rounded-lg p-md">
            <Text className="mb-xs font-nunito text-3xl font-bold text-aurora-start">85%</Text>
            <Text className="font-nunito text-sm text-text-secondary">Mood Trend ↑</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-lg px-lg">
          <Text className="mb-md font-nunito text-xl font-semibold text-text-primary">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap">
            <TouchableOpacity className="w-1/2 p-sm">
              <View className="glass-card gentle-hover items-center rounded-lg p-lg">
                <Text className="mb-sm text-4xl">😊</Text>
                <Text className="font-nunito text-md font-semibold text-text-primary">
                  Check In
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/2 p-sm">
              <View className="glass-card gentle-hover items-center rounded-lg p-lg">
                <Text className="mb-sm text-4xl">⏰</Text>
                <Text className="font-nunito text-md font-semibold text-text-primary">
                  Time Check
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/2 p-sm">
              <View className="glass-card gentle-hover items-center rounded-lg p-lg">
                <Text className="mb-sm text-4xl">📸</Text>
                <Text className="font-nunito text-md font-semibold text-text-primary">
                  Chaos→Clarity
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-1/2 p-sm">
              <View className="glass-card gentle-hover items-center rounded-lg p-lg">
                <Text className="mb-sm text-4xl">💌</Text>
                <Text className="font-nunito text-md font-semibold text-text-primary">
                  Message Check
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Check-in Preview */}
        <View className="mb-lg px-lg">
          <Text className="mb-md font-nunito text-xl font-semibold text-text-primary">
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

          <Text className="mb-md text-center font-nunito text-sm text-text-tertiary">
            ADD CONTEXT (OPTIONAL)
          </Text>
          <View className="flex-row flex-wrap justify-center">
            <TouchableOpacity className="context-pill m-1">
              <Text className="text-sm">💊</Text>
              <Text className="font-nunito text-sm text-text-primary">Meds taken</Text>
            </TouchableOpacity>
            <TouchableOpacity className="context-pill m-1">
              <Text className="text-sm">⚡</Text>
              <Text className="font-nunito text-sm text-text-primary">Energetic</Text>
            </TouchableOpacity>
            <TouchableOpacity className="context-pill m-1">
              <Text className="text-sm">🏠</Text>
              <Text className="font-nunito text-sm text-text-primary">At home</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Aurora Button */}
        <View className="mb-2xl px-lg">
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
        className="absolute bottom-24 right-lg h-14 w-14 items-center justify-center rounded-full"
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
      <View className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-surface-elevated px-sm py-sm">
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
