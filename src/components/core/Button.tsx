import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  className = '',
}) => {
  const handlePress = () => {
    if (!disabled && !loading) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  };

  const baseStyles = 'rounded-full py-4 px-6 flex-row items-center justify-center';

  const variantStyles = {
    primary: 'bg-aurora-start',
    secondary: 'bg-surface-glass border border-white/10',
    ghost: 'bg-transparent',
  };

  const textStyles = {
    primary: 'text-white',
    secondary: 'text-text-primary',
    ghost: 'text-text-secondary',
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? 'white' : '#9F7AEA'} />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Text className={`mr-2 text-lg ${textStyles[variant]}`}>{icon}</Text>
          )}
          <Text className={`text-base font-semibold ${textStyles[variant]}`}>{title}</Text>
          {icon && iconPosition === 'right' && (
            <Text className={`ml-2 text-lg ${textStyles[variant]}`}>{icon}</Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
