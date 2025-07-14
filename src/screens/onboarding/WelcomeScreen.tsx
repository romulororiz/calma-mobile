import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import Button from '../../components/core/Button';
import CalmaLogo from '../../components/core/CalmaLogo';

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBegin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('SetupIntro' as never);
  };

  const handleSignIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Login' as never);
  };

  return (
    <View className="flex-1 bg-ink">
      {/* Background Gradient */}
      <LinearGradient colors={['#0A0A0F', '#0F0F1A']} className="absolute inset-0" />

      <View className="flex-1 px-6 pb-10 pt-20">
        {/* Logo and App Name */}
        <View className="mb-16 items-center">
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-2xl">
            <CalmaLogo showText={true} size="xl" />
          </View>
        </View>

        {/* Middle Content */}
        <View className="flex-1 items-center justify-start px-8 pt-36">
          <Text className="text-center text-lg leading-relaxed text-text-secondary">
            Built by ADHD minds for ADHD minds. No judgment, just understanding.
          </Text>
        </View>

        {/* Bottom Actions */}
        <View>
          <Button
            title="Let's Begin"
            onPress={handleBegin}
            variant="primary"
            icon="→"
            iconPosition="right"
          />

          <TouchableOpacity onPress={handleSignIn} className="mt-6">
            <Text className="text-center text-sm text-text-tertiary">
              Already have an account?{' '}
              <Text className="font-semibold text-aurora-start">Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
