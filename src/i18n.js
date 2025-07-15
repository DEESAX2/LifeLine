import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import tw from './locales/tw.json';
import pt from './locales/pt.json';

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  zh: { translation: zh },
  tw: { translation: tw },
  pt: { translation: pt },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lng') || 'en',
    fallbackLng: localStorage.getItem('lng') || 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
