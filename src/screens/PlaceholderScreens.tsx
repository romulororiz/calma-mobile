import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/theme';

// Placeholder screen component
const PlaceholderScreen: React.FC<{ icon: string; title: string }> = ({ icon, title }) => {
  return (
    <SafeAreaView className="flex-1 bg-ink">
      <LinearGradient colors={[COLORS.ink[100], '#0F0F1A']} className="absolute inset-0" />
      
      <View className="flex-1 items-center justify-center">
        <Text className="text-6xl mb-4">{icon}</Text>
        <Text className="font-nunito text-xl font-bold text-text-primary">
          {title}
        </Text>
        <Text className="font-nunito text-md text-text-secondary mt-2">
          Coming soon...
        </Text>
      </View>
    </SafeAreaView>
  );
};

// Time screens
export const TimeCheckScreen: React.FC = () => <PlaceholderScreen icon="⏰" title="Time Check" />;
export const TasksScreen: React.FC = () => <PlaceholderScreen icon="📋" title="Tasks" />;

// Insights screens
export const InsightsScreen: React.FC = () => <PlaceholderScreen icon="📊" title="Insights Dashboard" />;
export const PatternsScreen: React.FC = () => <PlaceholderScreen icon="🔍" title="Patterns" />;
export const EnergyScreen: React.FC = () => <PlaceholderScreen icon="⚡" title="Energy" />;

// Profile screens
export const ProfileScreen: React.FC = () => <PlaceholderScreen icon="👤" title="Profile" />;
export const SettingsScreen: React.FC = () => <PlaceholderScreen icon="⚙️" title="Settings" />;
export const SupportScreen: React.FC = () => <PlaceholderScreen icon="🤝" title="Support" />;
export const PremiumScreen: React.FC = () => <PlaceholderScreen icon="💜" title="Premium" />;

// Menu screen
export const MenuScreen: React.FC = () => <PlaceholderScreen icon="☰" title="Menu" />; 