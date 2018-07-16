// @flow

import type { Middleware } from 'redux'
import type { AppState, DispatchableAction, Action } from '../types'

type PartialAction = {
  type: string,
  meta: any,
}

const getActionType = (type: string, status: string) => `${type}_${status}`

const isPromise = (value: any): boolean =>
  !!value && typeof value === 'object' && typeof value.then === 'function'

export const promiseMiddleware: Middleware<AppState, DispatchableAction> = ({
  dispatch,
}) => (next) => (action) => {
  const { type, payload, ...rest } = action

  // Dispatched regular action, just pass to the next middleware
  if (!payload || !isPromise(payload)) {
    return next(action)
  }

  const getPartialAction = (status: string): PartialAction => ({
    type: getActionType(type, status),
    ...rest,
  })

  next(getPartialAction('START'))

  const handleSuccess = <P>(value: P) =>
    dispatch(
      (({
        ...getPartialAction('SUCCESS'),
        payload: value,
      }: Action<P, any>): any),
    )

  const handleError = <P>(error: P) =>
    dispatch(
      (({
        ...getPartialAction('ERROR'),
        payload: error,
      }: Action<P, any>): any),
    )

  return payload.then(handleSuccess).catch(handleError)
}

export default promiseMiddleware
