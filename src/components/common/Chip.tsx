import React from 'react';
import { X } from 'lucide-react';

interface ChipProps {
  label: string;
  onRemove: () => void;
}

export default function Chip({ label, onRemove }: ChipProps) {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#FFF8EE] border border-[#F5B544] rounded-full">
      <span className="text-sm text-[#F5B544] font-medium">{label}</span>
      <div
        role="button"
        tabIndex={0}
        onClick={onRemove}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onRemove();
          }
        }}
        className="p-0.5 hover:bg-[#F5B544] hover:text-white rounded-full transition-colors cursor-pointer"
      >
        <X className="w-3 h-3" />
      </div>
    </div>
  );
}