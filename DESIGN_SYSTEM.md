# Calma Design System

## Overview

The Calma Design System is a comprehensive UI toolkit built specifically for ADHD-friendly mental health applications. It combines beautiful Aurora Glass aesthetics with accessibility-first design principles and ADHD-specific interaction patterns.

## 🎨 Design Philosophy

- **70% Whitespace Rule**: Maintains cognitive clarity through generous spacing
- **Gentle Interactions**: Smooth, non-jarring animations and transitions
- **Aurora Glass Aesthetic**: Translucent surfaces with gradient accents
- **ADHD-Friendly**: Touch targets, timing, and visual hierarchy optimized for ADHD users
- **Accessibility First**: WCAG AAA compliance with reduced motion support

## 🏗️ Architecture

### CSS Custom Properties (CSS Variables)
All design tokens are defined as CSS custom properties in `global.css`:

```css
:root {
  /* Aurora Gradient System */
  --aurora-start: #9F7AEA;
  --aurora-mid: #EC4899;
  --aurora-end: #F59E0B;
  
  /* Text Hierarchy */
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.5);
  
  /* Spacing System (8px base unit) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 40px;
  --space-2xl: 64px;
}
```

### Tailwind CSS Integration
The design system extends Tailwind CSS with custom colors, spacing, and utilities defined in `tailwind.config.js`.

## 🧩 Core Components

### 1. Glass Cards

Glass cards provide the primary surface system with translucent backgrounds and subtle borders.

#### Usage with Tailwind Classes:
```jsx
// Default glass card
<View className="bg-surface-glass border border-white/5 rounded-lg p-lg">
  <Text className="text-text-primary">Content</Text>
</View>

// Primary glass card with aurora gradient
<View className="bg-surface-primary border border-aurora-start/10 rounded-lg p-lg">
  <Text className="text-text-primary">Content</Text>
</View>

// Emergency glass card
<View className="bg-surface-emergency border border-aurora-mid/20 rounded-lg p-lg">
  <Text className="text-text-primary">Content</Text>
</View>
```

#### Usage with CSS Classes:
```jsx
<View className="glass-card glass-card--default glass-card--padding-lg">
  <Text>Default Glass Card</Text>
</View>

<View className="glass-card glass-card--primary glass-card--padding-lg">
  <Text>Primary Glass Card</Text>
</View>

<View className="glass-card glass-card--emergency glass-card--padding-lg">
  <Text>Emergency Glass Card</Text>
</View>
```

### 2. Aurora Buttons

ADHD-friendly buttons with proper touch targets and gentle feedback.

#### Button Component:
```jsx
import Button from '../components/core/Button';

<Button 
  title="Primary Action" 
  variant="primary" 
  size="lg"
  icon="→"
  iconPosition="right"
  onPress={() => console.log('Pressed')}
/>
```

#### CSS Classes:
```jsx
<TouchableOpacity className="aurora-btn aurora-btn--primary aurora-btn--lg">
  <Text>Button Text</Text>
</TouchableOpacity>
```

### 3. Typography System

Hierarchical text system with proper contrast ratios.

```jsx
<Text className="text-2xl font-bold text-text-primary">Primary Heading</Text>
<Text className="text-xl font-semibold text-text-secondary">Secondary Heading</Text>
<Text className="text-lg text-text-tertiary">Tertiary Text</Text>
<Text className="text-base text-text-quaternary">Body Text</Text>

// Gradient text
<Text className="text-gradient text-lg font-bold">Special Text</Text>
```

## 🎯 Color System

### Aurora Gradient Colors
- `aurora-start`: #9F7AEA (Purple)
- `aurora-mid`: #EC4899 (Pink)
- `aurora-end`: #F59E0B (Orange)

### Surface Colors
- `surface-primary`: rgba(159, 122, 234, 0.04)
- `surface-secondary`: rgba(159, 122, 234, 0.08)
- `surface-elevated`: rgba(26, 26, 36, 0.6)
- `surface-glass`: rgba(255, 255, 255, 0.02)
- `surface-emergency`: rgba(236, 72, 153, 0.08)

