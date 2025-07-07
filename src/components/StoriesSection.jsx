import React from 'react';
import donor1 from '../assets/Images/moment2.jpg';
import donor2 from '../assets/Images/moment5.jpg';
import donor3 from '../assets/Images/moment7.jpg';

const stories = [
  {
    id: 1,
    img: donor1,
    title: 'Ama’s Lifesaving Gift',
    text: 'Ama donated blood for the first time last year; her pint helped a child undergoing surgery.'
  },
  {
    id: 2,
    img: donor2,
    title: 'Kwesi’s Fifth Donation',
    text: 'Regular donor Kwesi encourages his friends to join after seeing the impact of repeat donations.'
  },
  {
    id: 3,
    img: donor3,
    title: 'Survivor’s Thank-You',
    text: 'After a car accident, Nana received 4 units of blood. “Strangers saved my life,” he says.'
  }
];

const StoryCard = ({ s }) => (
  <div className="bg-white rounded shadow overflow-hidden">
    <img src={s.img} alt={s.title} className="h-52 w-full object-cover" />
    <div className="p-4">
      <h3 className="font-semibold text-red-600 mb-2">{s.title}</h3>
      <p className="text-gray-700 text-sm">{s.text}</p>
    </div>
  </div>
);

const StoriesSection = () => (
  <section className="bg-white py-12 px-4" id="stories">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Donor & Recipient Stories</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <StoryCard key={s.id} s={s} />
        ))}
      </div>
    </div>
  </section>
);

export default StoriesSection;
