import React from 'react';
import ram from '../assets/Images/ram.png';
import earl from '../assets/Images/earl.png';
import esther from '../assets/Images/esther.jpg';
import des from '../assets/Images/des.png';
import liz from '../assets/Images/liz.png';
import team1 from '../assets/Images/team1.jpg';
import { HiArrowLeft } from 'react-icons/hi';

const members = [
  { img: ram, name: 'Ms. Rahmat Atitola', role: 'Supervisor' },
  { img: earl, name: 'Mr. Earl Osafo', role: 'Frontend Developer' },
  { img: esther, name: 'Ms. Esther Manor', role: 'Frontend Developer' },
  { img: des, name: 'Mr. Desmond Kponyo', role: 'Backend Developer' },
  { img: liz, name: 'Ms. Elizabeth Harrison', role: 'Frontend Developer' },
  { img: team1, name: 'Ms. Sandra Allotey', role: 'Frontend Developer' },
];

const OurTeam = () => {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-b from-white via-red-50 to-white">
      <h1 className="text-3xl md:text-5xl text-center font-bold text-red-600 mb-12 animate-slideUp transition-opacity duration-1000">
        MEET THE TEAM
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {members.map((m, i) => (
          <div
            key={i}
            className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-500 border border-gray-100 hover:border-red-400 animate-fadeUp"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <img
              src={m.img}
              alt={m.name}
              className="w-full h-100 object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-4 text-center bg-white z-10 relative">
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
        className="fixed bottom-6 left-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition transform hover:-translate-y-1 animate-bounce"
      >
        <HiArrowLeft className="w-5 h-5" />
      </a>
    </div>
  );
};

export default OurTeam;
