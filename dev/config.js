const exit = require('./exit')

const NODE_ENV = process.env.NODE_ENV || 'production'
const API_URL = process.env.API_URL || exit('Env variable API_URL not set.')
const projectRootDir = [__dirname, '..']

module.exports = {
  env: {
    NODE_ENV,
    IS_SERVER: true,
    API_URL,
  },
  projectRootDir,
  sourceDir: [...projectRootDir, 'src'],
  featuresSourceDir: [...projectRootDir, 'src', 'features'],
  pagesSourceDir: [...projectRootDir, 'src', 'pages'],
  htmlSourceDir: [...projectRootDir, 'src', 'html'],
  htmlOutputDir: [...projectRootDir, 'public', 'html'],
  distDir: [...projectRootDir, 'public', 'dist'],
  publicPathDist: '/assets',
  publicPathDev: '/public/dev',
}
