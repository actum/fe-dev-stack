/* eslint-disable import/no-dynamic-require, global-require */

const glob = require('glob')
const mokker = require('mokker')

mokker.start({
  defaultPort: 9001,
  docsUrl: './mokker/docs',
  routes: glob
    .sync('routes/**/*.js', { cwd: __dirname, absolute: true })
    .map(require),
})
