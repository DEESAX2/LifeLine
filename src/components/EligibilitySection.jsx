import React from 'react';

const EligibilitySection = () => (
  <section className="bg-white py-12 px-4" id="eligibility">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-3xl font-bold text-red-600 mb-4">Eligibility & Requirements</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Age 17-60 (16 with parental consent)</li>
          <li>Minimum weight 50 kg (110 lbs)</li>
          <li>No major illness or infection in the past 2 weeks</li>
          <li>At least 8 weeks since last whole blood donation</li>
          <li>Hemoglobin within safe range</li>
          <li>Not pregnant or recently given birth</li>
        </ul>
        <a href="/eligibility" className="mt-6 inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition font-semibold">Can I donate?</a>
      </div>
      <div className="text-center">
        <img src={new URL('../assets/Images/moment11.jpg', import.meta.url).href} alt="Eligibility" className="rounded shadow-md w-100 mx-auto h-90 object-cover" />
      </div>
    </div>
  </section>
);

export default EligibilitySection;
