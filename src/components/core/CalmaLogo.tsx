import React from 'react';
import { View, Text } from 'react-native';
import Svg, {
	Circle,
	Defs,
	RadialGradient,
	LinearGradient,
	Stop,
	Filter,
	FeGaussianBlur,
	FeMerge,
	FeMergeNode,
} from 'react-native-svg';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withSequence,
	withTiming,
	withDelay,
	interpolate,
} from 'react-native-reanimated';

interface CalmaLogoProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	showText?: boolean;
	animated?: boolean;
	className?: string;
}

const SIZES = {
	sm: { container: 48, text: 18, viewBox: 60 },
	md: { container: 64, text: 24, viewBox: 100 },
	lg: { container: 80, text: 32, viewBox: 120 },
	xl: { container: 128, text: 48, viewBox: 160 },
} as const;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

export default function CalmaLogo({
	size = 'md',
	showText = true,
	animated = true,
	className = '',
}: CalmaLogoProps) {
	const currentSize = SIZES[size];

	// Animation values for breathing circles
	const ripple1 = useSharedValue(0);
	const ripple2 = useSharedValue(0);
	const ripple3 = useSharedValue(0);
	const ripple4 = useSharedValue(0);

	// Start the ripple animation
	React.useEffect(() => {
		if (animated) {
			const createRippleAnimation = (
				sharedValue: Animated.SharedValue<number>,
				delay: number
			) => {
				sharedValue.value = withDelay(
					delay,
					withRepeat(
						withSequence(
							withTiming(1, { duration: 6000 }),
							withTiming(0, { duration: 0 })
						),
						-1
					)
				);
			};

			createRippleAnimation(ripple1, 0);
			createRippleAnimation(ripple2, 1500);
			createRippleAnimation(ripple3, 3000);
			createRippleAnimation(ripple4, 4500);
		}
	}, [animated, ripple1, ripple2, ripple3, ripple4]);

	// Create animated styles for ripples
	const createRippleStyle = (progress: Animated.SharedValue<number>) => {
		return useAnimatedStyle(() => {
			const radius = interpolate(
				progress.value,
				[0, 1],
				[currentSize.viewBox * 0.05, currentSize.viewBox * 0.45]
			);

			const opacity = interpolate(progress.value, [0, 0.5, 1], [0.8, 0.4, 0]);

			const strokeWidth = interpolate(progress.value, [0, 1], [2, 1]);

			return {
				opacity,
				strokeWidth,
				// Note: radius animation will be handled differently in SVG
			};
		});
	};

	const ripple1Style = createRippleStyle(ripple1);
	const ripple2Style = createRippleStyle(ripple2);
	const ripple3Style = createRippleStyle(ripple3);
	const ripple4Style = createRippleStyle(ripple4);

	return (
		<View className={`flex-row items-center gap-2 ${className}`}>
			{/* Breathing Circles Logo */}
			<View
				className='relative flex items-center justify-center'
				style={{
					width: currentSize.container,
					height: currentSize.container,
				}}
			>
				<AnimatedSvg
					width={currentSize.container}
					height={currentSize.container}
					viewBox={`0 0 ${currentSize.viewBox} ${currentSize.viewBox}`}
				>
					{/* Define gradients and filters */}
					<Defs>
						{/* Glow filter */}
						<Filter id='glow'>
							<FeGaussianBlur stdDeviation='3' result='coloredBlur' />
							<FeMerge>
								<FeMergeNode in='coloredBlur' />
								<FeMergeNode in='SourceGraphic' />
							</FeMerge>
						</Filter>

						{/* Purple gradient variations */}
						<LinearGradient
							id='purple-gradient-1'
							x1='0%'
							y1='0%'
							x2='100%'
							y2='100%'
						>
							<Stop offset='0%' stopColor='#a78bfa' />
							<Stop offset='100%' stopColor='#8b5cf6' />
						</LinearGradient>

						<LinearGradient
							id='purple-gradient-2'
							x1='100%'
							y1='0%'
							x2='0%'
							y2='100%'
						>
							<Stop offset='0%' stopColor='#8b5cf6' />
							<Stop offset='100%' stopColor='#a78bfa' />
						</LinearGradient>

						<LinearGradient
							id='purple-gradient-3'
							x1='0%'
							y1='100%'
							x2='100%'
							y2='0%'
						>
							<Stop offset='0%' stopColor='#a78bfa' />
							<Stop offset='100%' stopColor='#8b5cf6' />
						</LinearGradient>
					</Defs>

					{animated ? (
						<>
							{/* Animated Ripple Circles */}
							<Animated.View style={ripple1Style}>
								<Circle
									cx={currentSize.viewBox / 2}
									cy={currentSize.viewBox / 2}
									r={currentSize.viewBox * 0.1}
									fill='none'
									stroke='url(#purple-gradient-1)'
									strokeWidth='1.5'
								/>
							</Animated.View>

							<Animated.View style={ripple2Style}>
								<Circle
									cx={currentSize.viewBox / 2}
									cy={currentSize.viewBox / 2}
									r={currentSize.viewBox * 0.1}
									fill='none'
									stroke='url(#purple-gradient-2)'
									strokeWidth='1.5'
								/>
							</Animated.View>

							<Animated.View style={ripple3Style}>
								<Circle
									cx={currentSize.viewBox / 2}
									cy={currentSize.viewBox / 2}
									r={currentSize.viewBox * 0.1}
									fill='none'
									stroke='url(#purple-gradient-3)'
									strokeWidth='1.5'
								/>
							</Animated.View>

							<Animated.View style={ripple4Style}>
								<Circle
									cx={currentSize.viewBox / 2}
									cy={currentSize.viewBox / 2}
									r={currentSize.viewBox * 0.1}
									fill='none'
									stroke='url(#purple-gradient-1)'
									strokeWidth='1.5'
								/>
							</Animated.View>
						</>
					) : (
						<>
							{/* Static Professional Ripples */}
							<Circle
								cx={currentSize.viewBox / 2}
								cy={currentSize.viewBox / 2}
								r={currentSize.viewBox * 0.42}
								fill='none'
								stroke='url(#purple-gradient-1)'
								strokeWidth='1'
								opacity='0.2'
								filter='url(#glow)'
							/>

							<Circle
								cx={currentSize.viewBox / 2}
								cy={currentSize.viewBox / 2}
								r={currentSize.viewBox * 0.32}
								fill='none'
								stroke='url(#purple-gradient-2)'
								strokeWidth='1.2'
								opacity='0.35'
								filter='url(#glow)'
							/>

							<Circle
								cx={currentSize.viewBox / 2}
								cy={currentSize.viewBox / 2}
								r={currentSize.viewBox * 0.22}
								fill='none'
								stroke='url(#purple-gradient-3)'
								strokeWidth='1.5'
								opacity='0.5'
								filter='url(#glow)'
							/>

							<Circle
								cx={currentSize.viewBox / 2}
								cy={currentSize.viewBox / 2}
								r={currentSize.viewBox * 0.12}
								fill='none'
								stroke='url(#purple-gradient-1)'
								strokeWidth='1.8'
								opacity='0.7'
								filter='url(#glow)'
							/>
						</>
					)}

					{/* Center dot - always visible */}
					<Circle
						cx={currentSize.viewBox / 2}
						cy={currentSize.viewBox / 2}
						r={currentSize.viewBox * 0.04}
						fill='#a78bfa'
						opacity='0.95'
						filter='url(#glow)'
					/>
				</AnimatedSvg>
			</View>

			{/* Calma Text */}
			{showText && (
				<Text
					className='font-nunito-bold text-text-primary -ml-1.5'
					style={{
						fontSize: currentSize.text,
						fontFamily: 'Nunito_700Bold',
					}}
				>
					Calma
				</Text>
			)}
		</View>
	);
}
