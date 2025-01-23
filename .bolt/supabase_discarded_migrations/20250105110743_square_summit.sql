-- Drop existing functions
DROP FUNCTION IF EXISTS update_user_info(UUID, TEXT, TEXT, TEXT, TEXT[]);
DROP FUNCTION IF EXISTS update_onboarding_status(UUID, BOOLEAN, BOOLEAN);

-- Recreate update_user_info without explicit transaction control
CREATE OR REPLACE FUNCTION update_user_info(
  p_user_id UUID,
  p_user_role TEXT,
  p_linkedin_url TEXT,
  p_portfolio_url TEXT DEFAULT NULL,
  p_roles TEXT[] DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update user info
  UPDATE users
  SET
    user_role = p_user_role,
    linkedin_url = p_linkedin_url,
    portfolio_url = COALESCE(p_portfolio_url, portfolio_url),
    roles = COALESCE(p_roles, roles),
    updated_at = NOW()
  WHERE id = p_user_id;

  -- Update onboarding status
  UPDATE user_onboarding
  SET
    user_info_completed = true,
    updated_at = NOW()
  WHERE user_id = p_user_id;
END;
$$;

-- Recreate update_onboarding_status without explicit transaction control
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
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION update_user_info TO authenticated;
GRANT EXECUTE ON FUNCTION update_onboarding_status TO authenticated;