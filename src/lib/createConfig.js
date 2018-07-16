// @flow

import type { Dict } from './types'

const createConfig = (featureId: string) => (config: Dict<any>) => ({
  [featureId]: config,
})

export default createConfig
