import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import ErrorBoundary from '../../components/ErrorBoundary'

import configureStore from '../../store/store'
import initI18N from '../initI18n'

const config = window.JS_FEATURES_CONFIG
const initialState = window.JS_FEATURES_INITIAL_STATE
const language = document.documentElement.lang

const env = {
  IS_SERVER: false,
  NODE_ENV: process.env.NODE_ENV,
  language,
}

const store = configureStore(initialState, env, window)
const i18n = initI18N(language)

const renderFeature = (
  Element,
  containerId,
  featureId,
  { props, beforeMount } = {},
) => {
  const container = document.getElementById(containerId)

  if (!container) return

  if (beforeMount) beforeMount()

  i18n.addResourceBundle(language, featureId, config[featureId].localization)

  const comp = (
    <ErrorBoundary>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Element {...config[featureId]} {...props} />
        </I18nextProvider>
      </Provider>
    </ErrorBoundary>
  )

  ReactDOM.render(comp, container)
}

export default renderFeature
