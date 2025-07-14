export type RootStackParamList = {
  // Onboarding
  Welcome: undefined;
  Login: undefined;
  SetupIntro: undefined;
  ADHDType: undefined;

  // Main App
  Main: undefined;

  // AI Features
  ChaosToClarity: undefined;
  MessageCheck: undefined;
  LifeStory: undefined;

  // Support
  Emergency: undefined;
  ParentBridge: undefined;
  Breathing: undefined;

  // Settings
  Settings: undefined;
  Premium: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Mood: undefined;
  Time: undefined;
  Insights: undefined;
  You: undefined;
};

export type MoodStackParamList = {
  MoodHome: undefined;
  Checkin: undefined;
  MoodHistory: undefined;
};

export type TimeStackParamList = {
  TimeHome: undefined;
  TimeCheck: undefined;
  TimeBlindness: undefined;
};

export type YouStackParamList = {
  Profile: undefined;
  Settings: undefined;
  About: undefined;
};

export type InsightsStackParamList = {
  InsightsDashboard: undefined;
  Patterns: undefined;
  Energy: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  Checkin: undefined;
  Menu: undefined;
};

export type ProfileStackParamList = {
  ProfileDashboard: undefined;
  Settings: undefined;
  Support: undefined;
  Premium: undefined;
};

export type CheckinData = {
  emotion: string;
  context: string[];
  timestamp: string;
  notes?: string;
};

export type EmergencyAction = {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: () => void;
};
