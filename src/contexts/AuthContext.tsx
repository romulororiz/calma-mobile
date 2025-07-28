import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { authService } from '../services/auth';
import { googleAuthService } from '../services/googleAuth';
import { profileService } from '../services/profile';
import type { SignUpData, SignInData } from '../types/auth';
import { debugOAuthFlow } from '../utils/oauthDebug';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (signInData: SignInData) => Promise<{ success: boolean; error?: string }>;
  signUp: (signUpData: SignUpData) => Promise<{ success: boolean; error?: string; user?: any }>;
  signInWithGoogle: () => Promise<{
    success: boolean;
    error?: string;
    user?: any;
    isNewUser?: boolean;
  }>;
  signOut: () => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔐 Auth state changed:', event, session?.user?.email || 'no user');
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (signInData: SignInData) => {
    try {
      const result = await authService.signIn(signInData);
      if (result.success && result.user && result.session) {
        setSession(result.session);
        setUser(result.user);
      }
      return {
        success: result.success,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  };

  const signUp = async (signUpData: SignUpData) => {
    try {
      const result = await authService.signUp(signUpData);

      if (result.success && result.user) {
        // Create user profile
        await profileService.createUserProfile(result.user.id, {
          full_name: signUpData.fullName,
          email: signUpData.email,
        });

        if (result.session) {
          setSession(result.session);
          setUser(result.user);
        }
      }

      return {
        success: result.success,
        error: result.error,
        user: result.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await googleAuthService.signInWithGoogle();

      if (result.success && result.user) {
        console.log('🔐 Google OAuth successful, user:', result.user.email);
        
        // Check if profile already exists
        let profileExists = false;
        try {
          const existingProfile = await profileService.getCurrentUserProfile();
          if (existingProfile) {
            console.log('✅ User profile already exists');
            profileExists = true;
          }
        } catch (error) {
          console.log('📋 No existing profile found, will create new one');
        }

        // Create profile for new Google users or if profile doesn't exist
        if (result.isNewUser || !profileExists) {
          console.log('📋 Creating new user profile...');
          const profileResult = await profileService.createUserProfile(result.user.id, {
            full_name: result.user.user_metadata?.full_name || result.user.user_metadata?.name || '',
            email: result.user.email || '',
          });

          if (!profileResult) {
            console.error('❌ Failed to create user profile');
            return {
              success: false,
              error: 'Failed to create user profile',
            };
          } else {
            console.log('✅ User profile created successfully');
          }
        }

        // Update context state
        const session = await authService.getCurrentSession();
        if (session) {
          setSession(session);
          setUser(result.user);
          console.log('✅ Auth context updated with Google user');
        }
      }

      return {
        success: result.success,
        error: result.error,
        user: result.user,
        isNewUser: result.isNewUser,
      };
    } catch (error) {
      console.error('❌ Error in signInWithGoogle:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  };

  const signOut = async () => {
    try {
      const result = await authService.signOut();
      if (result.success) {
        setSession(null);
        setUser(null);
      }
      return {
        success: result.success,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const result = await authService.resetPassword(email);
      return {
        success: result.success,
        error: result.error,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  };

  const value = {
    user,
    session,
    isLoading,
    isAuthenticated: !!session,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
