import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { COLORS } from '../constants/theme';

// Import navigators
import BottomTabNavigator from './BottomTabNavigator';

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
      }}
    >
      <Stack.Navigator
        id={undefined}
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          cardStyle: {
            backgroundColor: COLORS.ink[100],
          },
        }}
      >
        <Stack.Screen name="Main" component={BottomTabNavigator} />
        {/* Add other screens like Onboarding, Auth, Emergency later */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator; 