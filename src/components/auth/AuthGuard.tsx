import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { SplashScreen } from '../core';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, requireAuth = true }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !isAuthenticated) {
        // User is not authenticated, redirect to welcome
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' as never }],
        });
      } else if (!requireAuth && isAuthenticated) {
        // User is authenticated but trying to access auth screens
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' as never }],
        });
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, navigation]);

  if (isLoading) {
    return <SplashScreen variant="loading" />;
  }

  // If auth state matches requirement, render children
  if ((requireAuth && isAuthenticated) || (!requireAuth && !isAuthenticated)) {
    return <>{children}</>;
  }

  // Otherwise show loading while redirect happens
  return <SplashScreen variant="loading" />;
};
