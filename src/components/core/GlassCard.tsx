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
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6',
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
    onPress();
  };

  const isInteractive = Boolean(onPress);
  const variantStyles = getVariantStyles();

  const cardStyle: ViewStyle = {
    borderRadius: LAYOUT.borderRadius.lg,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
    ...variantStyles,
    ...style,
  };

  // Render glow effect for primary variant
  const renderGlow = () => {
    if (!glowEffect || variant !== 'primary') return null;
    
    return (
      <Animated.View
        className="absolute -top-12 -right-12 w-50 h-50 rounded-full opacity-30"
        style={glowStyle}
      >
        <LinearGradient
          colors={[COLORS.aurora.start, 'transparent']}
          className="w-full h-full rounded-full"
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
          className={`${paddingConfig[padding]} ${className || ''}`}
          {...props}
        >
          {renderGlow()}
          <BlurView
            intensity={blurIntensity}
            className="absolute inset-0"
            style={{
              borderRadius: LAYOUT.borderRadius.lg,
            }}
          />
          <View className="relative z-10">
            {children}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View 
      style={[cardStyle, animatedStyle]} 
      className={`${paddingConfig[padding]} ${className || ''}`}
    >
      {renderGlow()}
      <BlurView
        intensity={blurIntensity}
        className="absolute inset-0"
        style={{
          borderRadius: LAYOUT.borderRadius.lg,
        }}
      />
      <View className="relative z-10">
        {children}
      </View>
    </Animated.View>
  );
};

export default GlassCard;
