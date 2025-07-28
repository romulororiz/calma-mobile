import React from 'react';
import { 
  Feather, 
  MaterialIcons, 
  Ionicons, 
  FontAwesome5,
  MaterialCommunityIcons, 
  FontAwesome6
} from '@expo/vector-icons';

// Professional icon mapping for all current emojis
export type IconName = 
  | 'home'           // 🏠
  | 'checkin'        // 💝  
  | 'insights'       // 📊
  | 'settings'       // ⚙️
  | 'emergency'      // 🆘
  | 'time'           // ⏰
  | 'chaos'          // 🌀
  | 'messages'       // 💌
  | 'lifestory'      // 🌍
  | 'parent'         // 👪
  | 'energy'         // ⚡
  | 'tasks'          // 📋
  | 'search'         // 🔍
  | 'profile'        // 👤
  | 'support'        // 🤝
  | 'premium'        // 💜
  | 'menu'           // ☰
  | 'camera'         // 📸
  | 'brain'          // 🧠
  | 'heart'          // ❤️
  | 'calm'           // 🌊
  | 'breathe'        // 🫁
  | 'meditation'     // 🧘
  | 'focus'          // 🎯
  | 'phone'          // 📞
  | 'check'          // ✓
  | 'close'          // ✕
  | 'arrow-right'    // →
  | 'arrow-left'     // ←
  | 'arrow-up'       // ↑
  | 'arrow-down'     // ↓
  | 'plus'           // +
  | 'minus'          // -
  | 'edit'           // ✏️
  | 'delete'         // 🗑️
  | 'info'           // ℹ️
  | 'warning'        // ⚠️
  | 'success'        // ✅
  | 'loading'        // ⏳
  // Emotion icons
  | 'happy'          // 😊
  | 'excited'        // 🤩
  | 'calm-emotion'   // 😌
  | 'sad'            // 😔
  | 'angry'          // 😤
  | 'anxious'        // 😰
  | 'loved'          // 🫂
  // Context icons
  | 'medication'     // 💊
  | 'tired'          // 😴
  | 'work'           // 💼
  | 'coffee'         // ☕
  | 'sparkles'       // ✨
  | 'hourglass'      // ⏳
  | 'lightbulb'      // 💡
  | 'target'         // 🎯
  | 'text'           // 💬
  | 'book'           // 📖
  | 'star'           // ⭐
  | 'notification'   // 🔔
  | 'moon'           // 🌙
  | 'palette'        // 🎨
  | 'lock'           // 🔒
  | 'smartphone'     // 📱
  | 'cloud'          // ☁️
  | 'time'           // ⏰
  | 'haptic'         // 📳
  | 'wave'           // 👋
  | 'medication'     // 💊
  | 'support'        // ❓
  | 'messages'       // 💌
  | 'info'           // ℹ️
  | 'sparkles'       // ✨
  | 'energy'         // 💪
  | 'meditation'     // 🧘‍♀️
  | 'logout'         // 🚪

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
}

