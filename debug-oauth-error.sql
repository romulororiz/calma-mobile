-- ===================================================================
-- DEBUG OAUTH DATABASE ERROR
-- Find what's blocking server-side user creation during OAuth
-- ===================================================================

-- 1. Check if there are any triggers on auth.users table
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement,
    action_timing
FROM information_schema.triggers 
WHERE event_object_schema = 'auth' 
   OR trigger_name ILIKE '%profile%' 
   OR trigger_name ILIKE '%user%';

-- 2. Check for any functions that might be called on user creation
SELECT 
    routine_name,
    routine_type,
    routine_definition
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND (routine_name ILIKE '%user%' OR routine_name ILIKE '%profile%' OR routine_name ILIKE '%auth%')
ORDER BY routine_name;

-- 3. Check RLS policies on auth schema (if accessible)
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE schemaname = 'auth' OR tablename ILIKE '%user%';

-- 4. Look for any custom auth hooks or triggers
SELECT 
    p.proname as function_name,
    p.prosrc as function_body
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
  AND (p.prosrc ILIKE '%auth.uid%' OR p.prosrc ILIKE '%profiles%' OR p.prosrc ILIKE '%insert%');

-- 5. Check for automatic profile creation triggers
SELECT 
    t.tgname as trigger_name,
    c.relname as table_name,
    p.proname as function_name,
    p.prosrc as function_code
FROM pg_trigger t
JOIN pg_class c ON t.tgrelid = c.oid
JOIN pg_proc p ON t.tgfoid = p.oid
WHERE c.relname = 'users' 
   OR p.prosrc ILIKE '%profiles%'
   OR t.tgname ILIKE '%profile%';

-- 6. Show current policies on profiles table
SELECT 
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- 7. Check if there are any constraints that might be failing
SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    tc.constraint_type,
    tc.is_deferrable,
    tc.initially_deferred
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
WHERE tc.table_name = 'profiles' 
   OR tc.table_name = 'users';

-- 8. Look for any automatic user profile creation setup
\echo 'Checking for automatic profile creation triggers...' 