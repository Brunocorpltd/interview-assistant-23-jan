import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import Chip from './Chip';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  maxSelections?: number;
  placeholder?: string;
  error?: boolean;
}

export default function MultiSelectDropdown({
  options,
  value,
  onChange,
  maxSelections = 3,
  placeholder = 'Select options',
  error = false
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else if (value.length < maxSelections) {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue));
  };

  const isOptionDisabled = (optionValue: string) => 
    !value.includes(optionValue) && value.length >= maxSelections;

  const selectedOptions = options.filter(option => value.includes(option.value));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 bg-white border rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-[#F5B544] focus:border-transparent ${
          error ? 'border-red-300' : 'border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {selectedOptions.length > 0 ? (
              selectedOptions.map(option => (
                <Chip
                  key={option.value}
                  label={option.label}
                  onRemove={() => handleRemove(option.value)}
                />
              ))
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option.value)}
              disabled={isOptionDisabled(option.value)}
              className={`w-full px-4 py-2 text-left flex items-center gap-2 ${
                isOptionDisabled(option.value)
                  ? 'opacity-50 cursor-not-allowed bg-gray-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className={`w-4 h-4 border rounded flex items-center justify-center ${
                value.includes(option.value)
                  ? 'border-[#F5B544] bg-[#F5B544]'
                  : 'border-gray-300'
              }`}>
                {value.includes(option.value) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <span className={value.includes(option.value) ? 'text-[#F5B544] font-medium' : ''}>
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}