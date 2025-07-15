import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import video1 from '../assets/videos/video1.mp4';
import video2 from '../assets/videos/video2.mp4';
import video3 from '../assets/videos/video3.mp4';

// base stories with translation keys
const baseStories = [
  {
    id: 1,
    video: video1,
    title: 'story1Title',
    text: 'story1Text'
  },
  {
    id: 2,
    video: video2,
    title: 'story2Title',
    text: 'story2Text'
  },
  {
    id: 3,
    video: video3,
    title: 'story3Title',
    text: 'story3Text'
  }
];

const StoryCard = ({ s, onOpen }) => {
  const { t } = useTranslation();
  return (
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
      <h3 className="font-semibold text-red-600 mb-2">{t(s.title)}</h3>
      <p className="text-gray-700 text-sm">{t(s.text)}</p>
    </div>
  </button>
  );
};

const StoriesSection = () => {
  const { t } = useTranslation();
  const stories = baseStories;
  const [active, setActive] = useState(null);
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const close = () => setActive(null);

  return (
    <section ref={sectionRef} className="bg-white py-12 px-4" id="stories">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">{t('donorRecipientStories')}</h2>
        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transform transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
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
