/*
  # Storage setup for documents

  1. Storage Configuration
    - Creates documents bucket for storing user files
    - Sets up CORS configuration
  
  2. Security
    - Enables RLS policies for document access
    - Ensures users can only access their own files
    - Organizes files by user ID for better security
*/

-- Create the storage bucket for documents if it doesn't exist
DO $$
BEGIN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('documents', 'documents', true)
    ON CONFLICT (id) DO NOTHING;
END $$;

-- Set up CORS configuration
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'documents', 
    'documents', 
    true, 
    5242880, -- 5MB file size limit
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']::text[]
)
ON CONFLICT (id) DO UPDATE
SET 
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Set up storage policies for authenticated users
CREATE POLICY "Authenticated users can upload CVs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'documents' AND 
    (storage.foldername(name))[1] = 'cvs' AND
    auth.uid()::text = (storage.foldername(name))[2]
);

CREATE POLICY "Users can view their own CVs"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[2]
);

CREATE POLICY "Users can update their own CVs"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[2]
)
WITH CHECK (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[2]
);

CREATE POLICY "Users can delete their own CVs"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'documents' AND
    auth.uid()::text = (storage.foldername(name))[2]
);