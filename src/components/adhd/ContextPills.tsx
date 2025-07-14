import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
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

interface ContextOption {
	id: string;
	icon: string;
	label: string;
	category: 'time' | 'location' | 'energy' | 'activity' | 'weather';
}

interface ContextPillsProps {
	title?: string;
	options: ContextOption[];
	selected: string[];
	onChange: (selected: string[]) => void;
	maxSelections?: number;
	disabled?: boolean;
	hapticFeedback?: boolean;
}

const CONTEXT_OPTIONS: ContextOption[] = [
	// Time
	{ id: 'morning', icon: '🌅', label: 'Morning', category: 'time' },
	{ id: 'afternoon', icon: '☀️', label: 'Afternoon', category: 'time' },
	{ id: 'evening', icon: '🌆', label: 'Evening', category: 'time' },
	{ id: 'night', icon: '🌙', label: 'Night', category: 'time' },

	// Location
	{ id: 'home', icon: '🏠', label: 'Home', category: 'location' },
	{ id: 'work', icon: '💼', label: 'Work', category: 'location' },
	{ id: 'outside', icon: '🌳', label: 'Outside', category: 'location' },
	{ id: 'traveling', icon: '🚗', label: 'Traveling', category: 'location' },

	// Energy
	{ id: 'energetic', icon: '⚡', label: 'Energetic', category: 'energy' },
	{ id: 'tired', icon: '😴', label: 'Tired', category: 'energy' },
	{ id: 'focused', icon: '🎯', label: 'Focused', category: 'energy' },
	{ id: 'scattered', icon: '🌪️', label: 'Scattered', category: 'energy' },

	// Activity
	{ id: 'working', icon: '💻', label: 'Working', category: 'activity' },
	{ id: 'relaxing', icon: '🛋️', label: 'Relaxing', category: 'activity' },
	{ id: 'socializing', icon: '👥', label: 'With People', category: 'activity' },
	{ id: 'alone', icon: '🧘', label: 'Alone Time', category: 'activity' },

	// Weather
	{ id: 'sunny', icon: '☀️', label: 'Sunny', category: 'weather' },
	{ id: 'cloudy', icon: '☁️', label: 'Cloudy', category: 'weather' },
	{ id: 'rainy', icon: '🌧️', label: 'Rainy', category: 'weather' },
	{ id: 'cold', icon: '❄️', label: 'Cold', category: 'weather' },
];

const AnimatedTouchableOpacity =
	Animated.createAnimatedComponent(TouchableOpacity);

export default function ContextPills({
	title = 'Add context (optional)',
	options = CONTEXT_OPTIONS,
	selected,
	onChange,
	maxSelections = ADHD_CONFIG.maxContextOptions,
	disabled = false,
	hapticFeedback = true,
}: ContextPillsProps) {
	const triggerHaptic = () => {
		if (hapticFeedback) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		}
	};

	const handlePillPress = (optionId: string) => {
		if (disabled) return;

		runOnJS(triggerHaptic)();

		const isSelected = selected.includes(optionId);

		if (isSelected) {
			// Remove from selection
			onChange(selected.filter(id => id !== optionId));
		} else {
			// Add to selection (respect max limit)
			if (selected.length < maxSelections) {
				onChange([...selected, optionId]);
			}
		}
	};

	// Group options by category for better organization
	const groupedOptions = options.reduce(
		(acc, option) => {
			if (!acc[option.category]) {
				acc[option.category] = [];
			}
			acc[option.category].push(option);
			return acc;
		},
		{} as Record<string, ContextOption[]>
	);

	return (
		<View style={{ width: '100%' }}>
			{/* Title */}
			<Text
				style={{
					color: COLORS.text.tertiary,
					fontSize: 14,
					fontFamily: 'Nunito_400Regular',
					textTransform: 'uppercase',
					letterSpacing: 0.5,
					marginBottom: SPACING.md,
					textAlign: 'center',
				}}
			>
				{title}
			</Text>

			{/* Context pills in a scrollable container */}
			<ScrollView
				horizontal={false}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					flexGrow: 1,
					alignItems: 'center',
				}}
			>
				<View
					style={{
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'center',
						gap: SPACING.sm,
						maxWidth: '100%',
						paddingHorizontal: SPACING.md,
					}}
				>
					{options.map(option => (
						<ContextPill
							key={option.id}
							option={option}
							selected={selected.includes(option.id)}
							onPress={() => handlePillPress(option.id)}
							disabled={
								disabled ||
								(!selected.includes(option.id) &&
									selected.length >= maxSelections)
							}
						/>
					))}
				</View>
			</ScrollView>

			{/* Selection counter */}
			{selected.length > 0 && (
				<Text
					style={{
						color: COLORS.text.quaternary,
						fontSize: 12,
						fontFamily: 'Nunito_400Regular',
						textAlign: 'center',
						marginTop: SPACING.md,
					}}
				>
					{selected.length} / {maxSelections} selected
				</Text>
			)}
		</View>
	);
}

