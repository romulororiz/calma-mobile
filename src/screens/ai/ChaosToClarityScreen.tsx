import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

import NavHeader from '../../components/core/NavHeader';
import GlassCard from '../../components/core/GlassCard';

const ChaosToClarityScreen: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecord = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsRecording(!isRecording);
  };

  const handleCamera = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Open camera
  };

  return (
    <View className="flex-1 bg-ink">
      <NavHeader title="Chaos → Clarity" showMenu={true} />

      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-4 items-center">
          <Text className="mb-2 text-2xl font-bold text-text-primary">Show me your chaos</Text>
          <Text className="text-base text-text-secondary">I&apos;ll find the tasks hiding in there</Text>
        </View>

        {/* Camera View */}
        <TouchableOpacity
          onPress={handleCamera}
          className="relative mb-8 h-72 overflow-hidden rounded-3xl bg-surface-primary"
          activeOpacity={0.9}>
          <View className="absolute inset-0 bg-gradient-to-br from-aurora-start/10 to-aurora-mid/10" />

          {/* Scan Line Animation */}
          <View className="absolute left-0 right-0 top-0 h-0.5 bg-aurora-start opacity-60" />

          <View className="flex-1 items-center justify-center">
            <Text className="mb-2 text-6xl opacity-50">📸</Text>
            <Text className="text-sm text-text-secondary">Tap to capture</Text>
          </View>
        </TouchableOpacity>

        {/* OR Divider */}
        <Text className="mb-8 text-center text-lg text-text-secondary">OR</Text>

        {/* Voice Record Button */}
        <TouchableOpacity
          onPress={handleRecord}
          className={`mb-4 h-24 w-24 items-center justify-center self-center rounded-full ${
            isRecording ? 'bg-aurora-mid' : 'bg-gradient-to-br from-aurora-start to-aurora-mid'
          }`}
          style={{
            shadowColor: isRecording ? '#EC4899' : '#9F7AEA',
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.4,
            shadowRadius: 40,
            elevation: 10,
          }}>
          <Text className="text-5xl text-white">{isRecording ? '⏸' : '🎤'}</Text>
        </TouchableOpacity>

        <Text className="mb-8 text-center text-sm text-text-secondary">
          {isRecording ? 'Recording... Tap to stop' : 'Tap to ramble your thoughts'}
        </Text>

        {/* Last Scan Results */}
        <GlassCard className="p-4">
          <Text className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
            LAST SCAN FOUND:
          </Text>
          <View className="flex-row flex-wrap gap-2">
            <View className="rounded-full border border-white/5 bg-surface-glass px-3 py-2">
              <Text className="text-sm">📅 Dentist Tuesday</Text>
            </View>
            <View className="rounded-full border border-white/5 bg-surface-glass px-3 py-2">
              <Text className="text-sm">💡 Project idea</Text>
            </View>
            <View className="rounded-full border border-white/5 bg-surface-glass px-3 py-2">
              <Text className="text-sm">🛒 Buy milk</Text>
            </View>
            <View className="rounded-full border border-white/5 bg-surface-glass px-3 py-2">
              <Text className="text-sm">📞 Call mom</Text>
            </View>
          </View>
        </GlassCard>
      </View>
    </View>
  );
};

export default ChaosToClarityScreen;
