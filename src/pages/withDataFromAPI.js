// @flow

import type { Dict, URL } from '../lib/types'
import { fetchJSON } from '../lib/fetch'
import asyncConfig from './asyncConfig'

const constructCookies = (cookies: Dict<string>): string =>
  Object.keys(cookies).reduce((r, k) => `${r}${k}=${cookies[k]};`, '')

const withDataFromAPI = (baseConfig: {}, ...requests: [string[], URL][]) =>
  asyncConfig(
    baseConfig,
    ...requests.map(([lens, url]) => [
      lens,
      ({ cookies, env: { API_URL } }) =>
        fetchJSON({
          url: `${API_URL}${url}`,
          headers: {
            cookie: constructCookies(cookies),
          },
        }).then(({ success, payload }) => {
          if (!success)
            throw new Error(
              'Unauthenticated request made. Please log in and try again.',
            )
          return payload
        }),
    ]),
  )

export default withDataFromAPI
