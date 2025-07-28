// Icon Migration Helper
// This file documents all emoji-to-professional-icon mappings for the Calma app

const emojiToIconMap = {
  // Navigation & Main Actions
  '🏠': 'home',           // Home
  '💝': 'checkin',        // Check-in (heart for emotional check-in)
  '📊': 'insights',       // Insights (bar chart)
  '⚙️': 'settings',       // Settings 
  '🆘': 'emergency',      // Emergency
  
  // Feature Actions
  '⏰': 'time',           // Time Reality
  '🌀': 'chaos',          // Chaos→Clarity (spiral/whirlwind)
  '💌': 'messages',       // Message Check
  '🌍': 'lifestory',      // Life Story (globe)
  '👪': 'parent',         // Parent Bridge (family)
  
  // Context & States
  '⚡': 'energy',         // Energy/High Energy
  '📋': 'tasks',          // Tasks/Lists
  '🔍': 'search',         // Search/Scanning
  '👤': 'profile',        // Profile/User
  '🤝': 'support',        // Support/Help
  '💜': 'premium',        // Premium features
  '☰': 'menu',           // Menu
  
  // Action States
  '📸': 'camera',         // Camera/Photo capture
  '🧠': 'brain',          // AI/Thinking
  '❤️': 'heart',          // Love/Care
  '🌊': 'calm',           // Calm/Waves
  '🫁': 'breathe',        // Breathing
  '🧘': 'meditation',     // Meditation
  '🎯': 'focus',          // Focus/Target
  '📞': 'phone',          // Phone/Call
  
  // UI Controls
  '✓': 'check',           // Success/Check
  '✕': 'close',           // Close/Cancel
  '→': 'arrow-right',     // Right arrow
  '←': 'arrow-left',      // Left arrow
  '↑': 'arrow-up',        // Up arrow
  '↓': 'arrow-down',      // Down arrow
  '+': 'plus',            // Add/Plus
  '-': 'minus',           // Remove/Minus
  '✏️': 'edit',           // Edit
  '🗑️': 'delete',         // Delete
  
  // Status
  'ℹ️': 'info',           // Information
  '⚠️': 'warning',        // Warning
  '✅': 'success',        // Success
  '⏳': 'loading',        // Loading
};

// Usage Examples:
// Before: <NebulaText>{emoji}</NebulaText>
// After:  <Icon name="iconname" size={24} color="#FFFFFF" />

// Files that need updating:
const filesToUpdate = [
  'src/screens/time/TimeScreen.tsx',
  'src/screens/checkin/CheckinScreen.tsx', 
  'src/screens/insights/InsightsScreen.tsx',
  'src/screens/emergency/EmergencyScreen.tsx',
  'src/screens/settings/SettingsScreen.tsx',
  'src/screens/ai/MessageCheckScreen.tsx',
  'src/screens/ai/LifeStoryScreen.tsx',
  'src/screens/support/ParentBridgeScreen.tsx',
  'src/components/adhd/ContextPills.tsx',
  'src/components/adhd/EmotionSelector.tsx',
];

console.log('Emoji to Icon Migration Map:', emojiToIconMap);
console.log('Files to update:', filesToUpdate);

module.exports = { emojiToIconMap, filesToUpdate }; 