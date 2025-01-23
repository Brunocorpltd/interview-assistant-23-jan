/*
  # Create interviews table

  1. New Tables
    - `interviews`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - References users.id
      - `company` (text) - Company name
      - `role` (text) - Job role
      - `type` (text) - Interview type (Mock/Live)
      - `status` (text) - Interview status
      - `date` (timestamptz) - Interview date
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on interviews table
    - Add policies for users to manage their own interviews
*/

CREATE TABLE IF NOT EXISTS interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  company text NOT NULL,
  role text NOT NULL,
  type text NOT NULL,
  status text NOT NULL,
  date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own interviews"
  ON interviews
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interviews"
  ON interviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interviews"
  ON interviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);