-- Drop existing functions to recreate them in the correct order
DROP FUNCTION IF EXISTS create_new_user(UUID, TEXT);
DROP FUNCTION IF EXISTS get_onboarding_status(UUID);

-- Create an improved user creation function that handles the entire flow
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
  -- First create the user record
  INSERT INTO users (
    id,
    email,
    created_at,
    updated_at
  )
  VALUES (
    p_user_id,
    p_user_email,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    updated_at = NOW();

  -- Then create the onboarding record
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

-- Create an improved onboarding status function
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
  -- First ensure the user exists
  INSERT INTO users (id, email, created_at, updated_at)
  VALUES (p_user_id, '', NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;

  -- Then ensure onboarding record exists
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

  -- Return the status
  RETURN QUERY
  SELECT 
    uo.user_info_completed,
    uo.cv_uploaded
  FROM user_onboarding uo
  WHERE uo.user_id = p_user_id;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION create_new_user(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_onboarding_status(UUID) TO authenticated;