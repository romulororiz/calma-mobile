import { makeRedirectUri } from 'expo-auth-session';

export const debugAuthConfig = () => {
  console.log('🔍 AUTH DEBUG INFO:');
  console.log('==================');

  // Check environment variables
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  console.log('📱 Environment Variables:');
  console.log('  SUPABASE_URL:', supabaseUrl ? '✅ Configured' : '❌ Missing');
  console.log('  SUPABASE_KEY:', supabaseKey ? '✅ Configured' : '❌ Missing');

  if (supabaseUrl) {
    console.log('  URL Preview:', supabaseUrl.substring(0, 30) + '...');
  }

  // Check redirect URI generation
  const redirectUri = 'calma://auth';
  console.log('📱 Redirect URI:', redirectUri);

  console.log('==================');
};

export const logAuthError = (stage: string, error: any) => {
  console.error(`🚨 AUTH ERROR [${stage}]:`, {
    message: error?.message || 'Unknown error',
    code: error?.code || 'No code',
    details: error?.details || 'No details',
    stack: error?.stack || 'No stack',
  });
};
