import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './types';
import { COLORS } from '../constants/theme';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import CheckinScreen from '../screens/checkin/CheckinScreen';
import TimeScreen from '../screens/time/TimeScreen';
import InsightsScreen from '../screens/insights/InsightsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

// Import custom tab bar
import CustomTabBar from '../components/navigation/CustomTabBar';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      id={undefined}
      initialRouteName="Home"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface.elevated,
          borderTopColor: 'rgba(255, 255, 255, 0.05)',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => '🏠',
        }}
      />
      <Tab.Screen
        name="Mood"
        component={CheckinScreen}
        options={{
          tabBarLabel: 'Mood',
          tabBarIcon: () => '😊',
        }}
      />
      <Tab.Screen
        name="Time"
        component={TimeScreen}
        options={{
          tabBarLabel: 'Time',
          tabBarIcon: () => '⏰',
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarLabel: 'Insights',
          tabBarIcon: () => '📊',
        }}
      />
      <Tab.Screen
        name="You"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'You',
          tabBarIcon: () => '👤',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
