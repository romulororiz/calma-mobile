-- ===================================================================
-- FIX DATABASE CONSTRAINTS - ALLOW ONBOARDING DATA
-- ===================================================================

-- 1. Drop existing check constraints that are too restrictive
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_energy_pattern_check;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_adhd_type_check;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_notification_style_check;
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_focus_preference_check;

-- 2. Add proper check constraints with correct values from onboarding flow
ALTER TABLE profiles ADD CONSTRAINT profiles_adhd_type_check 
    CHECK (adhd_type IS NULL OR adhd_type IN ('hyperactive', 'inattentive', 'combined', 'not-sure'));

ALTER TABLE profiles ADD CONSTRAINT profiles_notification_style_check 
    CHECK (notification_style IS NULL OR notification_style IN ('gentle', 'energetic', 'silent'));

ALTER TABLE profiles ADD CONSTRAINT profiles_energy_pattern_check 
    CHECK (energy_pattern IS NULL OR energy_pattern IN ('morning', 'night', 'varies'));

ALTER TABLE profiles ADD CONSTRAINT profiles_focus_preference_check 
    CHECK (focus_preference IS NULL OR focus_preference IN ('single', 'multiple', 'depends'));

-- 3. Verify the table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
ORDER BY ordinal_position;

-- 4. Show current constraints (compatible with newer PostgreSQL)
SELECT 
    conname as constraint_name, 
    contype as constraint_type,
    CASE 
        WHEN contype = 'c' THEN pg_get_constraintdef(oid)
        ELSE 'Not a check constraint'
    END as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'profiles'::regclass;

SELECT 'Database constraints fixed for onboarding' as status; 