// @flow

import type { Action } from '../types'
import { CHANGE_MEDIA_BREAKPOINT } from './contextActions'
import type { Payload } from './contextTypes'

export type State = Payload

const initialState: State = {
  breakpoint: 'SM',
}

export default function(
  state: State = initialState,
  action: Action<Payload, void>,
): State {
  switch (action.type) {
    case CHANGE_MEDIA_BREAKPOINT:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}
