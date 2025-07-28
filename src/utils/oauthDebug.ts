import { supabase } from '../lib/supabase';
import { profileService } from '../services/profile';

export const debugOAuthFlow = async () => {
  console.log('🔍 =========================');
  console.log('🔍 OAUTH DEBUG DIAGNOSTICS');
  console.log('🔍 =========================');

  try {
    // 1. Check current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    console.log('🔍 Current session:', {
      exists: !!session,
      userId: session?.user?.id || 'none',
      email: session?.user?.email || 'none',
      provider: session?.user?.app_metadata?.provider || 'none',
      sessionError: sessionError?.message || 'none'
    });

    if (!session?.user) {
      console.log('🔍 No active session found');
      return;
    }

    // 2. Check if user profile exists
    console.log('🔍 Checking user profile...');
    const userProfile = await profileService.getCurrentUserProfile();
    console.log('🔍 User profile:', {
      exists: !!userProfile,
      id: userProfile?.id || 'none',
      email: userProfile?.email || 'none',
      onboardingComplete: userProfile?.onboarding_completed || false
    });

    // 3. Check if safe function exists
    console.log('🔍 Testing safe function...');
    try {
      const { data: testResult, error: testError } = await supabase
        .rpc('create_user_profile_safe', {
          user_id: session.user.id,
          user_email: session.user.email || '',
          user_full_name: session.user.user_metadata?.full_name || 'Test User'
        });
      
      console.log('🔍 Safe function test:', {
        success: !testError,
        result: testResult,
        error: testError?.message || 'none'
      });
    } catch (funcError) {
      console.log('🔍 Safe function error:', funcError);
    }

    // 4. Test direct profile creation
    if (!userProfile) {
      console.log('🔍 Attempting to create missing profile...');
      const newProfile = await profileService.createUserProfile(session.user.id, {
        full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || '',
        email: session.user.email || ''
      });
      
      console.log('🔍 Profile creation result:', {
        success: !!newProfile,
        profileId: newProfile?.id || 'failed'
      });
    }

    // 5. Check onboarding status
    console.log('🔍 Checking onboarding status...');
    const hasCompletedOnboarding = await profileService.hasCompletedOnboarding(session.user.id);
    console.log('🔍 Onboarding status:', {
      completed: hasCompletedOnboarding,
      shouldGoTo: hasCompletedOnboarding ? 'Main' : 'SetupIntro'
    });

  } catch (error) {
    console.error('🔍 Debug error:', error);
  }

  console.log('🔍 =========================');
  console.log('🔍 DEBUG COMPLETE');
  console.log('🔍 =========================');
};

export const testProfileCreation = async (userId: string, userData: { full_name?: string; email?: string }) => {
  console.log('🧪 Testing profile creation for:', userId);
  
  try {
    const profile = await profileService.createUserProfile(userId, userData);
    console.log('🧪 Profile creation result:', profile ? 'SUCCESS' : 'FAILED');
    return profile;
  } catch (error) {
    console.error('🧪 Profile creation error:', error);
    return null;
  }
}; 