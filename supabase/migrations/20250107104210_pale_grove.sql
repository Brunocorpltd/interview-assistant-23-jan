/*
  # Create initialize_user function
  
  1. New Function
    - `initialize_user`: Creates initial user records when a new user signs up
      - Creates user profile in users table
      - Creates onboarding status record
      - Parameters:
        - p_user_id (uuid): The user's auth.uid
        - p_email (text): The user's email address

  2. Security
    - Function is accessible to authenticated users only
*/

-- Create initialize_user function
CREATE OR REPLACE FUNCTION public.initialize_user(
  p_user_id uuid,
  p_email text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert into users table
  INSERT INTO users (
    id,
    email,
    created_at,
    updated_at
  ) VALUES (
    p_user_id,
    p_email,
    now(),
    now()
  ) ON CONFLICT (id) DO NOTHING;

  -- Insert into user_onboarding table
  INSERT INTO user_onboarding (
    user_id,
    user_info_completed,
    cv_uploaded,
    created_at,
    updated_at
  ) VALUES (
    p_user_id,
    false,
    false,
    now(),
    now()
  ) ON CONFLICT (user_id) DO NOTHING;
END;
$$;