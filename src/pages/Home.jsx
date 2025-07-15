import React, { useRef, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import FAQSection from '../components/FAQSection';
import BloodTypeCompatibility from '../components/BloodTypeCompatibility';
import UpcomingDrives from '../components/UpcomingDrives';
import StoriesSection from '../components/StoriesSection';
import CalloutSection from '../components/CalloutSection';
import NewsletterSection from '../components/NewsletterSection';
import PartnersSection from '../components/PartnersSection';
import PartnerSpotlight from '../components/PartnerSpotlight';
import EligibilitySection from '../components/EligibilitySection';
import Footer from '../components/Footer';
import heroVideo3 from '../assets/videos/video3.mp4';
import heroVideo1 from '../assets/videos/video6.mp4';
import heroVideo2 from '../assets/videos/video10.mp4';
import howImg from '../assets/Images/moment15.jpg';
import { useTranslation } from 'react-i18next';

// Typewriter component
const Typewriter = ({ texts, speed = 80, pause = 1200, className = "" }) => {
  const [displayed, setDisplayed] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (charIdx < texts[textIdx].length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + texts[textIdx][charIdx]);
        setCharIdx((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayed("");
        setCharIdx(0);
        setTextIdx((prev) => (prev + 1) % texts.length);
      }, pause);
      return () => clearTimeout(timeout);
    }
  }, [charIdx, textIdx, texts, speed, pause]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const HeroSection = () => {
  const { t } = useTranslation();
  const videos = [heroVideo1, heroVideo2, heroVideo3];
  const [videoIdx, setVideoIdx] = useState(0);
  const videoRef = useRef(null);

  // Swap video source every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIdx((prev) => (prev + 1) % videos.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [videos.length]);

  // Restart playback whenever src changes
  useEffect(() => {
    if (videoRef.current) {
      const v = videoRef.current;
      v.pause();
      v.load();
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {/* ignore autoplay block */});
      }
    }
  }, [videoIdx]);
  return (
    <section
      id="hero"
      className="relative pt-24 px-6 pb-20 flex flex-col items-center justify-center text-center text-white overflow-hidden min-h-screen"
    >
      {/* Background Video (auto-swapping) */}
      <video
        ref={videoRef}
        key={videoIdx}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videos[videoIdx]} type="video/mp4" />
      </video>
      {/* Red overlay */}
      <div className="absolute inset-0 bg-red-00 opacity-30 z-10"></div>
      <div className="relative z-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-red-600">
          <Typewriter
            texts={[ t('slogan1'), t('slogan2'), t('slogan3'), t('slogan4') ]}
            speed={80}
            pause={1400}
          />
        </h1>
        {/* <p className="text-lg md:text-xl mb-6 text-black font-semibold ">{t('heroSubtitle')}</p> */}
        <div className="flex gap-4 justify-center">
          <button onClick={() => (window.location.href = '/donate')} className="bg-red-100 text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-white transition duration-300 ">{t('Donate Blood Now')}
          </button>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const { t } = useTranslation();
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [counts, setCounts] = React.useState({ lives: 0, hospitals: 0, donors: 0 });

  // targets for the counts
  const targets = { lives: 500, hospitals: 50, donors: 1000 };

  // observe visibility
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // animate numbers when visible
  React.useEffect(() => {
    if (!visible) return;
    const stepTime = 20; // ms per increment
    const increments = {
      lives: Math.ceil(targets.lives / 100),
      hospitals: Math.ceil(targets.hospitals / 100),
      donors: Math.ceil(targets.donors / 100),
    };
    const interval = setInterval(() => {
      setCounts(prev => {
        const next = { ...prev };
        let done = true;
        for (const key of Object.keys(targets)) {
          if (prev[key] < targets[key]) {
            next[key] = Math.min(prev[key] + increments[key], targets[key]);
            done = false;
          }
        }
        if (done) clearInterval(interval);
        return next;
      });
    }, stepTime);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-r from-red-50 via-white to-blue-50 py-20 px-6 text-center"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col items-center transform transition-all duration-700 ease-out" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}>
          <h2 className="text-5xl md:text-6xl font-bold text-red-600 drop-shadow-lg">
            {counts.lives}+
          </h2>
          <p className="mt-3 text-gray-800 text-lg font-medium">
            {t('livesSaved')}
          </p>
        </div>
        <div className="flex flex-col items-center transform transition-all duration-700 ease-out delay-100" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}>
          <h2 className="text-5xl md:text-6xl font-bold text-blue-600 drop-shadow-lg">
            {counts.hospitals}+
          </h2>
          <p className="mt-3 text-gray-800 text-lg font-medium">
            {t('partnerHospitals')}
          </p>
        </div>
        <div className="flex flex-col items-center transform transition-all duration-700 ease-out delay-200" style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)' }}>
          <h2 className="text-5xl md:text-6xl font-bold text-green-600 drop-shadow-lg">
            {counts.donors}+
          </h2>
          <p className="mt-3 text-gray-800 text-lg font-medium">
            {t('activeDonors')}
          </p>
        </div>
      </div>
    </section>
  );
};


