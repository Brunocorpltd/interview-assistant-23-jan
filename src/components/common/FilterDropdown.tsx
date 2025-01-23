import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const FilterDropdown = ({ label, options, value, onChange }: FilterDropdownProps) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent"
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
);

export default FilterDropdown;