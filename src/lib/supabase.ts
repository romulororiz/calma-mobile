import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper function to get user session
export async function getSession() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    throw error;
  }
  return session;
}

// Helper function to get current user
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    throw error;
  }
  return user;
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
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
          preferences: Json | null;

          // Timestamps
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;

          // Onboarding data
          onboarding_completed?: boolean | null;
          onboarding_completed_at?: string | null;
          adhd_type?: string | null;
          notification_style?: string | null;
          energy_pattern?: string | null;
          focus_preference?: string | null;
          selected_goal?: string | null;

          // Preferences
          preferences?: Json | null;

          // Timestamps
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;

          // Onboarding data
          onboarding_completed?: boolean | null;
          onboarding_completed_at?: string | null;
          adhd_type?: string | null;
          notification_style?: string | null;
          energy_pattern?: string | null;
          focus_preference?: string | null;
          selected_goal?: string | null;

          // Preferences
          preferences?: Json | null;

          // Timestamps
          created_at?: string;
          updated_at?: string;
        };
      };
      emotional_checkins: {
        Row: {
          id: string;
          user_id: string;
          emotion_rating: number | null;
          energy_level: number | null;
          medication_taken: boolean | null;
          context_tags: string[] | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          emotion_rating?: number | null;
          energy_level?: number | null;
          medication_taken?: boolean | null;
          context_tags?: string[] | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          emotion_rating?: number | null;
          energy_level?: number | null;
          medication_taken?: boolean | null;
          context_tags?: string[] | null;
          notes?: string | null;
          created_at?: string;
        };
      };
      time_sessions: {
        Row: {
          id: string;
          user_id: string;
          session_type: string;
          estimated_duration: number | null;
          actual_duration: number | null;
          task_description: string | null;
          accuracy_rating: number | null;
          notes: string | null;
          started_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          session_type: string;
          estimated_duration?: number | null;
          actual_duration?: number | null;
          task_description?: string | null;
          accuracy_rating?: number | null;
          notes?: string | null;
          started_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          session_type?: string;
          estimated_duration?: number | null;
          actual_duration?: number | null;
          task_description?: string | null;
          accuracy_rating?: number | null;
          notes?: string | null;
          started_at?: string;
          completed_at?: string | null;
        };
      };
      user_settings: {
        Row: {
          id: string;
          user_id: string;
          notifications_enabled: boolean | null;
          reminder_frequency: string | null;
          theme_preference: string | null;
          accessibility_features: Json | null;
          privacy_settings: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          notifications_enabled?: boolean | null;
          reminder_frequency?: string | null;
          theme_preference?: string | null;
          accessibility_features?: Json | null;
          privacy_settings?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          notifications_enabled?: boolean | null;
          reminder_frequency?: string | null;
          theme_preference?: string | null;
          accessibility_features?: Json | null;
          privacy_settings?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {};
  };
}
