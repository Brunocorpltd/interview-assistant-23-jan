import { supabase } from './supabase';

export async function uploadCV(file: File, userId: string): Promise<string> {
  try {
    // Validate file size (15MB limit)
    if (file.size > 15 * 1024 * 1024) {
      throw new Error('File size must be less than 15MB');
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('File must be a PDF or Word document');
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `${userId}/cvs/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw new Error(uploadError.message);
    }

    if (!data?.path) {
      throw new Error('Upload successful but path is missing');
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadCV:', error);
    throw error;
  }
}