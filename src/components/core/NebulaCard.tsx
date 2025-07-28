import React from 'react';
import { View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import NebulaGradient from './NebulaGradient';

interface NebulaCardProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'cosmic' | 'elevated' | 'emergency';
  style?: ViewStyle;
  className?: string;
  blurIntensity?: number;
  padding?: number;
}

const NebulaCard: React.FC<NebulaCardProps> = ({
  children,
  variant = 'default',
  style,
  className,
  blurIntensity = 20,
  padding = 20,
}) => {
  const cardStyles = {
    default: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.08)',
      borderWidth: 1,
    },
    primary: {
      backgroundColor: 'rgba(106, 90, 205, 0.08)',
      borderColor: 'rgba(106, 90, 205, 0.15)',
      borderWidth: 1,
    },
    cosmic: {
      backgroundColor: 'rgba(219, 112, 147, 0.06)',
      borderColor: 'rgba(219, 112, 147, 0.12)',
      borderWidth: 1,
    },
    elevated: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1,
    },
    emergency: {
      backgroundColor: 'rgba(255, 69, 0, 0.08)',
      borderColor: 'rgba(255, 69, 0, 0.2)',
      borderWidth: 1,
    },
  };

  const shadowStyles = {
    shadowColor: variant === 'primary' ? '#6A5ACD' : variant === 'cosmic' ? '#DB7093' : '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: variant === 'emergency' ? 0.3 : 0.1,
    shadowRadius: variant === 'elevated' ? 15 : 8,
    elevation: variant === 'elevated' ? 8 : 4,
  };

  const baseStyle: ViewStyle = {
    borderRadius: 24,
    padding,
    overflow: 'hidden',
    ...cardStyles[variant],
    ...shadowStyles,
    ...style,
  };

  // For glass effect, we can use BlurView as an overlay
  if (variant === 'elevated') {
    return (
      <View style={baseStyle} className={className}>
        <BlurView intensity={blurIntensity} style={{ position: 'absolute', inset: 0 }} />
        <View style={{ position: 'relative', zIndex: 1 }}>{children}</View>
      </View>
    );
  }

  return (
    <View style={baseStyle} className={className}>
      {children}
    </View>
  );
};

export default NebulaCard;
