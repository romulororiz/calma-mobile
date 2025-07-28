import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '../lib/supabase';
import type { GoogleAuthResult } from '../types/auth';
import { debugAuthConfig, logAuthError } from '../utils/authDebug';

// Configure WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

export class GoogleAuthService {
  // Main Google sign in method
  async signInWithGoogle(): Promise<GoogleAuthResult> {
    try {
      console.log('🔐 Starting Google OAuth...');
      debugAuthConfig();

      // Get Supabase URL
      const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
      if (!supabaseUrl) {
        console.error('❌ EXPO_PUBLIC_SUPABASE_URL not found in environment variables');
        throw new Error('Supabase URL not configured - check your environment variables');
      }

      console.log('🔗 Supabase URL configured:', supabaseUrl.substring(0, 20) + '...');

            // Create redirect URI - force consistent scheme
      const redirectUri = 'calma://auth';

      // Construct the OAuth URL to Supabase
      const authUrl = `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(
        redirectUri
      )}`;

      console.log('📱 OAuth URL:', authUrl);
      console.log('📱 Redirect URI:', redirectUri);

      // Open the auth session
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri, {
        dismissButtonStyle: 'cancel',
        preferEphemeralSession: true,
      });

      console.log('📱 OAuth result:', result);

      if (result.type === 'success') {
        console.log('✅ OAuth success, result URL:', result.url);

        // Wait for Supabase to process the callback
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Reduced from 2000ms

        // Check for session multiple times with increasing delays
        for (let attempt = 1; attempt <= 3; attempt++) {
          console.log(`🔍 Checking for session, attempt ${attempt}...`);

          // Refresh the session to ensure we get the latest state
          await supabase.auth.refreshSession();
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session?.user) {
            console.log('✅ Session found:', session.user.email);

            // Check if this is a new user (created_at is recent)
            const userCreatedAt = new Date(session.user.created_at);
            const now = new Date();
            const timeDiff = now.getTime() - userCreatedAt.getTime();
            const isNewUser = timeDiff < 300000; // Less than 5 minutes = new user

            return {
              success: true,
              user: session.user,
              isNewUser,
            };
          }

          if (attempt < 3) {
            await new Promise((resolve) => setTimeout(resolve, 1000 * attempt)); // Shorter delays
          }
        }

        // If still no session, try to extract from URL manually
        console.log('🔍 No session found, trying to extract tokens from URL...');

        try {
          const url = new URL(result.url);
          const fragment = url.hash.substring(1);
          const params = new URLSearchParams(fragment);

          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');

          if (accessToken && refreshToken) {
            console.log('✅ Found tokens in URL, setting session...');

            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (error) {
              console.error('❌ Error setting session:', error);
              return {
                success: false,
                error: `Failed to set session: ${error.message}`,
              };
            }

            if (data?.user) {
              // Check if this is a new user
              const userCreatedAt = new Date(data.user.created_at);
              const now = new Date();
              const timeDiff = now.getTime() - userCreatedAt.getTime();
              const isNewUser = timeDiff < 60000; // Less than 1 minute = new user

              return {
                success: true,
                user: data.user,
                isNewUser,
              };
            }
          }
        } catch (urlError) {
          console.error('❌ Error parsing URL:', urlError);
        }

        // Try one more time with manual session refresh
        console.log('🔄 Last attempt: manually refreshing session...');
        const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
        
        if (refreshData?.session?.user) {
          console.log('✅ Session found after manual refresh:', refreshData.session.user.email);
          return {
            success: true,
            user: refreshData.session.user,
            isNewUser: false, // Can't determine from refresh
          };
        }

        console.error('❌ All session attempts failed');
        return {
          success: false,
          error: 'Authentication completed but session could not be established. Please try signing in again.',
        };
      } else if (result.type === 'cancel') {
        return {
          success: false,
          error: 'Authentication cancelled by user',
        };
      } else {
        return {
          success: false,
          error: 'Authentication failed',
        };
      }
    } catch (error) {
      logAuthError('GOOGLE_SIGNIN', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Alternative method using Supabase's built-in OAuth
  async signInWithGoogleSupabase(): Promise<GoogleAuthResult> {
    try {
      console.log('🔐 Starting Supabase Google OAuth...');

              const redirectUri = 'calma://auth';

        const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      console.log('📱 Supabase OAuth result:', { data, error });

      if (error) {
        console.error('❌ Supabase OAuth error:', error);
        return {
          success: false,
          error: error.message,
        };
      }

      if (data?.url) {
        console.log('📱 Opening OAuth URL:', data.url);

        // Open the OAuth URL
        const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri, {
          dismissButtonStyle: 'cancel',
          preferEphemeralSession: true,
        });

        console.log('📱 WebBrowser result:', result);

        if (result.type === 'success') {
          console.log('✅ OAuth success, parsing result URL...');
          console.log('📱 Result URL:', result.url);

          // Parse the result URL to extract tokens
          const url = new URL(result.url);

          // Check for tokens in query parameters
          const accessToken = url.searchParams.get('access_token');
          const refreshToken = url.searchParams.get('refresh_token');

          // Also check in hash fragment (common for OAuth)
          const hashParams = new URLSearchParams(url.hash.substring(1));
          const hashAccessToken = hashParams.get('access_token');
          const hashRefreshToken = hashParams.get('refresh_token');

          const finalAccessToken = accessToken || hashAccessToken;
          const finalRefreshToken = refreshToken || hashRefreshToken;

          console.log('🔍 Extracted tokens:', {
            accessToken: finalAccessToken ? 'present' : 'missing',
            refreshToken: finalRefreshToken ? 'present' : 'missing',
          });

          if (finalAccessToken && finalRefreshToken) {
            console.log('✅ Setting session with extracted tokens...');

            // Set the session manually
            const { data, error } = await supabase.auth.setSession({
              access_token: finalAccessToken,
              refresh_token: finalRefreshToken,
            });

            console.log('📱 Set session result:', data?.user?.email || 'No user', error);

            if (error) {
              return {
                success: false,
                error: `Failed to set session: ${error.message}`,
              };
            }

            if (data?.user) {
              // Check if this is a new user
              const userCreatedAt = new Date(data.user.created_at);
              const now = new Date();
              const timeDiff = now.getTime() - userCreatedAt.getTime();
              const isNewUser = timeDiff < 60000;

              return {
                success: true,
                user: data.user,
                isNewUser,
              };
            }
          }

          // If no tokens found, try to wait and check for session
          console.log('🔍 No tokens found in URL, waiting for Supabase to process...');
          await new Promise((resolve) => setTimeout(resolve, 2000));

          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession();
          console.log('📱 Session after wait:', session?.user?.email || 'No session', sessionError);

          if (session?.user) {
            // Check if this is a new user
            const userCreatedAt = new Date(session.user.created_at);
            const now = new Date();
            const timeDiff = now.getTime() - userCreatedAt.getTime();
            const isNewUser = timeDiff < 60000;

            return {
              success: true,
              user: session.user,
              isNewUser,
            };
          }

          return {
            success: false,
            error:
              'Authentication completed but no session could be established. Please try again.',
          };
        } else if (result.type === 'cancel') {
          return {
            success: false,
            error: 'Authentication cancelled by user',
          };
        } else {
          return {
            success: false,
            error: 'Authentication failed',
          };
        }
      }

      return {
        success: false,
        error: 'No OAuth URL received from Supabase',
      };
    } catch (error) {
      console.error('❌ Supabase Google Auth Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

// Export singleton instance
export const googleAuthService = new GoogleAuthService();
