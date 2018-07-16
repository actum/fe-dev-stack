// @flow

import type { SimpleAction } from '../types'
import type { Payload } from './contextTypes'

export const CHANGE_MEDIA_BREAKPOINT = 'CONTEXT/CHANGE_MEDIA_BREAKPOINT'

export type ChangeMediaBreakpointAction = (
  payload: Payload,
) => SimpleAction<Payload>

export const changeMediaBreakpoint: ChangeMediaBreakpointAction = (
  payload,
) => ({
  type: CHANGE_MEDIA_BREAKPOINT,
  payload,
})
