import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { MainTabParamList } from './types';
import { COLORS, SPACING, LAYOUT } from '../constants/theme';

// Import stack navigators (we'll create these)
import HomeStack from './stacks/HomeStack';
import MoodStack from './stacks/MoodStack';
import TimeStack from './stacks/TimeStack';
import InsightsStack from './stacks/InsightsStack';
import ProfileStack from './stacks/ProfileStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

interface TabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const CustomTabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;

  const tabItems = [
    { key: 'Home', icon: '🏠', label: 'Home' },
    { key: 'Mood', icon: '😊', label: 'Mood' },
    { key: 'Time', icon: '⏰', label: 'Time' },
    { key: 'Insights', icon: '📊', label: 'Insights' },
    { key: 'Profile', icon: '👤', label: 'You' },
  ];

  return (
    <View
      style={{
        position: 'absolute',
        bottom: SPACING.lg,
        left: SPACING.lg,
        right: SPACING.lg,
        borderRadius: LAYOUT.borderRadius.lg,
        overflow: 'hidden',
        paddingBottom: Math.max(insets.bottom - SPACING.lg, 0),
      }}
    >
      {/* Background Blur */}
      <BlurView
        intensity={40}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Glass Background */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.surface.elevated,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.05)',
        }}
      />

      {/* Tab Items */}
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: SPACING.sm,
          paddingVertical: SPACING.sm,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {tabItems.map((item, index) => {
          const isActive = state.index === index;
          const routeName = state.routeNames[index];

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: state.routes[index].key,
              canPreventDefault: true,
            });

            if (!isActive && !event.defaultPrevented) {
              // Haptic feedback
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              
              navigation.navigate(routeName);
            }
          };

          return (
            <TouchableOpacity
              key={item.key}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: SPACING.sm,
                borderRadius: LAYOUT.borderRadius.md,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 48,
              }}
              accessibilityRole="button"
              accessibilityLabel={`${item.label} tab`}
              accessibilityState={{ selected: isActive }}
            >
              {/* Active Background */}
              {isActive && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: LAYOUT.borderRadius.md,
                    overflow: 'hidden',
                  }}
                >
                  <LinearGradient
                    colors={[
                      `${COLORS.aurora.start}1A`, // 10% opacity
                      `${COLORS.aurora.mid}1A`,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                      flex: 1,
                    }}
                  />
                </View>
              )}

              {/* Content */}
              <View style={{ position: 'relative', zIndex: 1, alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 20,
                    marginBottom: 4,
                  }}
                >
                  {item.icon}
                </Text>
                <Text
                  className="font-nunito font-semibold"
                  style={{
                    fontSize: 11,
                    color: isActive ? COLORS.text.primary : COLORS.text.tertiary,
                  }}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Mood" component={MoodStack} />
      <Tab.Screen name="Time" component={TimeStack} />
      <Tab.Screen name="Insights" component={InsightsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator; 