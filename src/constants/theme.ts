// Aurora Glass Design System - Complete Theme Constants
export const COLORS = {
	// Base Colors - Ink System
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

// Spacing System (8px base unit)
export const SPACING = {
	unit: 8,
	xs: 4,    // 0.5 * unit
	sm: 8,    // 1 * unit
	md: 16,   // 2 * unit
	lg: 24,   // 3 * unit
	xl: 40,   // 5 * unit
	'2xl': 64, // 8 * unit
} as const;

// Typography System
export const TYPOGRAPHY = {
	// Font Family
	fontFamily: {
		base: 'Nunito',
		system: 'System',
	},

	// Font Sizes (using 1.25 scale)
	fontSize: {
		xs: 12.8,
		sm: 14.2,
		md: 16,
		lg: 20,
		xl: 25,
		'2xl': 31.25,
	},

	// Font Weights
	fontWeight: {
		normal: '400',
		semibold: '600',
		bold: '700',
	},

	// Line Heights
	lineHeight: {
		tight: 1.2,
		normal: 1.5,
		relaxed: 1.6,
	},

	// Letter Spacing
	letterSpacing: {
		tight: '-0.02em',
		normal: '0',
		wide: '0.05em',
	},
} as const;

// Animation System
export const ANIMATION = {
	duration: {
		fast: 200,
		normal: 300,
		slow: 500,
	},

	easing: {
		default: 'cubic-bezier(0.4, 0, 0.2, 1)',
		bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
		smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
	},
} as const;

// Layout System
export const LAYOUT = {
	borderRadius: {
		sm: 12,
		md: 20,
		lg: 28,
		full: 9999,
	},

	blur: {
		sm: 10,
		md: 20,
		lg: 40,
		xl: 120,
	},

	shadow: {
		sm: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
		md: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
		lg: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
		glow: '0 0 80px rgba(159, 122, 234, 0.15)',
	},
} as const;

// ADHD-Specific Design Tokens
export const ADHD = {
	// Touch Target Sizes
	touchTarget: {
		minimum: 44,
		comfortable: 48,
		large: 56,
	},

	// Focus Ring Configuration
	focusRing: {
		width: 2,
		offset: 2,
		color: 'rgba(159, 122, 234, 0.5)',
	},

	// Calm Interaction States
	interaction: {
		hover: {
			scale: 1.02,
			opacity: 0.8,
		},
		active: {
			scale: 0.98,
			opacity: 0.9,
		},
		disabled: {
			opacity: 0.4,
		},
	},
} as const;

// Component Variants
export const VARIANTS = {
	glassBg: {
		default: 'rgba(255, 255, 255, 0.02)',
		primary: 'rgba(159, 122, 234, 0.04)',
		elevated: 'rgba(26, 26, 36, 0.6)',
		emergency: 'rgba(236, 72, 153, 0.08)',
	},

	gradients: {
		aurora: ['#9F7AEA', '#EC4899'],
		auroraTri: ['#9F7AEA', '#EC4899', '#F59E0B'],
		surface: ['rgba(159, 122, 234, 0.04)', 'rgba(159, 122, 234, 0.08)'],
		emergency: ['rgba(236, 72, 153, 0.08)', 'rgba(239, 68, 68, 0.08)'],
	},
} as const;

// Export unified theme object
export const THEME = {
	colors: COLORS,
	spacing: SPACING,
	typography: TYPOGRAPHY,
	animation: ANIMATION,
	layout: LAYOUT,
	adhd: ADHD,
	variants: VARIANTS,
} as const;

// Type exports for TypeScript
export type ThemeColors = typeof COLORS;
export type ThemeSpacing = typeof SPACING;
export type ThemeTypography = typeof TYPOGRAPHY;
export type ThemeAnimation = typeof ANIMATION;
export type ThemeLayout = typeof LAYOUT;
export type ThemeADHD = typeof ADHD;
export type ThemeVariants = typeof VARIANTS;
export type Theme = typeof THEME;

// Legacy exports for backwards compatibility
export const BORDER_RADIUS = LAYOUT.borderRadius;
