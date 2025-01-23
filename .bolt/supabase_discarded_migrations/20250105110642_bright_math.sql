-- Drop existing function to recreate with correct parameters
DROP FUNCTION IF EXISTS update_user_info(UUID, TEXT, TEXT, TEXT, TEXT[]);

-- Create improved user info update function with proper parameter handling
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

  -- Commit the transaction
  COMMIT;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION update_user_info TO authenticated;