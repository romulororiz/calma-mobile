import React from 'react';
import { View, Text, ScrollView } from 'react-native';

import NavHeader from '../../components/core/NavHeader';
import GlassCard from '../../components/core/GlassCard';

interface EnergyBar {
  id: string;
  height: 'low' | 'medium' | 'high';
  time: string;
}

const energyBars: EnergyBar[] = [
  { id: '1', height: 'low', time: '9AM' },
  { id: '2', height: 'low', time: '' },
  { id: '3', height: 'medium', time: '12PM' },
  { id: '4', height: 'high', time: '' },
  { id: '5', height: 'high', time: '3PM' },
  { id: '6', height: 'medium', time: '' },
  { id: '7', height: 'low', time: '6PM' },
];

const InsightsScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-ink">
      <NavHeader title="Your Patterns" showMenu={true} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="items-center px-6 pb-6 pt-8">
          <Text className="mb-2 text-3xl font-bold text-text-primary">
            Tomorrow&apos;s Forecast
          </Text>
          <Text className="text-base text-text-secondary">Based on your patterns</Text>
        </View>

        {/* Energy Chart */}
        <View className="mb-6 px-6">
          <GlassCard className="p-6">
            <Text className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
              ENERGY LEVELS
            </Text>

            {/* Chart */}
            <View className="mb-4 h-40">
              <View className="flex-1 flex-row items-end justify-between gap-1">
                {energyBars.map((bar) => (
                  <View
                    key={bar.id}
                    className={`relative flex-1 rounded-t-md bg-surface-secondary ${
                      bar.height === 'low'
                        ? 'h-[30%]'
                        : bar.height === 'medium'
                          ? 'h-[60%]'
                          : 'h-[90%]'
                    }`}>
                    <View
                      className={`absolute inset-0 rounded-t-md opacity-80 ${
                        bar.height === 'low'
                          ? 'bg-energy-low'
                          : bar.height === 'medium'
                            ? 'bg-energy-medium'
                            : 'bg-energy-high'
                      }`}
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* Time Labels */}
            <View className="flex-row justify-between">
              {energyBars.map((bar) =>
                bar.time ? (
                  <Text key={bar.id} className="text-xs text-text-tertiary">
                    {bar.time}
                  </Text>
                ) : (
                  <View key={bar.id} />
                )
              )}
            </View>
          </GlassCard>
        </View>

        {/* Pattern Insights */}
        <View className="px-6">
          {/* Peak Window */}
          <View className="mb-4">
            <GlassCard
              padding="md"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                borderColor: 'rgba(16, 185, 129, 0.2)',
              }}>
              <View className="flex-row items-center gap-4">
                <Text className="text-3xl">✨</Text>
                <View className="flex-1">
                  <Text className="mb-1 text-lg font-semibold text-text-primary">
                    Peak Window: 2-5 PM
                  </Text>
                  <Text className="text-sm text-text-secondary">Schedule important tasks here</Text>
                </View>
              </View>
            </GlassCard>
          </View>

          {/* Stress Pattern */}
          <View className="mb-4">
            <GlassCard
              padding="md"
              style={{
                backgroundColor: 'rgba(236, 72, 153, 0.05)',
                borderColor: 'rgba(236, 72, 153, 0.2)',
              }}>
              <View className="flex-row items-center gap-4">
                <Text className="text-3xl">⚠️</Text>
                <View className="flex-1">
                  <Text className="mb-1 text-lg font-semibold text-text-primary">
                    Stress Pattern Detected
                  </Text>
                  <Text className="text-sm text-text-secondary">
                    3 warning signs today. Take breaks.
                  </Text>
                </View>
              </View>
            </GlassCard>
          </View>

          {/* Additional Insights */}
          <GlassCard>
            <Text className="mb-3 text-base font-semibold text-text-primary">
              This Week&apos;s Patterns
            </Text>

            <View className="space-y-3">
              <View className="flex-row items-center gap-3">
                <View className="h-2 w-2 rounded-full bg-aurora-start" />
                <Text className="text-sm text-text-secondary">
                  Best focus after morning coffee (9:30 AM)
                </Text>
              </View>

              <View className="flex-row items-center gap-3">
                <View className="h-2 w-2 rounded-full bg-aurora-start" />
                <Text className="text-sm text-text-secondary">
                  Energy crashes if lunch is skipped
                </Text>
              </View>

              <View className="flex-row items-center gap-3">
                <View className="h-2 w-2 rounded-full bg-aurora-start" />
                <Text className="text-sm text-text-secondary">
                  Creative ideas peak during walks
                </Text>
              </View>
            </View>
          </GlassCard>
        </View>
      </ScrollView>
    </View>
  );
};

export default InsightsScreen;
