// @flow

import * as React from 'react'
import type { AppState } from '../lib/types'
import page from '../pages/page'

const config = {
  env: {
    NODE_ENV: 'production',
  },
  publicPathDist: '',
  publicPathDev: '',
  cookies: {},
}

const html = (
  body: React.Node,
  initialState: $Shape<AppState> = { auth: { loggedIn: false } },
) => page()(body)(config, initialState)

export default html
