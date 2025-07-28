import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../core/Button';

const DesignSystemExample: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-ink p-6">
      <Text className="mb-8 text-center text-2xl font-bold text-text-primary">
        Calma Design System Examples
      </Text>

      {/* Glass Cards */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">Glass Cards</Text>

        {/* Default Glass Card */}
        <View className="mb-4 rounded-lg border border-white/5 bg-surface-glass p-lg">
          <Text className="mb-2 font-semibold text-text-primary">Default Glass Card</Text>
          <Text className="text-sm text-text-secondary">
            Uses glass-effect background with subtle border
          </Text>
        </View>

        {/* Primary Glass Card */}
        <View className="mb-4 rounded-lg border border-aurora-start/10 bg-surface-primary p-lg">
          <Text className="mb-2 font-semibold text-text-primary">Primary Glass Card</Text>
          <Text className="text-sm text-text-secondary">Uses aurora gradient background</Text>
        </View>

        {/* Emergency Glass Card */}
        <View className="rounded-lg border border-aurora-mid/20 bg-surface-emergency p-lg">
          <Text className="mb-2 font-semibold text-text-primary">Emergency Glass Card</Text>
          <Text className="text-sm text-text-secondary">Uses emergency surface styling</Text>
        </View>
      </View>

      {/* Buttons */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">Buttons</Text>

        <View className="space-y-4">
          <Button
            title="Primary Button"
            variant="primary"
            onPress={() => console.log('Primary pressed')}
          />

          <Button
            title="Secondary Button"
            variant="secondary"
            onPress={() => console.log('Secondary pressed')}
          />

          <Button
            title="Ghost Button"
            variant="ghost"
            onPress={() => console.log('Ghost pressed')}
          />
        </View>
      </View>

      {/* Emotion Buttons Example */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">Emotion Buttons</Text>

        <View className="flex-row justify-center space-x-4">
          {/* Normal Emotion Button */}
          <TouchableOpacity className="w-22 h-22 items-center justify-center rounded-lg border-2 border-transparent bg-surface-glass">
            <Text className="text-4xl">😊</Text>
          </TouchableOpacity>

          {/* Selected Emotion Button */}
          <TouchableOpacity className="w-22 h-22 items-center justify-center rounded-lg border-2 border-aurora-start/30 bg-gradient-to-br from-aurora-start to-aurora-mid">
            <Text className="text-4xl">😍</Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-22 h-22 items-center justify-center rounded-lg border-2 border-transparent bg-surface-glass">
            <Text className="text-4xl">😴</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Context Pills */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">Context Pills</Text>

        <View className="flex-row flex-wrap justify-center gap-2">
          {/* Normal Context Pill */}
          <TouchableOpacity className="min-h-touch flex-row items-center rounded-full border border-white/5 bg-surface-glass px-md py-sm text-sm">
            <Text className="mr-1 text-sm text-text-primary">🏠</Text>
            <Text className="text-sm text-text-primary">Home</Text>
          </TouchableOpacity>

          {/* Selected Context Pill */}
          <TouchableOpacity className="min-h-touch flex-row items-center rounded-full border-transparent bg-gradient-to-r from-aurora-start to-aurora-mid px-md py-sm text-sm">
            <Text className="mr-1 text-sm text-white">💼</Text>
            <Text className="text-sm text-white">Work</Text>
          </TouchableOpacity>

          <TouchableOpacity className="min-h-touch flex-row items-center rounded-full border border-white/5 bg-surface-glass px-md py-sm text-sm">
            <Text className="mr-1 text-sm text-text-primary">🎓</Text>
            <Text className="text-sm text-text-primary">Study</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Typography Examples */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">Typography</Text>

        <Text className="mb-2 text-2xl font-bold text-text-primary">Heading 1 - Primary Text</Text>
        <Text className="mb-2 text-xl font-semibold text-text-secondary">
          Heading 2 - Secondary Text
        </Text>
        <Text className="mb-2 text-lg text-text-tertiary">Heading 3 - Tertiary Text</Text>
        <Text className="mb-4 text-base text-text-quaternary">Body text - Quaternary Text</Text>

        <Text className="text-gradient text-lg font-bold">Gradient Text Example</Text>
      </View>

      {/* Color Swatches */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">Color System</Text>

        <View className="mb-4 flex-row flex-wrap gap-2">
          <View className="h-16 w-16 rounded-lg bg-aurora-start" />
          <View className="h-16 w-16 rounded-lg bg-aurora-mid" />
          <View className="h-16 w-16 rounded-lg bg-aurora-end" />
        </View>

        <View className="mb-4 flex-row flex-wrap gap-2">
          <View className="h-16 w-16 rounded-lg bg-energy-high" />
          <View className="h-16 w-16 rounded-lg bg-energy-medium" />
          <View className="h-16 w-16 rounded-lg bg-energy-low" />
        </View>

        <View className="flex-row flex-wrap gap-2">
          <View className="h-16 w-16 rounded-lg bg-semantic-success" />
          <View className="h-16 w-16 rounded-lg bg-semantic-warning" />
          <View className="h-16 w-16 rounded-lg bg-semantic-error" />
          <View className="h-16 w-16 rounded-lg bg-semantic-info" />
        </View>
      </View>

      {/* Spacing Examples */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">Spacing System</Text>

        <View className="mb-2 rounded-lg bg-surface-glass p-xs">
          <Text className="text-sm text-text-primary">XS Padding (4px)</Text>
        </View>

        <View className="mb-2 rounded-lg bg-surface-glass p-sm">
          <Text className="text-sm text-text-primary">SM Padding (8px)</Text>
        </View>

        <View className="mb-2 rounded-lg bg-surface-glass p-md">
          <Text className="text-sm text-text-primary">MD Padding (16px)</Text>
        </View>

        <View className="mb-2 rounded-lg bg-surface-glass p-lg">
          <Text className="text-sm text-text-primary">LG Padding (24px)</Text>
        </View>

        <View className="rounded-lg bg-surface-glass p-xl">
          <Text className="text-sm text-text-primary">XL Padding (40px)</Text>
        </View>
      </View>

      {/* Utility Classes */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">Utility Classes</Text>

        <View className="surface-gradient mb-4 rounded-lg p-lg">
          <Text className="text-text-primary">Surface Gradient Background</Text>
        </View>

        <View className="elevated-surface mb-4 rounded-lg p-lg">
          <Text className="text-text-primary">Elevated Surface</Text>
        </View>

        <View className="emergency-surface rounded-lg p-lg">
          <Text className="text-text-primary">Emergency Surface</Text>
        </View>
      </View>

      {/* Energy Bars Example */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">Energy Pattern Graph</Text>

        <View className="h-30 mb-4 flex-row items-end justify-between gap-1">
          <View className="flex-1 rounded-t-sm bg-energy-low/80" style={{ height: '60%' }} />
          <View className="flex-1 rounded-t-sm bg-energy-medium/80" style={{ height: '80%' }} />
          <View className="flex-1 rounded-t-sm bg-energy-high/80" style={{ height: '100%' }} />
          <View className="flex-1 rounded-t-sm bg-energy-high/80" style={{ height: '90%' }} />
          <View className="flex-1 rounded-t-sm bg-energy-medium/80" style={{ height: '70%' }} />
          <View className="flex-1 rounded-t-sm bg-energy-low/80" style={{ height: '40%' }} />
        </View>

        <View className="flex-row justify-between">
          <Text className="text-xs text-text-tertiary">6AM</Text>
          <Text className="text-xs text-text-tertiary">12PM</Text>
          <Text className="text-xs text-text-tertiary">6PM</Text>
          <Text className="text-xs text-text-tertiary">12AM</Text>
        </View>
      </View>

      {/* Reality Check Example */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">Reality Check</Text>

        <View className="flex-row items-start rounded-md border border-semantic-success/10 bg-semantic-success/5 p-md">
          <View className="mr-md flex h-6 w-6 items-center justify-center rounded-full bg-semantic-success/20">
            <Text className="text-sm font-semibold text-energy-high">✓</Text>
          </View>
          <View className="flex-1">
            <Text className="text-sm text-text-primary">
              You&apos;ve completed 3 out of 5 planned tasks today. That&apos;s actually really good progress!
            </Text>
          </View>
        </View>
      </View>

      {/* ADHD-Friendly Features */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">
          ADHD-Friendly Features
        </Text>

        <View className="adhd-spacing rounded-lg bg-surface-glass">
          <Text className="mb-2 text-text-primary">ADHD-Friendly Spacing</Text>
          <Text className="text-sm text-text-secondary">
            This container uses the adhd-spacing utility class for optimal whitespace
          </Text>
        </View>

        <View className="gentle-transition mt-4 rounded-lg bg-surface-primary p-lg">
          <Text className="text-text-primary">Gentle Transitions</Text>
          <Text className="mt-2 text-sm text-text-secondary">
            Smooth animations that don&apos;t cause sensory overload
          </Text>
        </View>
      </View>

      {/* Emergency Card Example */}
      <View className="mb-8">
        <Text className="mb-4 text-lg font-semibold text-text-secondary">Emergency Card</Text>

        <TouchableOpacity className="min-h-touch-large w-full flex-row items-center rounded-lg border border-aurora-mid/20 bg-surface-emergency p-lg">
          <View className="mr-md flex h-14 w-14 items-center justify-center rounded-md bg-gradient-to-br from-aurora-mid/20 to-semantic-error/20">
            <Text className="text-2xl">🆘</Text>
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-lg font-semibold text-text-primary">Need Help Now</Text>
            <Text className="text-sm text-text-secondary">
              Immediate support and coping strategies
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View className="h-20" />
    </ScrollView>
  );
};

export default DesignSystemExample;
