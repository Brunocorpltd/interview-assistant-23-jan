/*
  # Add update_user_info function
  
  1. New Functions
    - `update_user_info`: Updates user information and onboarding status
      - Parameters:
        - p_user_id (uuid)
        - p_user_role (text)
        - p_linkedin_url (text)
        - p_portfolio_url (text)
        - p_roles (text[])
*/

CREATE OR REPLACE FUNCTION public.update_user_info(
  p_user_id uuid,
  p_user_role text,
  p_linkedin_url text,
  p_portfolio_url text DEFAULT NULL,
  p_roles text[] DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Update user information
  UPDATE users 
  SET
    user_role = p_user_role,
    linkedin_url = p_linkedin_url,
    portfolio_url = p_portfolio_url,
    roles = p_roles,
    updated_at = now()
  WHERE id = p_user_id;

  -- Update onboarding status
  UPDATE user_onboarding
  SET
    user_info_completed = true,
    updated_at = now()
  WHERE user_id = p_user_id;
END;
$$;