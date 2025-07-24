import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import {
  NebulaGradient,
  NebulaAnimated,
  NebulaCard,
  NebulaButton,
  NebulaText,
  SplashScreen,
} from '../../components/core';
import { authService } from '../../services/auth';
import NavHeader from '../../components/core/NavHeader';
import CalmaLogo from '../../components/core/CalmaLogo';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsLoggingIn(true);

    try {
      const { data, error } = await authService.signIn(email, password);

      if (error) {
        console.error('Login error:', error);
        setIsLoggingIn(false);
        // TODO: Show error message to user
        return;
      }

      // Success - splash will handle navigation
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsLoggingIn(true);

    try {
      const { data, error } = await authService.signInWithGoogle();

      if (error) {
        console.error('Google login error:', error);
        setIsLoggingIn(false);
        return;
      }

      // Success - splash will handle navigation
    } catch (error) {
      console.error('Google login failed:', error);
      setIsLoggingIn(false);
    }
  };

  const handleAppleLogin = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsLoggingIn(true);

    try {
      const { data, error } = await authService.signInWithApple();

      if (error) {
        console.error('Apple login error:', error);
        setIsLoggingIn(false);
        return;
      }

      // Success - splash will handle navigation
    } catch (error) {
      console.error('Apple login failed:', error);
      setIsLoggingIn(false);
    }
  };

  const handleSplashComplete = () => {
    // Navigate after splash animation completes
    navigation.navigate('Main' as never);
    setIsLoggingIn(false);
  };

  const handleSocialLogin = (provider: 'apple' | 'google') => {
    if (provider === 'google') {
      handleGoogleLogin();
    } else if (provider === 'apple') {
      handleAppleLogin();
    }
  };

  const handleForgotPassword = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Navigate to forgot password
  };

  if (isLoggingIn) {
    return (
      <SplashScreen
        variant="auth"
        duration={2000} // 2 seconds for login transition
        onAnimationComplete={handleSplashComplete}
        showLogo={true}
        showText={true}
      />
    );
  }

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={{ flex: 1, paddingHorizontal: 30, justifyContent: 'center' }}>
            {/* Logo */}
            <NebulaAnimated animation="fadeIn" duration={800} iterationCount={1}>
              <View style={{ marginBottom: 50, alignItems: 'center' }}>
                <View style={{ marginBottom: 20, alignItems: 'center', justifyContent: 'center' }}>
                  <CalmaLogo size="md" />
                </View>
                <NebulaText size="2xl" weight="bold" variant="primary" align="center">
                  Welcome Back
                </NebulaText>
                <NebulaText size="base" variant="secondary" align="center" style={{ marginTop: 8 }}>
                  Sign in to continue your journey
                </NebulaText>
              </View>
            </NebulaAnimated>

            {/* Email Form First */}
            <NebulaAnimated animation="slideUp" duration={600} iterationCount={1}>
              <View style={{ marginBottom: 30 }}>
                {/* Email Input */}
                <View style={{ marginBottom: 20 }}>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email address"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      paddingHorizontal: 18,
                      paddingVertical: 14,
                      fontSize: 16,
                      color: '#FFFFFF',
                      fontFamily: 'Poppins_400Regular',
                    }}
                  />
                </View>

                {/* Password Input */}
                <View style={{ marginBottom: 15 }}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    secureTextEntry
                    style={{
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      paddingHorizontal: 18,
                      paddingVertical: 14,
                      fontSize: 16,
                      color: '#FFFFFF',
                      fontFamily: 'Poppins_400Regular',
                    }}
                  />
                </View>

                {/* Forgot Password */}
                <TouchableOpacity onPress={handleForgotPassword} style={{ marginBottom: 25 }}>
                  <NebulaText size="sm" variant="primary" align="right">
                    Forgot password?
                  </NebulaText>
                </TouchableOpacity>

                {/* Sign In Button */}
                <NebulaButton
                  title="Sign In"
                  onPress={handleLogin}
                  variant="primary"
                  size="md"
                  disabled={!email || !password}
                  animated={false}
                />
              </View>
            </NebulaAnimated>

            {/* Divider */}
            <NebulaAnimated animation="slideUp" duration={600} delay={100} iterationCount={1}>
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

            {/* Social Login Buttons Side by Side */}
            <NebulaAnimated animation="slideUp" duration={600} delay={200} iterationCount={1}>
              <View style={{ flexDirection: 'row', gap: 15 }}>
                <View style={{ flex: 1 }}>
                  <NebulaButton
                    title="Apple"
                    onPress={() => handleSocialLogin('apple')}
                    variant="secondary"
                    size="md"
                    icon="🍎"
                    iconPosition="left"
                    animated={false}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <NebulaButton
                    title="Google"
                    onPress={() => handleSocialLogin('google')}
                    variant="secondary"
                    size="md"
                    icon="🔍"
                    iconPosition="left"
                    animated={false}
                  />
                </View>
              </View>
            </NebulaAnimated>

            {/* Bottom Sign Up */}
            <NebulaAnimated animation="fadeIn" duration={600} delay={400} iterationCount={1}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp' as never)}
                style={{
                  marginTop: 30,
                  paddingVertical: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <NebulaText size="sm" variant="tertiary">
                    Don&apos;t have an account?{' '}
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
