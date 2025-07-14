import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { COLORS, SPACING, LAYOUT, ANIMATION, ADHD } from '../../constants/theme';

interface ContextOption {
  id: string;
  label: string;
  icon: string;
  category: 'medication' | 'energy' | 'location' | 'activity';
  description?: string;
}

interface ContextPillsProps {
  title?: string;
  options: ContextOption[];
  selected: string[];
  onChange: (selectedIds: string[]) => void;
  maxSelections?: number;
  disabled?: boolean;
  hapticFeedback?: boolean;
  className?: string;
}

interface ContextPillProps {
  option: ContextOption;
  selected: boolean;
  onPress: () => void;
  disabled: boolean;
}

const DEFAULT_CONTEXT_OPTIONS: ContextOption[] = [
  // Medication
  { id: 'med-taken', label: 'Meds Taken', icon: '💊', category: 'medication' },
  { id: 'med-missed', label: 'Missed Meds', icon: '⚠️', category: 'medication' },
  { id: 'med-late', label: 'Late Meds', icon: '🕐', category: 'medication' },
  
  // Energy
  { id: 'energy-high', label: 'High Energy', icon: '⚡', category: 'energy' },
  { id: 'energy-low', label: 'Low Energy', icon: '🔋', category: 'energy' },
  { id: 'energy-crash', label: 'Energy Crash', icon: '📉', category: 'energy' },
  
  // Location
  { id: 'home', label: 'Home', icon: '🏠', category: 'location' },
  { id: 'work', label: 'Work', icon: '💼', category: 'location' },
  { id: 'social', label: 'Social', icon: '👥', category: 'location' },
  
  // Activity
  { id: 'working', label: 'Working', icon: '💻', category: 'activity' },
  { id: 'resting', label: 'Resting', icon: '😴', category: 'activity' },
  { id: 'exercising', label: 'Exercising', icon: '🏃', category: 'activity' },
  { id: 'studying', label: 'Studying', icon: '📚', category: 'activity' },
  { id: 'eating', label: 'Eating', icon: '🍽️', category: 'activity' },
  { id: 'stressed', label: 'Stressed', icon: '😰', category: 'activity' },
];

const ContextPills: React.FC<ContextPillsProps> = ({
  title = 'Context',
  options = DEFAULT_CONTEXT_OPTIONS,
  selected,
  onChange,
  maxSelections = 5,
  disabled = false,
  hapticFeedback = true,
  className,
}) => {
  const triggerHaptic = () => {
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handlePillPress = (optionId: string) => {
    if (disabled) return;
    
    runOnJS(triggerHaptic)();
    
    const isSelected = selected.includes(optionId);
    let newSelected: string[];
    
    if (isSelected) {
      newSelected = selected.filter(id => id !== optionId);
    } else {
      if (selected.length >= maxSelections) {
        return; // Don't allow more selections
      }
      newSelected = [...selected, optionId];
    }
    
    onChange(newSelected);
  };

  const groupedOptions = options.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, ContextOption[]>);

  const categoryLabels = {
    medication: 'Medication',
    energy: 'Energy',
    location: 'Location',
    activity: 'Activity',
  };

  const categoryIcons = {
    medication: '💊',
    energy: '⚡',
    location: '📍',
    activity: '🎯',
  };

  return (
    <View className={`${className || ''}`}>
      {title && (
        <Text className="text-center text-text-primary font-nunito font-semibold text-lg mb-6">
          {title}
        </Text>
      )}
      
      <ScrollView
        className="max-h-80"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SPACING.lg }}
      >
        {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
          <View key={category} className="mb-6">
            <Text className="text-text-secondary font-nunito font-medium text-sm mb-3 ml-1">
              {categoryIcons[category as keyof typeof categoryIcons]} {categoryLabels[category as keyof typeof categoryLabels]}
            </Text>
            
            <View className="flex-row flex-wrap justify-center gap-2">
              {categoryOptions.map((option) => (
                <ContextPill
                  key={option.id}
                  option={option}
                  selected={selected.includes(option.id)}
                  onPress={() => handlePillPress(option.id)}
                  disabled={disabled || (!selected.includes(option.id) && selected.length >= maxSelections)}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const ContextPill: React.FC<ContextPillProps> = ({
  option,
  selected,
  onPress,
  disabled,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

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
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  React.useEffect(() => {
    opacity.value = withTiming(disabled ? 0.4 : 1, {
      duration: ANIMATION.duration.fast,
    });
  }, [disabled, opacity]);

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.8}
        className="rounded-full overflow-hidden relative"
        style={{
          minHeight: ADHD.touchTarget.minimum,
        }}
        accessibilityRole="button"
        accessibilityLabel={`${option.label} context option`}
        accessibilityState={{ selected, disabled }}
      >
        {/* Background */}
        {selected ? (
          <LinearGradient
            colors={[COLORS.aurora.start, COLORS.aurora.mid]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-4 py-2 flex-row items-center gap-2"
          >
            <Text className="text-base">{option.icon}</Text>
            <Text className="text-white font-semibold text-sm font-nunito">
              {option.label}
            </Text>
          </LinearGradient>
        ) : (
          <View
            className="px-4 py-2 flex-row items-center gap-2 border border-white/5"
            style={{
              backgroundColor: COLORS.surface.glass,
            }}
          >
            <BlurView
              intensity={20}
              className="absolute inset-0"
            />
            <View className="relative z-10 flex-row items-center gap-2">
              <Text className="text-base">{option.icon}</Text>
              <Text className="text-text-primary font-medium text-sm font-nunito">
                {option.label}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ContextPills;
