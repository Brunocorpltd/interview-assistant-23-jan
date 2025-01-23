-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can upload avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can view own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own avatars" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own avatars" ON storage.objects;

-- Create improved storage policies for authenticated users
CREATE POLICY "Users can upload avatars"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'profiles' AND 
    (storage.foldername(name))[1] = 'avatars'
);

CREATE POLICY "Users can view avatars"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'profiles' AND
    (storage.foldername(name))[1] = 'avatars'
);

CREATE POLICY "Users can update avatars"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
    bucket_id = 'profiles' AND
    (storage.foldername(name))[1] = 'avatars'
);

CREATE POLICY "Users can delete avatars"
ON storage.objects
FOR DELETE
TO authenticated
USING (
    bucket_id = 'profiles' AND
    (storage.foldername(name))[1] = 'avatars'
);

-- Add policy for users table avatar_url updates
CREATE POLICY "Users can update own avatar_url"
ON users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);