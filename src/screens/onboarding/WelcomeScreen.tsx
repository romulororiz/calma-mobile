import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { NebulaGradient, NebulaAnimated, NebulaButton, NebulaText } from '../../components/core';
import CalmaLogo from '../../components/core/CalmaLogo';

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleBegin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('SignUp' as never);
  };

  const handleSignIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.navigate('Login' as never);
  };

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 30, paddingBottom: 40 }}>
          {/* Logo and App Name */}
          <NebulaAnimated animation="fadeIn" duration={1000} iterationCount={1}>
            <View style={{ marginBottom: 60, alignItems: 'center', marginTop: 80 }}>
              <View style={{ marginBottom: 30, alignItems: 'center', justifyContent: 'center' }}>
                <CalmaLogo showText={true} size="xl" />
              </View>
            </View>
          </NebulaAnimated>

          {/* Middle Content */}
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <NebulaAnimated animation="slideUp" duration={800} iterationCount={1}>
              <NebulaText
                size="lg"
                variant="secondary"
                align="center"
                style={{ lineHeight: 28, marginBottom: 40, fontSize: 16 }}>
                Built by ADHD minds for ADHD minds.{'\n'}No judgment, just understanding.
              </NebulaText>
            </NebulaAnimated>
          </View>

          {/* Bottom Actions */}
          <NebulaAnimated animation="slideUp" duration={600} iterationCount={1}>
            <View>
              <NebulaButton
                title="Let's Begin"
                onPress={handleBegin}
                variant="primary"
                size="md"
                icon="→"
                iconPosition="right"
                animated={false}
                style={{ marginBottom: 20 }}
              />

              <TouchableOpacity onPress={handleSignIn} style={{ paddingVertical: 15 }}>
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
            </View>
          </NebulaAnimated>
        </View>
      </SafeAreaView>
    </NebulaGradient>
  );
};

export default WelcomeScreen;
