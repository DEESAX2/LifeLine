import React from 'react';

const NewsletterSection = () => (
  <section className="bg-white py-12 px-4" id="newsletter">
    <div className="max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Stay Informed</h2>
      <p className="text-gray-700 mb-6">Subscribe to receive blood drive schedules and urgent requests.</p>
      <form className="flex flex-col sm:flex-row gap-2 justify-center">
        <input
          type="email"
          placeholder="Your email"
          className="flex-1 px-4 py-2 border rounded focus:outline-none"
          required
        />
        <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Subscribe</button>
      </form>
    </div>
  </section>
);

export default NewsletterSection;
