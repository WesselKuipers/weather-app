import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../../public/assets/i18n/en.json';
import nl from '../../public/assets/i18n/nl.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs: ['en', 'nl'],
    resources: {
      en: { translation: en },
      nl: { translation: nl },
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false,
    },
    interpolation: {
      // React already does this for us.
      escapeValue: false,
    },
  });

export default i18n;
