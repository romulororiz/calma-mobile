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
      container: 48,
      emoji: 24,
      textSize: 16,
    },
    md: {
      container: 64,
      emoji: 32,
      textSize: 20,
    },
    lg: {
      container: 80,
      emoji: 40,
      textSize: 24,
    },
    xl: {
      container: 100,
      emoji: 48,
      textSize: 32,
    },
  };

  const config = sizeConfig[size];
  const isHorizontal = textPosition === 'right';

  const LogoContainer = () => (
    <View
      className={`items-center justify-center ${className || ''}`}
      style={[
        {
          width: config.container,
          height: config.container,
          borderRadius: LAYOUT.borderRadius.lg,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={[COLORS.aurora.start, COLORS.aurora.mid]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: config.container,
          height: config.container,
          borderRadius: LAYOUT.borderRadius.lg,
          justifyContent: 'center',
          alignItems: 'center',
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
          style={{
            fontSize: config.emoji,
            color: 'white',
          }}
        >
          🧠
        </Text>
      </LinearGradient>
    </View>
  );

  const LogoText = () => (
    <Text
      className="font-nunito font-bold text-text-primary"
      style={{
        fontSize: config.textSize,
        letterSpacing: -0.02,
        marginTop: isHorizontal ? 0 : SPACING.sm,
        marginLeft: isHorizontal ? SPACING.md : 0,
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
