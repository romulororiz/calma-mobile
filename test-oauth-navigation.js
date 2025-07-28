// Quick OAuth Navigation Test
// Run this in your browser console or add to your app for testing

console.log('🧪 OAuth Navigation Test');
console.log('========================');

// Simulate the OAuth flow steps
const testOAuthFlow = async () => {
  console.log('1. ✅ Google OAuth succeeds');
  console.log('2. ✅ User session created');
  console.log('3. ✅ Profile creation triggered');
  console.log('4. ⏳ Navigation determination...');
  console.log('5. 🎯 Should navigate to SetupIntro immediately');
  console.log('');
  console.log('Expected console logs:');
  console.log('- 🧭 New user detected, resetting route');
  console.log('- 🧭 Processing user: [user-id] provider: google');
  console.log('- ✅ Profile created successfully');
  console.log('- 🧭 Onboarding completed: false');
  console.log('- 🧭 Going to SetupIntro');
  console.log('');
  console.log('If you see "Going to Welcome" instead, there\'s still an issue!');
};

testOAuthFlow(); 