### Text Hierarchy
- `text-primary`: #FFFFFF (100% opacity)
- `text-secondary`: rgba(255, 255, 255, 0.7) (70% opacity)
- `text-tertiary`: rgba(255, 255, 255, 0.5) (50% opacity)
- `text-quaternary`: rgba(255, 255, 255, 0.3) (30% opacity)

### Energy Levels
- `energy-high`: #34D399 (Green)
- `energy-medium`: #FBBF24 (Yellow)
- `energy-low`: #F87171 (Red)

### Semantic Colors
- `semantic-success`: #10B981
- `semantic-warning`: #F59E0B
- `semantic-error`: #EF4444
- `semantic-info`: #3B82F6

## 📏 Spacing System

Based on an 8px grid system:

- `xs`: 4px (0.5 × unit)
- `sm`: 8px (1 × unit)
- `md`: 16px (2 × unit)
- `lg`: 24px (3 × unit)
- `xl`: 40px (5 × unit)
- `2xl`: 64px (8 × unit)

### Usage:
```jsx
<View className="p-lg m-md">  {/* padding: 24px, margin: 16px */}
<View className="px-xl py-sm"> {/* padding-x: 40px, padding-y: 8px */}
```

## 🔤 Typography Scale

Using a 1.25 modular scale:

- `text-xs`: 12.8px
- `text-sm`: 14.2px
- `text-base`: 16px
- `text-lg`: 20px
- `text-xl`: 25px
- `text-2xl`: 31.25px

### Font Weights:
- `font-normal`: 400
- `font-semibold`: 600
- `font-bold`: 700

## 🎭 Animation System

### Durations:
- `duration-fast`: 200ms
- `duration-normal`: 300ms
- `duration-slow`: 500ms

### Easing Functions:
- `ease-default`: cubic-bezier(0.4, 0, 0.2, 1)
- `ease-bounce`: cubic-bezier(0.68, -0.55, 0.265, 1.55)
- `ease-smooth`: cubic-bezier(0.25, 0.1, 0.25, 1)

### Built-in Animations:
```jsx
<View className="animate-breathe">Breathing animation</View>
<View className="animate-float">Floating animation</View>
<View className="animate-gentle-pulse">Gentle pulse</View>
<View className="animate-fade-in-up">Fade in up</View>
```

## 🧠 ADHD-Friendly Features

### Touch Targets
All interactive elements have minimum 44px touch targets:

```jsx
<TouchableOpacity className="min-h-touch min-w-touch"> {/* 44px minimum */}
<TouchableOpacity className="min-h-touch-comfortable min-w-touch-comfortable"> {/* 48px */}
<TouchableOpacity className="min-h-touch-large min-w-touch-large"> {/* 56px */}
```

### Spacing Utilities
```jsx
<View className="adhd-spacing"> {/* Optimal padding and margin for ADHD users */}
<View className="safe-area-padding"> {/* Respects device safe areas */}
```

### Gentle Interactions
```jsx
<View className="gentle-hover"> {/* Subtle hover effects */}
<TouchableOpacity className="gentle-active"> {/* Gentle press feedback */}
```

## 🎨 Utility Classes

### Background Utilities
```jsx
<View className="surface-gradient"> {/* Aurora surface gradient */}
<View className="aurora-gradient"> {/* Full aurora gradient */}
<View className="glass-effect"> {/* Glass surface effect */}
<View className="elevated-surface"> {/* Elevated surface with shadow */}
<View className="emergency-surface"> {/* Emergency surface styling */}
```

### Text Utilities
```jsx
<Text className="text-gradient"> {/* Aurora gradient text */}
```

## ♿ Accessibility Features

### Reduced Motion Support
Automatically respects `prefers-reduced-motion` settings:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### High Contrast Support
```css
@media (prefers-contrast: high) {
  .glass-card {
    border-width: 2px;
  }
}
```

