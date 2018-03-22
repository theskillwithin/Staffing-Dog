const path = require('path')

const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const cssBuildType = 'extract'
// const cssBuildType = 'minicss'
// const cssBuildType = 'basic'

const extractText = {
  rmwc: new ExtractTextPlugin('dist/rmwc.[name].css'),
  sd: new ExtractTextPlugin('dist/sd.[name].css'),
}

const loaders = {
  sd: {
    basic: [
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
            path: path.resolve(__dirname, 'config/postcss.config.js'),
          },
        },
      },
    ],
  },
  rmwc: {
    basic: [
      'css-loader',
      'postcss-loader',
    ],
  },
}

loaders.sd.extract = extractText.sd.extract({
  fallback: 'style-loader',
  use: loaders.sd.basic,
})

loaders.sd.miniCssExtract = [
  MiniCssExtractPlugin.loader,
  ...loaders.sd.basic,
]

loaders.rmwc.extract = extractText.rmwc.extract({
  fallback: 'style-loader',
  use: loaders.rmwc.basic,
})

loaders.rmwc.miniCssExtract = [
  MiniCssExtractPlugin.loader,
  ...loaders.rmwc.basic,
]

const buildCssLoader = (type) => {
  switch (cssBuildType) {
    case 'cssmini':
      return loaders[type].miniCssExtract
    case 'extract':
      return loaders[type].extract
  }

  return ['style-loader', ...loaders[type].basic]
}


const config = {
  entry: path.resolve(__dirname, 'src/scenes/onboarding'),
  module: {},
  plugins: [],
}

// Rules
config.module.rules = [
  {
    enforce: 'pre',
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'eslint-loader',
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
    // only turn on standard global CSS loader for the material directories
    // These paths are the same as above and specific to your system, so change accordingly
    include: [
      path.resolve('./node_modules/material-components-web'),
      path.resolve('./node_modules/@material'),
      path.resolve('./src'),
    ],
    exclude: [
      /src\/components\/(.+)\/theme/,
      /src\/scenes\/(.+)\/theme/,
    ],
    use: buildCssLoader('rmwc'),
  },
  {
    test: /\.css$/,
    include: [
      path.resolve('./src'),
    ],
    exclude: [
      /node_modules/,
      /src\/components\/(.+)\/styles/,
      /src\/scenes\/(.+)\/styles/,
    ],
    use: buildCssLoader('sd'),
  },
  {
    test: /\.svg$/,
    use: [
      'raw-loader',
    ],
    include: [
      path.resolve('./src'),
    ],
  },
]

config.optimization = {
  runtimeChunk: false,
  splitChunks: {
    chunks: 'all',
  },
}

// Plugins
config.plugins = [
  new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
    inject: true,
  }),
  new HtmlWebPackPlugin({
    template: './src/onboarding.html',
    filename: './onboarding.html',
    inject: true,
  }),
]

switch (cssBuildType) {
  case 'minicss':
    config.plugins = [
      ...config.plugins,
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    ]
    break
  case 'extract':
    config.plugins = [
      ...config.plugins,
      extractText.rmwc,
      extractText.sd,
    ]
    break
}

module.exports = config
