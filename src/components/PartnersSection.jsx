import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import hosp1 from '../assets/Images/hosp1.png';
import hosp2 from '../assets/Images/hosp2.png';
import hosp3 from '../assets/Images/hosp3.png';
import hosp4 from '../assets/Images/hosp4.png';
import hosp5 from '../assets/Images/hosp5.png';
import hosp6 from '../assets/Images/hosp6.png';
import hosp7 from '../assets/Images/hosp7.png';



const partners = [
  { id: 1, img: hosp1, name: 'Korle Bu' },
  { id: 2, img: hosp2, name: 'Komfo Anokye' },
  { id: 3, img: hosp3, name: '37 Military' },
  { id: 4, img: hosp4, name: 'Unesco' },
  { id: 5, img: hosp5, name: 'Ridge Hospital' },
  { id: 6, img: hosp6, name: 'St Joseph' },
  { id: 7, img: hosp7, name: 'St Joseph' },

];

const PartnersSection = () => {
  const { t } = useTranslation();
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const speed = 1; // px per tick
    const interval = setInterval(() => {
      container.scrollLeft += speed;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);



  /* Removed unused auto-advance state */

  return (
  <section className="bg-gray-100 py-12 px-4 " id="partners">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-8">{t('partnerHospitalsSponsors')}</h2>
      {/* Horizontal scrolling logo carousel */}
      <div ref={scrollRef} className="overflow-hidden w-full max-w-5xl mx-auto px-4">
        <div className="flex gap-4 items-center">
          {[...partners, ...partners].map((p, idx) => (
            <img
              key={`${p.id}-${idx}`}
              src={p.img}
              alt={p.name}
              className="h-24 w-auto object-contain flex-shrink-0 basis-1/5"
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);
};

export default PartnersSection;
