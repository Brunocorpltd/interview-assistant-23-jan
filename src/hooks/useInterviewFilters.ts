import { useState, useMemo } from 'react';
import { mockInterviews } from '../data/mockInterviews';

export const useInterviewFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');

  // Get unique values for each filter
  const filters = useMemo(() => {
    const types = Array.from(new Set(mockInterviews.map(interview => interview.type)));
    const roles = Array.from(new Set(mockInterviews.map(interview => interview.role)));
    const companies = Array.from(new Set(mockInterviews.map(interview => interview.company)));

    return {
      types,
      roles,
      companies
    };
  }, []);

  // Filter interviews based on selected criteria
  const filteredInterviews = useMemo(() => {
    return mockInterviews.filter(interview => {
      const matchesSearch = !searchQuery || 
        interview.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        interview.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'All' || interview.type === selectedType;
      const matchesRole = selectedRole === 'All' || interview.role === selectedRole;
      const matchesCompany = selectedCompany === 'All' || interview.company === selectedCompany;

      return matchesSearch && matchesType && matchesRole && matchesCompany;
    });
  }, [searchQuery, selectedType, selectedRole, selectedCompany]);

  return {
    filters,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    selectedRole,
    setSelectedRole,
    selectedCompany,
    setSelectedCompany,
    filteredInterviews
  };
};