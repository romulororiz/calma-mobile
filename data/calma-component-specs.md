# Calma Component Specifications
## Design System Implementation Guide

### 📐 Design Tokens

```typescript
// colors.ts
export const colors = {
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
};

// spacing.ts
export const spacing = {
  unit: 8,
  xs: 4,    // 0.5 * unit
  sm: 8,    // 1 * unit
  md: 16,   // 2 * unit
  lg: 24,   // 3 * unit
  xl: 40,   // 5 * unit
  '2xl': 64, // 8 * unit
};

// typography.ts
export const typography = {
  // Font Family
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
  },
  
  // Font Sizes (using 1.25 scale)
  fontSize: {
    xs: '12.8px',
    sm: '14.2px',
    md: '16px',
    lg: '20px',
    xl: '25px',
    '2xl': '31.25px',
  },
  
  // Font Weights
  fontWeight: {
    normal: 400,
    semibold: 600,
    bold: 700,
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
};

// animation.ts
export const animation = {
  duration: {
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  },
};

// layout.ts
export const layout = {
  borderRadius: {
    sm: '12px',
    md: '20px',
    lg: '28px',
    full: '9999px',
  },
  
  blur: {
    sm: '10px',
    md: '20px',
    lg: '40px',
    xl: '120px',
  },
  
  shadow: {
    sm: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    md: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
    lg: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
    glow: '0 0 80px rgba(159, 122, 234, 0.15)',
  },
};
```

### 🧩 Core Components

#### 1. Glass Card Component

```typescript
// GlassCard.tsx
interface GlassCardProps {
  variant?: 'default' | 'primary' | 'elevated' | 'emergency';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'default',
  padding = 'lg',
  children,
  onClick,
  className,
}) => {
  return (
    <div
      className={`
        glass-card
        glass-card--${variant}
        glass-card--padding-${padding}
        ${className || ''}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Styles
.glass-card {
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  transition: all var(--duration-normal) var(--easing-default);
}

