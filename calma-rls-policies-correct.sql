-- ===================================================================
-- CALMA APP - CORRECTED RLS POLICIES (Using 'id' for profiles)
-- Professional-grade security with correct column references
-- ===================================================================

-- ===================================================================
-- 1. ENABLE RLS ON ALL EXISTING TABLES
-- ===================================================================

-- Enable RLS for profiles
ALTER TABLE IF EXISTS profiles ENABLE ROW LEVEL SECURITY;

-- Enable RLS for emotional data
ALTER TABLE IF EXISTS emotional_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS emotion_patterns ENABLE ROW LEVEL SECURITY;

-- Enable RLS for time tracking
ALTER TABLE IF EXISTS time_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS time_estimates ENABLE ROW LEVEL SECURITY;

-- Enable RLS for wellness
ALTER TABLE IF EXISTS energy_tracking ENABLE ROW LEVEL SECURITY;

-- Enable RLS for family features
ALTER TABLE IF EXISTS parent_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS parent_updates ENABLE ROW LEVEL SECURITY;

-- Enable RLS for emergency
ALTER TABLE IF EXISTS emergency_contacts ENABLE ROW LEVEL SECURITY;

-- Enable RLS for analytics
ALTER TABLE IF EXISTS usage_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS message_analyses ENABLE ROW LEVEL SECURITY;

-- Enable RLS for achievements
ALTER TABLE IF EXISTS life_achievements ENABLE ROW LEVEL SECURITY;

-- Enable RLS for settings
ALTER TABLE IF EXISTS user_settings ENABLE ROW LEVEL SECURITY;

-- ===================================================================
-- 2. PROFILES TABLE POLICIES (uses 'id' as primary key)
-- ===================================================================

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;

-- Create new policies using 'id' column
CREATE POLICY "profiles_select_own" ON profiles
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON profiles
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles
    FOR UPDATE 
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- ===================================================================
-- 3. OTHER TABLES (assuming they use 'user_id' to reference profiles)
-- ===================================================================

-- EMOTIONAL CHECKINS POLICIES
DROP POLICY IF EXISTS "emotional_checkins_select_own" ON emotional_checkins;
DROP POLICY IF EXISTS "emotional_checkins_insert_own" ON emotional_checkins;
DROP POLICY IF EXISTS "emotional_checkins_update_own" ON emotional_checkins;

CREATE POLICY "emotional_checkins_select_own" ON emotional_checkins
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "emotional_checkins_insert_own" ON emotional_checkins
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "emotional_checkins_update_own" ON emotional_checkins
    FOR UPDATE 
    USING (
        auth.uid() = user_id 
        AND created_at > NOW() - INTERVAL '24 hours'
    )
    WITH CHECK (auth.uid() = user_id);

-- TIME SESSIONS POLICIES
DROP POLICY IF EXISTS "time_sessions_select_own" ON time_sessions;
DROP POLICY IF EXISTS "time_sessions_insert_own" ON time_sessions;
DROP POLICY IF EXISTS "time_sessions_update_own" ON time_sessions;

CREATE POLICY "time_sessions_select_own" ON time_sessions
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "time_sessions_insert_own" ON time_sessions
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "time_sessions_update_own" ON time_sessions
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- USER SETTINGS POLICIES
DROP POLICY IF EXISTS "user_settings_select_own" ON user_settings;
DROP POLICY IF EXISTS "user_settings_insert_own" ON user_settings;
DROP POLICY IF EXISTS "user_settings_update_own" ON user_settings;

CREATE POLICY "user_settings_select_own" ON user_settings
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "user_settings_insert_own" ON user_settings
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_settings_update_own" ON user_settings
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ENERGY TRACKING POLICIES
DROP POLICY IF EXISTS "energy_tracking_select_own" ON energy_tracking;
DROP POLICY IF EXISTS "energy_tracking_insert_own" ON energy_tracking;
DROP POLICY IF EXISTS "energy_tracking_update_own" ON energy_tracking;

CREATE POLICY "energy_tracking_select_own" ON energy_tracking
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "energy_tracking_insert_own" ON energy_tracking
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "energy_tracking_update_own" ON energy_tracking
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- EMERGENCY CONTACTS POLICIES
DROP POLICY IF EXISTS "emergency_contacts_select_own" ON emergency_contacts;
DROP POLICY IF EXISTS "emergency_contacts_insert_own" ON emergency_contacts;
DROP POLICY IF EXISTS "emergency_contacts_update_own" ON emergency_contacts;
DROP POLICY IF EXISTS "emergency_contacts_delete_own" ON emergency_contacts;

