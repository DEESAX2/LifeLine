import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const EligibilitySection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
  return (
  <section ref={sectionRef} className="bg-white py-12 px-4" id="eligibility">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
      <div className={`transform transition-all duration-1000 ease-out ${visible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'}`}>
        <h2 className="text-3xl font-bold text-red-600 mb-10">{t('eligibilityRequirements')}</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 ">
          <li>{t('ageRequirement')}</li>
          <li>{t('weightRequirement')}</li>
          <li>{t('healthRequirement')}</li>
          <li>{t('intervalRequirement')}</li>
          <li>{t('hemoglobinRequirement')}</li>
          <li>{t('pregnancyRequirement')}</li>
        </ul>
        <a href="/contact" className="mt-6 inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition font-semibold">{t('canIDonate')}</a>
      </div>
      <div className={`text-center transform transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
        <img src={new URL('../assets/Images/moment1.jpg', import.meta.url).href} alt="Eligibility" className="rounded shadow-md w-100 mx-auto h-100 object-cover" />
      </div>
    </div>
  </section>
);
};

export default EligibilitySection;
