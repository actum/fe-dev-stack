// @flow

import createConfig from '../../lib/createConfig'
import type { Localization } from '../../lib/types'

export type Config = {
  localization: Localization,
}

const config: Config = {
  localization: {
    button: 'Click me',
  },
}

export default createConfig('example')(config)
