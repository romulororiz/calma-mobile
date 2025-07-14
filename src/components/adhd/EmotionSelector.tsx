import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, LAYOUT, ANIMATION } from '../../constants/theme';

interface EmotionOption {
  id: string;
  emoji: string;
  label: string;
  gradient?: [string, string];
  isEmergency?: boolean;
}

interface EmotionSelectorProps {
  options?: EmotionOption[];
  selected?: string;
  onChange?: (emotionId: string) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  showLabels?: boolean;
  hapticFeedback?: boolean;
  maxSelections?: number;
  columns?: number;
}

interface EmotionButtonProps {
  emotion: EmotionOption;
  selected: boolean;
  onPress: () => void;
  disabled: boolean;
  buttonSize: number;
  emojiSize: number;
  showLabel: boolean;
  fontSize: number;
}

const DEFAULT_EMOTIONS: EmotionOption[] = [
  {
    id: 'happy',
    emoji: '😊',
    label: 'Happy',
    gradient: [COLORS.aurora.start, COLORS.aurora.mid],
  },
  {
    id: 'neutral',
    emoji: '😐',
    label: 'Neutral',
    gradient: [COLORS.aurora.start, COLORS.aurora.mid],
  },
  {
    id: 'sad',
    emoji: '😢',
    label: 'Sad',
    gradient: [COLORS.aurora.start, COLORS.aurora.mid],
  },
  {
    id: 'frustrated',
    emoji: '😤',
    label: 'Frustrated',
    gradient: [COLORS.aurora.mid, COLORS.aurora.end],
  },
  {
    id: 'anxious',
    emoji: '😰',
    label: 'Anxious',
    gradient: [COLORS.aurora.mid, COLORS.aurora.end],
    isEmergency: true,
  },
  {
    id: 'supported',
    emoji: '🤗',
    label: 'Supported',
    gradient: [COLORS.aurora.start, COLORS.aurora.mid],
  },
];

const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  options = DEFAULT_EMOTIONS,
  selected,
  onChange,
  size = 'md',
  disabled = false,
  className,
  showLabels = true,
  hapticFeedback = true,
  columns = 3,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const containerPadding = SPACING.lg * 2;
  const availableWidth = screenWidth - containerPadding;
  const gap = SPACING.lg;
  const buttonWidth = (availableWidth - gap * (columns - 1)) / columns;

  const sizeConfig = {
    sm: {
      buttonSize: Math.min(buttonWidth, 72),
      emojiSize: 28,
      fontSize: 12,
    },
    md: {
      buttonSize: Math.min(buttonWidth, 88),
      emojiSize: 36,
      fontSize: 14,
    },
    lg: {
      buttonSize: Math.min(buttonWidth, 104),
      emojiSize: 44,
      fontSize: 16,
    },
  };

  const config = sizeConfig[size];

  const triggerHaptic = () => {
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleEmotionPress = (emotionId: string) => {
    if (disabled) return;
    
    runOnJS(triggerHaptic)();
    onChange?.(emotionId);
  };

  return (
    <View className={className}>
      <View 
        className="flex-row flex-wrap justify-center gap-6"
      >
        {options.map((emotion) => (
          <EmotionButton
            key={emotion.id}
            emotion={emotion}
            selected={selected === emotion.id}
            onPress={() => handleEmotionPress(emotion.id)}
            disabled={disabled}
            buttonSize={config.buttonSize}
            emojiSize={config.emojiSize}
            showLabel={showLabels}
            fontSize={config.fontSize}
          />
        ))}
      </View>
    </View>
  );
};

const EmotionButton: React.FC<EmotionButtonProps> = ({
  emotion,
  selected,
  onPress,
  disabled,
  buttonSize,
  emojiSize,
  showLabel,
  fontSize,
}) => {
  const scale = useSharedValue(1);
  const borderOpacity = useSharedValue(selected ? 1 : 0);
  
  // Animation styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const borderAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: borderOpacity.value,
    };
  });

  // Interaction handlers
  const handlePressIn = () => {
    if (disabled) return;
    
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = () => {
    if (disabled) return;
    
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePress = () => {
    if (disabled) return;
    
    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Animate border
    borderOpacity.value = withTiming(1, {
      duration: ANIMATION.duration.normal,
    });
    
    onPress();
  };

  // Update border opacity when selected changes
  React.useEffect(() => {
    borderOpacity.value = withTiming(selected ? 1 : 0, {
      duration: ANIMATION.duration.normal,
    });
  }, [selected, borderOpacity]);

  return (
    <View>
      <Animated.View style={animatedStyle}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          disabled={disabled}
          activeOpacity={0.8}
          className="relative overflow-hidden"
          style={{
            width: buttonSize,
            height: buttonSize,
            borderRadius: LAYOUT.borderRadius.lg,
          }}
          accessibilityRole="button"
          accessibilityLabel={`${emotion.label} emotion`}
          accessibilityState={{ selected, disabled }}
        >
          {/* Gradient border effect */}
          <Animated.View
            className="absolute -inset-0.5 p-0.5"
            style={[
              {
                borderRadius: LAYOUT.borderRadius.lg,
              },
              borderAnimatedStyle,
            ]}
          >
            <LinearGradient
              colors={[COLORS.aurora.start, COLORS.aurora.mid]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="flex-1"
              style={{
                borderRadius: LAYOUT.borderRadius.lg,
              }}
            />
          </Animated.View>

          {/* Background blur effect */}
          <BlurView
            intensity={40}
            className="absolute inset-0"
            style={{
              borderRadius: LAYOUT.borderRadius.lg,
            }}
          />

          {/* Glass background */}
          <View
            className="absolute inset-0 border-2 border-transparent"
            style={{
              backgroundColor: COLORS.surface.glass,
              borderRadius: LAYOUT.borderRadius.lg,
            }}
          />

          {/* Content */}
          <View className="flex-1 justify-center items-center relative z-10">
            <Text
              style={{
                fontSize: emojiSize,
                lineHeight: emojiSize * 1.2,
              }}
            >
              {emotion.emoji}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Label */}
      {showLabel && (
        <Text
          className="text-center text-text-secondary mt-2 font-nunito"
          style={{
            fontSize: fontSize,
            opacity: disabled ? 0.4 : 1,
          }}
        >
          {emotion.label}
        </Text>
      )}
    </View>
  );
};

export default EmotionSelector;
