import React from 'react';
import { TouchableOpacity, Text, View, ViewStyle, TextStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import NebulaGradient from './NebulaGradient';
import NebulaAnimated from './NebulaAnimated';

interface NebulaButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  className?: string;
  hapticFeedback?: boolean;
  animated?: boolean;
}

const NebulaButton: React.FC<NebulaButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  icon,
  iconPosition = 'right',
  style,
  className,
  hapticFeedback = true,
  animated = true,
}) => {
  const sizeConfigs = {
    sm: {
      height: 48, // More reasonable size
      paddingHorizontal: 20,
      fontSize: 14,
      borderRadius: 24,
    },
    md: {
      height: 56, // Comfortable but not overwhelming
      paddingHorizontal: 24,
      fontSize: 16,
      borderRadius: 28,
    },
    lg: {
      height: 64, // Large but not aggressive
      paddingHorizontal: 32,
      fontSize: 16,
      borderRadius: 32,
    },
  };

  const config = sizeConfigs[size];

  const handlePress = () => {
    if (disabled) return;

    if (hapticFeedback) {
      Haptics.impactAsync(
        variant === 'emergency'
          ? Haptics.ImpactFeedbackStyle.Heavy
          : Haptics.ImpactFeedbackStyle.Light
      );
    }

    onPress();
  };

  const baseStyle: ViewStyle = {
    height: config.height,
    paddingHorizontal: config.paddingHorizontal,
    borderRadius: config.borderRadius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.5 : 1,
    ...style,
  };

  const textStyle: TextStyle = {
    fontSize: config.fontSize,
    fontWeight: '500',
    fontFamily: 'Poppins_500Medium',
    letterSpacing: 0.5,
  };

  const ButtonComponent = animated ? NebulaAnimated : View;
  const animationProps = animated ? { animation: 'fadeIn' as const, duration: 500 } : {};

  // Render different variants
  switch (variant) {
    case 'primary':
      return (
        <ButtonComponent {...animationProps}>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.8} className={className}>
            <NebulaGradient variant="primary" style={baseStyle}>
              <Text style={{ ...textStyle, color: '#FFFFFF' }}>{title}</Text>
              {icon && iconPosition === 'right' && (
                <Text style={{ fontSize: config.fontSize + 2, color: '#FFFFFF', marginLeft: 8 }}>
                  {icon}
                </Text>
              )}
            </NebulaGradient>
          </TouchableOpacity>
        </ButtonComponent>
      );

    case 'emergency':
      return (
        <ButtonComponent {...animationProps}>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.8} className={className}>
            <NebulaGradient
              variant="cosmic"
              style={{
                ...baseStyle,
                shadowColor: '#FF4500',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.3,
                shadowRadius: 16,
                elevation: 8,
              }}>
              <Text style={{ ...textStyle, color: '#FFFFFF' }}>{title}</Text>
              {icon && iconPosition === 'right' && (
                <Text style={{ fontSize: config.fontSize + 2, color: '#FFFFFF', marginLeft: 8 }}>
                  {icon}
                </Text>
              )}
            </NebulaGradient>
          </TouchableOpacity>
        </ButtonComponent>
      );

    case 'secondary':
      return (
        <ButtonComponent {...animationProps}>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.8} className={className}>
            <View
              style={{
                ...baseStyle,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}>
              <Text style={{ ...textStyle, color: '#FFFFFF' }}>{title}</Text>
              {icon && iconPosition === 'right' && (
                <Text style={{ fontSize: config.fontSize + 2, color: '#FFFFFF', marginLeft: 8 }}>
                  {icon}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </ButtonComponent>
      );

    case 'ghost':
    default:
      return (
        <ButtonComponent {...animationProps}>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.7} className={className}>
            <View style={{ ...baseStyle, backgroundColor: 'transparent' }}>
              <Text style={{ ...textStyle, color: '#D3D3D3' }}>{title}</Text>
              {icon && iconPosition === 'right' && (
                <Text style={{ fontSize: config.fontSize + 2, color: '#D3D3D3', marginLeft: 8 }}>
                  {icon}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </ButtonComponent>
      );
  }
};

export default NebulaButton;
 