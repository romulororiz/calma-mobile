// Aurora Design System Constants
export const COLORS = {
	// Base Colors
	ink: {
		100: '#0A0A0F',
		90: '#1A1A24',
		80: '#2A2A38',
		70: '#3A3A4C',
	},

	// Aurora Gradient System
	aurora: {
		start: '#9F7AEA',
		mid: '#EC4899',
		end: '#F59E0B',
	},

	// Surface Colors with Alpha
	surface: {
		primary: 'rgba(159, 122, 234, 0.04)',
		secondary: 'rgba(159, 122, 234, 0.08)',
		elevated: 'rgba(26, 26, 36, 0.6)',
		glass: 'rgba(255, 255, 255, 0.02)',
		emergency: 'rgba(236, 72, 153, 0.08)',
	},

	// Text Hierarchy
	text: {
		primary: '#FFFFFF',
		secondary: 'rgba(255, 255, 255, 0.7)',
		tertiary: 'rgba(255, 255, 255, 0.5)',
		quaternary: 'rgba(255, 255, 255, 0.3)',
	},

	// Semantic Colors
	semantic: {
		success: '#10B981',
		warning: '#F59E0B',
		error: '#EF4444',
		info: '#3B82F6',
	},

	// Energy Levels
	energy: {
		high: '#34D399',
		medium: '#FBBF24',
		low: '#F87171',
	},
} as const;

export const SPACING = {
	unit: 8,
	xs: 4,
	sm: 8,
	md: 16,
	lg: 24,
	xl: 40,
	'2xl': 64,
	'3xl': 80,
	'4xl': 120,
} as const;

export const TYPOGRAPHY = {
	fontSize: {
		xs: 12.8,
		sm: 14.2,
		base: 16,
		lg: 20,
		xl: 25,
		'2xl': 31.25,
		'3xl': 39,
		'4xl': 49,
	},

	fontWeight: {
		light: '300',
		normal: '400',
		medium: '500',
		semibold: '600',
		bold: '700',
		extrabold: '800',
		black: '900',
	},

	lineHeight: {
		tight: 1.2,
		normal: 1.5,
		relaxed: 1.6,
	},

	letterSpacing: {
		tight: -0.02,
		normal: 0,
		wide: 0.05,
	},
} as const;

export const BORDER_RADIUS = {
	sm: 12,
	md: 20,
	lg: 28,
	xl: 40,
	'2xl': 60,
	full: 9999,
} as const;

export const ANIMATION = {
	duration: {
		fast: 200,
		normal: 300,
		slow: 500,
		breathe: 4000,
	},

	easing: {
		default: 'cubic-bezier(0.4, 0, 0.2, 1)',
		bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
		smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
	},
} as const;

export const LAYOUT = {
	// 70% whitespace rule - content should take max 30% of screen width
	maxContentWidth: '70%',

	// ADHD-friendly touch targets
	minTouchTarget: 44,
	recommendedTouchTarget: 48,

	// Safe area insets
	safeArea: {
		top: 44,
		bottom: 34,
		horizontal: 16,
	},
} as const;

// ADHD-specific constants
export const ADHD_CONFIG = {
	// Maximum interaction time for any action
	maxInteractionTime: 30000, // 30 seconds

	// Maximum number of options to show at once
	maxOptions: 3,

	// Gentle animation timing
	gentleAnimationDuration: 500,

	// Breathing exercise timing
	breathingCycle: {
		inhale: 4000,
		hold: 1000,
		exhale: 4000,
		pause: 1000,
	},

	// Context options per category
	maxContextOptions: 5,
} as const;

// Emergency mode constants
export const EMERGENCY_CONFIG = {
	// Colors become warmer and more supportive
	warmColors: {
		primary: '#EC4899',
		secondary: '#F59E0B',
		background: 'rgba(236, 72, 153, 0.1)',
	},

	// Reduced options for crisis mode
	maxEmergencyOptions: 3,

	// Quick access timing
	sosTimeout: 3000, // 3 seconds to cancel accidental SOS
} as const;
