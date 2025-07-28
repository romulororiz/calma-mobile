import React, { ReactNode, useRef } from 'react';
import { View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { NebulaGradient } from '../core';
import ProgressDots from '../core/ProgressDots';

interface OnboardingContainerProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  showProgressDots?: boolean;
  onStepChange?: (step: number) => void;
}

const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
  children,
  currentStep,
  totalSteps,
  showProgressDots = true,
  onStepChange,
}) => {
  const slideAnim = useRef(new Animated.Value(100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      // Reset animations when screen comes into focus
      slideAnim.setValue(100);
      fadeAnim.setValue(0);

      // Animate content in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    }, [slideAnim, fadeAnim])
  );

  return (
    <NebulaGradient variant="background" style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Fixed Progress Dots - NEVER MOVE */}
        {showProgressDots && (
          <View
            style={{
              paddingHorizontal: 30,
              paddingTop: 60,
              paddingBottom: 20,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
            }}>
            <ProgressDots total={totalSteps} current={currentStep} onDotPress={onStepChange} />
          </View>
        )}

        {/* Content that slides - positioned below fixed progress dots */}
        <Animated.View
          style={{
            flex: 1,
            marginTop: showProgressDots ? 100 : 0, // Space for fixed progress dots
            transform: [{ translateY: slideAnim }],
            opacity: fadeAnim,
          }}>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 30,
              paddingBottom: 40,
              paddingTop: 20,
            }}>
            {children}
          </View>
        </Animated.View>
      </SafeAreaView>
    </NebulaGradient>
  );
};

export default OnboardingContainer;
