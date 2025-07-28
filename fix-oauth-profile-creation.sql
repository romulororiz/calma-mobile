-- ===================================================================
-- FIX OAUTH PROFILE CREATION - FINAL SOLUTION
-- ===================================================================

-- 1. Temporarily disable RLS for profiles to allow profile creation
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 2. Drop all existing conflicting policies
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_oauth_safe" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_allow_all_temporarily" ON profiles;

-- 3. Create or replace the safe profile creation function
CREATE OR REPLACE FUNCTION public.create_user_profile_safe(
    user_id UUID,
    user_email TEXT,
    user_full_name TEXT DEFAULT NULL
)
RETURNS TABLE(profile_id UUID, success BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Check if profile already exists
    IF EXISTS (SELECT 1 FROM profiles WHERE id = user_id) THEN
        RETURN QUERY SELECT user_id, TRUE; -- Return success if already exists
        RETURN;
    END IF;

    -- Insert new profile (bypasses RLS because of SECURITY DEFINER)
    INSERT INTO profiles (
        id,
        email,
        full_name,
        avatar_url,
        onboarding_completed,
        onboarding_completed_at,
        adhd_type,
        notification_style,
        energy_pattern,
        focus_preference,
        selected_goal,
        preferences,
        created_at,
        updated_at
    ) VALUES (
        user_id,
        user_email,
        user_full_name,
        NULL,
        FALSE,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        '{"notifications": true, "darkMode": false, "reminders": true, "accessibility": false}'::jsonb,
        NOW(),
        NOW()
    );

    RETURN QUERY SELECT user_id, TRUE;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error and return false
        RAISE WARNING 'Failed to create profile for user %: %', user_id, SQLERRM;
        RETURN QUERY SELECT user_id, FALSE;
END;
$$;

-- 4. Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_user_profile_safe TO authenticated;

-- 5. Re-enable RLS with proper policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 6. Create proper RLS policies
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

-- 7. Test the setup
SELECT 'OAuth profile creation setup complete' as status;

-- 8. Show current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies 
WHERE tablename = 'profiles'; 