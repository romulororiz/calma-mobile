import React, { useState, useMemo } from 'react';
import { 
  View, 
  Alert, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Haptics from 'expo-haptics';

import {
  NebulaGradient,
  NebulaAnimated,
  NebulaCard,
  NebulaButton,
  NebulaText,
  GlassCard,
  CalmaLogo,
  SplashScreen,
} from '../../components/core';
import { useAuth } from '../../contexts/AuthContext';
import { validateSignUp } from '../../utils/validation';
import * as WebBrowser from 'expo-web-browser';
import { RootStackParamList } from '../../navigation/types';

type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { signUp, signInWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isGoogleSignUp, setIsGoogleSignUp] = useState(false);

  const isFormValid = name && email && password && confirmPassword && password === confirmPassword;

  const handleSignUp = async () => {
    if (!isFormValid) return;

    // Validate form data
    try {
      validateSignUp(name, email, password, confirmPassword);
    } catch (validationError) {
      Alert.alert(
        'Please Check Your Information',
        validationError instanceof Error ? validationError.message : 'Please verify all fields are completed correctly'
      );
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsSigningUp(true);

    try {
      const result = await signUp({
        fullName: name,
        email: email,
        password: password,
      });

      if (!result.success) {
        // Professional handling of existing user
        if (
          result.error?.includes('already exists') ||
          result.error?.includes('already registered') ||
          result.error?.includes('already been taken')
        ) {
          // Show professional existing user dialog
          Alert.alert(
            'Welcome Back! 👋',
            `Looks like you already have an account with ${email}.\n\nWould you like to sign in instead?`,
            [
              { 
                text: 'Try Different Email', 
                style: 'cancel',
                onPress: () => {
                  // Clear email field to let them try again
                  setEmail('');
                }
              },
              {
                text: 'Sign In Instead',
                onPress: () => {
                  // Navigate to login with the email pre-filled
                  navigation.navigate('Login', { prefillEmail: email });
                },
                style: 'default',
              },
            ],
            { cancelable: false }
          );
          return;
        }

        // Handle other signup errors
        Alert.alert(
          'Sign Up Failed', 
          result.error || 'We encountered an issue creating your account. Please try again.',
          [{ text: 'Try Again', style: 'default' }]
        );
        return;
      }

      // Success! User profile is automatically created in AuthContext
      console.log('✅ Sign up successful! User will be redirected by navigation flow');
      
      // Provide immediate positive feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      
    } catch (error: any) {
      console.error('❌ Signup error:', error);
      Alert.alert(
        'Connection Error', 
        'Unable to connect to our servers. Please check your internet connection and try again.',
        [{ text: 'Retry', style: 'default' }]
      );
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleGoogleSignUp = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsGoogleSignUp(true);

    try {
      const result = await signInWithGoogle();

      if (!result.success) {
        Alert.alert(
          'Google Sign Up Error',
          result.error || 'We encountered an issue with Google sign up. Please try again.',
          [{ text: 'Try Again', style: 'default' }]
        );
        return;
      }

      // Success! Check if existing or new user and provide appropriate feedback
      if (result.isNewUser) {
        console.log('✅ New Google user signed up successfully!');
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        console.log('✅ Existing Google user signed in successfully!');
        // Optional: Could show a welcome back message for existing users
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
      
      // Navigation is handled by the auth context and RootNavigator
    } catch (error: any) {
      console.error('❌ Google signup error:', error);
      Alert.alert(
        'Connection Error', 
        'Unable to connect with Google. Please check your internet connection and try again.',
        [{ text: 'Retry', style: 'default' }]
      );
    } finally {
      setIsGoogleSignUp(false);
    }
  };

  const handleSignIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Login' as never);
  };

  // Show splash screen during authentication
  if (isSigningUp || isGoogleSignUp) {
    return <SplashScreen variant="signup" duration={3000} />;
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
              <View style={{ marginBottom: 50, alignItems: 'center', marginTop: 50 }}>
                <NebulaText size="2xl" weight="bold" variant="primary" align="center">
                  Create Account
                </NebulaText>
                <NebulaText size="base" variant="secondary" align="center" style={{ marginTop: 8 }}>
                  Start your journey to ADHD clarity
                </NebulaText>
              </View>
            </NebulaAnimated>

            {/* Registration Form First */}
            <NebulaAnimated animation="slideUp" duration={600} iterationCount={1}>
              <View style={{ marginBottom: 30 }}>
                {/* Name Input */}
                <View style={{ marginBottom: 20 }}>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Full name"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    autoCapitalize="words"
                    style={{
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      paddingHorizontal: 18,
                      paddingVertical: 14,
                      fontSize: 16,
                      color: '#FFFFFF',
                    }}
                  />
                </View>

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
                    }}
                  />
                </View>

                {/* Password Input */}
                <View style={{ marginBottom: 20 }}>
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
                    }}
                  />
                </View>

                {/* Confirm Password Input */}
                <View style={{ marginBottom: 25 }}>
                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm password"
                    placeholderTextColor="rgba(255, 255, 255, 0.4)"
                    secureTextEntry
                    style={{
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor:
                        password && confirmPassword && password !== confirmPassword
                          ? 'rgba(255, 100, 100, 0.3)'
                          : 'rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      paddingHorizontal: 18,
                      paddingVertical: 14,
                      fontSize: 16,
                      color: '#FFFFFF',
                    }}
                  />
                  {password && confirmPassword && password !== confirmPassword && (
                    <NebulaText
                      size="xs"
                      variant="tertiary"
                      style={{ marginTop: 5, marginLeft: 5 }}>
                      Passwords don&apos;t match
                    </NebulaText>
                  )}
                </View>

                {/* Sign Up Button */}
                <NebulaButton
                  title="Create Account"
                  onPress={handleSignUp}
                  variant="primary"
                  size="md"
                  disabled={!isFormValid || isSigningUp}
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

            {/* Social Sign Up Button */}
            <NebulaAnimated animation="slideUp" duration={600} delay={200} iterationCount={1}>
              <NebulaButton
                title="Continue with Google"
                variant="secondary"
                size="md"
                icon="🔍"
                iconPosition="left"
                animated={false}
                disabled={isGoogleSignUp}
                onPress={handleGoogleSignUp}
              />
            </NebulaAnimated>

            {/* Bottom Sign In */}
            <NebulaAnimated animation="fadeIn" duration={600} delay={400} iterationCount={1}>
              <TouchableOpacity
                onPress={handleSignIn}
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
                    Sign in
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

export default SignUpScreen;
