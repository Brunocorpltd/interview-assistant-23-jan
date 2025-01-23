/*
  # Create users table

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Maps to auth.users.id
      - `email` (text, unique) - User's email address
      - `first_name` (text) - User's first name
      - `last_name` (text) - User's last name
      - `created_at` (timestamptz) - When the user was created
      - `updated_at` (timestamptz) - When the user was last updated

  2. Security
    - Enable RLS on users table
    - Add policy for users to read/update their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);