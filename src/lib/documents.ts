import { supabase } from './supabase';
import { Database } from '../types/supabase';
import { CVDocument } from '../types/documents';

export async function fetchUserCVs(userId: string): Promise<CVDocument[]> {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .eq('type', 'cv')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user CVs:', error);
      throw error;
    }

    return data as CVDocument[];
  } catch (error) {
    console.error('Error in fetchUserCVs:', error);
    throw error;
  }
}

export async function createCVDocument(userId: string, cvPath: string, fileName: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('create_document', {
      p_user_id: userId,
      p_type: 'cv',
      p_name: fileName,
      p_url: cvPath
    });

    if (error) {
      console.error('Error creating CV document:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in createCVDocument:', error);
    throw error;
  }
}

export async function deleteCVDocument(id: string): Promise<string> {
  try {
    const { data, error: fetchError } = await supabase
      .from('documents')
      .select('url')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching CV document:', fetchError);
      throw fetchError;
    }

    if (!data?.url) {
      throw new Error('CV URL not found');
    }

    const { error: deleteError } = await supabase
      .from('documents')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting CV document:', deleteError);
      throw deleteError;
    }

    return data.url;
  } catch (error) {
    console.error('Error in deleteCVDocument:', error);
    throw error;
  }
}