import React, { useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import heroImg from '../assets/Images/moment4.jpg';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative pt-24 px-6 pb-20 flex flex-col items-center justify-center text-center text-white overflow-hidden min-h-screen"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-red-800 opacity-30 z-0"></div>

      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Save Lives with LifeLine</h1>
        <p className="text-lg md:text-xl mb-6">
          Connecting voluntary blood donors to hospitals across Ghana.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => (window.location.href = '/donate')}
            className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-red-100 transition duration-300"
          >
            Donate Blood Now
          </button>
          <button
            onClick={() => (window.location.href = '/admin-dashboard')}
            className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-red-100 transition duration-300"
          >
            Admin Login
          </button>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="bg-white py-12 px-4 text-center grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h2 className="text-3xl font-bold text-red-600">500+</h2>
        <p className="mt-2 text-gray-700">Lives Saved</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-blue-600">50+</h2>
        <p className="mt-2 text-gray-700">Partner Hospitals</p>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-green-600">1000+</h2>
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
    const speed = 1; // pixels per tick
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
  className="h-60 w-80 object-cover rounded shadow-md flex-shrink-0"
/>

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
        <p className="mb-6">Hospital needs O- blood for emergency surgeries</p>
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
          <p className="mt-4 font-semibold text-red-500">— Michael H.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “Their mobile donation van came right to our campus. Super convenient!”
          </p>
          <p className="mt-4 font-semibold text-red-500">— Sandy A.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “Highly recommend LifeLine to every healthy person. Donate blood, save lives.”
          </p>
          <p className="mt-4 font-semibold text-red-500">— Rachael K.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “Highly recommend LifeLine to every healthy person. Donate blood, save lives.”
          </p>
          <p className="mt-4 font-semibold text-red-500">— Elisa H.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “Highly recommend LifeLine to every healthy person. Donate blood, save lives.”
          </p>
          <p className="mt-4 font-semibold text-red-500">— Esther M.</p>
        </div>
        <div className="bg-gray-50 p-6 rounded shadow">
          <p className="text-gray-700 italic">
            “Highly recommend LifeLine to every healthy person. Donate blood, save lives.”
          </p>
          <p className="mt-4 font-semibold text-red-500">— Earl Deslinc.</p>
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
        <TestimonialSection /> 
      </main>

      <Footer />
    </div>
  );
};

export default Home;