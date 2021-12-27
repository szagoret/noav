import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import de from './de/translation.json';
import en from './en/translation.json';

export const resources = {
    de: {
        translation: de,
    },
    en: {
        translation: en
    }
} as const;

i18n.use(initReactI18next).init({
    lng: 'de',
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
    },
    resources,
});