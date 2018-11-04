import path from 'path'

import webpack from 'webpack'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'

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
  // TODO: THIS WILL BE AEWSOME!!! Make class names super small like google
  /**
   * getLocalIdent: (context, localIdentName, localName, options) => {
      return 'whatever_random_class_name' pull from a cache with auto building small names
    } 
   */
  {
    test: /\.css$/,
    include: [paths.src],
    exclude: [/node_modules/],
    use: [
      IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
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
          ident: 'postcss-app',
          plugins: () => [
            postcssImport(),
            postcssPresetEnv({ stage: 1 }),
            postcssNested(),
          ],
        },
      },
    ],
  },
  {
    test: /\.(svg|png|jpq|jpeg|gif)$/,
    include: [path.join(paths.src, '/images')],
    exclude: [/node_modules/],
    use: {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      },
    },
  },
  {
    test: /\.(svg|eot|woff2|woff|ttf)$/,
    include: [path.join(paths.src, '/fonts')],
    exclude: [/node_modules/],
    use: ['file-loader'],
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
    'process.env.MOCK_DATA': JSON.stringify(process.env.MOCK_DATA || false),
  }),
]

export default config
