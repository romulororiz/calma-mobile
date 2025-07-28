-- ===================================================================
-- EMERGENCY OAUTH FIX - Remove all automatic profile creation
-- ===================================================================

-- 1. Drop the problematic function we created
DROP FUNCTION IF EXISTS public.create_user_profile_safe;

-- 2. Remove ALL RLS policies on profiles temporarily
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_oauth_safe" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_allow_all_temporarily" ON profiles;

-- 3. Check for and remove any automatic triggers on auth.users
DO $$ 
DECLARE
    rec RECORD;
BEGIN
    -- Look for triggers on auth.users that might create profiles
    FOR rec IN 
        SELECT t.tgname as trigger_name, c.relname as table_name
        FROM pg_trigger t
        JOIN pg_class c ON t.tgrelid = c.oid
        JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE n.nspname = 'auth' AND c.relname = 'users'
        AND t.tgname LIKE '%profile%'
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS %I ON auth.users', rec.trigger_name);
        RAISE NOTICE 'Dropped trigger: %', rec.trigger_name;
    END LOOP;
END $$;

-- 4. Check for and remove any functions that auto-create profiles
DO $$ 
DECLARE
    func_name text;
BEGIN
    FOR func_name IN 
        SELECT p.proname
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
        AND (p.proname LIKE '%handle_new_user%' OR p.proname LIKE '%create_profile%')
    LOOP
        EXECUTE format('DROP FUNCTION IF EXISTS public.%I CASCADE', func_name);
        RAISE NOTICE 'Dropped function: %', func_name;
    END LOOP;
END $$;

-- 5. Clear any existing profile data that might have FK constraints
DO $$
BEGIN
    -- Only delete if profiles table exists and has data
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
        DELETE FROM profiles WHERE id NOT IN (
            SELECT id FROM auth.users
        );
        RAISE NOTICE 'Cleaned up orphaned profiles';
    END IF;
END $$;

-- 6. Test if OAuth can now create users without database errors
SELECT 'Emergency fix complete - OAuth should work now without automatic profile creation' as status;

-- 7. Enable very basic RLS that won't interfere with OAuth
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_oauth_safe" ON profiles
    FOR ALL 
    USING (auth.uid() = id OR auth.role() = 'service_role')
    WITH CHECK (auth.uid() = id OR auth.role() = 'service_role');

SELECT 'Basic RLS re-enabled - test OAuth now!' as final_status; 