const iconMap: Record<IconName, { 
  component: any; 
  name: string; 
  color?: string; 
}> = {
  // Navigation Icons
  home: { component: Feather, name: 'home' },
  checkin: { component: Feather, name: 'heart' },
  insights: { component: Feather, name: 'bar-chart-2' },
  settings: { component: Feather, name: 'settings' },
  emergency: { component: MaterialIcons, name: 'sos' },
  
  // Main Action Icons  
  time: { component: Feather, name: 'clock' },
  chaos: { component: MaterialCommunityIcons, name: 'head-lightbulb' },
  messages: { component: Feather, name: 'message-circle' },
  lifestory: { component: Feather, name: 'globe' },
  parent: { component: MaterialIcons, name: 'family-restroom' },
  
  // Context & State Icons
  energy: { component: Feather, name: 'zap' },
  tasks: { component: Feather, name: 'list' },
  search: { component: Feather, name: 'search' },
  profile: { component: Feather, name: 'user' },
  support: { component: Feather, name: 'help-circle' },
  premium: { component: MaterialIcons, name: 'workspace-premium' },
  menu: { component: Feather, name: 'menu' },
  
  // Action Icons
  camera: { component: Feather, name: 'camera' },
  brain: { component: MaterialCommunityIcons, name: 'brain' },
  heart: { component: Feather, name: 'heart' },
  calm: { component: MaterialCommunityIcons, name: 'waves' },
  breathe: { component: MaterialCommunityIcons, name: 'lungs' },
  meditation: { component: MaterialCommunityIcons, name: 'meditation' },
  focus: { component: MaterialIcons, name: 'center-focus-strong' },
  phone: { component: Feather, name: 'phone' },
  
  // UI Control Icons
  check: { component: Feather, name: 'check' },
  close: { component: Feather, name: 'x' },
  'arrow-right': { component: Feather, name: 'arrow-right' },
  'arrow-left': { component: Feather, name: 'arrow-left' },
  'arrow-up': { component: Feather, name: 'arrow-up' },
  'arrow-down': { component: Feather, name: 'arrow-down' },
  plus: { component: Feather, name: 'plus' },
  minus: { component: Feather, name: 'minus' },
  edit: { component: Feather, name: 'edit-2' },
  delete: { component: Feather, name: 'trash-2' },
  
  // Status Icons
  info: { component: Feather, name: 'info' },
  warning: { component: Feather, name: 'alert-triangle' },
  success: { component: Feather, name: 'check-circle' },
  loading: { component: Feather, name: 'loader' },
  
  // Emotion Icons
  happy: { component: Feather, name: 'smile' },
  excited: { component: MaterialCommunityIcons, name: 'emoticon-excited-outline' },
  'calm-emotion': { component: MaterialIcons, name: 'self-improvement' },
  sad: { component: Feather, name: 'frown' },
  angry: { component: MaterialCommunityIcons, name: 'emoticon-angry-outline' },
  anxious: { component: FontAwesome6, name: 'face-frown-open' },
  loved: { component: FontAwesome6, name: 'heart' },
  
  // Context Icons
  medication: { component: MaterialCommunityIcons, name: 'pill' },
  tired: { component: Feather, name: 'moon' },
  work: { component: Feather, name: 'briefcase' },
  coffee: { component: Feather, name: 'coffee' },
  sparkles: { component: MaterialCommunityIcons, name: 'sparkles' },
  hourglass: { component: MaterialIcons, name: 'hourglass-empty' },
  lightbulb: { component: MaterialIcons, name: 'lightbulb' },
  target: { component: Feather, name: 'target' },
  text: { component: Feather, name: 'message-square' },
  book: { component: Feather, name: 'book' },
  star: { component: Feather, name: 'star' },
  notification: { component: Feather, name: 'bell' },
  moon: { component: Feather, name: 'moon' },
  palette: { component: Feather, name: 'palette' },
  smartphone: { component: Feather, name: 'smartphone' },
  cloud: { component: Feather, name: 'cloud' },
  haptic: { component: Feather, name: 'smartphone' },
  wave: { component: Feather, name: 'hand' },
  
  
  //Settings Icons
  logout: { component: MaterialIcons, name: 'logout' },
  lock: { component: Feather, name: 'lock' },
}

const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = '#FFFFFF', 
  style 
}) => {
  const iconConfig = iconMap[name];
  
  if (!iconConfig) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }
  
  const IconComponent = iconConfig.component;
  const iconColor = iconConfig.color || color;
  
  return (
    <IconComponent 
      name={iconConfig.name} 
      size={size} 
      color={iconColor} 
      style={style}
    />
  );
};

export default Icon;

// Convenience function for getting icon without rendering
export const getIconConfig = (name: IconName) => iconMap[name];

// Export commonly used icon names as constants
export const ICON_NAMES = {
  // Navigation
  HOME: 'home' as const,
  CHECKIN: 'checkin' as const,
  INSIGHTS: 'insights' as const, 
  SETTINGS: 'settings' as const,
  EMERGENCY: 'emergency' as const,
  
  // Actions
  TIME: 'time' as const,
  CHAOS: 'chaos' as const,
  MESSAGES: 'messages' as const,
  LIFESTORY: 'lifestory' as const,
  PARENT: 'parent' as const,
  
  // Common
  ENERGY: 'energy' as const,
  SEARCH: 'search' as const,
  PROFILE: 'profile' as const,
  SUPPORT: 'support' as const,
  MENU: 'menu' as const,
  WARNING: 'warning' as const,
  LIGHTBULB: 'lightbulb' as const,
  TARGET: 'target' as const,
  BOOK: 'book' as const,
  STAR: 'star' as const,
  NOTIFICATION: 'notification' as const,
  MOON: 'moon' as const,
  PALETTE: 'palette' as const,
  LOCK: 'lock' as const,
  SMARTPHONE: 'smartphone' as const,
  CLOUD: 'cloud' as const,
  HAPTIC: 'haptic' as const,
  WAVE: 'wave' as const,
} as const; 