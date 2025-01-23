import { supabase } from './supabase';

export async function createUserProfile(userId: string, email: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('initialize_user', {
      p_user_id: userId,
      p_email: email
    });

    // Only throw if it's not a duplicate key error
    if (error && !error.message?.includes('duplicate key')) {
      console.error('Error initializing user:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in createUserProfile:', error);
    throw error;
  }
}