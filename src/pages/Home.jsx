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
import heroVideo from '../assets/videos/video6.mp4';
import howImg from '../assets/Images/moment15.jpg';

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
  return (
    <section
      id="hero"
      className="relative pt-24 px-6 pb-20 flex flex-col items-center justify-center text-center text-white overflow-hidden min-h-screen"
    >
      {/* Background Video */}
      <video src={heroVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0"/>
      {/* Red overlay */}
      <div className="absolute inset-0 bg-red-300 opacity-30 z-10"></div>
      <div className="relative z-20 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-red-600">
          <Typewriter
            texts={[ "Save Lives with LifeLine", "Tap a vein, save a life"
      , "Donate Blood, Share Hope", "Your Blood Can Save Lives"]}
            speed={80}
            pause={1400}
          />
        </h1>
        <p className="text-lg md:text-xl mb-6"> Connecting voluntary blood donors to hospitals across Ghana.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={() => (window.location.href = '/donate')} className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-red-100 transition duration-300">Donate Blood Now
          </button>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="bg-white py-18 px-6 text-center grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h2 className="text-4xl font-bold text-red-600">500+</h2>
        <p className="mt-2 text-gray-700">Lives Saved</p>
      </div>
      <div>
        <h2 className="text-4xl font-bold text-blue-600">50+</h2>
        <p className="mt-2 text-gray-700">Partner Hospitals</p>
      </div>
      <div>
        <h2 className="text-4xl font-bold text-green-600">1000+</h2>
        <p className="mt-2 text-gray-700">Active Donors</p>
      </div>
    </section>
  );
};

// ✅ Donation Moments Carousel
const DonationMoments = () => {
  const imageNumbers = Array.from({ length: 10 }, (_, i) => i + 1);
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
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Donation Moments</h2>
      <div ref={scrollRef} className="overflow-hidden whitespace-nowrap px-4">
        <div className="flex gap-4">
          {imageNumbers.map((num) => (
          <img
  key={num}
  src={new URL(`../assets/Images/moment${num}.jpg`, import.meta.url).href}
  alt={`Moment ${num}`}
  className="h-60 w-80 object-cover rounded shadow-md flex-shrink-0"/>
          ))}
        </div>
      </div>
    </section>
  );
};

const UrgentRequestSection = () => {
  return (
    <section className="bg-red-600 text-white text-center py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-3xl font-semibold mb-4 flex justify-center items-center gap-2">
          <span>⚠</span> <span>Urgent Need: O- Blood</span>
        </div>
        <p className="mb-6">
          
          
          
          needs O- blood for emergency surgeries</p>
        <button
          onClick={() => (window.location.href = '/requests')}
          className="bg-white text-red-600 px-6 py-2 rounded-md font-semibold hover:bg-red-100 transition duration-300"
        >
          View All Blood Requests
        </button>
      </div>
    </section>
  );
};

// ✅ How Donation Works Section
const HowDonationWorksSection = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-gray-800">
          <h2 className="text-3xl font-bold text-red-600 mb-4">How Blood Donation Works</h2>
          <ol className="space-y-4 list-decimal list-inside text-gray-700">
            <li>
                <span className="font-semibold text-gray-900">Registration</span>
                <p className="mt-1">Complete a quick registration form with your basic information and medical history.</p>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Health Screening</span>
                <p className="mt-1">A healthcare professional will check your temperature, blood pressure, pulse, and hemoglobin levels.</p>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Blood Donation</span>
                <p className="mt-1">The actual donation takes only 8-10 minutes. You'll donate about one pint of blood.</p>
              </li>
              <li>
                <span className="font-semibold text-gray-900">Rest & Refreshments</span>
                <p className="mt-1">After donating, you'll rest and enjoy refreshments for 15 minutes before leaving.</p>
              </li>
            </ol>
          <div className="mt-6">
            <a href="/donate">
              <button className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-300 font-semibold">
                Start Your Donation Journey
              </button>
            </a>
          </div>
        </div>
        <div className="flex-1">
          <img src={howImg} alt="Donation process" className="rounded shadow-md w-full max-w-xs object-cover mx-auto" />
        </div>
      </div>
    </section>
  );
};

// ✅ Testimonial Section
const TestimonialSection = () => {
  return (
    <section className="bg-white py-12 px-4 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-8">What Donors Are Saying</h2>
      <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
        <div className="bg-gray-50 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “I feel so fulfilled knowing I helped save a life. LifeLine made the process easy and safe.”
          </p>
          <p className="mt-4 font-semibold text-red-500">—Rahmat H.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “Their mobile donation van came right to our campus. Super convenient!”
          </p>
          <p className="mt-4 font-semibold text-red-500">— Rachel K.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “Highly recommend LifeLine to every healthy person. Donate blood, save lives.”
          </p>
          <p className="mt-4 font-semibold text-red-500">—Seth A.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “Highly recommend LifeLine to every healthy person. Donate blood, save lives.”
          </p>
          <p className="mt-4 font-semibold text-red-500">—  Michael H.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “Highly recommend LifeLine to every healthy person. Donate blood, save lives.”
          </p>
          <p className="mt-4 font-semibold text-red-500">— Ms Sandra Elisa Manorkie.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “Highly recommend LifeLine to every healthy person. Donate blood, save lives.”
          </p>
          <p className="mt-4 font-semibold text-red-500">— Earl Deslic.</p>
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