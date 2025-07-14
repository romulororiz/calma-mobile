import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

import NavHeader from '../../components/core/NavHeader';
import GlassCard from '../../components/core/GlassCard';
import Button from '../../components/core/Button';

const MessageCheckScreen: React.FC = () => {
  const handleCopyResponse = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Copy to clipboard
  };

  return (
    <View className="flex-1 bg-ink">
      <NavHeader title="Message Check" showMenu={true} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        <View className="px-6 py-6">
          {/* Original Message */}
          <GlassCard className="mb-6 p-4">
            <Text className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
              ORIGINAL MESSAGE
            </Text>
            <Text className="text-base italic leading-relaxed text-text-primary">
              &quot;Hey, we need to talk about the project. Can you meet tomorrow at 3?&quot;
            </Text>
          </GlassCard>

          {/* Tone Analysis */}
          <View className="mb-8 flex-row items-center gap-6">
            <View className="from-success h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br to-energy-high">
              <Text className="text-4xl">😊</Text>
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-xl font-bold text-text-primary">
                Tone: Neutral Professional
              </Text>
              <Text className="text-base text-text-secondary">No anger or urgency detected</Text>
            </View>
          </View>

          {/* Reality Checks */}
          <View className="mb-8">
            <Text className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
              REALITY CHECKS
            </Text>

            <View className="space-y-2">
              <View className="bg-success/5 flex-row items-center gap-3 rounded-xl p-3">
                <Text className="text-success">✓</Text>
                <Text className="text-sm text-text-primary">No ALL CAPS or exclamation marks</Text>
              </View>

              <View className="bg-success/5 flex-row items-center gap-3 rounded-xl p-3">
                <Text className="text-success">✓</Text>
                <Text className="text-sm text-text-primary">They asked for your availability</Text>
              </View>

              <View className="bg-success/5 flex-row items-center gap-3 rounded-xl p-3">
                <Text className="text-success">✓</Text>
                <Text className="text-sm text-text-primary">Similar to their usual tone</Text>
              </View>
            </View>
          </View>

          {/* Suggested Response */}
          <View>
            <Text className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
              SUGGESTED RESPONSE
            </Text>

            <GlassCard className="mb-4 p-4">
              <Text className="text-base leading-relaxed text-text-primary">
                &quot;Sure! 3 PM works for me. Looking forward to discussing the project updates.&quot;
              </Text>
            </GlassCard>

            <Button title="Copy Response" onPress={handleCopyResponse} variant="primary" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MessageCheckScreen;
