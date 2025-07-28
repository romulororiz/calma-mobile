import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { COLORS } from '../constants/theme';
import { useAuth } from '../contexts/AuthContext';
import { profileService } from '../services/profile';
import { authService } from '../services/auth';
import { SplashScreen } from '../components/core';

// Import screens
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import LoginScreen from '../screens/onboarding/LoginScreen';
import OnboardingFlowScreen from '../screens/onboarding/OnboardingFlowScreen';
import MainContainer from '../components/navigation/MainContainer';
import ParentBridgeScreen from '../screens/support/ParentBridgeScreen';
import SignUpScreen from '../screens/onboarding/SignUpScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Timeout fallback to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!initialRoute && !isLoading && !isCheckingProfile) {
        console.log('🧭 Timeout fallback: Setting route to Welcome');
        setInitialRoute('Welcome');
      }
    }, 10000); // 10 second timeout

    return () => clearTimeout(timeout);
  }, [initialRoute, isLoading, isCheckingProfile]);

  useEffect(() => {
    const determineInitialRoute = async () => {
      console.log('🧭 Determining route - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated, 'user:', user?.email || 'none');
      
      // Wait for auth to fully load
      if (isLoading) {
        console.log('🧭 Still loading auth state, waiting...');
        return;
      }

      if (!isAuthenticated || !user) {
        console.log('🧭 Not authenticated, going to Welcome');
        setInitialRoute('Welcome');
        setIsCheckingProfile(false);
        setCurrentUserId(null);
        return;
      }

      // If this is a new user, reset the route
      if (currentUserId !== user.id) {
        console.log('🧭 New user detected, resetting route');
        setInitialRoute(null);
        setCurrentUserId(user.id);
      }

      // Skip if we already have a route for this user
      if (initialRoute && currentUserId === user.id) {
        console.log('🧭 Route already determined for user:', user.id, 'route:', initialRoute);
        setIsCheckingProfile(false);
        return;
      }

      console.log('🧭 Processing user:', user.id, 'provider:', user.app_metadata?.provider);

      try {
        console.log('🧭 User authenticated, checking onboarding status for:', user.id);
        
        // First, verify the user actually exists in the database
        let userProfile = await profileService.getCurrentUserProfile();
        if (!userProfile) {
          console.log('🧭 User session exists but no profile found - attempting to create profile');
          
          // Try to create the profile
          userProfile = await profileService.createUserProfile(user.id, {
            full_name: user.user_metadata?.full_name || user.user_metadata?.name || '',
            email: user.email || '',
          });
          
          if (userProfile) {
            console.log('✅ Profile created successfully during navigation check');
          } else {
            console.error('❌ Failed to create profile during navigation');
            // Clear the session as last resort
            await authService.signOut();
            setInitialRoute('Welcome');
            setIsCheckingProfile(false);
            return;
          }
        }

        const hasCompleted = await profileService.hasCompletedOnboarding(user.id);
        console.log('🧭 Onboarding completed:', hasCompleted);
        
        if (hasCompleted) {
          console.log('🧭 Going to Main app');
          setInitialRoute('Main');
        } else {
          console.log('🧭 Going to SetupIntro');
          setInitialRoute('SetupIntro');
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        console.log('🧭 Error checking user data - likely stale session, going to Welcome');
        // If we can't check user data, the session is probably stale
        await authService.signOut();
        setInitialRoute('Welcome');
      } finally {
        setIsCheckingProfile(false);
      }
    };

    determineInitialRoute();
  }, [isLoading, isAuthenticated, user?.id, currentUserId, initialRoute]); // Include all relevant dependencies

  // Show splash while determining route
  if (isLoading || isCheckingProfile || !initialRoute) {
    return (
      <SplashScreen
        variant="loading"
        duration={isLoading ? 2000 : 1000} // Shorter duration if just checking profile
        showLogo={true}
        showText={false}
      />
    );
  }
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
        initialRouteName={initialRoute}
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
