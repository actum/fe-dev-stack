// @flow

import * as React from 'react'

import type { AppState, GlobalConfig, PageConfig } from '../lib/types'

import Header from '../components/Header'

const source = (
  { env: { NODE_ENV }, publicPathDist, publicPathDev }: GlobalConfig,
  file: string,
) => `${NODE_ENV === 'production' ? publicPathDist : publicPathDev}/${file}`

const error = (message: string) => (
  <div className="container">
    Async config error: <strong>{message}</strong>
  </div>
)

export default function page(
  pageConfig: PageConfig = {},
  title: string = 'yachting°com',
) {
  return (body: React.Node | ((config: GlobalConfig) => React.Node)) => async (
    config: GlobalConfig,
    initialState: $Shape<AppState>,
  ) => {
    let resolvedPageConfig = {}

    try {
      resolvedPageConfig = await (typeof pageConfig === 'function'
        ? pageConfig(config)
        : Promise.resolve(pageConfig))
    } catch (e) {
      body = error(e.message) // eslint-disable-line no-param-reassign
    }

    return () => (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>{title}</title>
          <link
            href={source(config, 'main.css')}
            rel="stylesheet"
            type="text/css"
          />
        </head>
        <body>
          <Header loggedIn={initialState.auth.loggedIn} />

          <main className="content">
            {typeof body === 'function' ? body(config) : body}
          </main>

          <script
            dangerouslySetInnerHTML={{
              __html: `var JS_FEATURES_CONFIG = ${JSON.stringify({
                ...resolvedPageConfig,
              })}; var JS_FEATURES_INITIAL_STATE = ${JSON.stringify(
                initialState,
              )};`,
            }}
          />
          <script src={source(config, 'main.js')} />
        </body>
      </html>
    )
  }
}
