import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { InsightsStackParamList } from '../types';

// Import screens (we'll create these)
import { InsightsScreen, PatternsScreen, EnergyScreen } from '../../screens/PlaceholderScreens';

const Stack = createStackNavigator<InsightsStackParamList>();

const InsightsStack: React.FC = () => {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="InsightsDashboard"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen name="InsightsDashboard" component={InsightsScreen} />
      <Stack.Screen name="Patterns" component={PatternsScreen} />
      <Stack.Screen name="Energy" component={EnergyScreen} />
    </Stack.Navigator>
  );
};

export default InsightsStack; 