-- Create a function to safely update user info and onboarding status
CREATE OR REPLACE FUNCTION update_user_info(
  p_user_id UUID,
  p_user_role TEXT,
  p_linkedin_url TEXT,
  p_portfolio_url TEXT,
  p_roles TEXT[]
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update user info
  UPDATE users
  SET
    user_role = p_user_role,
    linkedin_url = p_linkedin_url,
    portfolio_url = p_portfolio_url,
    roles = p_roles,
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION update_user_info TO authenticated;