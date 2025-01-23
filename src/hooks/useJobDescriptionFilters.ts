import { useState, useMemo } from 'react';
import { mockJobDescriptions } from '../data/mockJobDescriptions';

export const useJobDescriptionFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');

  // Get unique values for each filter
  const filters = useMemo(() => {
    const dates = Array.from(new Set(mockJobDescriptions.map(jd => jd.date)));
    const roles = Array.from(new Set(mockJobDescriptions.map(jd => jd.role)));
    const companies = Array.from(new Set(mockJobDescriptions.map(jd => jd.company)));

    return {
      dates,
      roles,
      companies
    };
  }, []);

  // Filter job descriptions based on selected criteria
  const filteredJobDescriptions = useMemo(() => {
    return mockJobDescriptions.filter(jd => {
      const matchesSearch = !searchQuery || 
        jd.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        jd.role.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate = selectedDate === 'All' || jd.date === selectedDate;
      const matchesRole = selectedRole === 'All' || jd.role === selectedRole;
      const matchesCompany = selectedCompany === 'All' || jd.company === selectedCompany;

      return matchesSearch && matchesDate && matchesRole && matchesCompany;
    });
  }, [searchQuery, selectedDate, selectedRole, selectedCompany]);

  return {
    filters,
    searchQuery,
    setSearchQuery,
    selectedDate,
    setSelectedDate,
    selectedRole,
    setSelectedRole,
    selectedCompany,
    setSelectedCompany,
    filteredJobDescriptions
  };
};