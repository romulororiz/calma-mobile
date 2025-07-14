import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, LAYOUT, SPACING } from '../../constants/theme';

interface CalmaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textPosition?: 'bottom' | 'right';
  style?: ViewStyle;
  className?: string;
}

const CalmaLogo: React.FC<CalmaLogoProps> = ({
  size = 'md',
  showText = false,
  textPosition = 'bottom',
  style,
  className,
}) => {
  const sizeConfig = {
    sm: {
      containerSize: 'w-12 h-12',
      emoji: 'text-2xl',
      textSize: 'text-base',
    },
    md: {
      containerSize: 'w-16 h-16',
      emoji: 'text-3xl',
      textSize: 'text-xl',
    },
    lg: {
      containerSize: 'w-20 h-20',
      emoji: 'text-4xl',
      textSize: 'text-2xl',
    },
    xl: {
      containerSize: 'w-24 h-24',
      emoji: 'text-5xl',
      textSize: 'text-3xl',
    },
  };

  const config = sizeConfig[size];
  const isHorizontal = textPosition === 'right';

  const LogoContainer = () => (
    <View
      className={`items-center justify-center ${config.containerSize} ${className || ''}`}
      style={style}
    >
      <LinearGradient
        colors={[COLORS.aurora.start, COLORS.aurora.mid]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={`${config.containerSize} items-center justify-center`}
        style={{
          borderRadius: LAYOUT.borderRadius.lg,
          shadowColor: COLORS.aurora.start,
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <Text
          className={`${config.emoji} text-white`}
        >
          🧠
        </Text>
      </LinearGradient>
    </View>
  );

  const LogoText = () => (
    <Text
      className={`font-nunito font-bold text-text-primary ${config.textSize} ${
        isHorizontal ? 'ml-4' : 'mt-2'
      }`}
      style={{
        letterSpacing: -0.02,
      }}
    >
      Calma
    </Text>
  );

  if (!showText) {
    return <LogoContainer />;
  }

  return (
    <View
      className={`items-center ${isHorizontal ? 'flex-row' : 'flex-col'}`}
      style={style}
    >
      <LogoContainer />
      <LogoText />
    </View>
  );
};

export default CalmaLogo;
