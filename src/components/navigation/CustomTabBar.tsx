import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-ink"
      style={{
        paddingBottom: insets.bottom,
        paddingTop: 8,
        paddingHorizontal: 16,
      }}>
      <View className="flex-row items-center justify-around">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? typeof options.tabBarLabel === 'string'
                ? options.tabBarLabel
                : route.name
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const icon = options.tabBarIcon
            ? options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? '#9F7AEA' : 'rgba(255, 255, 255, 0.5)',
                size: 24,
              })
            : null;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              className="flex-1 items-center py-2"
              style={{ minHeight: 48 }}>
              <View className="items-center">
                <View className="mb-1">
                  <Text
                    className={`text-2xl ${
                      isFocused ? 'text-aurora-start' : 'text-text-quaternary'
                    }`}>
                    {icon}
                  </Text>
                </View>
                <Text
                  className={`text-xs font-medium ${
                    isFocused ? 'text-text-primary' : 'text-text-quaternary'
                  }`}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;
