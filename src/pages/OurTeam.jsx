import React from 'react';
import hosp1 from '../assets/Images/hosp1.png';
import hosp2 from '../assets/Images/hosp2.png';
import hosp3 from '../assets/Images/hosp3.png';
import hosp4 from '../assets/Images/hosp4.png';
import hosp5 from '../assets/Images/hosp5.png';
import hosp6 from '../assets/Images/hosp6.png';
import { HiArrowLeft } from 'react-icons/hi';

const members = [
  { img: hosp1, name: 'Dr. Kwame Mensah', role: 'Chief Medical Officer' },
  { img: hosp2, name: 'Dr. Ama Boateng', role: 'Head of Surgery' },
  { img: hosp3, name: 'Nurse John Doe', role: 'Lead Nurse' },
  { img: hosp4, name: 'Sarah Owusu', role: 'Lab Scientist' },
  { img: hosp5, name: 'Michael Brown', role: 'Blood Bank Manager' },
  { img: hosp6, name: 'Linda Chen', role: 'Community Outreach' },
];

const OurTeam = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-b from-red-50 to-white">
      <h1 className="text-3xl md:text-5xl text-center font-bold text-red-600 mb-12 animate-fadeInUp">
        Our Dedicated Team
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {members.map((m, i) => (
          <div
            key={i}
            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 animate-fadeInUp"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <img
              src={m.img}
              alt={m.name}
              className="w-full h-72 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                {m.name}
              </h3>
              <p className="text-gray-500 mt-1">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Back to Home Arrow */}
      <a
        href="/"
        className="fixed bottom-6 left-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition transform hover:-translate-y-1"
      >
        <HiArrowLeft className="w-5 h-5" />
      </a>
    </div>
  );
};

export default OurTeam;
