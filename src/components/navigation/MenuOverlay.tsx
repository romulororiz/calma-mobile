import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

interface MenuOverlayProps {
  onClose: () => void;
}

interface MenuItemProps {
  icon: string;
  label: string;
  sublabel: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, sublabel, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="mb-2 flex-row items-center gap-4 rounded-2xl border border-transparent bg-surface-glass p-4"
    activeOpacity={0.7}>
    <View className="h-10 w-10 items-center justify-center rounded-xl bg-surface-primary">
      <Text className="text-xl">{icon}</Text>
    </View>
    <View className="flex-1">
      <Text className="mb-0.5 text-base font-semibold text-text-primary">{label}</Text>
      <Text className="text-sm text-text-secondary">{sublabel}</Text>
    </View>
  </TouchableOpacity>
);

const MenuOverlay: React.FC<MenuOverlayProps> = ({ onClose }) => {
  const navigation = useNavigation();

  const handleNavigation = (screen: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
    navigation.navigate(screen as never);
  };

  return (
    <Modal animationType="fade" transparent={true} visible={true} onRequestClose={onClose}>
      <BlurView intensity={95} tint="dark" className="flex-1">
        <View className="flex-1 bg-ink/95">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pb-6 pt-16">
            <Text className="text-3xl font-bold text-text-primary">Menu</Text>
            <TouchableOpacity
              onPress={onClose}
              className="h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-surface-glass">
              <Text className="text-2xl text-text-primary">×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
            {/* AI Tools Section */}
            <View className="mb-8">
              <Text className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                AI TOOLS
              </Text>

              <MenuItem
                icon="⏰"
                label="Time Blindness Helper"
                sublabel="Reality check your time"
                onPress={() => handleNavigation('Time')}
              />

              <MenuItem
                icon="📸"
                label="Chaos to Clarity"
                sublabel="AI organizes your mess"
                onPress={() => handleNavigation('ChaosToClarity')}
              />

              <MenuItem
                icon="💌"
                label="Message Analyzer"
                sublabel="Check tone objectively"
                onPress={() => handleNavigation('MessageCheck')}
              />

              <MenuItem
                icon="📖"
                label="Life Story"
                sublabel="Your achievements"
                onPress={() => handleNavigation('LifeStory')}
              />
            </View>

            {/* Support Section */}
            <View className="mb-8">
              <Text className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                SUPPORT
              </Text>

              <MenuItem
                icon="🆘"
                label="Emergency Mode"
                sublabel="Crisis support"
                onPress={() => handleNavigation('Emergency')}
              />

              <MenuItem
                icon="🌬️"
                label="Breathing Exercises"
                sublabel="Calm your mind"
                onPress={() => handleNavigation('Breathing')}
              />

              <MenuItem
                icon="🤝"
                label="Parent/Partner Bridge"
                sublabel="Help them understand"
                onPress={() => handleNavigation('ParentBridge')}
              />
            </View>

            {/* Account Section */}
            <View className="mb-8">
              <Text className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
                ACCOUNT
              </Text>

              <MenuItem
                icon="⚙️"
                label="Settings"
                sublabel="Preferences & privacy"
                onPress={() => handleNavigation('Settings')}
              />

              <MenuItem
                icon="💜"
                label="Premium"
                sublabel="Unlock all features"
                onPress={() => handleNavigation('Premium')}
              />
            </View>
          </ScrollView>
        </View>
      </BlurView>
    </Modal>
  );
};

export default MenuOverlay;
