import { supabase } from '../lib/supabase';

export async function checkOnboardingStatus(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('user_onboarding')
      .select('user_info_completed, cv_uploaded')
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    return data.user_info_completed && data.cv_uploaded;
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
}

export async function updateOnboardingStatus(
  userId: string,
  updates: {
    user_info_completed?: boolean;
    cv_uploaded?: boolean;
  }
): Promise<void> {
  try {
    const { error } = await supabase.rpc('update_onboarding_status', {
      p_user_id: userId,
      p_user_info_completed: updates.user_info_completed,
      p_cv_uploaded: updates.cv_uploaded
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating onboarding status:', error);
    throw error;
  }
}