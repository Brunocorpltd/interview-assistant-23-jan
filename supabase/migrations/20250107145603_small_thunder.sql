/*
  # Create upcoming interviews table

  1. New Tables
    - `upcoming_interviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `role` (text)
      - `company` (text) 
      - `interview_date` (timestamptz)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage their interviews
*/

CREATE TABLE IF NOT EXISTS public.upcoming_interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  interview_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.upcoming_interviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own upcoming interviews"
  ON public.upcoming_interviews
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create upcoming interviews"
  ON public.upcoming_interviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own upcoming interviews"
  ON public.upcoming_interviews
  FOR UPDATE
  USING (auth.uid() = user_id);