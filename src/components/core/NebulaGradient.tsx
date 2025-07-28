import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ViewStyle } from 'react-native';

interface NebulaGradientProps {
  variant?: 'primary' | 'cosmic' | 'starlight' | 'background' | 'button';
  style?: ViewStyle;
  children?: React.ReactNode;
  className?: string;
}

const NebulaGradient: React.FC<NebulaGradientProps> = ({
  variant = 'primary',
  style,
  children,
  className,
}) => {
  const gradientConfigs = {
    primary: {
      colors: ['#6A5ACD', '#DB7093'], // Nebula purple to cosmic pink
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    cosmic: {
      colors: ['#DB7093', '#FFD700'], // Cosmic pink to starlight gold
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    starlight: {
      colors: ['#FFD700', '#6A5ACD'], // Starlight gold to nebula purple
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    background: {
      colors: ['#0A0A1F', '#000000'], // Deep space to void black
      start: { x: 0, y: 0 },
      end: { x: 0, y: 1 },
    },
    button: {
      colors: ['#6A5ACD', '#DB7093', '#FFD700'], // Full spectrum
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    },
  };

  const config = gradientConfigs[variant];

  return (
    <LinearGradient
      colors={config.colors}
      start={config.start}
      end={config.end}
      style={style}
      className={className}>
      {children}
    </LinearGradient>
  );
};

export default NebulaGradient;
