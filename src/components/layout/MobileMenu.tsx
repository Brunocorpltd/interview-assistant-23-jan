import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      {isOpen ? (
        <X className="w-6 h-6 text-gray-700" />
      ) : (
        <Menu className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
}