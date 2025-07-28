import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const useOnboardingTransition = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useFocusEffect(() => {
    // Reset animations when screen comes into focus
    fadeAnim.setValue(0);
    slideAnim.setValue(50);

    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  });

  const animatedStyles = {
    container: {
      opacity: fadeAnim,
      transform: [{ translateY: slideAnim }],
    },
  };

  return { animatedStyles };
};
