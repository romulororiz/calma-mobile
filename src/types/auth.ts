export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;

  // Onboarding data
  onboarding_completed: boolean | null;
  onboarding_completed_at: string | null;
  adhd_type: string | null;
  notification_style: string | null;
  energy_pattern: string | null;
  focus_preference: string | null;
  selected_goal: string | null;

  // Preferences
  preferences: {
    notifications: boolean;
    darkMode: boolean;
    reminders: boolean;
    accessibility: boolean;
  } | null;

  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface OnboardingData {
  adhd_type?: string;
  notification_style?: string;
  energy_pattern?: string;
  focus_preference?: string;
  selected_goal?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: any;
  session?: any;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface GoogleAuthResult {
  success: boolean;
  error?: string;
  user?: any;
  isNewUser?: boolean;
}
