import React from 'react';
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

const PartnersSection = () => (
  <section className="bg-gray-100 py-12 px-4 " id="partners">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-8">Partner Hospitals & Sponsors</h2>
      <div className="flex flex-wrap justify-center gap-8 items-center">
        {partners.map((p) => (
          <img key={p.id} src={p.img} alt={p.name} className="h-24 transition" />
        ))}
      </div>
    </div>
  </section>
);

export default PartnersSection;
