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
  -- First ensure the user has an onboarding record
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

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_onboarding_status TO authenticated;