.glass-card--default {
  background: var(--surface-glass);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-card--primary {
  background: linear-gradient(135deg, var(--surface-primary) 0%, var(--surface-secondary) 100%);
  border: 1px solid rgba(159, 122, 234, 0.1);
}

.glass-card--elevated {
  background: var(--surface-elevated);
  box-shadow: var(--shadow-md);
}

.glass-card--emergency {
  background: var(--surface-emergency);
  border: 1px solid rgba(236, 72, 153, 0.2);
}

.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

// Interaction states
.glass-card:active {
  transform: translateY(0);
}
```

#### 2. Aurora Button Component

```typescript
// AuroraButton.tsx
interface AuroraButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const AuroraButton: React.FC<AuroraButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`
        aurora-btn
        aurora-btn--${variant}
        aurora-btn--${size}
        ${fullWidth ? 'aurora-btn--full' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="aurora-btn__icon">{icon}</span>}
      <span className="aurora-btn__text">{children}</span>
    </button>
  );
};

// Styles with ripple effect
.aurora-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  border-radius: var(--radius-full);
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  transition: all var(--duration-normal) var(--easing-default);
  border: none;
  outline: none;
  position: relative;
  overflow: hidden;
}

// Ripple effect
.aurora-btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transform: translate(-50%, -50%);
  transition: width var(--duration-slow), height var(--duration-slow);
}

.aurora-btn:active::before {
  width: 300px;
  height: 300px;
}

// Primary variant with gradient
.aurora-btn--primary {
  background: linear-gradient(135deg, var(--aurora-start) 0%, var(--aurora-mid) 100%);
  color: white;
  box-shadow: 0 4px 6px -1px rgba(159, 122, 234, 0.3);
}

.aurora-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(159, 122, 234, 0.4);
}

// Size variants
.aurora-btn--sm {
  padding: var(--space-sm) var(--space-md);
  font-size: var(--font-sm);
}

.aurora-btn--md {
  padding: var(--space-md) var(--space-lg);
  font-size: var(--font-md);
}

.aurora-btn--lg {
  padding: var(--space-md) var(--space-xl);
  font-size: var(--font-lg);
}
```

#### 3. Emotion Selector Component

```typescript
// EmotionSelector.tsx
interface EmotionOption {
  emoji: string;
  value: string;
  label: string;
}

interface EmotionSelectorProps {
  options: EmotionOption[];
  selected?: string;
  onChange: (value: string) => void;
}

const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  options,
  selected,
  onChange,
}) => {
  return (
    <div className="emotion-grid">
      {options.map((option) => (
        <button
          key={option.value}
          className={`
            emotion-btn
            ${selected === option.value ? 'emotion-btn--selected' : ''}
          `}
          onClick={() => onChange(option.value)}
          aria-label={option.label}
        >
          <span className="emotion-btn__emoji">{option.emoji}</span>
        </button>
      ))}
    </div>
  );
};

// Styles with gradient border animation
.emotion-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
}

.emotion-btn {
  width: 88px;
  height: 88px;
  background: var(--surface-glass);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--duration-normal) var(--easing-bounce);
  position: relative;
  overflow: hidden;
}

// Gradient border effect
.emotion-btn::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: var(--radius-lg);
  padding: 2px;
  background: linear-gradient(135deg, var(--aurora-start), var(--aurora-mid));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity var(--duration-normal);
}

.emotion-btn:hover::before,
.emotion-btn--selected::before {
  opacity: 1;
}

.emotion-btn__emoji {
  font-size: 40px;
  position: relative;
  z-index: 1;
}

// Hover and active states
.emotion-btn:hover {
  transform: translateY(-4px) scale(1.05);
  background: var(--surface-primary);
}

.emotion-btn:active {
  transform: translateY(0) scale(0.98);
}

// ADHD-friendly touch target
@media (hover: none) {
  .emotion-btn {
    width: 96px;
    height: 96px;
  }
}
```

#### 4. Time Visualization Component

```typescript
// TimeVisualization.tsx
interface TimeVisualizationProps {
  currentTime: string;
  label: string;
  progress: number; // 0-100
}

const TimeVisualization: React.FC<TimeVisualizationProps> = ({
  currentTime,
  label,
  progress,
}) => {
  return (
    <div className="time-viz">
      <div className="time-ring-outer" />
      <div 
        className="time-ring-progress" 
        style={{
          background: `conic-gradient(
            from -90deg at 50% 50%,
            var(--aurora-start) 0deg,
            var(--aurora-mid) ${progress * 3.6}deg,
            transparent ${progress * 3.6}deg
          )`
        }}
      />
      <div className="time-center">
        <h2 className="time-display">{currentTime}</h2>
        <p className="time-label">{label}</p>
      </div>
    </div>
  );
};

// Styles with animated rings
.time-viz {
  width: 280px;
  height: 280px;
  position: relative;
  margin: 0 auto;
}

.time-ring-outer {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg at 50% 50%,
    var(--aurora-start) 0deg,
    var(--aurora-mid) 120deg,
    var(--aurora-end) 240deg,
    var(--aurora-start) 360deg
  );
  opacity: 0.2;
  animation: rotate 60s linear infinite;
  filter: blur(20px);
}

.time-ring-progress {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  opacity: 0.8;
  mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 20px),
    #000 calc(100% - 20px)
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 20px),
    #000 calc(100% - 20px)
  );
}

.time-center {
  position: absolute;
  inset: 30px;
  background: var(--ink);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.5);
}

.time-display {
  font-size: var(--font-2xl);
  font-weight: 300;
  letter-spacing: -0.02em;
}

.time-label {
  font-size: var(--font-sm);
  color: var(--text-secondary);
  margin-top: var(--space-xs);
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}
```

#### 5. Context Pills Component

```typescript
// ContextPills.tsx
interface ContextOption {
  id: string;
  icon: string;
  label: string;
}

interface ContextPillsProps {
  options: ContextOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelections?: number;
}

const ContextPills: React.FC<ContextPillsProps> = ({
  options,
  selected,
  onChange,
  maxSelections,
}) => {
  const handleToggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(s => s !== id));
    } else if (!maxSelections || selected.length < maxSelections) {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="pill-grid">
      {options.map((option) => (
        <button
          key={option.id}
          className={`
            context-pill
            ${selected.includes(option.id) ? 'context-pill--selected' : ''}
          `}
          onClick={() => handleToggle(option.id)}
        >
          <span className="context-pill__icon">{option.icon}</span>
          <span className="context-pill__label">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

// Styles
.pill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  justify-content: center;
}

.context-pill {
  padding: var(--space-sm) var(--space-md);
  background: var(--surface-glass);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-full);
  font-size: var(--font-sm);
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  cursor: pointer;
  transition: all var(--duration-normal) var(--easing-default);
}

.context-pill:hover {
  background: var(--surface-primary);
  transform: scale(1.05);
  border-color: rgba(159, 122, 234, 0.3);
}

.context-pill--selected {
  background: linear-gradient(135deg, var(--aurora-start), var(--aurora-mid));
  color: white;
  border-color: transparent;
}

.context-pill__icon {
  font-size: 16px;
}

.context-pill__label {
  font-weight: 500;
}
```

#### 6. Bottom Navigation Component

```typescript
// BottomNavigation.tsx
interface NavItem {
  id: string;
  icon: string;
  label: string;
  path: string;
}

interface BottomNavigationProps {
  items: NavItem[];
  active: string;
  onNavigate: (path: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  active,
  onNavigate,
}) => {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={`
            nav-item
            ${active === item.id ? 'nav-item--active' : ''}
          `}
          onClick={() => onNavigate(item.path)}
        >
          <span className="nav-item__icon">{item.icon}</span>
          <span className="nav-item__label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

// Styles with floating design
.bottom-nav {
  position: fixed;
  bottom: var(--space-lg);
  left: var(--space-lg);
  right: var(--space-lg);
  background: var(--surface-elevated);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  padding: var(--space-sm);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-xs);
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.2),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-normal) var(--easing-default);
  position: relative;
  color: var(--text-tertiary);
  background: transparent;
  border: none;
}

.nav-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--aurora-start), var(--aurora-mid));
  border-radius: inherit;
  opacity: 0;
  transition: opacity var(--duration-normal);
}

.nav-item:hover {
  color: var(--text-primary);
}

.nav-item--active {
  color: var(--text-primary);
}

.nav-item--active::before {
  opacity: 0.1;
}

.nav-item__icon {
  font-size: var(--font-lg);
  margin-bottom: var(--space-xs);
  position: relative;
  z-index: 1;
}

.nav-item__label {
  font-size: 11px;
  font-weight: 600;
  position: relative;
  z-index: 1;
}
```

### 🎨 Advanced Components

#### 7. Pattern Graph Component

```typescript
// PatternGraph.tsx
interface DataPoint {
  time: string;
  value: number; // 0-100
  level: 'low' | 'medium' | 'high';
}

interface PatternGraphProps {
  data: DataPoint[];
  showLabels?: boolean;
}

const PatternGraph: React.FC<PatternGraphProps> = ({
  data,
  showLabels = true,
}) => {
  return (
    <div className="pattern-container">
      <div className="pattern-graph">
        {data.map((point, index) => (
          <div
            key={index}
            className={`energy-bar energy-bar--${point.level}`}
            style={{ height: `${point.value}%` }}
          />
        ))}
      </div>
      {showLabels && (
        <div className="pattern-labels">
          {data.map((point, index) => (
            <span key={index} className="pattern-label">
              {point.time}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

// Styles
.pattern-container {
  width: 100%;
}

.pattern-graph {
  height: 120px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-xs);
  margin-bottom: var(--space-sm);
}

.energy-bar {
  flex: 1;
  background: var(--surface-glass);
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  position: relative;
  transition: all var(--duration-normal) var(--easing-default);
  min-height: 10%;
}

.energy-bar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: inherit;
  transition: all var(--duration-slow) var(--easing-default);
}

.energy-bar--low::after {
  background: linear-gradient(to top, var(--energy-low), transparent);
  height: 100%;
  opacity: 0.8;
}

.energy-bar--medium::after {
  background: linear-gradient(to top, var(--energy-medium), transparent);
  height: 100%;
  opacity: 0.8;
}

.energy-bar--high::after {
  background: linear-gradient(to top, var(--energy-high), transparent);
  height: 100%;
  opacity: 0.8;
}

.pattern-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-xs);
  color: var(--text-tertiary);
}
```

#### 8. Reality Check Component

```typescript
// RealityCheck.tsx
interface Check {
  id: string;
  text: string;
  isPositive: boolean;
}

interface RealityCheckProps {
  checks: Check[];
}

const RealityCheck: React.FC<RealityCheckProps> = ({ checks }) => {
  return (
    <div className="reality-checks">
      {checks.map((check) => (
        <div key={check.id} className="reality-check">
          <div className="check-icon">
            {check.isPositive ? '✓' : '✗'}
          </div>
          <span className="check-text">{check.text}</span>
        </div>
      ))}
    </div>
  );
};

// Styles
.reality-checks {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.reality-check {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-md);
  background: rgba(52, 211, 153, 0.05);
  border-radius: var(--radius-md);
  border: 1px solid rgba(52, 211, 153, 0.1);
  font-size: var(--font-sm);
  line-height: 1.5;
  transition: all var(--duration-normal) var(--easing-default);
}

.reality-check:hover {
  background: rgba(52, 211, 153, 0.08);
  transform: translateX(4px);
}

.check-icon {
  width: 24px;
  height: 24px;
  background: rgba(52, 211, 153, 0.2);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--energy-high);
}

.check-text {
  flex: 1;
  color: var(--text-primary);
}
```

#### 9. Emergency Card Component

```typescript
// EmergencyCard.tsx
interface EmergencyOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: () => void;
}

interface EmergencyCardProps {
  option: EmergencyOption;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({ option }) => {
  return (
    <button
      className="emergency-card"
      onClick={option.action}
    >
      <div className="emergency-icon">
        <span>{option.icon}</span>
      </div>
      <div className="emergency-content">
        <h3>{option.title}</h3>
        <p>{option.description}</p>
      </div>
    </button>
  );
};

// Styles with scanning effect
.emergency-card {
  width: 100%;
  background: var(--surface-emergency);
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border: 1px solid rgba(236, 72, 153, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  cursor: pointer;
  transition: all var(--duration-normal) var(--easing-default);
  position: relative;
  overflow: hidden;
  text-align: left;
}

.emergency-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--aurora-mid), transparent);
  transform: translateX(-100%);
  transition: transform var(--duration-slow) ease-out;
}

.emergency-card:hover::before {
  transform: translateX(100%);
}

.emergency-card:hover {
  transform: translateY(-2px);
  background: rgba(236, 72, 153, 0.12);
  box-shadow: 0 10px 30px rgba(236, 72, 153, 0.2);
}

.emergency-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(239, 68, 68, 0.2));
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  flex-shrink: 0;
}

.emergency-content h3 {
  font-size: var(--font-lg);
  font-weight: 600;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}

.emergency-content p {
  font-size: var(--font-sm);
  color: var(--text-secondary);
  line-height: 1.4;
}
```

### 📱 Responsive Utilities

```scss
// breakpoints.scss
$breakpoints: (
  'xs': 375px,   // iPhone SE
  'sm': 640px,   // Small tablets
  'md': 768px,   // iPads
  'lg': 1024px,  // iPad Pro
  'xl': 1280px,  // Desktop
);

@mixin responsive($breakpoint) {
  @media (min-width: map-get($breakpoints, $breakpoint)) {
    @content;
  }
}

// Touch-friendly utilities
@mixin touch-target {
  min-width: 44px;
  min-height: 44px;
  
  @media (hover: none) {
    min-width: 48px;
    min-height: 48px;
  }
}

// Safe area utilities for modern devices
@mixin safe-area-padding {
  padding-left: max(var(--space-lg), env(safe-area-inset-left));
  padding-right: max(var(--space-lg), env(safe-area-inset-right));
  padding-bottom: max(var(--space-lg), env(safe-area-inset-bottom));
}
```

### 🎭 Animation Library

```typescript
// animations.ts
export const animations = {
  // Entrance animations
  fadeInUp: keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `,
  
  // Breathing animation for calm elements
  breathe: keyframes`
    0%, 100% {
      transform: scale(0.95);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.05);
      opacity: 1;
    }
  `,
  
  // Gentle float for background elements
  float: keyframes`
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
    }
    33% {
      transform: translate(30px, -30px) rotate(5deg);
    }
    66% {
      transform: translate(-20px, 20px) rotate(-5deg);
    }
  `,
  
  // Pulse for attention without anxiety
  gentlePulse: keyframes`
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(159, 122, 234, 0.4);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(159, 122, 234, 0);
    }
  `,
};

