export type RootStackParamList = {
  // Onboarding
  Welcome: undefined;
  Login: { prefillEmail?: string } | undefined;
  SignUp: undefined;
  SetupIntro: undefined;
  ADHDType: undefined;

  // Main App Container (all screens handled internally)
  Main: undefined;

  // Support (standalone)
  ParentBridge: undefined;
  Breathing: undefined;

  // Settings
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
