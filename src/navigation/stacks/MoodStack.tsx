import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MoodStackParamList } from '../types';

// Import screens (we'll create these)
import MoodScreen from '../../screens/mood/MoodScreen';
import CheckinScreen from '../../screens/checkin/CheckinScreen';
import MoodHistoryScreen from '../../screens/mood/MoodHistoryScreen';

const Stack = createStackNavigator<MoodStackParamList>();

const MoodStack: React.FC = () => {
  return (
    <Stack.Navigator    
      id={undefined}
      initialRouteName="MoodDashboard"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent',
        },
        cardStyleInterpolator: ({ current, next, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
      }}
    >
      <Stack.Screen name="MoodDashboard" component={MoodScreen} />
      <Stack.Screen name="Checkin" component={CheckinScreen} />
      <Stack.Screen name="History" component={MoodHistoryScreen} />
    </Stack.Navigator>
  );
};

export default MoodStack; 