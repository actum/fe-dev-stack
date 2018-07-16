// @flow

import type { Middleware } from 'redux'
import type { AppState, DispatchableAction } from '../types'

const andThen: Middleware<AppState, DispatchableAction> = ({ dispatch }) => (
  next,
) => (action) => {
  if (action.andThen)
    Promise.resolve(action.andThen).then((actions) => actions.forEach(dispatch))

  return next(action)
}

export default andThen
