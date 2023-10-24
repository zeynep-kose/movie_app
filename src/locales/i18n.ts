import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LANG } from './constants';

// translations
import tr from './langs/tr';
import en from './langs/en';

const lng = localStorage.getItem('lang') ? JSON.parse(localStorage.getItem('lang') || "") || DEFAULT_LANG.value : DEFAULT_LANG.value;
i18next.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
  },
  lng,
  fallbackLng: DEFAULT_LANG.value,
  //
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
