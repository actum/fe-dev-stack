// @flow

import { applyMiddleware, createStore } from 'redux'
import type { Dict, CustomInjectedDependencies, AppState } from './lib/types'
import reducers from './reducers'

import injectDependencies from './lib/redux/injectDependencies'
import promise from './lib/redux/promise'
import andThen from './lib/redux/andThen'

import { genericFetch, fetchJSON } from './lib/fetch'
import { noty, notySuccess, notyInfo, notyError } from './lib/noty'
import scroll from './lib/scroll'
import url from './lib/url'

export default function configureStore(
  initialState: AppState,
  env: Dict<string> = {},
  window: any = undefined,
) {
  const dependencies: CustomInjectedDependencies = {
    genericFetch,
    fetchJSON,
    redirect: (url) => window.location.assign(decodeURIComponent(url)),
    reload: () => window.location.reload(),
    noty,
    notySuccess,
    notyInfo,
    notyError,
    getHash: url.getHash.bind(null, window),
    setHash: url.setHash.bind(null, window),
    scroll, // TODO
    addClassToDocument: (state) =>
      (document.documentElement: any).classList.add(state),
    removeClassFromDocument: (state) =>
      (document.documentElement: any).classList.remove(state),
    getDocument: () => document,
    getWindow: () => window,
    getGoPay: () => window._gopay, // eslint-disable-line no-underscore-dangle
  }

  const middlewares = [injectDependencies(dependencies), promise, andThen]

  if (!env.IS_SERVER && env.NODE_ENV !== 'production') {
    const logger = require('redux-logger') // eslint-disable-line
    middlewares.push(logger.createLogger({ collapsed: true }))
  }

  return createStore(reducers, initialState, applyMiddleware(...middlewares))
}
