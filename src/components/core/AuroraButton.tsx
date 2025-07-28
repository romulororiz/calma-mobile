import React from 'react';
import {
	TouchableOpacity,
	Text,
	View,
	ViewStyle,
	TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
	interpolate,
	withSequence,
	runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import {
	COLORS,
	SPACING,
	BORDER_RADIUS,
	ANIMATION,
	TYPOGRAPHY,
} from '../../constants/theme';

interface AuroraButtonProps {
	variant?: 'primary' | 'secondary' | 'ghost' | 'emergency';
	size?: 'sm' | 'md' | 'lg' | 'xl';
	fullWidth?: boolean;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
	children: React.ReactNode;
	onPress?: () => void;
	disabled?: boolean;
	loading?: boolean;
	style?: ViewStyle;
	textStyle?: TextStyle;
	className?: string;
	hapticFeedback?: boolean;
	glowEffect?: boolean;
}

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity);

const VARIANTS = {
	primary: {
		gradient: [COLORS.aurora.start, COLORS.aurora.mid],
		textColor: COLORS.text.primary,
		shadowColor: COLORS.aurora.start,
		glowColor: COLORS.aurora.start,
	},
	secondary: {
		gradient: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)'],
		textColor: COLORS.text.primary,
		shadowColor: COLORS.text.quaternary,
		glowColor: COLORS.text.quaternary,
	},
	ghost: {
		gradient: ['transparent', 'transparent'],
		textColor: COLORS.aurora.start,
		shadowColor: 'transparent',
		glowColor: COLORS.aurora.start,
	},
	emergency: {
		gradient: [COLORS.aurora.mid, COLORS.aurora.end],
		textColor: COLORS.text.primary,
		shadowColor: COLORS.aurora.mid,
		glowColor: COLORS.aurora.mid,
	},
} as const;

const SIZES = {
	sm: {
		height: 44,
		paddingHorizontal: SPACING.md,
		fontSize: TYPOGRAPHY.fontSize.sm,
		borderRadius: BORDER_RADIUS.full,
		iconSize: 16,
		className: 'h-11 px-4 text-sm',
	},
	md: {
		height: 52,
		paddingHorizontal: SPACING.lg,
		fontSize: TYPOGRAPHY.fontSize.md,
		borderRadius: BORDER_RADIUS.full,
		iconSize: 20,
		className: 'h-13 px-6 text-base',
	},
	lg: {
		height: 60,
		paddingHorizontal: SPACING.xl,
		fontSize: TYPOGRAPHY.fontSize.lg,
		borderRadius: BORDER_RADIUS.full,
		iconSize: 24,
		className: 'h-15 px-10 text-lg',
	},
	xl: {
		height: 72,
		paddingHorizontal: SPACING['2xl'],
		fontSize: TYPOGRAPHY.fontSize.xl,
		borderRadius: BORDER_RADIUS.full,
		iconSize: 28,
		className: 'h-18 px-16 text-xl',
	},
} as const;

