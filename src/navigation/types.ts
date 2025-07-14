export type RootStackParamList = {
  Main: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Emergency: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Mood: undefined;
  Time: undefined;
  Insights: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  Checkin: undefined;
  Menu: undefined;
};

export type MoodStackParamList = {
  MoodDashboard: undefined;
  Checkin: undefined;
  History: undefined;
};

export type TimeStackParamList = {
  TimeDashboard: undefined;
  TimeCheck: undefined;
  Tasks: undefined;
};

export type InsightsStackParamList = {
  InsightsDashboard: undefined;
  Patterns: undefined;
  Energy: undefined;
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