// ✅ Donation Moments Carousel
const DonationMoments = () => {
  const { t } = useTranslation();
  // Define the filenames of the images to show (mix of JPG & PNG)
  const images = [
    'moment18.png',
    'moment2.jpg',
    'moment3.jpg',
    'moment17.png',
    'moment5.jpg',
    'moment16.png',
    'moment7.jpg',
    'moment8.jpg',
    'moment17.png',
    'moment16.png' // newly-added image replacing the old tenth item
  ];
  const scrollRef = useRef(null);


  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const speed = 1;
    const interval = setInterval(() => {
      container.scrollLeft += speed;
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">{t('donationMoments')}</h2>
      <div ref={scrollRef} className="overflow-hidden whitespace-nowrap px-4">
        <div className="flex gap-4">
          {images.map((file, idx) => (
          <img
  key={idx}
  src={new URL(`../assets/Images/${file}`, import.meta.url).href}
  alt={`Donation moment ${idx + 1}`}
  className="h-60 w-80 object-cover rounded shadow-md flex-shrink-0"/>
          ))}
        </div>
      </div>
    </section>
  );
};

const UrgentRequestSection = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-red-600 text-white text-center py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-3xl font-semibold mb-4 flex justify-center items-center gap-2">
          <span>⚠</span> <span>{t('urgentNeedHeading')}</span>
        </div>
        <p className="mb-6">
          
          
          
          {t('urgentNeedDesc')}</p>
        <button
          onClick={() => (window.location.href = '/blood-requests')}
          className="bg-white text-red-600 px-6 py-2 rounded-md font-semibold hover:bg-red-100 transition duration-300"
        >
          {t('viewAllBloodRequests')}
        </button>
      </div>
    </section>
  );
};

// ✅ How Donation Works Section with slide-in animation
const HowDonationWorksSection = () => {
  const { t } = useTranslation();
  // Observe when the section is in viewport
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div
          className={`flex-1 text-gray-800 transform transition-all duration-1000 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
        >
          <h2 className="text-3xl font-bold text-red-600 mb-8">{t('howDonationWorks')}</h2>
          <ol className="space-y-4 list-decimal list-inside text-gray-700">
            <li>
                <span className="font-semibold text-gray-900">{t('registration')}</span>
                <p className="mt-1">{t('registrationDesc')}</p>
              </li>
              <li>
                <span className="font-semibold text-gray-900">{t('healthScreening')}</span>
                <p className="mt-1">{t('healthScreeningDesc')}</p>
              </li>
              <li>
                <span className="font-semibold text-gray-900">{t('bloodDonation')}</span>
                <p className="mt-1">{t('bloodDonationDesc')}</p>
              </li>
              <li>
                <span className="font-semibold text-gray-900">{t('restRefreshments')}</span>
                <p className="mt-1">{t('restRefreshmentsDesc')}</p>
              </li>
            </ol>
          <div className="mt-6">
            <a href="/donate">
              <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-300 font-semibold">
                {t('startDonationJourney')}
              </button>
            </a>
          </div>
        </div>
        <div
          className={`flex-1 transform transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
        >
          <img src={howImg} alt="Donation process" className="rounded shadow-md w-full max-w-xs object-cover mx-auto" />
        </div>
      </div>
    </section>
  );
};

// ✅ Testimonial Section
const TestimonialSection = () => {
  const { t } = useTranslation();
  const sectionRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={sectionRef} className="bg-white py-12 px-4 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-8">{t('whatDonorsAreSaying')}</h2>
      <div className={`max-w-4xl mx-auto grid gap-8 md:grid-cols-3 transform transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="bg-gray-100 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “{t('testimonialQuote1')}”
          </p>
          <p className="mt-4 font-semibold text-red-500">—{t('testimonialAuthor1')}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “{t('testimonialQuote2')}”
          </p>
          <p className="mt-4 font-semibold text-red-500">—{t('testimonialAuthor2')}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “{t('testimonialQuote3')}”
          </p>
          <p className="mt-4 font-semibold text-red-500">—{t('testimonialAuthor3')}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “{t('testimonialQuote3')}”
          </p>
          <p className="mt-4 font-semibold text-red-500">—{t('testimonialAuthor4')}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “{t('testimonialQuote3')}”
          </p>
          <p className="mt-4 font-semibold text-red-500">—{t('testimonialAuthor5')}</p>
        </div>
        <div className="bg-gray-100 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “{t('testimonialQuote3')}”
          </p>
          <p className="mt-4 font-semibold text-red-500">—{t('testimonialAuthor6')}</p>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 pt-20">
        <HeroSection />
        <StatsSection />
        <DonationMoments /> 
        <UrgentRequestSection />
        <HowDonationWorksSection />
        <FAQSection />
        <BloodTypeCompatibility />
        <EligibilitySection />
        <UpcomingDrives />
        <StoriesSection />
        <CalloutSection />
        <NewsletterSection />
        <PartnerSpotlight />
        <PartnersSection />
        <TestimonialSection /> 
      </main>

      <Footer />
    </div>
  );
};

export default Home;