import { useState, useMemo } from 'react';
import { mockInterviewQA } from '../data/mockInterviewQA';

export const useInterviewQAFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  // Get unique values for each filter
  const filters = useMemo(() => {
    const dates = Array.from(new Set(mockInterviewQA.map(qa => qa.date)));
    const roles = Array.from(new Set(mockInterviewQA.map(qa => qa.role)));
    const types = Array.from(new Set(mockInterviewQA.map(qa => qa.type)));

    return {
      dates,
      roles,
      types
    };
  }, []);

  // Filter interview Q&As based on selected criteria
  const filteredInterviewQA = useMemo(() => {
    return mockInterviewQA.filter(qa => {
      const matchesSearch = !searchQuery || 
        qa.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        qa.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDate = selectedDate === 'All' || qa.date === selectedDate;
      const matchesRole = selectedRole === 'All' || qa.role === selectedRole;
      const matchesType = selectedType === 'All' || qa.type === selectedType;

      return matchesSearch && matchesDate && matchesRole && matchesType;
    });
  }, [searchQuery, selectedDate, selectedRole, selectedType]);

  return {
    filters,
    searchQuery,
    setSearchQuery,
    selectedDate,
    setSelectedDate,
    selectedRole,
    setSelectedRole,
    selectedType,
    setSelectedType,
    filteredInterviewQA
  };
};