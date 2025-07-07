import React, { useEffect, useState } from 'react';
import video10 from '../assets/videos/video10.mp4';
import video5 from '../assets/videos/video5.mp4';
import video9 from '../assets/videos/video9.mp4'
import video7 from '../assets/videos/video7.mp4';
import video8 from '../assets/videos/video8.mp4';
import hosp1 from '../assets/Images/hosp1.png';
import hosp2 from '../assets/Images/hosp2.png';
import hosp3 from '../assets/Images/hosp3.png';
import hosp4 from '../assets/Images/hosp4.png';

const items = [
  { id: 1, video: video10, logo: hosp1, name: 'Korle Bu Teaching Hospital' },
  { id: 1, video: video9, logo: hosp3, name: '37 Military Hospital' },
  { id: 2, video: video5, logo: hosp2, name: 'Komfo Anokye Hospital' },
  { id: 3, video: video7, logo: hosp3, name: '37 Military Hospital' },
  { id: 4, video: video8, logo: hosp4, name: 'UNESCO' },
];

const PartnerSpotlight = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % items.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const { video, logo, name } = items[current];

  return (
    <section className="relative bg-white-100 text-white mb-4" id="partner-spotlight">
      <video
        key={current} 
        src={video}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-100 object-contain"
      />
      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img src={logo} alt={name} className="h-20 w-auto mb-3 drop-shadow-lg" />
        <h3 className="text-2xl text-black font-semibold text-center px-4">{name}</h3>
      </div>
    </section>
  );
};

export default PartnerSpotlight;