CREATE POLICY "emergency_contacts_select_own" ON emergency_contacts
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "emergency_contacts_insert_own" ON emergency_contacts
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "emergency_contacts_update_own" ON emergency_contacts
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "emergency_contacts_delete_own" ON emergency_contacts
    FOR DELETE 
    USING (auth.uid() = user_id);

-- USAGE ANALYTICS POLICIES
DROP POLICY IF EXISTS "usage_analytics_select_own" ON usage_analytics;
DROP POLICY IF EXISTS "usage_analytics_insert_system" ON usage_analytics;

CREATE POLICY "usage_analytics_select_own" ON usage_analytics
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "usage_analytics_insert_system" ON usage_analytics
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- POLICIES FOR OPTIONAL TABLES (only if they exist)
-- MESSAGE ANALYSES POLICIES
DROP POLICY IF EXISTS "message_analyses_select_own" ON message_analyses;
DROP POLICY IF EXISTS "message_analyses_insert_own" ON message_analyses;
DROP POLICY IF EXISTS "message_analyses_delete_own" ON message_analyses;

CREATE POLICY "message_analyses_select_own" ON message_analyses
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "message_analyses_insert_own" ON message_analyses
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "message_analyses_delete_own" ON message_analyses
    FOR DELETE 
    USING (auth.uid() = user_id);

-- EMOTION PATTERNS POLICIES
DROP POLICY IF EXISTS "emotion_patterns_select_own" ON emotion_patterns;
DROP POLICY IF EXISTS "emotion_patterns_insert_own" ON emotion_patterns;
DROP POLICY IF EXISTS "emotion_patterns_update_own" ON emotion_patterns;

CREATE POLICY "emotion_patterns_select_own" ON emotion_patterns
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "emotion_patterns_insert_own" ON emotion_patterns
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "emotion_patterns_update_own" ON emotion_patterns
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- TIME ESTIMATES POLICIES
DROP POLICY IF EXISTS "time_estimates_select_own" ON time_estimates;
DROP POLICY IF EXISTS "time_estimates_insert_own" ON time_estimates;
DROP POLICY IF EXISTS "time_estimates_update_own" ON time_estimates;

CREATE POLICY "time_estimates_select_own" ON time_estimates
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "time_estimates_insert_own" ON time_estimates
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "time_estimates_update_own" ON time_estimates
    FOR UPDATE 
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ===================================================================
-- 4. VERIFICATION QUERIES
-- ===================================================================

-- Check which tables have RLS enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    CASE 
        WHEN rowsecurity THEN '✅ RLS Enabled'
        ELSE '❌ RLS Disabled'
    END as status
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- Count policies per table
SELECT 
    t.tablename,
    COUNT(p.policyname) as policy_count,
    string_agg(p.policyname, ', ' ORDER BY p.policyname) as policies,
    CASE 
        WHEN COUNT(p.policyname) > 0 THEN '✅ Protected'
        ELSE '⚠️ No Policies'
    END as protection_status
FROM pg_tables t
LEFT JOIN pg_policies p ON t.tablename = p.tablename
WHERE t.schemaname = 'public'
GROUP BY t.tablename
ORDER BY policy_count DESC, t.tablename;

-- ===================================================================
-- SUMMARY
-- ===================================================================

/*
🛡️ CORRECTED RLS POLICIES APPLIED

✅ CORRECTED SCHEMA MAPPING:
• profiles table: Uses 'id' (UUID) as primary key
• Other tables: Use 'user_id' to reference profiles.id

✅ SECURITY FEATURES:
• Users can only access their own data
• 24-hour edit window for emotional check-ins
• Proper UUID comparisons
• Prevents data leakage between users

🔒 PROTECTION LEVELS:
• profiles - Core user data (id = auth.uid())
• emotional_checkins - Private emotional data
• time_sessions - Time tracking data
• user_settings - User preferences
• energy_tracking - Wellness data
• emergency_contacts - Crisis support data
• And all other tables with user_id references

🔍 VERIFICATION:
Run the verification queries above to confirm:
1. RLS is enabled on all tables
2. Policies are created correctly
3. Data access is properly restricted
*/ 