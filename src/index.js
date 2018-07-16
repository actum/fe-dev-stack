import 'react-dates/lib/css/_datepicker.css'
import './styles/main.scss'

import 'babel-polyfill'
import SmoothScroll from 'smoothscroll-polyfill'
import 'react-dates/initialize'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'

import moment from 'moment'

import initI18N from './lib/initI18n'
import configureStore from './configureStore'

import Example from './features/Example'

import ErrorBoundary from './components/ErrorBoundary'

const config = window.JS_FEATURES_CONFIG
const initialState = window.JS_FEATURES_INITIAL_STATE
const language = document.documentElement.lang

// Set default locale for moment.js from HTML lang attribute
moment.locale(language)

// Add Smoothscroll polyfill
SmoothScroll.polyfill()

const env = { IS_SERVER: false, NODE_ENV: process.env.NODE_ENV }

const store = configureStore(initialState, env, window)

const i18n = initI18N(language)

function mount(Element, containerId, featureId, { props, beforeMount } = {}) {
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

mount(Example, 'exampleContainer', 'example', {
  props: { config: config.example },
})
