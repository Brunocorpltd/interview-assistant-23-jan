/*
  # Database Functions
  
  1. Functions
    - `get_onboarding_status`: Retrieves user's onboarding progress
  
  2. Security
    - SECURITY DEFINER ensures function runs with owner privileges
    - Explicit search path prevents search path injection
*/

-- Create get_onboarding_status function
CREATE OR REPLACE FUNCTION public.get_onboarding_status(p_user_id uuid)
RETURNS TABLE (
  user_info_completed boolean,
  cv_uploaded boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    uo.user_info_completed,
    uo.cv_uploaded
  FROM user_onboarding uo
  WHERE uo.user_id = p_user_id;
END;
$$;