import React from 'react';
import { Text, TextStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import NebulaGradient from './NebulaGradient';

interface NebulaTextProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'muted';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  gradient?: 'nebula' | 'cosmic' | 'starlight' | 'orangeToPink' | null;
  style?: TextStyle;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const NebulaText: React.FC<NebulaTextProps> = ({
  children,
  variant = 'primary',
  size = 'base',
  weight = 'regular',
  gradient = null,
  style,
  className,
  align = 'left',
}) => {
  const colorMap = {
    primary: '#FFFFFF',
    secondary: '#D3D3D3',
    tertiary: '#A9A9A9',
    muted: '#696969',
  };

  const sizeMap = {
    xs: 10,
    sm: 14,
    base: 16,
    lg: 20,
    xl: 26,
    '2xl': 32,
    '3xl': 40,
  };

  const weightMap = {
    light: 'Poppins-Light',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    bold: 'Poppins-Bold',
  };

  const baseStyle: TextStyle = {
    fontSize: sizeMap[size],
    fontFamily: weightMap[weight],
    color: colorMap[variant],
    textAlign: align,
    letterSpacing: 0.5,
    lineHeight: sizeMap[size] * 1.5,
    ...style,
  };

  // If gradient is requested, use MaskedView with LinearGradient
  if (gradient) {
    const gradientVariant =
      gradient === 'nebula' ? 'primary' : gradient === 'cosmic' ? 'cosmic' : 'starlight';

    return (
      <MaskedView
        style={{
          flexDirection: 'row',
          alignSelf: align === 'center' ? 'center' : 'flex-start',
        }}
        maskElement={
          <Text style={{ ...baseStyle, color: 'black' }} className={className}>
            {children}
          </Text>
        }>
        <NebulaGradient
          variant={gradientVariant}
          style={{
            flex: 1,
            minHeight: sizeMap[size] * 1.5,
          }}
        />
      </MaskedView>
    );
  }

  // Regular text without gradient
  return (
    <Text style={baseStyle} className={className}>
      {children}
    </Text>
  );
};

export default NebulaText;
