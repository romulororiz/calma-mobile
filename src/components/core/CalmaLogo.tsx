import React, { useEffect, useRef } from 'react';
import { View, Animated, Text } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

interface CalmaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

const CalmaLogo: React.FC<CalmaLogoProps> = ({
  size = 'md',
  showText = false,
  animated = true,
  className = '',
}) => {
  const ripple1 = useRef(new Animated.Value(0)).current;
  const ripple2 = useRef(new Animated.Value(0)).current;
  const ripple3 = useRef(new Animated.Value(0)).current;
  const ripple4 = useRef(new Animated.Value(0)).current;

  const sizeConfig = {
    sm: { container: 60, viewBox: 100 },
    md: { container: 80, viewBox: 100 },
    lg: { container: 100, viewBox: 100 },
    xl: { container: 120, viewBox: 100 },
  };

  const currentSize = sizeConfig[size];

  useEffect(() => {
    if (!animated) return;

    const createRippleAnimation = (animatedValue: Animated.Value, delay: number) => {
      // Initial delay before starting the loop
      setTimeout(() => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(animatedValue, {
              toValue: 1,
              duration: 4500,
              useNativeDriver: false,
            }),
            Animated.timing(animatedValue, {
              toValue: 0,
              duration: 0,
              useNativeDriver: false,
            }),
          ])
        ).start();
      }, delay);
    };

    // Start animations with proportionally adjusted delays for same spacing
    createRippleAnimation(ripple1, 0);
    createRippleAnimation(ripple2, 1125);
    createRippleAnimation(ripple3, 2250);
    createRippleAnimation(ripple4, 3375);
  }, [animated, ripple1, ripple2, ripple3, ripple4]);

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  const getAnimatedProps = (animatedValue: Animated.Value) => ({
    r: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 45],
    }),
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.8, 1],
      outputRange: [0.8, 0.2, 0],
    }),
    strokeWidth: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 1],
    }),
  });

  return (
    <View
      className={className}
      style={{ width: currentSize.container, height: currentSize.container }}>
      <Svg width={currentSize.container} height={currentSize.container} viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#a78bfa" />
            <Stop offset="100%" stopColor="#8b5cf6" />
          </LinearGradient>
        </Defs>

        {animated ? (
          <>
            {/* Animated ripples */}
            <AnimatedCircle
              cx="50"
              cy="50"
              fill="none"
              stroke="url(#purple-gradient)"
              {...getAnimatedProps(ripple1)}
            />
            <AnimatedCircle
              cx="50"
              cy="50"
              fill="none"
              stroke="url(#purple-gradient)"
              {...getAnimatedProps(ripple2)}
            />
            <AnimatedCircle
              cx="50"
              cy="50"
              fill="none"
              stroke="url(#purple-gradient)"
              {...getAnimatedProps(ripple3)}
            />
            <AnimatedCircle
              cx="50"
              cy="50"
              fill="none"
              stroke="url(#purple-gradient)"
              {...getAnimatedProps(ripple4)}
            />
          </>
        ) : (
          <>
            {/* Static ripples */}
            <Circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="url(#purple-gradient)"
              strokeWidth="1"
              opacity="0.3"
            />
            <Circle
              cx="50"
              cy="50"
              r="25"
              fill="none"
              stroke="url(#purple-gradient)"
              strokeWidth="1"
              opacity="0.5"
            />
            <Circle
              cx="50"
              cy="50"
              r="15"
              fill="none"
              stroke="url(#purple-gradient)"
              strokeWidth="1"
              opacity="0.7"
            />
          </>
        )}

        {/* Center dot */}
        <Circle cx="50" cy="50" r="2" fill="#a78bfa" opacity="0.9" />
      </Svg>
      {showText && (
        <Text
          className={`${
            size === 'xl' ? 'text-3xl' : 'text-2xl'
          } text-center font-bold text-text-secondary`}>
          Calma
        </Text>
      )}
    </View>
  );
};

export default CalmaLogo;
