import { supabase } from '../lib/supabase';
import { validateProfileUpdate } from '../utils/validation';
import type { UserProfile, OnboardingData } from '../types/auth';

export class ProfileService {
  // Get current user profile
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.log('📋 No authenticated user found');
        return null;
      }

      console.log('📋 Fetching profile for user:', user.id);

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('📋 No profile found for user');
          return null;
        }
        console.error('❌ Error fetching profile:', error);
        throw error;
      }

      console.log('✅ Profile fetched successfully');
      return profile;
    } catch (error) {
      console.error('❌ Error in getCurrentUserProfile:', error);
      return null;
    }
  }

  // Create user profile (called after signup)
  async createUserProfile(
    userId: string,
    userData: { full_name?: string; email?: string }
  ): Promise<UserProfile | null> {
    try {
      console.log('📋 Creating profile for user:', userId, 'with data:', userData);

      // Check if profile already exists first
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (existingProfile) {
        console.log('📋 Profile already exists for user:', userId);
        // Return the existing profile
        const { data: profile, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (!fetchError && profile) {
          return profile;
        }
      }

      console.log('📋 No existing profile found, creating new one...');

      // Try using the RLS-safe function first (for OAuth users)
      try {
        console.log('📋 Attempting to create profile via safe function...');
        const { data: functionResult, error: functionError } = await supabase
          .rpc('create_user_profile_safe', {
            user_id: userId,
            user_email: userData.email || '',
            user_full_name: userData.full_name || null,
          });

        console.log('📋 Safe function result:', functionResult, 'error:', functionError);

        if (!functionError && functionResult?.[0]?.success) {
          console.log('✅ Profile created via safe function');
          // Fetch the created profile
          const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (!fetchError && profile) {
            console.log('✅ Profile fetched after safe function creation');
            return profile;
          } else {
            console.error('❌ Error fetching profile after safe function:', fetchError);
          }
        } else {
          console.log('⚠️ Safe function failed or returned false:', functionError);
        }
      } catch (funcError) {
        console.log('⚠️ Safe function failed with exception:', funcError);
      }

      // Fallback to direct insert (for regular signup)
      console.log('📋 Attempting direct profile insert...');
      const profileData = {
        id: userId,
        email: userData.email || '',
        full_name: userData.full_name || '',
        avatar_url: null,
        onboarding_completed: false,
        onboarding_completed_at: null,
        adhd_type: null,
        notification_style: null,
        energy_pattern: null,
        focus_preference: null,
        selected_goal: null,
        preferences: {
          notifications: true,
          darkMode: false,
          reminders: true,
          accessibility: false,
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log('📋 Inserting profile data:', profileData);

      const { data: profile, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating profile via direct insert:', error);
        console.error('❌ Error code:', error.code);
        console.error('❌ Error message:', error.message);
        console.error('❌ Error details:', error.details);
        throw error;
      }

      console.log('✅ Profile created successfully via direct insert');
      return profile;
    } catch (error) {
      console.error('❌ Error in createUserProfile:', error);
      console.error('❌ Full error object:', JSON.stringify(error, null, 2));
      return null;
    }
  }

  // Update user profile
  async updateUserProfile(updates: Partial<UserProfile>): Promise<UserProfile | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.log('📋 No authenticated user found');
        return null;
      }

      // Validate updates
      const validatedUpdates = validateProfileUpdate(updates);

      console.log('📋 Updating profile for user:', user.id);

      const { data: profile, error } = await supabase
        .from('profiles')
        .update({
          ...validatedUpdates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();

      if (error) {
        console.error('❌ Error updating profile:', error);
        throw error;
      }

      console.log('✅ Profile updated successfully');
      return profile;
    } catch (error) {
      console.error('❌ Error in updateUserProfile:', error);
      return null;
    }
  }

  // Check if user has completed onboarding
  async hasCompletedOnboarding(userId: string): Promise<boolean> {
    try {
      console.log('📋 Checking onboarding status for user:', userId);

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('📋 No profile found, assuming not completed');
          return false;
        }
        console.error('❌ Error checking onboarding status:', error);
        return false;
      }

      const completed = !!profile?.onboarding_completed;
      console.log('📋 Onboarding completed:', completed);
      return completed;
    } catch (error) {
      console.error('❌ Error in hasCompletedOnboarding:', error);
      return false;
    }
  }

  // Complete onboarding
  async completeOnboarding(
    userId: string,
    onboardingData: OnboardingData
  ): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('📋 Completing onboarding for user:', userId);
      console.log('📋 Onboarding data:', onboardingData);

      const updateData = {
        ...onboardingData,
        onboarding_completed: true,
        onboarding_completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').update(updateData).eq('id', userId);

      if (error) {
        console.error('❌ Error completing onboarding:', error);
        return {
          success: false,
          error: error.message || 'Failed to complete onboarding',
        };
      }

      console.log('✅ Onboarding completed successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Error in completeOnboarding:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Reset onboarding (for testing/debugging)
  async resetOnboarding(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('📋 Resetting onboarding for user:', userId);

      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: false,
          onboarding_completed_at: null,
          adhd_type: null,
          notification_style: null,
          energy_pattern: null,
          focus_preference: null,
          selected_goal: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        console.error('❌ Error resetting onboarding:', error);
        return {
          success: false,
          error: error.message || 'Failed to reset onboarding',
        };
      }

      console.log('✅ Onboarding reset successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Error in resetOnboarding:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Get user preferences
  async getUserPreferences(userId: string) {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('preferences')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('❌ Error fetching preferences:', error);
        return null;
      }

      return profile?.preferences;
    } catch (error) {
      console.error('❌ Error in getUserPreferences:', error);
      return null;
    }
  }

  // Update user preferences
  async updateUserPreferences(
    userId: string,
    preferences: any
  ): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('📋 Updating preferences for user:', userId);

      const { error } = await supabase
        .from('profiles')
        .update({
          preferences,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) {
        console.error('❌ Error updating preferences:', error);
        return {
          success: false,
          error: error.message || 'Failed to update preferences',
        };
      }

      console.log('✅ Preferences updated successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Error in updateUserPreferences:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Delete user profile (for account deletion)
  async deleteUserProfile(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('📋 Deleting profile for user:', userId);

      const { error } = await supabase.from('profiles').delete().eq('id', userId);

      if (error) {
        console.error('❌ Error deleting profile:', error);
        return {
          success: false,
          error: error.message || 'Failed to delete profile',
        };
      }

      console.log('✅ Profile deleted successfully');
      return { success: true };
    } catch (error) {
      console.error('❌ Error in deleteUserProfile:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

// Export singleton instance
export const profileService = new ProfileService();
