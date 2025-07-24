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
} from '../../components/core';
import NavHeader from '../../components/core/NavHeader';
import CalmaLogo from '../../components/core/CalmaLogo';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isFormValid = name && email && password && confirmPassword && password === confirmPassword;

  const handleSignUp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Handle sign up logic
    navigation.navigate('SetupIntro' as never);
  };

  const handleSocialSignUp = (provider: 'apple' | 'google') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Handle social sign up
    navigation.navigate('SetupIntro' as never);
  };

  const handleSignIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Login' as never);
  };

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
                      fontFamily: 'Poppins_400Regular',
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
                      fontFamily: 'Poppins_400Regular',
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
                      fontFamily: 'Poppins_400Regular',
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
                      fontFamily: 'Poppins_400Regular',
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
                  disabled={!isFormValid}
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

            {/* Social Sign Up Buttons Side by Side */}
            <NebulaAnimated animation="slideUp" duration={600} delay={200} iterationCount={1}>
              <View style={{ flexDirection: 'row', gap: 15 }}>
                <View style={{ flex: 1 }}>
                  <NebulaButton
                    title="Apple"
                    onPress={() => handleSocialSignUp('apple')}
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
                    onPress={() => handleSocialSignUp('google')}
                    variant="secondary"
                    size="md"
                    icon="🔍"
                    iconPosition="left"
                    animated={false}
                  />
                </View>
              </View>
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
