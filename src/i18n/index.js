import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import idCommon from '../locales/id/common.json'
import enCommon from '../locales/en/common.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      id: { common: idCommon },
      en: { common: enCommon },
    },
    lng: 'id',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
    debug: import.meta.env.DEV
  })

export default i18n
