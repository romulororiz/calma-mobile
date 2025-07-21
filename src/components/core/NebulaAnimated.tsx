import React from 'react';
import { View, ViewStyle } from 'react-native';
import * as Animatable from 'react-native-animatable';

// Define and register custom animations optimized for ADHD (gentle, calming)
const customAnimations = {
  breathe: {
    from: { transform: [{ scale: 0.98 }], opacity: 0.8 },
    to: { transform: [{ scale: 1.02 }], opacity: 1 },
  },
  float: {
    from: { transform: [{ translateY: 0 }] },
    to: { transform: [{ translateY: -8 }] },
  },
  pulse: {
    from: { opacity: 1 },
    to: { opacity: 0.7 },
  },
  fadeInUp: {
    from: { opacity: 0, transform: [{ translateY: 30 }] },
    to: { opacity: 1, transform: [{ translateY: 0 }] },
  },
};

// Register animations once at module level
Animatable.initializeRegistryWithDefinitions(customAnimations);

interface NebulaAnimatedProps {
  children: React.ReactNode;
  animation?: 'breathe' | 'float' | 'pulse' | 'fadeIn' | 'slideUp' | 'fadeInUp' | 'none';
  duration?: number;
  delay?: number;
  iterationCount?: number | 'infinite';
  style?: ViewStyle;
  className?: string;
}

const NebulaAnimated: React.FC<NebulaAnimatedProps> = ({
  children,
  animation = 'none',
  duration = 2000,
  delay = 0,
  iterationCount = 1,
  style,
  className,
}) => {
  if (animation === 'none') {
    return (
      <View style={style} className={className}>
        {children}
      </View>
    );
  }

  // Use built-in animations for fadeIn and slideUp, custom for fadeInUp
  const animationType = animation === 'slideUp' ? 'slideInUp' : animation;

  return (
    <Animatable.View
      animation={animationType}
      duration={duration}
      delay={delay}
      iterationCount={iterationCount}
      direction={
        animation === 'breathe' || animation === 'float' || animation === 'pulse'
          ? 'alternate'
          : 'normal'
      }
      style={style}
      className={className}
      useNativeDriver={true}>
      {children}
    </Animatable.View>
  );
};

export default NebulaAnimated;
