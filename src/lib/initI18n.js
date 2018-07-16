// @flow

import i18n from 'i18next'

const initI18N = (language: string, debug: boolean = false) =>
  i18n.init({
    lng: language,
    debug,
    react: {
      wait: true,
    },
  })

export default initI18N
