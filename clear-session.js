// Quick script to clear cached session data for testing
// Run with: node clear-session.js

const { AsyncStorage } = require('@react-native-async-storage/async-storage');

async function clearSession() {
  try {
    console.log('🧹 Clearing cached session data...');
    
    // Clear all Supabase auth keys
    const keys = [
      'supabase.auth.token',
      'sb-xgqxiqwifrtiejxgdpis-auth-token',
      '@supabase/auth-token',
      'supabase-auth-token',
    ];
    
    for (const key of keys) {
      try {
        await AsyncStorage.removeItem(key);
        console.log(`✅ Cleared: ${key}`);
      } catch (error) {
        console.log(`⚠️ Could not clear ${key}:`, error.message);
      }
    }
    
    console.log('🎯 Session data cleared! Restart the app.');
  } catch (error) {
    console.error('❌ Error clearing session:', error);
  }
}

// Alternative manual method
console.log('📋 MANUAL METHOD:');
console.log('1. Close the app completely');
console.log('2. Clear app data/cache on device');
console.log('3. Or run: expo r --clear');

clearSession(); 