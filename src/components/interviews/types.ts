export interface Interview {
  id: string;
  type: string;
  date: string;
  role: string;
  company: string;
  status: 'analyze' | 'activate';
}

export interface InterviewTypeProps {
  type: string;
}

export interface ActionButtonProps {
  status: 'analyze' | 'activate';
  onClick: () => void;
}

export interface PaginationButtonProps {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}