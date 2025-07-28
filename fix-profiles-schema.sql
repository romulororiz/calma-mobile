-- Add missing preferences column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{"notifications": true, "darkMode": false, "reminders": true, "accessibility": false}'::jsonb;

-- Verify the column was added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND column_name = 'preferences';

SELECT 'Preferences column added successfully!' as status; 