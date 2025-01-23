import React from 'react';

export default function PlatformIcons() {
  return (
    <div className="flex items-center gap-3 mt-2">
      <img 
        src="https://www.gstatic.com/meet/google_meet_horizontal_wordmark_2020q4_1x_icon_124_40_2373e79660dabbf194273d27aa7ee1f5.png"
        alt="Google Meet"
        className="h-5 w-auto object-contain"
        style={{ maxWidth: '80px' }}
      />
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/2203px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png"
        alt="Microsoft Teams"
        className="h-5 w-auto object-contain"
        style={{ maxWidth: '80px' }}
      />
      <img 
        src="https://download.logo.wine/logo/Zoom_Video_Communications/Zoom_Video_Communications-Logo.wine.png"
        alt="Zoom"
        className="h-5 w-auto object-contain"
        style={{ maxWidth: '80px' }}
      />
      <span className="text-sm text-gray-600">and others</span>
    </div>
  );
}