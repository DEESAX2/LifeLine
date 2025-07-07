import React from 'react';
import { Link } from 'react-router';
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToHero = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2563EB] text-white px-4 py-4 md:py-6">
      {/* Call to Action */}
      <div className="text-center max-w-3xl mx-auto mb- 6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Every Drop Counts.</h2>
        <p className="text-base md:text-lg leading-relaxed">
          Join thousands of Ghanaians who are making a difference. Your donation could be the gift of life someone desperately needs.
        </p>
      </div>

      {/* Donate Button */}
      <div className="flex justify-center mb-6">
        <Link to="/donate">
          <button className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-300">
            Donate Now
          </button>
        </Link>
      </div>

      {/* Scroll to Back to homepage Icon */}
      <div className="flex justify-center">
        <button
          onClick={scrollToHero}
          className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-100 transition duration-300"
          title="Back to homepage" ><FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;