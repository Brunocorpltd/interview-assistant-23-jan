import React from 'react';

const Testimonial = () => {
  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="text-xl text-gray-800 italic">
        "InterviewBee was a lifesaver during my live interview. It provided critical notes when I faced the toughest product sense question, helping me structure my thoughts on the spot. I wouldn't have cleared the round without it!"
      </div>
      <div className="flex items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=60&h=60"
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-medium">Samantha Lee</div>
          <div className="text-gray-600 text-sm">Product Manager</div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;