/*
  # Add Interviews Table

  1. New Tables
    - `interviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `company` (text)
      - `type` (text)
      - `cv_id` (uuid, foreign key to documents)
      - `job_description_link` (text)
      - `job_description_text` (text)
      - `role` (text)
      - `status` (text)
      - `date` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `interviews` table
    - Add policies for authenticated users to manage their own interviews
*/

-- Create interviews table
CREATE TABLE IF NOT EXISTS public.interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) NOT NULL,
  company text NOT NULL,
  type text NOT NULL,
  cv_id uuid REFERENCES public.documents(id),
  job_description_link text,
  job_description_text text,
  role text,
  status text NOT NULL DEFAULT 'draft',
  date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own interviews"
  ON public.interviews
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own interviews"
  ON public.interviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interviews"
  ON public.interviews
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own interviews"
  ON public.interviews
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to save interview details
CREATE OR REPLACE FUNCTION public.save_interview_details(
  p_user_id uuid,
  p_company text,
  p_type text,
  p_cv_id uuid,
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
    p_cv_id,
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

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.save_interview_details TO authenticated;