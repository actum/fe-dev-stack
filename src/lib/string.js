// @flow

import { decamelizeKeys } from 'humps'

export default {
  toSnakeCase(value: {}): {} {
    return decamelizeKeys(value)
  },

  toNumber(value: string): number {
    return parseInt(value, 10)
  },
}
