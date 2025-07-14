import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

interface NavHeaderProps {
  title: string;
  showBack?: boolean;
  showMenu?: boolean;
  onMenuPress?: () => void;
  rightElement?: React.ReactNode;
}

const NavHeader: React.FC<NavHeaderProps> = ({
  title,
  showBack = true,
  showMenu = false,
  onMenuPress,
  rightElement,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  };

  const handleMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onMenuPress?.();
  };

  return (
    <View
      className="border-b border-white/5 bg-ink"
      style={{
        paddingTop: insets.top + 8,
        paddingBottom: 16,
        paddingHorizontal: 20,
      }}>
      <View className="flex-row items-center justify-between">
        {showBack ? (
          <TouchableOpacity
            onPress={handleBack}
            className="h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface-glass"
            style={{ minWidth: 40, minHeight: 40 }}>
            <Text className="text-lg font-semibold text-text-primary">←</Text>
          </TouchableOpacity>
        ) : (
          <View className="w-10" />
        )}

        <Text className="mx-4 flex-1 text-center text-xl font-bold text-text-primary">{title}</Text>

        {showMenu ? (
          <TouchableOpacity
            onPress={handleMenu}
            className="h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface-glass"
            style={{ minWidth: 40, minHeight: 40 }}>
            <Text className="text-xl font-bold text-text-primary">⋯</Text>
          </TouchableOpacity>
        ) : rightElement ? (
          rightElement
        ) : (
          <View className="w-10" />
        )}
      </View>
    </View>
  );
};

export default NavHeader;
