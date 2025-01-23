import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ExternalLink } from 'lucide-react';

interface ScheduleFormProps {
  onBack: () => void;
}

const ScheduleForm = ({ onBack }: ScheduleFormProps) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/interview-prep');
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-gray-900 font-medium mb-4">
          Connect calendar to fetch your interview slot
        </label>
        <div className="space-y-3">
          <CalendarOption
            icon="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg"
            name="Google Calendar"
          />
          <CalendarOption
            icon="https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Calendar_Icon.png"
            name="Apple Calendar"
          />
          <CalendarOption
            icon="https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg"
            name="Outlook Calendar"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-gray-900 font-medium">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-[#F5B544] focus:ring-[#F5B544]"
          />
          Allow Bees to schedule a reminder on your calendar
        </label>
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg font-medium"
        >
          ← Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-[#F5B544] text-black rounded-lg font-medium"
        >
          Submit →
        </button>
      </div>
    </div>
  );
};

interface CalendarOptionProps {
  icon: string;
  name: string;
}

const CalendarOption = ({ icon, name }: CalendarOptionProps) => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
    <div className="flex items-center gap-3">
      <img src={icon} alt={name} className="w-6 h-6" />
      <span className="font-medium">{name}</span>
    </div>
    <button className="text-[#6366F1] font-medium flex items-center gap-1">
      Connect
      <ExternalLink className="w-4 h-4" />
    </button>
  </div>
);

export default ScheduleForm;