/*
  # Create documents table

  1. New Tables
    - `documents`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - References users.id
      - `type` (text) - Document type (CV/JD/QA)
      - `name` (text) - Original filename
      - `url` (text) - Storage URL
      - `role` (text) - Associated job role
      - `company` (text) - Associated company (for JDs)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on documents table
    - Add policies for users to manage their own documents
*/

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  type text NOT NULL,
  name text NOT NULL,
  url text NOT NULL,
  role text,
  company text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own documents"
  ON documents
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON documents
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents"
  ON documents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);