-- Create the storage bucket for profile avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('profiles', 'profiles', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for authenticated users
CREATE POLICY "Users can upload avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'profiles' AND 
    (storage.foldername(name))[1] = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[2]
);

CREATE POLICY "Users can view own avatars"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'profiles' AND
    auth.uid()::text = (storage.foldername(name))[2]
);

CREATE POLICY "Users can update own avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'profiles' AND
    auth.uid()::text = (storage.foldername(name))[2]
)
WITH CHECK (
    bucket_id = 'profiles' AND
    auth.uid()::text = (storage.foldername(name))[2]
);

CREATE POLICY "Users can delete own avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'profiles' AND
    auth.uid()::text = (storage.foldername(name))[2]
);