interface ContextPillProps {
	option: ContextOption;
	selected: boolean;
	onPress: () => void;
	disabled: boolean;
}

function ContextPill({
	option,
	selected,
	onPress,
	disabled,
}: ContextPillProps) {
	const scale = useSharedValue(1);
	const borderOpacity = useSharedValue(selected ? 1 : 0);
	const backgroundOpacity = useSharedValue(selected ? 1 : 0);

	React.useEffect(() => {
		borderOpacity.value = withTiming(selected ? 1 : 0, {
			duration: ANIMATION.duration.normal,
		});
		backgroundOpacity.value = withTiming(selected ? 1 : 0, {
			duration: ANIMATION.duration.normal,
		});
	}, [selected, borderOpacity, backgroundOpacity]);

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

	const backgroundAnimatedStyle = useAnimatedStyle(() => {
		return {
			opacity: backgroundOpacity.value,
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
		<View style={{ position: 'relative' }}>
			{/* Gradient border for selected state */}
			<Animated.View
				style={[
					{
						position: 'absolute',
						top: -1,
						left: -1,
						right: -1,
						bottom: -1,
						borderRadius: BORDER_RADIUS.full + 1,
						zIndex: 1,
					},
					borderAnimatedStyle,
				]}
			>
				<LinearGradient
					colors={[COLORS.aurora.start, COLORS.aurora.mid]}
					style={{
						flex: 1,
						borderRadius: BORDER_RADIUS.full + 1,
					}}
				/>
			</Animated.View>

			{/* Background highlight for selected state */}
			<Animated.View
				style={[
					{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						borderRadius: BORDER_RADIUS.full,
						backgroundColor: COLORS.surface.primary,
						zIndex: 2,
					},
					backgroundAnimatedStyle,
				]}
			/>

			{/* Main pill */}
			<AnimatedTouchableOpacity
				onPress={onPress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				disabled={disabled}
				style={[
					{
						flexDirection: 'row',
						alignItems: 'center',
						paddingHorizontal: SPACING.md,
						paddingVertical: SPACING.sm,
						backgroundColor: COLORS.surface.glass,
						borderRadius: BORDER_RADIUS.full,
						borderWidth: 1,
						borderColor: selected ? 'transparent' : 'rgba(255, 255, 255, 0.05)',
						minHeight: 36, // ADHD-friendly touch target
						zIndex: 3,
						opacity: disabled ? 0.5 : 1,
					},
					animatedStyle,
				]}
				accessibilityRole='button'
				accessibilityLabel={`${option.label} context option`}
				accessibilityState={{ selected, disabled }}
			>
				<Text
					style={{
						fontSize: 16,
						marginRight: SPACING.xs,
					}}
				>
					{option.icon}
				</Text>

				<Text
					style={{
						color: selected ? COLORS.text.primary : COLORS.text.secondary,
						fontSize: 14,
						fontFamily: selected ? 'Nunito_600SemiBold' : 'Nunito_400Regular',
					}}
				>
					{option.label}
				</Text>
			</AnimatedTouchableOpacity>
		</View>
	);
}

// Export the default context options for use in other components
export { CONTEXT_OPTIONS };
