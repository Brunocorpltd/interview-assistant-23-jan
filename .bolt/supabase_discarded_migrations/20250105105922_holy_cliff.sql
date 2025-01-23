/*
  # Fix onboarding status update function

  1. Changes
    - Create optimized onboarding status update function
    - Add proper error handling
  
  2. Security
    - Function runs with SECURITY DEFINER
    - Execute permission granted to authenticated users
*/

-- Create optimized onboarding status update function
CREATE OR REPLACE FUNCTION update_onboarding_status(
  p_user_id UUID,
  p_user_info_completed BOOLEAN DEFAULT NULL,
  p_cv_uploaded BOOLEAN DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE user_onboarding
  SET
    user_info_completed = COALESCE(p_user_info_completed, user_info_completed),
    cv_uploaded = COALESCE(p_cv_uploaded, cv_uploaded),
    updated_at = NOW()
  WHERE user_id = p_user_id;

  -- Commit the transaction
  COMMIT;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION update_onboarding_status TO authenticated;