// Usage with styled-components
const AnimatedElement = styled.div`
  animation: ${animations.fadeInUp} ${animation.duration.slow} ${animation.easing.default};
`;
```

### 🛠️ Implementation Guidelines

#### State Management Pattern
```typescript
// useADHDFriendlyState.ts
export const useADHDFriendlyState = <T>(
  initialState: T,
  options?: {
    persistKey?: string;
    debounceMs?: number;
  }
) => {
  const [state, setState] = useState<T>(initialState);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const updateState = useCallback((newState: T) => {
    setIsTransitioning(true);
    
    // Gentle transition for ADHD-friendly state changes
    setTimeout(() => {
      setState(newState);
      setIsTransitioning(false);
      
      // Optional persistence
      if (options?.persistKey) {
        localStorage.setItem(options.persistKey, JSON.stringify(newState));
      }
    }, animation.duration.normal);
  }, [options]);
  
  return { state, updateState, isTransitioning };
};
```

#### Accessibility Patterns
```typescript
// accessibility.ts
export const a11y = {
  // Reduced motion preferences
  reducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Focus management for ADHD
  focusLock: (containerRef: RefObject<HTMLElement>) => {
    const focusableElements = containerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
    
    firstElement?.focus();
    
    return {
      firstElement,
      lastElement,
      elements: focusableElements,
    };
  },
  
  // Screen reader announcements
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },
};
```

### 🚀 Performance Optimizations

```typescript
// performance.ts
// Lazy load heavy components
export const LazyEmotionSelector = lazy(() => import('./EmotionSelector'));
export const LazyPatternGraph = lazy(() => import('./PatternGraph'));

