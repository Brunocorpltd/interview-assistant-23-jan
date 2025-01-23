/*
  # Create user onboarding tracking table

  1. New Tables
    - `user_onboarding`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users.id)
      - `user_info_completed` (boolean)
      - `cv_uploaded` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS on `user_onboarding` table
    - Add policies for authenticated users to manage their own onboarding data
*/

CREATE TABLE IF NOT EXISTS user_onboarding (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  user_info_completed boolean DEFAULT false,
  cv_uploaded boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own onboarding data"
  ON user_onboarding
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);