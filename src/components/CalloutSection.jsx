import React from 'react';
import play from '../assets/Images/googleplay.png';
import appstore from '../assets/Images/appstore.png';

const CalloutSection = () => (
  <section className="bg-red-500 text-white py-12 px-4" id="app">
    <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
      <h2 className="text-3xl font-bold">Get the LifeLine Mobile App</h2>
      <p className="max-w-xl text-lg">
        Schedule donations, receive alerts, and track your impact right from your phone.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={play}
            alt="Google Play"
            className="h-16 md:h-20 cursor-pointer"
          />
        </a>

        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={appstore}
            alt="App Store"
            className="h-16 md:h-20 cursor-pointer"
          />
        </a>
      </div>

      <a
        href="/login"
        className="mt-4 inline-block bg-white text-red-600 px-6 py-2 rounded font-semibold hover:bg-red-100 transition"
      >
        Create your donor profile
      </a>
    </div>
  </section>
);

export default CalloutSection;
