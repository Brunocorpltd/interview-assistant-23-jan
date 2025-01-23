/*
  # Add avatar URL support
  
  1. Changes
    - Add avatar_url column to users table
    - Add avatar_url to Database types
*/

-- Add avatar_url column to users table if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'avatar_url'
  ) THEN
    ALTER TABLE users ADD COLUMN avatar_url text;
  END IF;
END $$;