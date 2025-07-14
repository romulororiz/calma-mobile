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
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import {
	COLORS,
	SPACING,
	LAYOUT,
	ANIMATION,
	ADHD,
} from '../../constants/theme';

interface EmotionOption {
	id: string;
	emoji: string;
	label: string;
	description?: string;
}

interface EmotionSelectorProps {
	options?: EmotionOption[];
	selected?: string;
	onChange: (emotionId: string) => void;
	disabled?: boolean;
	size?: 'sm' | 'md' | 'lg';
	showLabels?: boolean;
	hapticFeedback?: boolean;
	className?: string;
}

const DEFAULT_EMOTIONS: EmotionOption[] = [
	{
		id: 'happy',
		emoji: '😊',
		label: 'Happy',
		description: 'Feeling positive and energetic',
	},
	{
		id: 'neutral',
		emoji: '😐',
		label: 'Neutral',
		description: 'Feeling calm or balanced',
	},
	{
		id: 'sad',
		emoji: '😔',
		label: 'Sad',
		description: 'Feeling down or low energy',
	},
	{
		id: 'frustrated',
		emoji: '😤',
		label: 'Frustrated',
		description: 'Feeling annoyed or stressed',
	},
	{
		id: 'anxious',
		emoji: '😰',
		label: 'Anxious',
		description: 'Feeling worried or overwhelmed',
	},
	{
		id: 'supported',
		emoji: '🫂',
		label: 'Supported',
		description: 'Feeling cared for and understood',
	},
];

const EmotionSelector: React.FC<EmotionSelectorProps> = ({
	options = DEFAULT_EMOTIONS,
	selected,
	onChange,
	disabled = false,
	size = 'md',
	showLabels = false,
	hapticFeedback = true,
	className,
}) => {
	const screenWidth = Dimensions.get('window').width;
	const containerPadding = SPACING.lg * 2;
	const availableWidth = screenWidth - containerPadding;
	const gap = SPACING.lg;
	const buttonWidth = (availableWidth - gap * 2) / 3; // 3 columns

	const sizeConfig = {
		sm: {
			buttonSize: Math.min(buttonWidth, 72),
			emojiSize: 28,
			fontSize: 12,
		},
		md: {
			buttonSize: Math.min(buttonWidth, 88),
			emojiSize: 36,
			fontSize: 14,
		},
		lg: {
			buttonSize: Math.min(buttonWidth, 104),
			emojiSize: 44,
			fontSize: 16,
		},
	};

	const config = sizeConfig[size];

	const triggerHaptic = () => {
		if (hapticFeedback) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		}
	};

	const handleEmotionPress = (emotionId: string) => {
		if (disabled) return;
		
		runOnJS(triggerHaptic)();
		onChange(emotionId);
	};

	return (
		<View className={className}>
			<View 
				className="flex-row flex-wrap justify-center"
				style={{ gap: gap }}
			>
				{options.map((emotion) => (
					<EmotionButton
						key={emotion.id}
						emotion={emotion}
						selected={selected === emotion.id}
						onPress={() => handleEmotionPress(emotion.id)}
						disabled={disabled}
						buttonSize={config.buttonSize}
						emojiSize={config.emojiSize}
						showLabel={showLabels}
						fontSize={config.fontSize}
					/>
				))}
			</View>
		</View>
	);
};

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

const EmotionButton: React.FC<EmotionButtonProps> = ({
	emotion,
	selected,
	onPress,
	disabled,
	buttonSize,
	emojiSize,
	showLabel,
	fontSize,
}) => {
	const scale = useSharedValue(1);
	const borderOpacity = useSharedValue(selected ? 1 : 0);
	
	// Animation styles
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

	// Interaction handlers
	const handlePressIn = () => {
		if (disabled) return;
		
		scale.value = withSpring(0.95, {
			damping: 15,
			stiffness: 300,
		});
	};

	const handlePressOut = () => {
		if (disabled) return;
		
		scale.value = withSpring(1, {
			damping: 15,
			stiffness: 300,
		});
	};

	const handlePress = () => {
		if (disabled) return;
		
		// Haptic feedback
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		
		// Animate border
		borderOpacity.value = withTiming(1, {
			duration: ANIMATION.duration.normal,
		});
		
		onPress();
	};

	// Update border opacity when selected changes
	React.useEffect(() => {
		borderOpacity.value = withTiming(selected ? 1 : 0, {
			duration: ANIMATION.duration.normal,
		});
	}, [selected, borderOpacity]);

	return (
		<View>
			<Animated.View style={animatedStyle}>
				<TouchableOpacity
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					onPress={handlePress}
					disabled={disabled}
					activeOpacity={0.8}
					style={{
						width: buttonSize,
						height: buttonSize,
						borderRadius: LAYOUT.borderRadius.lg,
						position: 'relative',
						overflow: 'hidden',
					}}
					accessibilityRole="button"
					accessibilityLabel={`${emotion.label} emotion`}
					accessibilityState={{ selected, disabled }}
				>
					{/* Gradient border effect */}
					<Animated.View
						style={[
							{
								position: 'absolute',
								inset: -2,
								borderRadius: LAYOUT.borderRadius.lg,
								padding: 2,
							},
							borderAnimatedStyle,
						]}
					>
						<LinearGradient
							colors={[COLORS.aurora.start, COLORS.aurora.mid]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={{
								flex: 1,
								borderRadius: LAYOUT.borderRadius.lg,
							}}
						/>
					</Animated.View>

					{/* Background blur effect */}
					<BlurView
						intensity={40}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							borderRadius: LAYOUT.borderRadius.lg,
						}}
					/>

					{/* Glass background */}
					<View
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							backgroundColor: COLORS.surface.glass,
							borderRadius: LAYOUT.borderRadius.lg,
							borderWidth: 2,
							borderColor: 'transparent',
						}}
					/>

					{/* Content */}
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							position: 'relative',
							zIndex: 1,
						}}
					>
						<Text
							style={{
								fontSize: emojiSize,
								lineHeight: emojiSize * 1.2,
							}}
						>
							{emotion.emoji}
						</Text>
					</View>
				</TouchableOpacity>
			</Animated.View>

			{/* Label */}
			{showLabel && (
				<Text
					className="text-center text-text-secondary mt-2"
					style={{
						fontSize: fontSize,
						fontFamily: 'Nunito',
						opacity: disabled ? 0.4 : 1,
					}}
				>
					{emotion.label}
				</Text>
			)}
		</View>
	);
};

export default EmotionSelector;
