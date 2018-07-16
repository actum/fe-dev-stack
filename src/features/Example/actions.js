// @flow

import type { PromiseAction } from '../../lib/types'

export const FETCH_DATA = 'EXAMPLE/FETCH_DATA'
export const FETCH_DATA_START = `${FETCH_DATA}_START`
export const FETCH_DATA_SUCCESS = `${FETCH_DATA}_SUCCESS`
export const FETCH_DATA_ERROR = `${FETCH_DATA}_ERROR`

export type FetchExampleData = () => PromiseAction<any, void>

export const fetchExampleData: FetchExampleData = () => ({
  fetchJSON,
  notyError,
}) => ({
  type: FETCH_DATA,
  payload: fetchJSON({
    url: '/api/Example/GetExampleData',
    method: 'GET',
  })
    .then((data) => data)
    .catch((error) => {
      notyError(error.data.message)
      throw error
    }),
})
