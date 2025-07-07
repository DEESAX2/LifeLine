import React, { useState } from 'react';

// Quick accordion component for FAQ / Myths vs Facts
// Feel free to update questions & answers or pull them dynamically later.
const faqItems = [
  {
    q: 'Is donating blood safe?',
    a: 'Yes. Sterile, single-use needles are used for each donor, eliminating any risk of infection.'
  },
  {
    q: 'How often can I donate?',
    a: 'Whole blood donors can donate every 8 weeks (56 days). Platelet or plasma intervals differ.'
  },
  {
    q: 'Will donating make me weak?',
    a: "Most donors feel fine. Your body replaces the lost fluid within 24 hours and red cells within weeks."
  },
  {
    q: 'Can I donate if I have a tattoo?',
    a: 'If your tattoo was done at a licensed facility using sterile equipment, you can donate after 3 months.'
  },
  {
    q: 'How long does the donation take?',
    a: 'The actual blood draw is 8-10 minutes; the full visit takes about an hour including screening and rest.'
  },
  {
    q: 'What if I have traveled recently?',
    a: 'Some regions with malaria or other risks may defer you temporarily. Screening staff will advise.'
  },
  {
    q: 'Do I need to know my blood type first?',
    a: 'No. We will type your blood after donation and let you know the result.'
  },
  {
    q: 'Can I donate if I take medication?',
    a: 'Most common medications are fine. Bring a list; staff will confirm your eligibility.'
  }
];

const Question = ({ q, a, index, openIndex, setOpenIndex }) => {
  const isOpen = index === openIndex;
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center py-4 text-left text-gray-800 focus:outline-none"
        onClick={() => setOpenIndex(isOpen ? null : index)}
      >
        <span className="font-medium">{q}</span>
        <span className="text-red-600 text-xl font-bold">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <p className="pb-4 text-gray-700">{a}</p>}
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="bg-gray-50 py-12 px-4" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">F.A.Q</h2>
        {faqItems.map((item, i) => (
          <Question key={i} index={i} openIndex={openIndex} setOpenIndex={setOpenIndex} {...item} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
