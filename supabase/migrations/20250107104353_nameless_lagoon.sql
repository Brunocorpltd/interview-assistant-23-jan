/*
  # Initial Schema Setup
  
  1. Tables
    - `users`: Core user profile data
    - `user_onboarding`: Tracks onboarding progress
  
  2. Security
    - RLS enabled on all tables
    - Basic access policies
*/

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY,
  email text NOT NULL,
  first_name text,
  last_name text,
  linkedin_url text,
  portfolio_url text,
  user_role text,
  roles text[],
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_onboarding table
CREATE TABLE IF NOT EXISTS public.user_onboarding (
  user_id uuid PRIMARY KEY,
  user_info_completed boolean DEFAULT false,
  cv_uploaded boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_onboarding ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Users can read own onboarding status" ON public.user_onboarding;
DROP POLICY IF EXISTS "Users can update own onboarding status" ON public.user_onboarding;

-- Create policies
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own onboarding status" ON public.user_onboarding
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own onboarding status" ON public.user_onboarding
  FOR UPDATE USING (auth.uid() = user_id);