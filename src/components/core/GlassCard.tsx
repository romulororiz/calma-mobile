import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, BORDER_RADIUS, ANIMATION } from '../../constants/theme';

interface GlassCardProps {
  variant?: 'default' | 'primary' | 'elevated' | 'emergency';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  className?: string;
  blur?: boolean;
  glow?: boolean;
  animated?: boolean;
}

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView) as any;
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const VARIANTS = {
  default: {
    background: COLORS.surface.glass,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    glowColor: 'rgba(159, 122, 234, 0.1)',
  },
  primary: {
    background: COLORS.surface.primary,
    borderColor: 'rgba(159, 122, 234, 0.1)',
    glowColor: 'rgba(159, 122, 234, 0.2)',
  },
  elevated: {
    background: COLORS.surface.elevated,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    glowColor: 'rgba(159, 122, 234, 0.15)',
  },
  emergency: {
    background: COLORS.surface.emergency,
    borderColor: 'rgba(236, 72, 153, 0.2)',
    glowColor: 'rgba(236, 72, 153, 0.3)',
  },
} as const;

const SIZES = {
  sm: { minHeight: 60, borderRadius: BORDER_RADIUS.sm },
  md: { minHeight: 80, borderRadius: BORDER_RADIUS.md },
  lg: { minHeight: 120, borderRadius: BORDER_RADIUS.lg },
  xl: { minHeight: 160, borderRadius: BORDER_RADIUS.xl },
} as const;

const PADDINGS = {
  none: 0,
  sm: SPACING.sm,
  md: SPACING.md,
  lg: SPACING.lg,
  xl: SPACING.xl,
} as const;

export default function GlassCard({
  variant = 'default',
  size = 'md',
  padding = 'lg',
  children,
  onPress,
  disabled = false,
  style,
  className = '',
  blur = true,
  glow = false,
  animated = true,
}: GlassCardProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const glowOpacity = useSharedValue(glow ? 0.3 : 0);

  const currentVariant = VARIANTS[variant];
  const currentSize = SIZES[size];
  const currentPadding = PADDINGS[padding];

  // Animation for press interactions
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  // Glow animation
  const glowAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value,
    };
  });

  // Handle press interactions with ADHD-friendly feedback
  const handlePressIn = () => {
    if (!disabled && animated) {
      scale.value = withSpring(0.98, {
        damping: 15,
        stiffness: 300,
      });
      glowOpacity.value = withTiming(0.6, {
        duration: ANIMATION.duration.fast,
      });
    }
  };

  const handlePressOut = () => {
    if (!disabled && animated) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 300,
      });
      glowOpacity.value = withTiming(glow ? 0.3 : 0, {
        duration: ANIMATION.duration.normal,
      });
    }
  };

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  const containerStyle: ViewStyle = {
    minHeight: currentSize.minHeight,
    borderRadius: currentSize.borderRadius,
    overflow: 'hidden',
    ...style,
  };

  const contentStyle: ViewStyle = {
    flex: 1,
    padding: currentPadding,
    backgroundColor: currentVariant.background,
    borderWidth: 1,
    borderColor: currentVariant.borderColor,
    borderRadius: currentSize.borderRadius,
    position: 'relative',
  };

  const Component = onPress ? AnimatedTouchableOpacity : Animated.View;

  return (
    <View className={className} style={containerStyle}>
      {/* Glow effect */}
      {glow && (
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              borderRadius: currentSize.borderRadius + 2,
              backgroundColor: currentVariant.glowColor,
              zIndex: 0,
            },
            glowAnimatedStyle,
          ]}
        />
      )}

      <Component
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={animatedStyle}
        activeOpacity={0.8}
        {...(onPress && {
          accessibilityRole: 'button',
          accessibilityState: { disabled },
        })}>
        {blur ? (
          <AnimatedBlurView
            intensity={40}
            style={[
              contentStyle,
              {
                backgroundColor: 'transparent',
              },
            ]}>
            {/* Gradient overlay for glass effect */}
            <LinearGradient
              colors={[
                'rgba(255, 255, 255, 0.05)',
                'rgba(255, 255, 255, 0.02)',
                'rgba(255, 255, 255, 0.01)',
              ]}
              locations={[0, 0.5, 1]}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: currentSize.borderRadius,
              }}
            />

            {/* Content */}
            <View style={{ flex: 1, zIndex: 1 }}>{children}</View>
          </AnimatedBlurView>
        ) : (
          <View style={contentStyle}>{children}</View>
        )}
      </Component>
    </View>
  );
}
