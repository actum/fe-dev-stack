// @flow

import type { CombinedReducer } from 'redux'
import { combineReducers } from 'redux'

import type { AppState, Action } from './lib/types'

const rootReducer: CombinedReducer<
  AppState,
  Action<any, any>,
> = combineReducers({})

export default rootReducer
