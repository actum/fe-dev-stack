// @flow

import { handleFetchError } from '../fetch'

describe('handleFetchError', () => {
  it('cannot decode response', async () => {
    const res = {
      headers: {
        get: () => 'application/json',
      },
      json: async () => {
        throw new Error('Cannot decode.')
      },
    }
    const error = {
      res,
    }

    try {
      await handleFetchError(error)
    } catch (error) {
      expect(error).toHaveProperty('res')
      expect(error.res).toBe(res)
      expect(error).toHaveProperty('data')
      expect(error.data).toEqual({
        success: false,
        message: 'An error occured.',
      })
    }
  })

  it('decoded text response', async () => {
    const res = {
      headers: {
        get: () => 'text/html',
      },
      text: async () => 'foo',
    }
    const error = {
      res,
    }

    try {
      await handleFetchError(error)
    } catch (error) {
      expect(error).toHaveProperty('res')
      expect(error.res).toBe(res)
      expect(error).toHaveProperty('data')
      expect(error.data).toEqual({
        success: false,
        message: 'An error occured.',
      })
    }
  })

  it('decoded json response', async () => {
    const res = {
      headers: {
        get: () => 'application/json',
      },
      json: async () => ({ success: false, message: 'foo' }),
    }
    const error = {
      res,
    }

    try {
      await handleFetchError(error)
    } catch (error) {
      expect(error).toHaveProperty('res')
      expect(error.res).toBe(res)
      expect(error).toHaveProperty('data')
      expect(error.data).toEqual({ success: false, message: 'foo' })
    }
  })
})
