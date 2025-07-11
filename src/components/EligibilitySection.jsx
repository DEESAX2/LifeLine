import React from 'react';
import { useTranslation } from 'react-i18next';

const EligibilitySection = () => {
  const { t } = useTranslation();
  return (
  <section className="bg-white py-12 px-4" id="eligibility">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
      <div>
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
      <div className="text-center">
        <img src={new URL('../assets/Images/moment1.jpg', import.meta.url).href} alt="Eligibility" className="rounded shadow-md w-100 mx-auto h-100 object-cover" />
      </div>
    </div>
  </section>
);
};

export default EligibilitySection;
