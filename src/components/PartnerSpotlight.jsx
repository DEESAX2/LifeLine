import React, { useEffect, useRef, useState } from 'react';
import hosp1 from '../assets/Images/hosp1.png';
import hosp2 from '../assets/Images/hosp2.png';
import hosp3 from '../assets/Images/hosp3.png';
import hosp4 from '../assets/Images/hosp4.png';

// Add a name for each logo in the same order
const logos = [
  { src: hosp1, name: "Korle Bu Teaching Hospital" },
  { src: hosp2, name: "Mest Africa" },
  { src: hosp3, name: "Master Card Foundation" },
  { src: hosp4, name: "Cape Coast Teaching Hospital" }
];

const PartnerSpotlight = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [logoIndex, setLogoIndex] = useState(0);
  const sectionRef = useRef(null);

  // Intersection Observer to play video when in view
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowVideo(true);

      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Logo carousel logic
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % logos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

 // ...existing code...
  return (
    <section
      className="bg-white text-white mb-12 mt-12 flex flex-col items-center relative"
      id="partner-spotlight"
      ref={sectionRef}
      style={{ minHeight: '360px', width: '100%' }}
    >
      {/* Title - now outside the video, as a section header */}
      {/* <h2 className="text-3xl font-bold text-red-600 z-20 drop-shadow mt-8 mb-4">
        Partners Spotlight
      </h2> */}
      <div className="absolute inset-0 w-full h-full">
        {showVideo && (
          <iframe
            className="w-full h-full rounded-none"
            src="https://www.youtube.com/embed/cL0VNNnGmQ0?start=32&autoplay=1&mute=1&loop=1&playlist=cL0VNNnGmQ0"
            title="Partner Spotlight Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ height: '100%', width: '100%' }}
          />
        )}
      </div>
      {/* Logos overlayed on the video */}
      <div
        className="absolute bottom-59 left-1/2 transform -translate-x-1/2 flex flex-col items-center bg-white bg-opacity-80 rounded px-4 py-2 shadow"
        style={{ minHeight: 80, zIndex: 2 }}
      >
        <img
          src={logos[logoIndex].src}
          alt={`Partner logo ${logoIndex + 1}`}
          className="h-20 w-auto object-contain transition-opacity duration-500"
          style={{ maxWidth: 180 }}
        />
        <span className="mt-2 text-black font-semibold text-center text-base">
          {logos[logoIndex].name}
        </span>
      </div>
      {/* Spacer to keep section height */}
      <div style={{ visibility: 'hidden', height: '660px', width: '100%' }} />
    </section>
  );
};

export default PartnerSpotlight;