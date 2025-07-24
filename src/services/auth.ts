import { supabase } from '../lib/supabase';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as AppleAuthentication from 'expo-apple-authentication';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Complete the auth session
WebBrowser.maybeCompleteAuthSession();

// Create the redirect URL for OAuth
const redirectTo = AuthSession.makeRedirectUri({
  scheme: 'calma',
  path: '/auth/callback',
});

export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string, userData?: any) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  },

  // Sign in with Google OAuth
  async signInWithGoogle() {
    try {
      // Start the OAuth flow
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;

      // Open the browser for OAuth
      const authUrl = data?.url;
      if (!authUrl) throw new Error('No auth URL received');

      // Open browser and wait for redirect
      const result = await AuthSession.startAsync({
        authUrl,
        returnUrl: redirectTo,
      });

      // Handle the result
      if (result.type === 'success') {
        const { url } = result;

        // Extract session from URL parameters
        const urlParams = new URLSearchParams(url.split('#')[1] || url.split('?')[1]);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');

        if (accessToken) {
          // Set the session in Supabase
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          if (sessionError) throw sessionError;
          return { data: sessionData, error: null };
        }
      }

      throw new Error('OAuth flow was cancelled or failed');
    } catch (error) {
      console.error('Google sign in error:', error);
      return { data: null, error };
    }
  },

  // Sign in with Apple (iOS only)
  async signInWithApple() {
    try {
      // Check if Apple Authentication is available (iOS 13+)
      if (Platform.OS !== 'ios') {
        throw new Error('Apple Sign In is only available on iOS');
      }

      const isAvailable = await AppleAuthentication.isAvailableAsync();
      if (!isAvailable) {
        throw new Error('Apple Sign In is not available on this device');
      }

      // Request Apple authentication
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Check if we have the required data
      if (!credential.identityToken) {
        throw new Error('No identity token received from Apple');
      }

      // Sign in with Supabase using the Apple ID token
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'apple',
        token: credential.identityToken,
        nonce: credential.nonce,
      });

      if (error) throw error;

      // If this is the first time signing in, we might want to update user metadata
      if (credential.fullName && data.user) {
        const { familyName, givenName } = credential.fullName;
        const fullName = [givenName, familyName].filter(Boolean).join(' ');

        if (fullName) {
          await supabase.auth.updateUser({
            data: {
              full_name: fullName,
              first_name: givenName,
              last_name: familyName,
            },
          });
        }
      }

      return { data, error: null };
    } catch (error: any) {
      // Handle user cancellation gracefully
      if (error.code === 'ERR_REQUEST_CANCELED') {
        return { data: null, error: { message: 'Sign in was cancelled' } };
      }

      console.error('Apple sign in error:', error);
      return { data: null, error };
    }
  },

  // Alternative: Sign in with Apple using web OAuth flow
  async signInWithAppleWeb() {
    try {
      // Start the OAuth flow (similar to Google)
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;

      // Open the browser for OAuth
      const authUrl = data?.url;
      if (!authUrl) throw new Error('No auth URL received');

      // Open browser and wait for redirect
      const result = await AuthSession.startAsync({
        authUrl,
        returnUrl: redirectTo,
      });

      // Handle the result (same as Google flow)
      if (result.type === 'success') {
        const { url } = result;

        // Extract session from URL parameters
        const urlParams = new URLSearchParams(url.split('#')[1] || url.split('?')[1]);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');

        if (accessToken) {
          // Set the session in Supabase
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          if (sessionError) throw sessionError;
          return { data: sessionData, error: null };
        }
      }

      throw new Error('OAuth flow was cancelled or failed');
    } catch (error) {
      console.error('Apple web sign in error:', error);
      return { data: null, error };
    }
  },

  // Check if Apple Sign In is available
  async isAppleSignInAvailable() {
    if (Platform.OS !== 'ios') {
      return false;
    }

    try {
      return await AppleAuthentication.isAvailableAsync();
    } catch (error) {
      console.error('Error checking Apple Sign In availability:', error);
      return false;
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error };
    }
  },

  // Get current session
  async getSession() {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      return { session, error: null };
    } catch (error) {
      console.error('Get session error:', error);
      return { session: null, error };
    }
  },

  // Get current user
  async getUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error) {
      console.error('Get user error:', error);
      return { user: null, error };
    }
  },

  // Reset password
  async resetPassword(email: string) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${redirectTo}/reset-password`,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      return { data: null, error };
    }
  },

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  },
};
