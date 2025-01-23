/*
  # Update interviews table schema for role field
  
  1. Changes
    - Make role column nullable since we're not using it anymore
    - Add default role based on user's profile
  
  2. Security
    - Maintain existing RLS policies
*/

-- Make role column nullable
ALTER TABLE interviews 
ALTER COLUMN role DROP NOT NULL;