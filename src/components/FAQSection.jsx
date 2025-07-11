import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


// translation keys instead of hard-coded strings
const faqItems = [
  {
    q: 'faqQ1',
    a: 'faqA1'
  },
  {
    q: 'faqQ2',
    a: 'faqA2'
  },
  {
    q: 'faqQ3',
    a: 'faqA3'
  },
  {
    q: 'faqQ4',
    a: 'faqA4'
  },
  {
    q: 'faqQ5',
    a: 'faqA5'
  },
  {
    q: 'faqQ6',
    a: 'faqA6'
  },
  {
    q: 'faqQ7',
    a: 'faqA7'
  },
  {
    q: 'faqQ8',
    a: 'faqA8'
  }
];

const Question = ({ q, a, index, openIndex, setOpenIndex }) => {
  const { t } = useTranslation();
  const isOpen = index === openIndex;
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center py-4 text-left text-gray-800 focus:outline-none"
        onClick={() => setOpenIndex(isOpen ? null : index)}
      >
        <span className="font-medium">{t(q)}</span>
        <span className="text-red-600 text-xl font-bold">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <p className="pb-4 text-gray-700">{t(a)}</p>}
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
