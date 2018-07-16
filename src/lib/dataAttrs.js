// @flow

import type { Dict } from './types'

export default function dataAttrs(attrs: Dict<any> = {}): Dict<string> {
  return Object.keys(attrs).reduce((result, key) => {
    const value = attrs[key]
    result[`data-${key}`] =
      typeof value === 'string' ? value : JSON.stringify(value)
    return result
  }, {})
}
