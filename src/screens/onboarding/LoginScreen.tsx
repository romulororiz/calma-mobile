import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import {
  NebulaGradient,
  NebulaAnimated,
  NebulaCard,
  NebulaButton,
  NebulaText,
  SplashScreen,
} from '../../components/core';
import { useAuth } from '../../contexts/AuthContext';
import { validateSignIn } from '../../utils/validation';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { signIn, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isGoogleSignIn, setIsGoogleSignIn] = useState(false);

  // Handle prefilled email from signup redirect
  useEffect(() => {
    const params = route.params as { prefillEmail?: string } | undefined;
    if (params?.prefillEmail) {
      setEmail(params.prefillEmail);
      console.log('📧 Pre-filled email from signup redirect:', params.prefillEmail);
    }
  }, [route.params]);

  const handleLogin = async () => {
    // Validate form data
    try {
      validateSignIn(email, password);
    } catch (validationError) {
      Alert.alert(
        'Please Check Your Information',
        validationError instanceof Error ? validationError.message : 'Please verify your email and password are entered correctly'
      );
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoggingIn(true);

    try {
      const result = await signIn({ email, password });

      if (!result.success) {
        // Professional error handling
        if (result.error?.includes('Invalid credentials') || result.error?.includes('Invalid login')) {
          Alert.alert(
            'Sign In Failed',
            'The email or password you entered is incorrect. Please check your credentials and try again.',
            [
              { text: 'Try Again', style: 'default' },
              { 
                text: 'Forgot Password?', 
                onPress: handleForgotPassword,
                style: 'cancel' 
              }
            ]
          );
        } else if (result.error?.includes('Email not confirmed')) {
          Alert.alert(
            'Email Verification Required',
            'Please check your email and click the verification link before signing in.',
            [{ text: 'Resend Email', style: 'default' }]
          );
        } else {
          Alert.alert(
            'Sign In Error',
            result.error || 'We encountered an issue signing you in. Please try again.',
            [{ text: 'Try Again', style: 'default' }]
          );
        }
        return;
      }

      // Success!
      console.log('✅ Login successful!');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
    } catch (error: any) {
      console.error('❌ Login error:', error);
      Alert.alert(
        'Connection Error',
        'Unable to connect to our servers. Please check your internet connection and try again.',
        [{ text: 'Retry', style: 'default' }]
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsGoogleSignIn(true);

    try {
      const result = await signInWithGoogle();

      if (!result.success) {
        Alert.alert(
          'Google Sign In Error',
          result.error || 'We encountered an issue with Google sign in. Please try again.',
          [{ text: 'Try Again', style: 'default' }]
        );
        return;
      }

      // Success!
      console.log('✅ Google login successful!');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
    } catch (error: any) {
      console.error('❌ Google login error:', error);
      Alert.alert(
        'Connection Error',
        'Unable to connect with Google. Please check your internet connection and try again.',
        [{ text: 'Retry', style: 'default' }]
      );
    } finally {
      setIsGoogleSignIn(false);
    }
  };

  const handleForgotPassword = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Navigate to forgot password screen when implemented
    Alert.alert('Coming Soon', 'Password reset functionality will be available soon.');
  };

  const handleSignUp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('SignUp' as never);
  };

  // Show splash screen during authentication
  if (isLoggingIn || isGoogleSignIn) {
    return <SplashScreen variant="signin" duration={3000} />;
  }

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {/* Content */}
          <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 40 }}>
            {/* Logo */}

            {/* Welcome Text */}
            <NebulaAnimated animation="slideUp" duration={600} delay={300} iterationCount={1}>
              <View style={{ marginBottom: 40, marginTop: 100 }}>
                <NebulaText
                  size="xl"
                  variant="primary"
                  style={{ textAlign: 'center', marginBottom: 10 }}>
                  Welcome Back
                </NebulaText>
                <NebulaText size="base" variant="secondary" style={{ textAlign: 'center' }}>
                  Sign in to continue your ADHD wellness journey
                </NebulaText>
              </View>
            </NebulaAnimated>

            {/* Login Form */}
            <NebulaAnimated animation="slideUp" duration={600} delay={400} iterationCount={1}>
              <View style={{ marginBottom: 30 }}>
                {/* Email Input */}
                <View style={{ marginBottom: 20 }}>
                  <NebulaText
                    size="sm"
                    variant="secondary"
                    style={{ marginBottom: 8, marginLeft: 5 }}>
                    Email
                  </NebulaText>
                  <NebulaCard
                    variant="elevated"
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 0,
                      borderRadius: 15,
                    }}>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      placeholder="Enter your email"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      style={{
                        fontSize: 16,
                        color: 'white',
                        paddingVertical: 20,
                      }}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </NebulaCard>
                </View>

                {/* Password Input */}
                <View style={{ marginBottom: 25 }}>
                  <NebulaText
                    size="sm"
                    variant="secondary"
                    style={{ marginBottom: 8, marginLeft: 5 }}>
                    Password
                  </NebulaText>
                  <NebulaCard
                    variant="elevated"
                    style={{
                      paddingHorizontal: 20,
                      paddingVertical: 0,
                      borderRadius: 15,
                    }}>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Enter your password"
                      placeholderTextColor="rgba(255, 255, 255, 0.4)"
                      style={{
                        fontSize: 16,
                        color: 'white',
                        paddingVertical: 20,
                      }}
                      secureTextEntry
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </NebulaCard>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity onPress={handleForgotPassword} style={{ marginBottom: 25 }}>
                  <NebulaText size="sm" variant="tertiary" style={{ textAlign: 'right' }}>
                    Forgot Password?
                  </NebulaText>
                </TouchableOpacity>

                {/* Sign In Button */}
                <NebulaButton
                  title="Sign In"
                  onPress={handleLogin}
                  variant="primary"
                  size="md"
                  disabled={!email || !password || isLoggingIn}
                  animated={false}
                />
              </View>
            </NebulaAnimated>

            {/* Divider */}
            <NebulaAnimated animation="slideUp" duration={600} delay={500} iterationCount={1}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 30,
                }}>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
                <NebulaText size="sm" variant="tertiary" style={{ marginHorizontal: 20 }}>
                  Or continue with
                </NebulaText>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                />
              </View>
            </NebulaAnimated>

            {/* Google Sign In Button */}
            <NebulaAnimated animation="slideUp" duration={600} delay={600} iterationCount={1}>
              <NebulaButton
                title="Continue with Google"
                onPress={handleGoogleLogin}
                variant="secondary"
                size="md"
                icon="🔍"
                iconPosition="left"
                animated={false}
                disabled={isGoogleSignIn}
              />
            </NebulaAnimated>

            {/* Bottom Sign Up */}
            <NebulaAnimated animation="fadeIn" duration={600} delay={700} iterationCount={1}>
              <TouchableOpacity
                onPress={handleSignUp}
                style={{
                  marginTop: 30,
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <NebulaText size="sm" variant="tertiary">
                    Already have an account?{' '}
                  </NebulaText>
                  <NebulaText size="sm" weight="medium" gradient="nebula">
                    Sign up
                  </NebulaText>
                </View>
              </TouchableOpacity>
            </NebulaAnimated>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </NebulaGradient>
  );
};

export default LoginScreen;
