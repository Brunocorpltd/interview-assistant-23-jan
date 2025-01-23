/*
  # Fix user creation and onboarding flow

  1. Changes
    - Remove existing trigger and functions
    - Create new optimized user creation function
    - Add proper error handling for duplicates
  
  2. Security
    - Function runs with SECURITY DEFINER
    - Execute permission granted to authenticated users
*/

-- Drop existing objects
DROP TRIGGER IF EXISTS create_onboarding_after_user_insert ON users;
DROP FUNCTION IF EXISTS create_onboarding_record();
DROP FUNCTION IF EXISTS create_new_user(UUID, TEXT);

-- Create optimized user creation function
CREATE OR REPLACE FUNCTION create_new_user(
  p_user_id UUID,
  p_user_email TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into users table if not exists
  INSERT INTO users (id, email, created_at, updated_at)
  VALUES (p_user_id, p_user_email, NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;

  -- Insert into user_onboarding if not exists
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

  -- Commit the transaction
  COMMIT;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION create_new_user(UUID, TEXT) TO authenticated;