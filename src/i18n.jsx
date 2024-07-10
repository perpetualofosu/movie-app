import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Welcome": "Welcome",
      "Profile": "Profile",
      // Add more translations here
    }
  },
  es: {
    translation: {
      "Welcome": "Bienvenido",
      "Profile": "Perfil",
      // Add more translations here
    }
  },
  // Add more languages here
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'en', // Default language
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
