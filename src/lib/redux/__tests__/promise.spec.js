// @flow

import { applyMiddleware, createStore } from 'redux'
import configureMockStore from 'redux-mock-store'
import promise from '../promise'

const nextMiddlewareData = { middleware: 'next' }

function nextMiddlewareFactory(next) {
  return jest.fn((action) => {
    next(action)
    return { ...action, ...nextMiddlewareData }
  })
}

describe('promise middleware', () => {
  const reducer = () => null
  let nextMiddlewareSpy

  const middlewares = applyMiddleware(promise, () => (next) => {
    nextMiddlewareSpy = nextMiddlewareFactory(next)
    return nextMiddlewareSpy
  })

  const store = createStore(reducer, middlewares)
  const mockStore = configureMockStore([promise])({})

  afterEach(() => {
    mockStore.clearActions()
  })

  describe('when action not promise', () => {
    const mockAction = { type: 'ACTION' }

    it('invokes next middleware with the action', () => {
      store.dispatch(mockAction)
      expect(nextMiddlewareSpy).toBeCalledWith(mockAction)
    })

    it('returns the return from next middleware', () => {
      expect(store.dispatch(mockAction)).toEqual({
        ...mockAction,
        ...nextMiddlewareData,
      })
    })

    it('does not dispatch any other actions', () => {
      mockStore.dispatch(mockAction)
      expect(mockStore.getActions()).toHaveLength(1)
    })
  })

  describe('when action {payload} is promise', () => {
    const mockAction = {
      type: 'SOME_ACTION',
      meta: 1,
      payload: Promise.resolve(),
    }

    it('dispatches pending action at the start', () => {
      mockStore.dispatch(mockAction)
      expect(mockStore.getActions()[0]).toMatchObject({
        type: 'SOME_ACTION_START',
      })
    })

    it('dispatches action with meta preserved', () => {
      mockStore.dispatch(mockAction)
      expect(mockStore.getActions()[0]).toMatchObject({
        meta: 1,
      })
    })
  })

  describe('when promise is fulfilled', () => {
    const mockAction = { type: 'SOME_ACTION', payload: Promise.resolve(1) }

    it('returns fulfilled promise', () => store.dispatch(mockAction))

    it('dispatches success action eventually', async () => {
      const promise = await mockStore.dispatch(mockAction)

      expect(promise).toEqual({
        type: 'SOME_ACTION_SUCCESS',
        payload: 1,
      })
    })
  })

  describe('when promise is rejected', () => {
    const error = new Error()
    const mockAction = { type: 'SOME_ACTION', payload: Promise.reject(error) }

    it('returns fulfilled promise', () => store.dispatch(mockAction))

    it('dispatches error action eventually', async () => {
      const result = await mockStore.dispatch(mockAction)
      expect(result).toEqual({
        type: 'SOME_ACTION_ERROR',
        payload: error,
      })
    })
  })
})
