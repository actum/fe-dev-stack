const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const postcssInlineSvg = require('postcss-inline-svg')
const webpack = require('webpack')

const config = require('./index')
const join = require('./join')

const isProduction = config.env.NODE_ENV === 'production'

function byEnv(common, prod, dev) {
  return common.concat(isProduction ? prod : dev).filter((v) => !!v)
}

module.exports = {
  devtool: isProduction ? 'source-map' : 'inline-cheap-module-source-map',
  mode: config.env.NODE_ENV,
  entry: byEnv(
    [],
    [join([...config.sourceDir, 'index.js'])],
    [
      'webpack-hot-middleware/client',
      join([...config.sourceDir, 'devIndex.js']),
    ],
  ),
  output: {
    filename: 'main.js',
    path: join(config.distDir),
    publicPath: isProduction
      ? `${config.publicPathDist}/`
      : `${config.publicPathDev}/`,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: ['env', 'react', 'stage-0', 'flow'],
            plugins: byEnv([], [], ['react-hot-loader/babel']),
          },
        },
      },
      {
        test: /\.s?css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: isProduction,
              modules: true,
              importLoaders: 2,
              sourceMap: !isProduction,
              localIdentName: '[local]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              plugins: [postcssInlineSvg(), autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: 'url-loader?limit=10000',
      },
      {
        enforce: 'pre',
        test: /\.scss/,
        loader: 'import-glob-loader',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 5,
          mangle: true,
        },
        sourceMap: true,
      }),
    ],
  },
  plugins: byEnv(
    [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(config.env.NODE_ENV) },
      }),
      new MiniCssExtractPlugin({
        filename: 'main.css',
      }),
      process.env.ANALYZE ? new BundleAnalyzerPlugin() : null,
    ],
    [new webpack.optimize.OccurrenceOrderPlugin(true)],
    [new webpack.HotModuleReplacementPlugin()],
  ),
}
