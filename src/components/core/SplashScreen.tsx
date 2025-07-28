import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NebulaGradient from './NebulaGradient';
import CalmaLogo from './CalmaLogo';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete?: () => void;
  showLogo?: boolean;
  showText?: boolean;
  variant?: 'loading' | 'transition' | 'signin' | 'signup';
  duration?: number;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  onAnimationComplete,
  showLogo = true,
  showText = true,
  variant = 'loading',
  duration = 2500,
}) => {
  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;

  // Floating elements animation
  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start floating background elements
    const createFloatingAnimation = (
      animValue: Animated.Value,
      duration: number,
      delay: number = 0
    ) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Start floating animations
    createFloatingAnimation(float1, 3000, 0).start();
    createFloatingAnimation(float2, 4000, 1000).start();
    createFloatingAnimation(float3, 3500, 2000).start();

    // Main entrance animation sequence
    const entranceSequence = Animated.sequence([
      // Logo entrance with scale and fade
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),

      // Text fade in after logo
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),

      // Loading dots fade in
      Animated.timing(dotsOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),

      // Hold for visibility - use duration prop
      Animated.delay(variant === 'transition' ? 500 : 3000),

      // Exit animation for transitions
      ...(variant === 'transition' || variant === 'signin' || variant === 'signup'
        ? [
            Animated.parallel([
              Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }),
            ]),
          ]
        : []),
    ]);

    entranceSequence.start(() => {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });

    return () => {
      entranceSequence.stop();
    };
  }, [fadeAnim, scaleAnim, logoOpacity, textOpacity, dotsOpacity, onAnimationComplete, variant]);

  const getVariantText = () => {
    switch (variant) {
      case 'loading':
        return '';
      case 'transition':
        return 'Getting ready...';
      case 'signin':
        return 'Welcome back';
      case 'signup':
        return 'Welcome to Calma';
      default:
        return 'Calma';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NebulaGradient variant="background" style={styles.gradient}>
        {/* Floating background elements */}
        <Animated.View
          style={[
            styles.floatingElement,
            styles.float1,
            {
              opacity: float1.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.2, 0.4, 0.2],
              }),
              transform: [
                {
                  translateY: float1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -15],
                  }),
                },
                {
                  translateX: float1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 10],
                  }),
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.floatingElement,
            styles.float2,
            {
              opacity: float2.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.15, 0.35, 0.15],
              }),
              transform: [
                {
                  translateY: float2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20],
                  }),
                },
                {
                  translateX: float2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -8],
                  }),
                },
              ],
            },
          ]}
        />

        <Animated.View
          style={[
            styles.floatingElement,
            styles.float3,
            {
              opacity: float3.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.1, 0.3, 0.1],
              }),
              transform: [
                {
                  translateY: float3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -12],
                  }),
                },
              ],
            },
          ]}
        />

        {/* Main content */}
        <View style={styles.content}>
          {/* Logo section */}
          {showLogo && (
            <Animated.View
              style={[
                styles.logoContainer,
                {
                  opacity: logoOpacity,
                  transform: [{ scale: scaleAnim }],
                },
              ]}>
              <CalmaLogo animated={true} showText={false} size="lg" />
            </Animated.View>
          )}

          {/* Text section */}
          {showText && (
            <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
              {/* App name with gradient effect */}
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Calma</Text>
                <View style={styles.titleUnderline} />
              </View>

              <Text style={styles.tagline}>Your ADHD companion that truly understands</Text>
            </Animated.View>
          )}

          {/* Loading section */}
          <Animated.View style={[styles.loadingContainer, { opacity: dotsOpacity }]}>
            {variant !== 'loading' && <Text style={styles.statusText}>{getVariantText()}</Text>}
          </Animated.View>
        </View>

        {/* Subtle bottom glow */}
        <View style={styles.bottomGlow} />
      </NebulaGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1F',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    zIndex: 10,
  },

  // Floating elements
  floatingElement: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#6A5ACD',
  },
  float1: {
    top: '20%',
    left: '15%',
    backgroundColor: '#FFD700',
  },
  float2: {
    top: '35%',
    right: '20%',
    backgroundColor: '#DB7093',
    width: 3,
    height: 3,
  },
  float3: {
    bottom: '25%',
    left: '25%',
    backgroundColor: '#6A5ACD',
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },

  // Logo section
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },

  // Text section
  textContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  titleUnderline: {
    width: 60,
    height: 2,
    backgroundColor: '#6A5ACD',
    marginTop: 8,
    borderRadius: 1,
  },
  tagline: {
    fontSize: 17,
    color: '#D3D3D3',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
    fontFamily: 'Poppins_400Regular',
    maxWidth: 280,
  },

  // Loading section
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  loadingText: {
    fontSize: 16,
    color: '#A9A9A9',
    fontFamily: 'Poppins_400Regular',
  },
  statusText: {
    fontSize: 18,
    color: '#D3D3D3',
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
    marginTop: 10,
  },

  // Effects
  bottomGlow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(106, 90, 205, 0.05)',
    opacity: 0.3,
  },
});

export default SplashScreen;
