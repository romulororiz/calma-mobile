import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import NavHeader from '../../components/core/NavHeader';
import Button from '../../components/core/Button';
import GlassCard from '../../components/core/GlassCard';
import CalmaLogo from '../../components/core/CalmaLogo';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Handle login logic
    navigation.navigate('Main' as never);
  };

  const handleSocialLogin = (provider: 'apple' | 'google') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Handle social login
  };

  const handleForgotPassword = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Navigate to forgot password
  };

  return (
    <View className="flex-1 bg-ink">
      <NavHeader title="Welcome Back" showBack={true} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View className="flex-1 px-6 pt-8">
          {/* Logo */}
          <View className="mb-8 items-center">
            <View className="mb-4 h-20 w-20 items-center justify-center rounded-2xl">
              <CalmaLogo size="md" />
            </View>
            <Text className="text-2xl font-bold text-text-primary">Sign In to Calma</Text>
          </View>

          {/* Form */}
          <View className="flex-1">
            {/* Email Input */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-text-secondary">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                keyboardType="email-address"
                autoCapitalize="none"
                className="rounded-md border border-white/10 bg-surface-glass px-6 py-4 text-base text-text-primary"
              />
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-text-secondary">Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="rgba(255, 255, 255, 0.3)"
                secureTextEntry
                className="rounded-md border border-white/10 bg-surface-glass px-6 py-4 text-base text-text-primary"
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity onPress={handleForgotPassword} className="mb-8">
              <Text className="text-right text-sm text-aurora-start">Forgot password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <Button
              title="Sign In"
              onPress={handleLogin}
              variant="primary"
              disabled={!email || !password}
            />

            {/* Social Login */}
            <View className="mt-8">
              <Text className="mb-6 text-center text-sm text-text-tertiary">Or continue with</Text>

              <View className="flex-row gap-4">
                <TouchableOpacity onPress={() => handleSocialLogin('apple')} className="flex-1">
                  <GlassCard className="items-center py-3">
                    <Text className="text-base">🍎 Apple</Text>
                  </GlassCard>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleSocialLogin('google')} className="flex-1">
                  <GlassCard className="items-center py-3">
                    <Text className="text-base">🔷 Google</Text>
                  </GlassCard>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
