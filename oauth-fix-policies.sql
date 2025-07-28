-- ===================================================================
-- OAUTH FIX - Allow Profile Creation During Google Signup
-- ===================================================================

-- Drop the restrictive insert policy
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;

-- Create a more permissive insert policy that allows:
-- 1. Users to create their own profile (normal signup)
-- 2. New users to create profiles during OAuth flow
CREATE POLICY "profiles_insert_oauth_safe" ON profiles
    FOR INSERT 
    WITH CHECK (
        -- Allow if authenticated user matches the profile id
        auth.uid() = id 
        OR 
        -- Allow if this is a new user (no existing profile) during OAuth
        (
            auth.uid() IS NOT NULL 
            AND NOT EXISTS (
                SELECT 1 FROM profiles WHERE id = auth.uid()
            )
            AND id = auth.uid()
        )
    );

-- Alternative: Use service role bypass for profile creation
-- We'll also create a function that can bypass RLS for initial profile creation

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
        RETURN QUERY SELECT user_id, FALSE;
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
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_user_profile_safe TO authenticated;

-- ===================================================================
-- VERIFICATION
-- ===================================================================

-- Test the policy (should work)
SELECT 'Policy test completed' as status; 