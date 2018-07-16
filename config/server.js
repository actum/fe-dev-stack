/* eslint-disable global-require, no-console */

require('babel-register')({
  presets: [
    [
      'env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    'react',
    'stage-0',
    'flow',
  ],
})

const url = require('url')

const chokidar = require('chokidar')
const cookieParser = require('cookie-parser')
const express = require('express')
const proxy = require('express-http-proxy')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('./index')
const join = require('./join')
const webpackConfig = require('./webpack.config')

const sourceDir = join(config.sourceDir)
const watcher = chokidar.watch([sourceDir])

watcher.on('ready', () => {
  watcher.on('all', () => {
    Object.keys(require.cache).forEach((id) => {
      if (id.indexOf(sourceDir) === 0) {
        delete require.cache[id]
      }
    })
    console.log('server reloaded')
  })
})

const port = process.env.PORT || 9000
const app = express()

app.use(cookieParser())

app.use(config.publicPathDist, express.static(join(config.distDir)))

if (config.env.NODE_ENV === 'development') {
  const webpackCompiler = webpack(webpackConfig)

  app.use(
    webpackDevMiddleware(webpackCompiler, {
      publicPath: `${config.publicPathDev}/`,
      watchOptions: {
        ignore: /node_modules/,
      },
      stats: {
        colors: true,
        assets: true,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
      },
    }),
  )

  app.use(webpackHotMiddleware(webpackCompiler))
}

app.use(
  '/api',
  proxy(config.env.API_URL, {
    proxyReqPathResolver: (req) => `/api${url.parse(req.url).path}`,
    proxyReqOptDecorator: (proxyReqOpts) => {
      proxyReqOpts.rejectUnauthorized = false
      return proxyReqOpts
    },
    userResHeaderDecorator(headers) {
      if (headers['set-cookie'] && Array.isArray(headers['set-cookie']))
        headers['set-cookie'] = headers['set-cookie'].map((cookie) =>
          cookie.replace('secure;', ''),
        )
      return headers
    },
  }),
)

app.get('/:page?', async (req, res) => {
  if (req.params.page === 'favicon.ico') {
    res.sendFile(join([...config.sourceDir, 'assets', 'favicon.ico']))
    return
  }

  const file = req.params.page || 'index'
  const initialState = {
    auth: {
      loggedIn: !!req.cookies.CurrentContact,
    },
  }

  const html = await require('./renderToString').default(
    file,
    {
      ...config,
      cookies: req.cookies,
    },
    initialState,
  )

  res.send(html)
})

app.listen(port, () => {
  console.log(`app started at http://localhost:${port}`)
})
