import React from 'react';
import { 
  View, 
  TouchableOpacity, 
  ViewStyle, 
  TouchableOpacityProps,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { COLORS, LAYOUT, SPACING, ANIMATION } from '../../constants/theme';

interface GlassCardProps extends TouchableOpacityProps {
  variant?: 'default' | 'primary' | 'elevated' | 'emergency';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  className?: string;
  disabled?: boolean;
  hapticFeedback?: boolean;
  glowEffect?: boolean;
  blurIntensity?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'default',
  padding = 'lg',
  children,
  onPress,
  style,
  className,
  disabled = false,
  hapticFeedback = true,
  glowEffect = false,
  blurIntensity = 40,
  ...props
}) => {
  const scaleValue = useSharedValue(1);
  const glowValue = useSharedValue(0);

  // Animation styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
    };
  });

  const glowStyle = useAnimatedStyle(() => {
    return {
      opacity: glowValue.value,
    };
  });

  // Padding configuration
  const paddingConfig = {
    sm: SPACING.sm,
    md: SPACING.md,
    lg: SPACING.lg,
  };

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: COLORS.surface.primary,
          borderColor: `${COLORS.aurora.start}1A`, // 10% opacity
        };
      case 'elevated':
        return {
          backgroundColor: COLORS.surface.elevated,
          borderColor: 'rgba(255, 255, 255, 0.1)',
        };
      case 'emergency':
        return {
          backgroundColor: COLORS.surface.emergency,
          borderColor: `${COLORS.aurora.mid}33`, // 20% opacity
        };
      default:
        return {
          backgroundColor: COLORS.surface.glass,
          borderColor: 'rgba(255, 255, 255, 0.05)',
        };
    }
  };

  // Interaction handlers
  const handlePressIn = () => {
    if (disabled) return;
    
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    scaleValue.value = withSpring(0.98, {
      damping: 15,
      stiffness: 300,
    });
    
    if (glowEffect) {
      glowValue.value = withTiming(1, {
        duration: ANIMATION.duration.fast,
      });
    }
  };

  const handlePressOut = () => {
    if (disabled) return;
    
    scaleValue.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
    
    if (glowEffect) {
      glowValue.value = withTiming(0, {
        duration: ANIMATION.duration.normal,
      });
    }
  };

  const handlePress = () => {
    if (disabled || !onPress) return;
    
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    onPress();
  };

  const variantStyles = getVariantStyles();
  const isInteractive = !!onPress && !disabled;

  const cardStyle: ViewStyle = {
    borderRadius: LAYOUT.borderRadius.lg,
    borderWidth: 1,
    padding: paddingConfig[padding],
    position: 'relative',
    overflow: 'hidden',
    ...variantStyles,
    opacity: disabled ? 0.4 : 1,
    ...style,
  };

  // Render glow effect for primary variant
  const renderGlow = () => {
    if (!glowEffect || variant !== 'primary') return null;
    
    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: 100,
            opacity: 0.3,
          },
          glowStyle,
        ]}
      >
        <LinearGradient
          colors={[COLORS.aurora.start, 'transparent']}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 100,
          }}
        />
      </Animated.View>
    );
  };

  if (isInteractive) {
    return (
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          disabled={disabled}
          activeOpacity={0.9}
          style={cardStyle}
          className={className}
          {...props}
        >
          {renderGlow()}
          <BlurView
            intensity={blurIntensity}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: LAYOUT.borderRadius.lg,
            }}
          />
          <View style={{ position: 'relative', zIndex: 1 }}>
            {children}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[cardStyle, animatedStyle]} className={className}>
      {renderGlow()}
      <BlurView
        intensity={blurIntensity}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: LAYOUT.borderRadius.lg,
        }}
      />
      <View style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </View>
    </Animated.View>
  );
};

export default GlassCard;
