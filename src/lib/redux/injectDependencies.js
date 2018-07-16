// @flow

import type { Middleware } from 'redux'
import type { AppState, Dict, DispatchableAction } from '../types'

type StaticDependency = Function

type DynamicDependency = (state: AppState) => any

export default function injectDependencies(
  statics: $ReadOnly<Dict<StaticDependency>> = {},
  dynamics: $ReadOnly<Dict<DynamicDependency>> = {},
): Middleware<AppState, DispatchableAction> {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action !== 'function') return next(action)
    const dependencies = { ...statics }
    Object.keys(dynamics).forEach((key) => {
      dependencies[key] = dynamics[key](getState())
    })
    return dispatch(action({ ...dependencies, getState, dispatch }))
  }
}