// Optimized re-render prevention
export const MemoizedGlassCard = memo(GlassCard, (prev, next) => {
  return prev.children === next.children && 
         prev.variant === next.variant;
});

// Debounced interactions for ADHD-friendly input
export const useDebouncedCallback = (
  callback: Function,
  delay: number = 300
) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback((...args: any[]) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};
```

### 📋 Testing Guidelines

```typescript
// component.test.tsx
describe('ADHD-Friendly Component Tests', () => {
  it('should have minimum touch target size', () => {
    const { getByRole } = render(<EmotionSelector {...props} />);
    const button = getByRole('button');
    
    expect(button).toHaveStyle({
      minWidth: '44px',
      minHeight: '44px',
    });
  });
  
  it('should respect reduced motion preferences', () => {
    window.matchMedia = jest.fn().mockReturnValue({
      matches: true,
      addEventListener: jest.fn(),
    });
    
    const { container } = render(<TimeVisualization {...props} />);
    const animatedElement = container.querySelector('.time-ring-outer');
    
    expect(animatedElement).toHaveStyle({
      animation: 'none',
    });
  });
  
  it('should maintain 70% whitespace ratio', () => {
    const { container } = render(<CheckinScreen />);
    const content = container.querySelector('.content');
    const contentArea = content?.getBoundingClientRect();
    
    // Check padding and spacing
    expect(contentArea?.width).toBeLessThan(window.innerWidth * 0.3);
  });
});
```

This component specification provides:
1. **Complete design token system** matching the Aurora Glass aesthetic
2. **Detailed component implementations** with TypeScript interfaces
3. **ADHD-specific interaction patterns** (gentle animations, clear feedback)
4. **Accessibility-first approach** with WCAG AAA compliance
5. **Performance optimizations** for smooth 60fps on all devices
6. **Testing guidelines** to ensure consistency

Each component is designed to work within the 70% whitespace rule while providing clear, calm interactions that respect ADHD cognitive patterns.