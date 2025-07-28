-- ===================================================================
-- QUICK OAUTH FIX - CORRECTED SYNTAX
-- ===================================================================

-- First, let's completely remove RLS from profiles table temporarily to test
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_oauth_safe" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;

-- Check if there's an automatic profile creation trigger
DO $$ 
DECLARE
    trigger_exists boolean;
    trigger_name text;
BEGIN
    SELECT EXISTS (
        SELECT 1 FROM pg_trigger t
        JOIN pg_class c ON t.tgrelid = c.oid
        JOIN pg_proc p ON t.tgfoid = p.oid
        WHERE c.relname = 'users' 
        AND p.prosrc ILIKE '%profiles%'
    ) INTO trigger_exists;
    
    IF trigger_exists THEN
        RAISE NOTICE 'Found automatic profile creation trigger - this might be the issue';
    ELSE
        RAISE NOTICE 'No automatic profile triggers found';
    END IF;
END $$;

-- Look for any handle_new_user function (common Supabase pattern)
SELECT 
    p.proname as function_name,
    'EXISTS' as status
FROM pg_proc p
WHERE p.proname = 'handle_new_user';

-- Temporarily disable any handle_new_user trigger if it exists
DO $$ 
DECLARE
    trigger_exists boolean;
BEGIN
    -- Check if trigger exists first
    SELECT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'on_auth_user_created'
    ) INTO trigger_exists;
    
    IF trigger_exists THEN
        -- Disable the trigger
        EXECUTE 'ALTER TABLE auth.users DISABLE TRIGGER on_auth_user_created';
        RAISE NOTICE 'Disabled automatic profile creation trigger';
    ELSE
        RAISE NOTICE 'No on_auth_user_created trigger found';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Could not disable trigger (might not exist or no permission): %', SQLERRM;
END $$;

-- Test OAuth flow without RLS and automatic triggers
SELECT 'OAuth blocking mechanisms temporarily disabled - test Google signup now' as status;

-- Re-enable RLS with a very permissive policy for testing
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create a very permissive policy for testing
CREATE POLICY "profiles_allow_all_temporarily" ON profiles
    FOR ALL 
    USING (true)
    WITH CHECK (true);

SELECT 'Temporary permissive RLS policy created for testing' as final_status; 