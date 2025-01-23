/*
  # Create documents table and functions
  
  1. Tables
    - Create documents table for storing document metadata
    - Enable RLS policies for secure access
  
  2. Functions
    - Add function to manage document creation
*/

-- Create documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id),
  type text NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own documents"
  ON public.documents
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create documents"
  ON public.documents
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
  ON public.documents
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents"
  ON public.documents
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to manage document creation
CREATE OR REPLACE FUNCTION public.create_document(
  p_user_id uuid,
  p_type text,
  p_name text,
  p_url text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_document_id uuid;
BEGIN
  -- Insert document
  INSERT INTO documents (
    user_id,
    type,
    name,
    url,
    created_at,
    updated_at
  ) VALUES (
    p_user_id,
    p_type,
    p_name,
    p_url,
    now(),
    now()
  )
  RETURNING id INTO v_document_id;

  -- Update onboarding status if it's a CV
  IF p_type = 'cv' THEN
    UPDATE user_onboarding
    SET
      cv_uploaded = true,
      updated_at = now()
    WHERE user_id = p_user_id;
  END IF;

  RETURN v_document_id;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION public.create_document TO authenticated;