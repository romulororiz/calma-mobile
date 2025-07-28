import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TimeStackParamList } from '../types';

// Import screens (we'll create these)
import TimeScreen from '../../screens/time/TimeScreen';
import { TimeCheckScreen, TasksScreen } from '../../screens/PlaceholderScreens';

const Stack = createStackNavigator<TimeStackParamList>();

const TimeStack: React.FC = () => {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="TimeDashboard"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen name="TimeDashboard" component={TimeScreen} />
      <Stack.Screen name="TimeCheck" component={TimeCheckScreen} />
      <Stack.Screen name="Tasks" component={TasksScreen} />
    </Stack.Navigator>
  );
};

export default TimeStack; 