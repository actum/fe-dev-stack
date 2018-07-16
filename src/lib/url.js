// @flow

import queryString from 'query-string'
import {
  pipe,
  split,
  join,
  map,
  filter,
  fromPairs,
  toPairs,
  assoc,
  dissoc,
  prop,
  path,
  replace,
} from 'ramda'

import type { Dict } from './types'

const ITEM_SEPARATOR = ';'
const KEY_VALUE_SEPARATOR = '='
const VALUE_SEPARATOR = ','

const parse = pipe(
  path(['location', 'hash']),
  replace('#', ''),
  (hash) => (hash !== '' ? split(ITEM_SEPARATOR, hash) : []),
  map(split(KEY_VALUE_SEPARATOR)),
  map(([k, v]) => [k, split(VALUE_SEPARATOR, v)]),
  fromPairs,
)

const toHash = pipe(
  toPairs,
  filter(([, v]) => v != null),
  map(([k, v]) => [k, join(VALUE_SEPARATOR, v)]),
  map(join(KEY_VALUE_SEPARATOR)),
  join(ITEM_SEPARATOR),
)

export default {
  /**
   * Create url from query parameters
   */
  createUrl(baseUrl: string, queryParams: {}) {
    const stringifiedParams = queryString.stringify(queryParams)
    const hasQueryParam = baseUrl.includes('?')

    return `${baseUrl}${hasQueryParam ? '&' : '?'}${stringifiedParams}`
  },

  createMailtoUrl(options: Dict<string>) {
    const query = `?${queryString.stringify(dissoc('recipient', options))}`
    return `mailto:${options.recipient || ''}${query || ''}`
  },

  getHash(
    window: any,
    key: string,
    callback: (value: string[]) => void = () => {},
  ): string[] | void {
    // TODO use R.tap, but wait till new version of Ramda is released
    const cb = (value) => {
      if (value) callback(value)
      return value
    }
    return pipe(
      parse,
      prop(key),
      cb,
    )(window)
  },

  setHash(window: any, key: string, value: (string | number)[] | null) {
    const hash = pipe(
      parse,
      assoc(key, value),
      toHash,
    )(window)
    // TODO switch to window.history.replaceState maybe?
    window.location.hash = hash
  },
}
