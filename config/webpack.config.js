import path from 'path'

import webpack from 'webpack'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

const ENV = process.env.NODE_ENV
const IS_DEV = ENV === 'development'
const IS_PROD = !IS_DEV

const root = path.resolve(__dirname, '../')
const paths = {
  src: path.join(root, 'src'),
  dist: path.join(root, 'dist'),
  config: path.join(root, 'config'),
  nodeModules: path.join(root, 'node_modules'),
}

const alias = {
  '@sdog': paths.src,
  '@sd': paths.src,
  '@scene': path.join(paths.src, 'scenes'),
  '@store': path.join(paths.src, 'store'),
  '@api': path.join(paths.src, 'api'),
  '@component': path.join(paths.src, 'components'),
  '@util': path.join(paths.src, 'utils'),
}

/**
 * Basic Config object for webpack
 */

const config = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: { filename: '[name].[hash].js' },
  module: {},
  plugins: [],
  resolve: { alias },
}

/**
 * Webpack Module Rules
 */

config.module.rules = [
  {
    enforce: 'pre',
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'eslint-loader',
      options: {
        fix: true,
        failOnWarning: false,
        failOnError: true,
      },
    },
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  },
  {
    test: /\.html$/,
    use: [
      {
        loader: 'html-loader',
        options: { minimize: true },
      },
    ],
  },
  {
    test: /\.css$/,
    // only turn on standard global Postcss loader for the material directories
    include: [
      path.join(paths.nodeModules, 'material-components-web'),
      path.join(paths.nodeModules, '@material'),
      path.join(paths.src),
    ],
    exclude: [
      /src\/components\/(.+)\/theme/, // exclude theme.css files
      /src\/scenes\/(.+)\/theme/, // exclude theme.css files
    ],
    use: [
      ...(IS_DEV ? ['style-loader'] : [MiniCssExtractPlugin.loader]),
      'css-loader',
      'postcss-loader',
    ],
  },
  {
    test: /\.css$/,
    include: [paths.src],
    exclude: [
      /node_modules/,
      /src\/components\/(.+)\/styles/, // exclude style.css files
      /src\/scenes\/(.+)\/styles/, // exclude style.css files
    ],
    use: [
      ...(IS_DEV ? ['style-loader'] : [MiniCssExtractPlugin.loader]),
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]__[name]--[hash:base64:5]',
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          config: {
            path: path.join(paths.config, 'postcss.config.js'),
          },
        },
      },
    ],
  },
  {
    test: /\.svg$/,
    use: ['raw-loader'],
    include: [paths.src],
  },
]

config.optimization = {
  runtimeChunk: false,
  splitChunks: {
    chunks: 'all',
    name: 'vendor',
  },
  minimizer: IS_PROD
    ? [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({}),
      ]
    : [],
}

// Plugins
config.plugins = [
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
    inject: true,
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css',
  }),
  new webpack.DefinePlugin({
    'process.env.MOCK_DATA': JSON.stringify(process.env.MOCK_DATA || 'development'),
  }),
]

export default config
