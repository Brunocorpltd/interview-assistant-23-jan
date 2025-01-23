interface UserInfoData {
  selectedRoles: string[];
  linkedinUrl: string;
  portfolioUrl: string;
}

export function validateUserInfo(data: UserInfoData): string | null {
  if (data.selectedRoles.length === 0) {
    return 'Please select at least one role';
  }

  if (!data.linkedinUrl) {
    return 'LinkedIn profile URL is required';
  }

  try {
    const linkedinUrl = new URL(data.linkedinUrl);
    if (!linkedinUrl.hostname.includes('linkedin.com')) {
      return 'Please enter a valid LinkedIn URL';
    }
  } catch {
    return 'Please enter a valid LinkedIn URL';
  }

  if (data.portfolioUrl) {
    try {
      new URL(data.portfolioUrl);
    } catch {
      return 'Please enter a valid portfolio URL';
    }
  }

  return null;
}