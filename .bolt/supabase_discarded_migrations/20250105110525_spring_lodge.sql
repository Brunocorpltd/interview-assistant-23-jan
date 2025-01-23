-- Drop existing functions to recreate them with improved error handling
DROP FUNCTION IF EXISTS create_new_user(UUID, TEXT);
DROP FUNCTION IF EXISTS get_onboarding_status(UUID);

-- Create an improved user creation function with better error handling
CREATE OR REPLACE FUNCTION create_new_user(
  p_user_id UUID,
  p_user_email TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Check if user already exists
  SELECT COUNT(*) INTO v_count FROM users WHERE id = p_user_id;
  
  IF v_count = 0 THEN
    -- Create user record
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
    );
  END IF;

  -- Check if onboarding record exists
  SELECT COUNT(*) INTO v_count FROM user_onboarding WHERE user_id = p_user_id;
  
  IF v_count = 0 THEN
    -- Create onboarding record
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
    );
  END IF;
END;
$$;

-- Create an improved onboarding status function with better error handling
CREATE OR REPLACE FUNCTION get_onboarding_status(p_user_id UUID)
RETURNS TABLE (
  user_info_completed BOOLEAN,
  cv_uploaded BOOLEAN
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Check if user exists
  SELECT COUNT(*) INTO v_count FROM users WHERE id = p_user_id;
  
  IF v_count = 0 THEN
    -- Create user record if it doesn't exist
    INSERT INTO users (id, email, created_at, updated_at)
    VALUES (p_user_id, '', NOW(), NOW());
  END IF;

  -- Check if onboarding record exists
  SELECT COUNT(*) INTO v_count FROM user_onboarding WHERE user_id = p_user_id;
  
  IF v_count = 0 THEN
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
    );
  END IF;

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