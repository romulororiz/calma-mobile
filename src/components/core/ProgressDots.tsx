import React, { useEffect, useRef } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';

interface ProgressDotsProps {
  total: number;
  current: number;
  onDotPress?: (index: number) => void;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ total, current, onDotPress }) => {
  const animatedValues = useRef(
    Array.from({ length: total }).map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    // Animate all dots
    animatedValues.forEach((animatedValue, index) => {
      Animated.timing(animatedValue, {
        toValue: index === current ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });
  }, [current, animatedValues]);

  const handleDotPress = (index: number) => {
    if (onDotPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onDotPress(index);
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}>
      {Array.from({ length: total }).map((_, index) => {
        const animatedValue = animatedValues[index];

        const width = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [8, 24],
        });

        const backgroundColor = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(255, 255, 255, 0.3)', '#6A5ACD'],
        });

        const DotComponent = onDotPress ? TouchableOpacity : View;

        return (
          <DotComponent
            key={index}
            onPress={onDotPress ? () => handleDotPress(index) : undefined}
            activeOpacity={0.7}
            style={{
              padding: 4, // Larger touch area
              borderRadius: 8,
            }}>
            <Animated.View
              style={{
                height: 8,
                width,
                borderRadius: 4,
                backgroundColor,
              }}
            />
          </DotComponent>
        );
      })}
    </View>
  );
};

export default ProgressDots;
 