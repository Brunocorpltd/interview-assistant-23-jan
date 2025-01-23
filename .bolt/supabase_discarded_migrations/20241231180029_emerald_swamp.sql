/*
  # Update users table policies

  1. Changes
    - Drop existing policies
    - Add insert policy for authenticated users
    - Add service role policy
  
  2. Security
    - Maintains RLS on users table
    - Adds policy for new user creation
    - Adds service role access
*/

-- Drop existing policies if they exist
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can read own data" ON users;
  DROP POLICY IF EXISTS "Users can update own data" ON users;
  DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;
  DROP POLICY IF EXISTS "Service role can manage all" ON users;
END $$;

-- Recreate all policies
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

CREATE POLICY "Enable insert for authenticated users only"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can manage all"
  ON users
  TO service_role
  USING (true)
  WITH CHECK (true);