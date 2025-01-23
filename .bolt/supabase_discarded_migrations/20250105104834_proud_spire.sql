-- Create a function to safely update onboarding status
CREATE OR REPLACE FUNCTION update_onboarding_status(
  p_user_id UUID,
  p_user_info_completed BOOLEAN DEFAULT NULL,
  p_cv_uploaded BOOLEAN DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE user_onboarding
  SET
    user_info_completed = COALESCE(p_user_info_completed, user_info_completed),
    cv_uploaded = COALESCE(p_cv_uploaded, cv_uploaded),
    updated_at = NOW()
  WHERE user_id = p_user_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_onboarding_status(UUID, BOOLEAN, BOOLEAN) TO authenticated;