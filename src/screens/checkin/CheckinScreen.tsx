import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import EmotionSelector from '../../components/adhd/EmotionSelector';
import ContextPills, {
	CONTEXT_OPTIONS,
} from '../../components/adhd/ContextPills';
import AuroraButton from '../../components/core/AuroraButton';
import { COLORS, SPACING, TYPOGRAPHY } from '../../constants/theme';

interface CheckinData {
	emotion: string;
	context: string[];
	timestamp: string;
}

interface CheckinScreenProps {
	onSubmit?: (data: CheckinData) => void;
	onEmergency?: () => void;
}

export default function CheckinScreen({
	onSubmit,
	onEmergency,
}: CheckinScreenProps) {
	const [selectedEmotion, setSelectedEmotion] = useState<string>('');
	const [selectedContext, setSelectedContext] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const screenHeight = Dimensions.get('window').height;
	const screenWidth = Dimensions.get('window').width;

	const handleSubmit = async () => {
		if (!selectedEmotion) return;

		setIsSubmitting(true);

		const checkinData: CheckinData = {
			emotion: selectedEmotion,
			context: selectedContext,
			timestamp: new Date().toISOString(),
		};

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1000));

			if (onSubmit) {
				onSubmit(checkinData);
			}

			// Handle emergency support redirect
			if (selectedEmotion === 'support' && onEmergency) {
				onEmergency();
			}
		} catch (error) {
			console.error('Failed to submit check-in:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleEmotionChange = (emotionId: string) => {
		setSelectedEmotion(emotionId);
	};

	const handleContextChange = (contextIds: string[]) => {
		setSelectedContext(contextIds);
	};

	const canSubmit = selectedEmotion !== '';
	const isEmergency = selectedEmotion === 'support';

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<LinearGradient
				colors={[COLORS.ink[100], COLORS.ink[90], COLORS.ink[80]]}
				style={{ flex: 1 }}
			>
				<StatusBar style='light' />

				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						paddingHorizontal: SPACING.lg,
						paddingVertical: SPACING.xl,
						// Ensure 70% whitespace - content takes max 30% of screen width
						maxWidth: screenWidth * 0.7,
						alignSelf: 'center',
						width: '100%',
					}}
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps='handled'
				>
					{/* Header */}
					<View
						style={{
							alignItems: 'center',
							marginBottom: SPACING['2xl'],
							paddingTop: SPACING.xl,
						}}
					>
						<Text
							style={{
								color: COLORS.text.primary,
								fontSize: TYPOGRAPHY.fontSize['2xl'],
								fontFamily: 'Nunito_700Bold',
								textAlign: 'center',
								lineHeight: TYPOGRAPHY.fontSize['2xl'] * 1.3,
								marginBottom: SPACING.sm,
							}}
						>
							How are you right now?
						</Text>

						<Text
							style={{
								color: COLORS.text.secondary,
								fontSize: TYPOGRAPHY.fontSize.base,
								fontFamily: 'Nunito_400Regular',
								textAlign: 'center',
								lineHeight: TYPOGRAPHY.fontSize.base * 1.5,
							}}
						>
							Just pick what feels right
						</Text>
					</View>

					{/* Emotion Selection */}
					<View
						style={{
							marginBottom: SPACING['2xl'],
							alignItems: 'center',
						}}
					>
						<EmotionSelector
							selected={selectedEmotion}
							onChange={handleEmotionChange}
							size='lg'
							showLabels={true}
							hapticFeedback={true}
						/>
					</View>

					{/* Context Selection - Only show if emotion is selected */}
					{selectedEmotion && (
						<View
							style={{
								marginBottom: SPACING['2xl'],
								alignItems: 'center',
							}}
						>
							<ContextPills
								title='Add context (optional)'
								options={CONTEXT_OPTIONS}
								selected={selectedContext}
								onChange={handleContextChange}
								maxSelections={3}
								hapticFeedback={true}
							/>
						</View>
					)}

					{/* Spacer to push button to bottom */}
					<View style={{ flex: 1, minHeight: SPACING.xl }} />

					{/* Submit Button */}
					<View
						style={{
							paddingTop: SPACING.lg,
							alignItems: 'center',
						}}
					>
						<AuroraButton
							variant={isEmergency ? 'emergency' : 'primary'}
							size='lg'
							fullWidth
							onPress={handleSubmit}
							disabled={!canSubmit}
							loading={isSubmitting}
							glowEffect={isEmergency}
							hapticFeedback={true}
						>
							{isEmergency ? 'Get Support' : 'Continue'}
						</AuroraButton>

						{/* Skip option for those who change their mind */}
						{selectedEmotion && (
							<AuroraButton
								variant='ghost'
								size='md'
								onPress={() => {
									setSelectedEmotion('');
									setSelectedContext([]);
								}}
								style={{ marginTop: SPACING.md }}
							>
								Start Over
							</AuroraButton>
						)}
					</View>
				</ScrollView>
			</LinearGradient>
		</SafeAreaView>
	);
}

// Export types for use in other components
export type { CheckinData };
