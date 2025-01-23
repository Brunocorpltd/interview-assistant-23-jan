/*
  # Update interviews table schema
  
  1. Changes
    - Add cv_id column for CV reference
    - Add job description columns
    - Add interview type column
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to interviews table
ALTER TABLE interviews
ADD COLUMN IF NOT EXISTS cv_id text,
ADD COLUMN IF NOT EXISTS job_description_link text,
ADD COLUMN IF NOT EXISTS job_description_text text,
ADD COLUMN IF NOT EXISTS type text;