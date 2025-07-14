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
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import {
	COLORS,
	SPACING,
	LAYOUT,
	ANIMATION,
	ADHD,
} from '../../constants/theme';

interface ContextOption {
	id: string;
	icon: string;
	label: string;
	category?: 'medication' | 'energy' | 'location' | 'activity' | 'other';
}

interface ContextPillsProps {
	title?: string;
	options?: ContextOption[];
	selected: string[];
	onChange: (selected: string[]) => void;
	maxSelections?: number;
	disabled?: boolean;
	hapticFeedback?: boolean;
	className?: string;
}

const DEFAULT_CONTEXT_OPTIONS: ContextOption[] = [
	// Medication & Health
	{ id: 'meds_taken', icon: '💊', label: 'Meds taken', category: 'medication' },
	{ id: 'no_meds', icon: '💊', label: 'No meds', category: 'medication' },
	
	// Energy States
	{ id: 'tired', icon: '😴', label: 'Tired', category: 'energy' },
	{ id: 'energetic', icon: '⚡', label: 'Energetic', category: 'energy' },
	{ id: 'focused', icon: '🎯', label: 'Focused', category: 'energy' },
	{ id: 'scattered', icon: '🌪️', label: 'Scattered', category: 'energy' },
	
	// Location
	{ id: 'at_home', icon: '🏠', label: 'At home', category: 'location' },
	{ id: 'at_work', icon: '💼', label: 'Working', category: 'location' },
	{ id: 'outside', icon: '🌳', label: 'Outside', category: 'location' },
	
	// Activity
	{ id: 'caffeinated', icon: '☕', label: 'Caffeinated', category: 'activity' },
	{ id: 'socializing', icon: '👥', label: 'With people', category: 'activity' },
	{ id: 'alone', icon: '🧘', label: 'Alone time', category: 'activity' },
	
	// Other
	{ id: 'stressed', icon: '😰', label: 'Stressed', category: 'other' },
	{ id: 'calm', icon: '😌', label: 'Calm', category: 'other' },
	{ id: 'overwhelmed', icon: '🤯', label: 'Overwhelmed', category: 'other' },
];

const ContextPills: React.FC<ContextPillsProps> = ({
	title = 'Add context (optional)',
	options = DEFAULT_CONTEXT_OPTIONS,
	selected,
	onChange,
	maxSelections = 5,
	disabled = false,
	hapticFeedback = true,
	className,
}) => {
	const triggerHaptic = () => {
		if (hapticFeedback) {
			Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		}
	};

	const handlePillPress = (optionId: string) => {
		if (disabled) return;
		
		const isSelected = selected.includes(optionId);
		let newSelected: string[];
		
		if (isSelected) {
			// Remove from selection
			newSelected = selected.filter(id => id !== optionId);
		} else {
			// Add to selection if under limit
			if (maxSelections && selected.length >= maxSelections) {
				return; // Don't add if at max
			}
			newSelected = [...selected, optionId];
		}
		
		runOnJS(triggerHaptic)();
		onChange(newSelected);
	};

	return (
		<View className={className}>
			{title && (
				<Text 
					className="text-center text-text-tertiary text-sm font-semibold uppercase tracking-wide mb-4"
					style={{
						fontFamily: 'Nunito',
						letterSpacing: 0.05,
					}}
				>
					{title}
				</Text>
			)}
			
			<View className="flex-row flex-wrap justify-center" style={{ gap: SPACING.sm }}>
				{options.map((option) => (
					<ContextPill
						key={option.id}
						option={option}
						selected={selected.includes(option.id)}
						onPress={() => handlePillPress(option.id)}
						disabled={disabled}
					/>
				))}
			</View>
		</View>
	);
};

interface ContextPillProps {
	option: ContextOption;
	selected: boolean;
	onPress: () => void;
	disabled: boolean;
}

const ContextPill: React.FC<ContextPillProps> = ({
	option,
	selected,
	onPress,
	disabled,
}) => {
	const scale = useSharedValue(1);
	const opacity = useSharedValue(1);
	
	// Animation styles
	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ scale: scale.value }],
			opacity: opacity.value,
		};
	});

	// Interaction handlers
	const handlePressIn = () => {
		if (disabled) return;
		
		scale.value = withSpring(0.95, {
			damping: 15,
			stiffness: 300,
		});
		
		opacity.value = withTiming(0.8, {
			duration: ANIMATION.duration.fast,
		});
	};

	const handlePressOut = () => {
		if (disabled) return;
		
		scale.value = withSpring(1, {
			damping: 15,
			stiffness: 300,
		});
		
		opacity.value = withTiming(1, {
			duration: ANIMATION.duration.fast,
		});
	};

	const handlePress = () => {
		if (disabled) return;
		
		// Haptic feedback
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		
		// Scale animation feedback
		scale.value = withSpring(1.05, {
			damping: 15,
			stiffness: 300,
		});
		
		// Reset after animation
		setTimeout(() => {
			scale.value = withSpring(1, {
				damping: 15,
				stiffness: 300,
			});
		}, 100);
		
		onPress();
	};

	return (
		<Animated.View style={animatedStyle}>
			<TouchableOpacity
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				onPress={handlePress}
				disabled={disabled}
				activeOpacity={0.8}
				style={{
					borderRadius: LAYOUT.borderRadius.full,
					overflow: 'hidden',
					position: 'relative',
					minHeight: ADHD.touchTarget.minimum,
				}}
				accessibilityRole="button"
				accessibilityLabel={`${option.label} context option`}
				accessibilityState={{ selected, disabled }}
			>
				{/* Background */}
				{selected ? (
					<LinearGradient
						colors={[COLORS.aurora.start, COLORS.aurora.mid]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 1 }}
						style={{
							paddingHorizontal: SPACING.md,
							paddingVertical: SPACING.sm,
							flexDirection: 'row',
							alignItems: 'center',
							gap: SPACING.xs,
						}}
					>
						<Text style={{ fontSize: 16 }}>{option.icon}</Text>
						<Text 
							className="text-white font-semibold text-sm"
							style={{
								fontFamily: 'Nunito',
							}}
						>
							{option.label}
						</Text>
					</LinearGradient>
				) : (
					<View
						style={{
							backgroundColor: COLORS.surface.glass,
							borderWidth: 1,
							borderColor: 'rgba(255, 255, 255, 0.05)',
							paddingHorizontal: SPACING.md,
							paddingVertical: SPACING.sm,
							flexDirection: 'row',
							alignItems: 'center',
							gap: SPACING.xs,
						}}
					>
						<BlurView
							intensity={20}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
							}}
						/>
						<View style={{ position: 'relative', zIndex: 1, flexDirection: 'row', alignItems: 'center', gap: SPACING.xs }}>
							<Text style={{ fontSize: 16 }}>{option.icon}</Text>
							<Text 
								className="text-text-primary font-medium text-sm"
								style={{
									fontFamily: 'Nunito',
								}}
							>
								{option.label}
							</Text>
						</View>
					</View>
				)}
			</TouchableOpacity>
		</Animated.View>
	);
};

export { DEFAULT_CONTEXT_OPTIONS as CONTEXT_OPTIONS };
export default ContextPills;
