import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
	interpolate,
	runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import {
	COLORS,
	SPACING,
	BORDER_RADIUS,
	ANIMATION,
	ADHD_CONFIG,
} from '../../constants/theme';

interface EmotionOption {
	id: string;
	emoji: string;
	label: string;
	description: string;
	color: string;
}

interface EmotionSelectorProps {
	selected?: string;
	onChange: (emotionId: string) => void;
	disabled?: boolean;
	size?: 'sm' | 'md' | 'lg';
	showLabels?: boolean;
	hapticFeedback?: boolean;
}

const EMOTIONS: EmotionOption[] = [
	{
		id: 'good',
		emoji: '😊',
		label: 'Good',
		description: 'Feeling positive and energetic',
		color: COLORS.energy.high,
	},
	{
		id: 'meh',
		emoji: '😐',
		label: 'Meh',
		description: 'Feeling neutral or tired',
		color: COLORS.energy.medium,
	},
	{
		id: 'support',
		emoji: '🫂',
		label: 'Need Support',
		description: 'Could use some help right now',
		color: COLORS.aurora.mid,
	},
];

const SIZES = {
	sm: {
		buttonSize: 72,
		emojiSize: 32,
		fontSize: 14,
		spacing: SPACING.md,
	},
	md: {
		buttonSize: 88,
		emojiSize: 40,
		fontSize: 16,
		spacing: SPACING.lg,
	},
	lg: {
		buttonSize: 104,
		emojiSize: 48,
		fontSize: 18,
		spacing: SPACING.xl,
	},
} as const;

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity);

export default function EmotionSelector({
	selected,
	onChange,
	disabled = false,
	size = 'md',
	showLabels = true,
	hapticFeedback = true,
}: EmotionSelectorProps) {
	const currentSize = SIZES[size];
	const screenWidth = Dimensions.get('window').width;

	// Calculate responsive sizing for 70% whitespace rule
	const maxContentWidth = screenWidth * 0.7;
	const buttonSpacing = currentSize.spacing;
	const totalButtonWidth = currentSize.buttonSize * 3 + buttonSpacing * 2;
	const shouldScale = totalButtonWidth > maxContentWidth;
	const scaleFactor = shouldScale ? maxContentWidth / totalButtonWidth : 1;

	const finalButtonSize = currentSize.buttonSize * scaleFactor;
	const finalEmojiSize = currentSize.emojiSize * scaleFactor;
	const finalSpacing = buttonSpacing * scaleFactor;

	const triggerHaptic = () => {
		if (hapticFeedback) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		}
	};

	const handleEmotionPress = (emotionId: string) => {
		if (!disabled) {
			runOnJS(triggerHaptic)();
			onChange(emotionId);
		}
	};

	return (
		<View style={{ alignItems: 'center', width: '100%' }}>
			{/* Main emotion grid */}
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					gap: finalSpacing,
					width: '100%',
					maxWidth: maxContentWidth,
				}}
			>
				{EMOTIONS.map(emotion => (
					<EmotionButton
						key={emotion.id}
						emotion={emotion}
						selected={selected === emotion.id}
						onPress={() => handleEmotionPress(emotion.id)}
						disabled={disabled}
						buttonSize={finalButtonSize}
						emojiSize={finalEmojiSize}
						showLabel={showLabels}
						fontSize={currentSize.fontSize}
					/>
				))}
			</View>

			{/* Selected emotion description */}
			{selected && showLabels && (
				<View style={{ marginTop: SPACING.lg, alignItems: 'center' }}>
					<Text
						style={{
							color: COLORS.text.secondary,
							fontSize: 14,
							fontFamily: 'Nunito_400Regular',
							textAlign: 'center',
							lineHeight: 20,
						}}
					>
						{EMOTIONS.find(e => e.id === selected)?.description}
					</Text>
				</View>
			)}
		</View>
	);
}

interface EmotionButtonProps {
	emotion: EmotionOption;
	selected: boolean;
	onPress: () => void;
	disabled: boolean;
	buttonSize: number;
	emojiSize: number;
	showLabel: boolean;
	fontSize: number;
}

function EmotionButton({
	emotion,
	selected,
	onPress,
	disabled,
	buttonSize,
	emojiSize,
	showLabel,
	fontSize,
}: EmotionButtonProps) {
	const scale = useSharedValue(1);
	const borderOpacity = useSharedValue(selected ? 1 : 0);
	const glowOpacity = useSharedValue(selected ? 0.3 : 0);

	// Update selection state
	React.useEffect(() => {
		borderOpacity.value = withTiming(selected ? 1 : 0, {
			duration: ANIMATION.duration.normal,
		});
		glowOpacity.value = withTiming(selected ? 0.3 : 0, {
			duration: ANIMATION.duration.normal,
		});
	}, [selected, borderOpacity, glowOpacity]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
		};
	});

	const borderAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: borderOpacity.value,
		};
	});

	const glowAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: glowOpacity.value,
		};
	});

	const handlePressIn = () => {
		if (!disabled) {
			scale.value = withSpring(0.95, {
				damping: 15,
				stiffness: 300,
			});
		}
	};

	const handlePressOut = () => {
		if (!disabled) {
			scale.value = withSpring(1, {
				damping: 15,
				stiffness: 300,
			});
		}
	};

	return (
		<View style={{ alignItems: 'center' }}>
			<View style={{ position: 'relative' }}>
				{/* Glow effect */}
				<Animated.View
					style={[
						{
							position: 'absolute',
							top: -4,
							left: -4,
							right: -4,
							bottom: -4,
							borderRadius: BORDER_RADIUS.lg + 4,
							backgroundColor: emotion.color,
							zIndex: 0,
						},
						glowAnimatedStyle,
					]}
				/>

				{/* Gradient border */}
				<Animated.View
					style={[
						{
							position: 'absolute',
							top: -2,
							left: -2,
							right: -2,
							bottom: -2,
							borderRadius: BORDER_RADIUS.lg + 2,
							zIndex: 1,
						},
						borderAnimatedStyle,
					]}
				>
					<LinearGradient
						colors={[emotion.color, `${emotion.color}80`]}
						style={{
							flex: 1,
							borderRadius: BORDER_RADIUS.lg + 2,
						}}
					/>
				</Animated.View>

				{/* Main button */}
				<AnimatedTouchableOpacity
					onPress={onPress}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					disabled={disabled}
					style={[
						{
							width: buttonSize,
							height: buttonSize,
							backgroundColor: COLORS.surface.glass,
							borderRadius: BORDER_RADIUS.lg,
							justifyContent: 'center',
							alignItems: 'center',
							zIndex: 2,
							// ADHD-friendly minimum touch target
							minWidth: Math.max(buttonSize, 48),
							minHeight: Math.max(buttonSize, 48),
						},
						animatedStyle,
					]}
					accessibilityRole='button'
					accessibilityLabel={`${emotion.label}: ${emotion.description}`}
					accessibilityState={{ selected, disabled }}
				>
					<Text
						style={{
							fontSize: emojiSize,
							lineHeight: emojiSize * 1.2,
						}}
					>
						{emotion.emoji}
					</Text>
				</AnimatedTouchableOpacity>
			</View>

			{/* Label */}
			{showLabel && (
				<Text
					style={{
						color: selected ? COLORS.text.primary : COLORS.text.tertiary,
						fontSize: fontSize * 0.8,
						fontFamily: selected ? 'Nunito_600SemiBold' : 'Nunito_400Regular',
						textAlign: 'center',
						marginTop: SPACING.sm,
						lineHeight: fontSize,
					}}
				>
					{emotion.label}
				</Text>
			)}
		</View>
	);
}
