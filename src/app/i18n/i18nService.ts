import { germanTranslations } from './i18n.de';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.
  use(initReactI18next).
  init({
    debug: false,
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false
    },
    resources: {
      de: {
        translation: germanTranslations
      }
    }
  }).catch((ex): void => {
    // eslint-disable-next-line no-console
    console.error('Error while initializing i18nnext:', ex);
  });

export {
  i18n
};
