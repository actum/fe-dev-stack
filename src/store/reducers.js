// @flow

import { combineReducers } from 'redux'

import type { CombinedReducer } from 'redux'
import type { AppState, Action } from '../lib/types'

import example from '../features/Example/reducer'

const rootReducer: CombinedReducer<
  AppState,
  Action<any, any>,
> = combineReducers({
  example,
})

export default rootReducer
