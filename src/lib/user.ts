import { supabase } from './supabase';

interface UserInfoData {
  currentRole: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  roles?: string[];
}

export async function updateUserInfo(userId: string, data: UserInfoData): Promise<void> {
  try {
    const { error } = await supabase.rpc('update_user_info', {
      p_user_id: userId,
      p_user_role: data.currentRole,
      p_linkedin_url: data.linkedinUrl,
      p_portfolio_url: data.portfolioUrl,
      p_roles: data.roles
    });

    if (error) {
      console.error('Error updating user info:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateUserInfo:', error);
    throw error;
  }
}