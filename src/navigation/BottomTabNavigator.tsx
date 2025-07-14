import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MainTabParamList } from './types';
import { COLORS, SPACING } from '../constants/theme';

// Import stack navigators
import HomeStack from './stacks/HomeStack';
import MoodStack from './stacks/MoodStack';
import TimeStack from './stacks/TimeStack';
import InsightsStack from './stacks/InsightsStack';
import ProfileStack from './stacks/ProfileStack';

const Tab = createBottomTabNavigator<MainTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 85 + insets.bottom,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          paddingTop: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Mood" component={MoodStack} />
      <Tab.Screen name="Time" component={TimeStack} />
      <Tab.Screen name="Insights" component={InsightsStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const insets = useSafeAreaInsets();
  
  const handleTabPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      navigation.navigate(route.name);
    }
  };

  return (
    <View 
      className="absolute bottom-0 left-0 right-0"
      style={{
        height: 85 + insets.bottom,
        paddingBottom: insets.bottom,
      }}
    >
      <BlurView
        intensity={80}
        className="absolute inset-0"
      />
      
      <LinearGradient
        colors={[`${COLORS.ink[90]}E6`, `${COLORS.ink[100]}F0`]}
        locations={[0, 1]}
        className="absolute inset-0"
      />
      
      <View className="flex-row items-center justify-around h-full px-4">
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          
          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handleTabPress(route, isFocused)}
              className="flex-1 items-center justify-center h-full"
              activeOpacity={0.7}
            >
              <View className="relative z-10 items-center">
                <TabIcon name={route.name} focused={isFocused} />
                <Text 
                  className={`font-nunito font-medium text-xs mt-1 ${
                    isFocused ? 'text-white' : 'text-text-tertiary'
                  }`}
                >
                  {route.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const getIcon = () => {
    switch (name) {
      case 'Home':
        return focused ? '🏠' : '🏠';
      case 'Mood':
        return focused ? '😊' : '😊';
      case 'Time':
        return focused ? '⏰' : '⏰';
      case 'Insights':
        return focused ? '📊' : '📊';
      case 'Profile':
        return focused ? '👤' : '👤';
      default:
        return '●';
    }
  };

  return (
    <View className="relative">
      {focused && (
        <LinearGradient
          colors={[COLORS.aurora.start, COLORS.aurora.mid]}
          className="absolute -inset-2 rounded-full opacity-20"
        />
      )}
      <Text className={`text-xl ${focused ? 'text-white' : 'text-text-tertiary'}`}>
        {getIcon()}
      </Text>
    </View>
  );
};

export default BottomTabNavigator; 