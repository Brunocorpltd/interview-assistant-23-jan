import { supabase } from './supabase';
import { InterviewDetails } from '../types/interview';

export async function saveInterviewDetails(
  userId: string, 
  details: InterviewDetails
): Promise<void> {
  try {
    // Convert empty string to null for UUID field
    const cvId = details.cv ? details.cv : null;

    const { error } = await supabase.rpc('save_interview_details', {
      p_user_id: userId,
      p_company: details.company,
      p_type: details.interviewType,
      p_cv_id: cvId,
      p_job_description_link: details.jobDescriptionLink || null,
      p_job_description_text: details.jobDescriptionText || null
    });

    if (error) {
      console.error('Error saving interview details:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in saveInterviewDetails:', error);
    throw error;
  }
}