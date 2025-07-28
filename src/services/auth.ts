import { supabase } from '../lib/supabase';
import { validateSignUp, validateSignIn, validateEmail } from '../utils/validation';
import type { AuthResult, SignUpData, SignInData } from '../types/auth';

export class AuthService {
  // Sign up with email and password
  async signUp(signUpData: SignUpData): Promise<AuthResult> {
    try {
      // Validate input data
      const validatedData = validateSignUp(
        signUpData.fullName,
        signUpData.email,
        signUpData.password,
        signUpData.password
      );

      console.log('🔐 Attempting sign up for:', validatedData.email);

      // Check if user already exists first
      const existingUser = await this.checkUserExists(validatedData.email);
      if (existingUser) {
        return {
          success: false,
          error: 'An account with this email already exists. Please sign in instead.',
        };
      }

      // Attempt to create account
      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          data: {
            full_name: validatedData.fullName,
          },
        },
      });

      if (error) {
        console.error('❌ Sign up error:', error);

        // Handle specific Supabase errors
        if (
          error.message?.includes('already registered') ||
          error.message?.includes('already been taken') ||
          error.message?.includes('User already registered')
        ) {
          return {
            success: false,
            error: 'An account with this email already exists. Please sign in instead.',
          };
        }

        return {
          success: false,
          error: error.message || 'Failed to create account',
        };
      }

      if (!data.user) {
        return {
          success: false,
          error: 'Failed to create user account',
        };
      }

      console.log('✅ Sign up successful for:', data.user.email);

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error('❌ Sign up service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Sign in with email and password
  async signIn(signInData: SignInData): Promise<AuthResult> {
    try {
      // Validate input data
      const validatedData = validateSignIn(signInData.email, signInData.password);

      console.log('🔐 Attempting sign in for:', validatedData.email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        console.error('❌ Sign in error:', error);

        // Handle specific Supabase errors
        if (error.message?.includes('Invalid login credentials')) {
          return {
            success: false,
            error: 'Invalid email or password. Please check your credentials and try again.',
          };
        }

        if (error.message?.includes('Email not confirmed')) {
          return {
            success: false,
            error: 'Please check your email and click the confirmation link before signing in.',
          };
        }

        return {
          success: false,
          error: error.message || 'Failed to sign in',
        };
      }

      if (!data.user || !data.session) {
        return {
          success: false,
          error: 'Failed to establish session',
        };
      }

      console.log('✅ Sign in successful for:', data.user.email);

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error('❌ Sign in service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Sign out
  async signOut(): Promise<AuthResult> {
    try {
      console.log('🔐 Attempting sign out');

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('❌ Sign out error:', error);
        return {
          success: false,
          error: error.message || 'Failed to sign out',
        };
      }

      console.log('✅ Sign out successful');

      return {
        success: true,
      };
    } catch (error) {
      console.error('❌ Sign out service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Reset password
  async resetPassword(email: string): Promise<AuthResult> {
    try {
      // Validate email
      const validatedEmail = validateEmail(email);

      console.log('🔐 Attempting password reset for:', validatedEmail);

      const { error } = await supabase.auth.resetPasswordForEmail(validatedEmail, {
        redirectTo: 'calma://reset-password',
      });

      if (error) {
        console.error('❌ Password reset error:', error);
        return {
          success: false,
          error: error.message || 'Failed to send reset email',
        };
      }

      console.log('✅ Password reset email sent to:', validatedEmail);

      return {
        success: true,
      };
    } catch (error) {
      console.error('❌ Password reset service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Get current session
  async getCurrentSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('❌ Get session error:', error);
        return null;
      }

      return session;
    } catch (error) {
      console.error('❌ Get session service error:', error);
      return null;
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error('❌ Get user error:', error);
        return null;
      }

      return user;
    } catch (error) {
      console.error('❌ Get user service error:', error);
      return null;
    }
  }

  // Check if user exists (private method)
  private async checkUserExists(email: string): Promise<boolean> {
    try {
      // Try to initiate password reset - if user doesn't exist, it won't send email
      // But Supabase doesn't return an error for security reasons
      // So we'll rely on the actual signup attempt to catch duplicates
      return false;
    } catch (error) {
      // If there's any error, assume user doesn't exist
      return false;
    }
  }

  // Refresh session
  async refreshSession(): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        console.error('❌ Refresh session error:', error);
        return {
          success: false,
          error: error.message || 'Failed to refresh session',
        };
      }

      return {
        success: true,
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      console.error('❌ Refresh session service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
