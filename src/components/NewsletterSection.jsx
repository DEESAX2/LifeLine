import React from 'react';
import { useTranslation } from 'react-i18next';

const NewsletterSection = () => {
  const { t } = useTranslation();
  return (
  <section className="bg-red-100 py-12 px-4 mb-4" id="newsletter">
    <div className="max-w-md mx-auto text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">{t('stayInformed')}</h2>
      <p className="text-gray-700 mb-6">{t('newsletterSubtitle')}</p>
      <form className="flex flex-col sm:flex-row gap-2 justify-center">
        <input
          type="email"
          placeholder={t('yourEmail')}
          className="flex-1 px-4 py-2 border rounded focus:outline-none"
          required
        />
        <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">{t('subscribe')}</button>
      </form>
    </div>
  </section>
);
};

export default NewsletterSection;
