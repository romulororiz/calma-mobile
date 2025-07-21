import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { COLORS } from '../constants/theme';

// Import screens
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import LoginScreen from '../screens/onboarding/LoginScreen';
import OnboardingFlowScreen from '../screens/onboarding/OnboardingFlowScreen';
import MainContainer from '../components/navigation/MainContainer';
import ParentBridgeScreen from '../screens/support/ParentBridgeScreen';
import SignUpScreen from '../screens/onboarding/SignUpScreen';

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
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 400,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 400,
              },
            },
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {/* Onboarding */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="SetupIntro"
          component={OnboardingFlowScreen}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />

        {/* Main App - All screens handled within MainContainer */}
        <Stack.Screen name="Main" component={MainContainer} />

        {/* Support */}
        <Stack.Screen name="ParentBridge" component={ParentBridgeScreen} />

        {/* Settings - handled by MainContainer */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
