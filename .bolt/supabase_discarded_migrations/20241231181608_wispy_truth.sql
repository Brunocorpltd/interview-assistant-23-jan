/*
  # Add user profile fields

  1. Changes
    - Add LinkedIn URL field for storing user's LinkedIn profile
    - Add portfolio URL field for storing user's personal website
    - Add user role field for storing current role
    - Add roles array field for storing multiple role selections
  
  2. Security
    - Maintains existing RLS policies
*/

DO $$ 
BEGIN
  -- Add LinkedIn URL column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'linkedin_url') 
  THEN
    ALTER TABLE users ADD COLUMN linkedin_url text;
  END IF;

  -- Add portfolio URL column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'portfolio_url') 
  THEN
    ALTER TABLE users ADD COLUMN portfolio_url text;
  END IF;

  -- Add user role column if it doesn't exist (using user_role instead of current_role to avoid reserved keyword)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'user_role') 
  THEN
    ALTER TABLE users ADD COLUMN user_role text;
  END IF;

  -- Add roles array column if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' AND column_name = 'roles') 
  THEN
    ALTER TABLE users ADD COLUMN roles text[] DEFAULT ARRAY[]::text[];
  END IF;
END $$;