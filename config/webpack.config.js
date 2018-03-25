import path from 'path'

import HtmlWebPackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'


const root = path.resolve(__dirname, '../')
const paths = {
  src: path.join(root, 'src'),
  config: path.join(root, 'config'),
  nodeModules: path.join(root, 'node_modules'),
}


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
            path: path.join(paths.config, 'postcss.config.js'),
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
  entry: path.join(paths.src, 'scenes/onboarding'),
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
    use: buildCssLoader('rmwc'),
  },
  {
    test: /\.css$/,
    include: [
      paths.src,
    ],
    exclude: [
      /node_modules/,
      /src\/components\/(.+)\/styles/, // exclude style.css files
      /src\/scenes\/(.+)\/styles/, // exclude style.css files
    ],
    use: buildCssLoader('sd'),
  },
  {
    test: /\.svg$/,
    use: [
      'raw-loader',
    ],
    include: [
      paths.src,
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

// Css/Style Plugins based on the build type
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

export default config
