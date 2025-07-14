import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { format } from 'date-fns';

import NavHeader from '../../components/core/NavHeader';
import GlassCard from '../../components/core/GlassCard';

interface TimeTask {
  id: string;
  icon: string;
  name: string;
  estimatedTime: string;
  actualTime: string;
  isUrgent?: boolean;
  urgentMessage?: string;
  leaveIn?: string;
}

const tasks: TimeTask[] = [
  {
    id: '1',
    icon: '📧',
    name: 'Email responses',
    estimatedTime: '15 min',
    actualTime: '1 hour',
  },
  {
    id: '2',
    icon: '🚿',
    name: 'Morning routine',
    estimatedTime: '20 min',
    actualTime: '45 min',
  },
  {
    id: '3',
    icon: '🚗',
    name: 'Doctor appointment',
    estimatedTime: '',
    actualTime: '',
    isUrgent: true,
    leaveIn: '23 minutes',
    urgentMessage: 'Includes ADHD tax + parking time',
  },
];

const TimeScreen: React.FC = () => {
  const currentTime = new Date();

  return (
    <View className="flex-1 bg-ink">
      <NavHeader title="Time Reality Check" showMenu={true} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* Time Display */}
        <View className="items-center py-8">
          <Text className="mb-2 text-6xl font-light text-text-primary">
            {format(currentTime, 'h:mm a')}
          </Text>
          <Text className="text-lg text-text-secondary">Morning focus window</Text>
        </View>

        {/* AI Insight */}
        <View className="mb-6 px-6">
          <GlassCard variant="primary" className="p-6">
            <Text className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
              AI INSIGHT
            </Text>
            <Text className="text-base leading-relaxed text-text-primary">
              You&apos;re in hyperfocus mode for <Text className="font-bold">1h 47min</Text>. Remember to
              take a break and hydrate.
            </Text>
          </GlassCard>
        </View>

        {/* Task List */}
        <View className="px-6">
          <Text className="mb-4 text-lg font-semibold text-text-primary">Today&apos;s Time Reality</Text>

          {tasks.map((task) => (
            <GlassCard
              key={task.id}
              variant={task.isUrgent ? 'emergency' : 'default'}
              className="mb-3 flex-row items-center gap-4 p-4">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-surface-primary">
                <Text className="text-2xl">{task.icon}</Text>
              </View>

              <View className="flex-1">
                <Text className="mb-1 text-base font-semibold text-text-primary">{task.name}</Text>

                {task.isUrgent ? (
                  <View>
                    <Text className="text-error text-base font-bold">Leave in: {task.leaveIn}</Text>
                    <Text className="mt-1 text-xs text-text-secondary">{task.urgentMessage}</Text>
                  </View>
                ) : (
                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm text-text-secondary">
                      You think: {task.estimatedTime}
                    </Text>
                    <Text className="text-sm text-text-tertiary">→</Text>
                    <Text className="text-warning text-sm font-semibold">
                      Actually: {task.actualTime}
                    </Text>
                  </View>
                )}
              </View>
            </GlassCard>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TimeScreen;
