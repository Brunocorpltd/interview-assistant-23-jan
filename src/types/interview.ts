export interface InterviewDetails {
  company: string;
  cv: string;
  jobDescriptionLink?: string;
  jobDescriptionText?: string;
  interviewType: string;
}

export interface InterviewFormData extends InterviewDetails {
  id?: string;
  userId?: string;
  status?: 'draft' | 'scheduled' | 'completed';
  created_at?: string;
  updated_at?: string;
}