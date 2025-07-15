import React from 'react';

const Preloader = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-red-100 z-50 space-y-4">
   
   

    {/* Drop fill */}
    <div className="w-12 h-12 relative">
      <svg viewBox="0 0 24 24" className="w-full h-full text-red-600">
        <path fill="currentColor" d="M12 2C8.1 7.6 4 11.3 4 15.5 4 19.1 7.1 22 11 22s7-2.9 7-6.5C18 11.3 13.9 7.6 12 2z" opacity="0.3" />
        <clipPath id="dropClip">
          <path d="M12 2C8.1 7.6 4 11.3 4 15.5 4 19.1 7.1 22 11 22s7-2.9 7-6.5C18 11.3 13.9 7.6 12 2z" />
        </clipPath>
        <rect className="animate-fill" clipPath="url(#dropClip)" y="0" x="0" width="24" height="24" fill="currentColor" />
      </svg>
    </div>

    <span className="text-red-600 font-semibold tracking-wider">Lifeline Is Loading,Please Wait…</span>
  </div>
);

export default Preloader;
