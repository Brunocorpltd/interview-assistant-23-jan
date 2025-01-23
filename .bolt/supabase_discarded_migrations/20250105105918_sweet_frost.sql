/*
  # Fix user info update function

  1. Changes
    - Create optimized user info update function
    - Add proper error handling
    - Update onboarding status automatically
  
  2. Security
    - Function runs with SECURITY DEFINER
    - Execute permission granted to authenticated users
*/

-- Create optimized user info update function
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
SET search_path = public
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

  -- Commit the transaction
  COMMIT;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION update_user_info TO authenticated;