### Focus Management
All interactive elements have proper focus styling:

```css
.aurora-btn:focus {
  outline: 2px solid var(--aurora-start);
  outline-offset: 2px;
}
```

## 📱 Responsive Design

### Breakpoints:
- `xs`: 375px (iPhone SE)
- `sm`: 640px (Small tablets)
- `md`: 768px (iPads)
- `lg`: 1024px (iPad Pro)
- `xl`: 1280px (Desktop)

### Touch-Friendly Adjustments:
```css
@media (hover: none) {
  .emotion-btn {
    width: 96px;
    height: 96px;
  }
}
```

## 🛠️ Implementation Examples

### Complete Component Example:
```jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const ExampleCard: React.FC = () => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Handle action
  };

  return (
    <View className="glass-card glass-card--primary glass-card--padding-lg mb-lg">
      <Text className="text-xl font-bold text-text-primary mb-sm">
        Card Title
      </Text>
      
      <Text className="text-base text-text-secondary mb-lg">
        Card description with proper text hierarchy and spacing.
      </Text>
      
      <TouchableOpacity 
        className="aurora-btn aurora-btn--primary aurora-btn--md"
        onPress={handlePress}
      >
        <Text className="text-white font-semibold">Action Button</Text>
      </TouchableOpacity>
    </View>
  );
};
```

### Emotion Selector Example:
```jsx
const EmotionSelector: React.FC = () => {
  const [selected, setSelected] = useState<string>('');

  return (
    <View className="emotion-grid">
      {emotions.map((emotion) => (
        <TouchableOpacity
          key={emotion.id}
          className={`
            emotion-btn 
            ${selected === emotion.id ? 'emotion-btn--selected' : ''}
          `}
          onPress={() => setSelected(emotion.id)}
        >
          <Text className="emotion-btn__emoji">{emotion.emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
```

## 🧪 Testing Guidelines

### Accessibility Testing:
1. Test with screen readers
2. Verify keyboard navigation
3. Check color contrast ratios
4. Test with reduced motion enabled

### ADHD-Friendly Testing:
1. Verify minimum touch target sizes (44px)
2. Test animation timing and intensity
3. Validate whitespace ratios
4. Check cognitive load of interactions

### Performance Testing:
1. Ensure 60fps animations
2. Test on lower-end devices
3. Monitor memory usage
4. Validate bundle size impact

## 📚 Best Practices

1. **Always use design tokens** instead of hardcoded values
2. **Respect the 70% whitespace rule** for cognitive clarity
3. **Use semantic color names** (e.g., `text-primary` not `text-white`)
4. **Implement proper touch targets** for all interactive elements
5. **Add haptic feedback** for important interactions
6. **Test with reduced motion** enabled
7. **Use gentle animations** that don't cause sensory overload
8. **Maintain proper text hierarchy** with contrast ratios
9. **Implement focus management** for keyboard navigation
10. **Test on actual devices** with ADHD users when possible

## 🔄 Updates and Maintenance

To update the design system:

1. **Modify design tokens** in `global.css` and `tailwind.config.js`
2. **Update component CSS classes** as needed
3. **Test across all components** to ensure consistency
4. **Update documentation** with any changes
5. **Run accessibility audits** after major changes

## 🎯 Component Checklist

When creating new components, ensure:

- [ ] Uses design system tokens
- [ ] Has proper touch targets (44px minimum)
- [ ] Includes focus states
- [ ] Respects reduced motion preferences
- [ ] Has proper ARIA labels
- [ ] Uses semantic HTML/React Native elements
- [ ] Includes haptic feedback where appropriate
- [ ] Follows the 70% whitespace rule
- [ ] Has gentle, non-jarring animations
- [ ] Works with screen readers
- [ ] Has proper color contrast ratios
- [ ] Is tested on actual devices

This design system provides a solid foundation for building ADHD-friendly interfaces that are both beautiful and accessible. 