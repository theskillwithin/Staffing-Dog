import path from 'path'

import webpack from 'webpack'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import postcssPresetEnv from 'postcss-preset-env'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const ENV = process.env.NODE_ENV
const IS_DEV = ENV === 'development'
const IS_PROD = !IS_DEV
const LOCAL_ENV = process.env.ENV || 'prod'

const root = path.resolve(__dirname, '../')
const paths = {
  src: path.join(root, 'src'),
  dist: path.join(root, 'dist'),
  config: path.join(root, 'config'),
  nodeModules: path.join(root, 'node_modules'),
}

const alias = {
  '@sdog': paths.src,
}

const stats = {
  warningsFilter: warn => warn.indexOf('Conflicting order between:') > -1,
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
  stats,
  devtool: false,
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
    test: /\.css$/,
    include: [paths.src],
    exclude: [/node_modules/],
    use: [
      IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'local',
            localIdentName: '[local]__[name]--[hash:base64:5]',
            context: path.resolve(__dirname, 'src'),
          },
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
        publicPath: 'images',
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
  minimize: IS_PROD || false,
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
  new CopyWebpackPlugin([{ from: 'src/images', to: '../dist/images' }]),
  new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
    inject: true,
    templateParameters: { ENV: process.env.ENV },
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css',
  }),
  new webpack.DefinePlugin({
    'process.env.ENV': JSON.stringify(process.env.ENV || 'prod'),
    'process.env.BUILD_STAGE': JSON.stringify(process.env.BUILD_STAGE || false),
    'process.env.BYPASS_LUA': JSON.stringify(process.env.BYPASS_LUA || false),
    'process.env.GA_CODE': JSON.stringify(
      process.env.GA_CODE || LOCAL_ENV === 'prod' ? 'UA-98231042-2' : 'UA-98231042-3',
    ),
  }),
  new webpack.SourceMapDevToolPlugin({
    filename: '[file].map',
    exclude: ['vendor'],
  }),
]

// DevServer
config.devServer = {
  port: 8080,
  historyApiFallback: true,
  contentBase: path.resolve('../dist'),
  stats: {
    ...stats,
    children: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    reasons: false,
    useExports: false,
  },
}

export default config
