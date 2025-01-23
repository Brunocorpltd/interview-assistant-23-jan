/*
  # Fix Interview Save Function

  1. Changes
    - Make cv_id parameter optional in save_interview_details function
    - Add proper NULL handling for UUID parameter
*/

CREATE OR REPLACE FUNCTION public.save_interview_details(
  p_user_id uuid,
  p_company text,
  p_type text,
  p_cv_id uuid DEFAULT NULL,
  p_job_description_link text DEFAULT NULL,
  p_job_description_text text DEFAULT NULL,
  p_role text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_interview_id uuid;
BEGIN
  INSERT INTO interviews (
    user_id,
    company,
    type,
    cv_id,
    job_description_link,
    job_description_text,
    role,
    status,
    date,
    created_at,
    updated_at
  ) VALUES (
    p_user_id,
    p_company,
    p_type,
    p_cv_id,  -- Now properly handles NULL
    p_job_description_link,
    p_job_description_text,
    p_role,
    'draft',
    now(),
    now(),
    now()
  )
  RETURNING id INTO v_interview_id;

  RETURN v_interview_id;
END;
$$;