/*
  # Fix onboarding flow and database functions

  1. Changes
    - Add proper cascading for user_onboarding records
    - Add functions for user initialization and onboarding status
    - Update RLS policies with proper checks for duplicates

  2. Security
    - Enable RLS on all tables
    - Add proper policies for user access
*/

-- Ensure proper cascading for user_onboarding
ALTER TABLE user_onboarding
DROP CONSTRAINT IF EXISTS user_onboarding_user_id_fkey,
ADD CONSTRAINT user_onboarding_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES users(id) 
  ON DELETE CASCADE;

-- Create a function to initialize user data
CREATE OR REPLACE FUNCTION initialize_user(
  p_user_id UUID,
  p_email TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create user record if it doesn't exist
  INSERT INTO users (id, email, created_at, updated_at)
  VALUES (p_user_id, p_email, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;

  -- Create onboarding record if it doesn't exist
  INSERT INTO user_onboarding (
    user_id,
    user_info_completed,
    cv_uploaded,
    created_at,
    updated_at
  )
  VALUES (
    p_user_id,
    false,
    false,
    NOW(),
    NOW()
  )
  ON CONFLICT (user_id) DO NOTHING;
END;
$$;

-- Create a function to safely get onboarding status
CREATE OR REPLACE FUNCTION get_onboarding_status(p_user_id UUID)
RETURNS TABLE (
  user_info_completed BOOLEAN,
  cv_uploaded BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Initialize user data if needed
  PERFORM initialize_user(p_user_id, '');

  RETURN QUERY
  SELECT 
    uo.user_info_completed,
    uo.cv_uploaded
  FROM user_onboarding uo
  WHERE uo.user_id = p_user_id;
END;
$$;

-- Update RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can read own onboarding status" ON user_onboarding;
DROP POLICY IF EXISTS "Users can update own onboarding status" ON user_onboarding;

-- Users table policies
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- User onboarding policies
CREATE POLICY "Users can read own onboarding status"
  ON user_onboarding FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding status"
  ON user_onboarding FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Grant permissions
GRANT EXECUTE ON FUNCTION initialize_user TO authenticated;
GRANT EXECUTE ON FUNCTION get_onboarding_status TO authenticated;