export default function AuroraButton({
	variant = 'primary',
	size = 'md',
	fullWidth = false,
	icon,
	iconPosition = 'left',
	children,
	onPress,
	disabled = false,
	loading = false,
	style,
	textStyle,
	className = '',
	hapticFeedback = true,
	glowEffect = false,
}: AuroraButtonProps) {
	const currentVariant = VARIANTS[variant];
	const currentSize = SIZES[size];

	// Animation values
	const scale = useSharedValue(1);
	const glowOpacity = useSharedValue(0);
	const rippleScale = useSharedValue(0);
	const rippleOpacity = useSharedValue(0);

	// Animated styles
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	const glowAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: glowOpacity.value,
		};
	});

	const rippleAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: rippleScale.value }],
			opacity: rippleOpacity.value,
		};
	});

	// Haptic feedback
	const triggerHapticFeedback = () => {
		if (hapticFeedback) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		}
	};

	// Interaction handlers
	const handlePressIn = () => {
		if (disabled || loading) return;

		scale.value = withSpring(0.95, {
			damping: 12,
			stiffness: 300,
		});

		if (glowEffect) {
			glowOpacity.value = withTiming(0.6, {
				duration: ANIMATION.duration.fast,
			});
		}

		// Ripple effect
		rippleScale.value = 0;
		rippleOpacity.value = 0.8;
		rippleScale.value = withTiming(1, {
			duration: ANIMATION.duration.normal,
		});
		rippleOpacity.value = withTiming(0, {
			duration: ANIMATION.duration.normal,
		});
	};

	const handlePressOut = () => {
		if (disabled || loading) return;

		scale.value = withSpring(1, {
			damping: 12,
			stiffness: 300,
		});

		if (glowEffect) {
			glowOpacity.value = withTiming(0, {
				duration: ANIMATION.duration.normal,
			});
		}

		runOnJS(triggerHapticFeedback)();
	};

	const handlePress = () => {
		if (!disabled && !loading && onPress) {
			onPress();
		}
	};

	const containerStyle: ViewStyle = {
		height: currentSize.height,
		paddingHorizontal: currentSize.paddingHorizontal,
		borderRadius: currentSize.borderRadius,
		width: fullWidth ? '100%' : undefined,
		minWidth: currentSize.height, // Ensure minimum square touch target
		overflow: 'hidden',
		position: 'relative',
		...style,
	};

	const buttonTextStyle: TextStyle = {
		fontSize: currentSize.fontSize,
		fontWeight: '600',
		color: currentVariant.textColor,
		textAlign: 'center',
		...textStyle,
	};

	const isGhost = variant === 'ghost';
	const isDisabled = disabled || loading;

	return (
		<View className="relative">
			{/* Glow effect */}
			{glowEffect && (
				<Animated.View
					className="absolute -inset-1 z-0"
					style={[
						{
							borderRadius: currentSize.borderRadius + 4,
							backgroundColor: currentVariant.glowColor,
						},
						glowAnimatedStyle,
					]}
				/>
			)}

			<AnimatedTouchableOpacity
				onPress={handlePress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				disabled={isDisabled}
				style={animatedStyle}
				activeOpacity={0.8}
				accessibilityRole='button'
				accessibilityState={{ disabled: isDisabled }}
				accessibilityLabel={typeof children === 'string' ? children : undefined}
			>
				{isGhost ? (
					<View 
						className={`justify-center items-center flex-row ${fullWidth ? 'w-full' : ''} ${className}`}
						style={[containerStyle, { backgroundColor: 'transparent' }]}
					>
						{/* Ghost button content */}
						{icon && iconPosition === 'left' && (
							<View className="mr-2">{icon}</View>
						)}

						<Text 
							className="text-center font-semibold"
							style={[buttonTextStyle, { opacity: isDisabled ? 0.5 : 1 }]}
						>
							{children}
						</Text>

						{icon && iconPosition === 'right' && (
							<View className="ml-2">{icon}</View>
						)}
					</View>
				) : (
					<LinearGradient
						colors={
							isDisabled
								? ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
								: currentVariant.gradient
						}
						locations={[0, 1]}
						className={`justify-center items-center flex-row ${fullWidth ? 'w-full' : ''} ${className}`}
						style={containerStyle}
					>
						{/* Ripple effect */}
						<Animated.View
							className="absolute bg-white/20 rounded-full"
							style={[
								{
									top: '50%',
									left: '50%',
									width: currentSize.height * 2,
									height: currentSize.height * 2,
									marginTop: -currentSize.height,
									marginLeft: -currentSize.height,
								},
								rippleAnimatedStyle,
							]}
						/>

						{/* Button content */}
						{icon && iconPosition === 'left' && (
							<View className="mr-2">{icon}</View>
						)}

						<Text 
							className="text-center font-semibold"
							style={[buttonTextStyle, { opacity: isDisabled ? 0.5 : 1 }]}
						>
							{loading ? 'Loading...' : children}
						</Text>

						{icon && iconPosition === 'right' && (
							<View className="ml-2">{icon}</View>
						)}
					</LinearGradient>
				)}
			</AnimatedTouchableOpacity>
		</View>
	);
}
 