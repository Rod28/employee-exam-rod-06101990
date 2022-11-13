import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LocalStorage from 'local-storage-to-object';
import moment from 'moment';
import 'moment/locale/es';

/**
 * @see https://www.i18next.com/
 * @see https://react.i18next.com/
 */

/* ------------ G L O B A L ------------  */
import translation_en from './en/translation.json';
import translation_es from './es/translation.json';

/* ------------ R E S O U R C E S ------------  */
const resourcesConfig = {
  en: {
    translation: translation_en
  },
  es: {
    translation: translation_es
  }
};

// Se configura el idioma de moment de acuerdo al idioma del dispositivo
moment.locale(LocalStorage.getItem('Language', 'language', 'es'));

// Configuración de i18n
i18n.use(initReactI18next).init({
  lng: LocalStorage.getItem('Language', 'language', 'es'),
  fallbackLng: 'en',
  debug: false,
  resources: resourcesConfig,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
