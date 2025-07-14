import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { COLORS } from '../constants/theme';

// Import navigators
import BottomTabNavigator from './BottomTabNavigator';

// Import screens
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import LoginScreen from '../screens/onboarding/LoginScreen';
import SetupIntroScreen from '../screens/onboarding/SetupIntroScreen';
import ADHDTypeScreen from '../screens/onboarding/ADHDTypeScreen';
import EmergencyScreen from '../screens/emergency/EmergencyScreen';
import ChaosToClarityScreen from '../screens/ai/ChaosToClarityScreen';
import MessageCheckScreen from '../screens/ai/MessageCheckScreen';
import LifeStoryScreen from '../screens/ai/LifeStoryScreen';
import ParentBridgeScreen from '../screens/support/ParentBridgeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: COLORS.aurora.start,
          background: COLORS.ink[100],
          card: COLORS.surface.elevated,
          text: COLORS.text.primary,
          border: 'rgba(255, 255, 255, 0.05)',
          notification: COLORS.aurora.mid,
        },
        fonts: {
          regular: {
            fontFamily: 'Nunito',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'Nunito',
            fontWeight: '600',
          },
          bold: {
            fontFamily: 'Nunito',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'Nunito',
            fontWeight: '700',
          },
        },
      }}>
      <Stack.Navigator
        id={undefined}
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: COLORS.ink[100],
          },
        }}>
        {/* Onboarding */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SetupIntro" component={SetupIntroScreen} />
        <Stack.Screen name="ADHDType" component={ADHDTypeScreen} />

        {/* Main App */}
        <Stack.Screen name="Main" component={BottomTabNavigator} />

        {/* AI Features */}
        <Stack.Screen name="ChaosToClarity" component={ChaosToClarityScreen} />
        <Stack.Screen name="MessageCheck" component={MessageCheckScreen} />
        <Stack.Screen name="LifeStory" component={LifeStoryScreen} />

        {/* Support */}
        <Stack.Screen name="Emergency" component={EmergencyScreen} />
        <Stack.Screen name="ParentBridge" component={ParentBridgeScreen} />

        {/* Settings */}
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
