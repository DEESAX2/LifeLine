import React, { useState } from 'react';
import video1 from '../assets/videos/video1.mp4';
import video2 from '../assets/videos/video2.mp4';
import video3 from '../assets/videos/video3.mp4';

const stories = [
  {
    id: 1,
    video: video1,
    title: 'Michael’s Lifesaving Gift',
    text: 'Michael donated blood for the first time last year; his pint helped a child undergoing surgery.'
  },
  {
    id: 2,
    video: video2,
    title: 'Eliana’s Recieving Blood from her Doctor',
    text: '"Eliana feels better ,after a stranger saved her life",Eliana’s mum'
  },
  {
    id: 3,
    video: video3,
    title: 'Survivor’s Thank-You',
    text: 'After a car accident, Dolly received 4 units of blood. “Strangers saved my life,” she says.'
  }
];

const StoryCard = ({ s, onOpen }) => (
  <button
    type="button"
    onClick={() => onOpen(s)}
    className="bg-white rounded shadow overflow-hidden focus:outline-none"
  >
    <video
      src={s.video}
      loop
      muted
      playsInline
      className="h-52 w-full object-cover"
      onMouseOver={(e) => e.target.play()}
      onMouseOut={(e) => e.target.pause()}
    />
    <div className="p-4 text-left">
      <h3 className="font-semibold text-red-600 mb-2">{s.title}</h3>
      <p className="text-gray-700 text-sm">{s.text}</p>
    </div>
  </button>
);

const StoriesSection = () => {
  const [active, setActive] = useState(null);

  const close = () => setActive(null);

  return (
    <section className="bg-white py-12 px-4" id="stories">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Donor & Recipient Stories</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((s) => (
            <StoryCard key={s.id} s={s} onOpen={setActive} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={close}
        >
          <div
            className="relative bg-black rounded max-w-lg w-full outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold focus:outline-none"
              onClick={close}
              aria-label="Close"
            >
              &times;
            </button>
            <video
              src={active.video}
              controls
              autoPlay
              className="w-full h-auto rounded-t"
            />
            <div className="p-4 bg-white rounded-b">
              <h3 className="font-semibold text-red-600 mb-1">{active.title}</h3>
              <p className="text-gray-700 text-sm">{active.text}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StoriesSection;
