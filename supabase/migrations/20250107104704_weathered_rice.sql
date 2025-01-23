/*
  # Add update_onboarding_status function
  
  1. New Functions
    - `update_onboarding_status`: Updates user onboarding status
      - Parameters:
        - p_user_id (uuid)
        - p_user_info_completed (boolean)
        - p_cv_uploaded (boolean)
*/

CREATE OR REPLACE FUNCTION public.update_onboarding_status(
  p_user_id uuid,
  p_user_info_completed boolean DEFAULT NULL,
  p_cv_uploaded boolean DEFAULT NULL
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
    updated_at = now()
  WHERE user_id = p_user_id;
END;
$$;