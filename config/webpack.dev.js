const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const isDevMode = true;

module.exports = webpackMerge(commonConfig(isDevMode), {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  stats: {
    children: false
  },

  devServer: require('./dev-server'),

  plugins: [
    new SimpleProgressWebpackPlugin(),

    new DefinePlugin({
      'E2E': JSON.stringify('false'),
      'ENV': JSON.stringify('development'),
      'process.env.NODE_ENV': JSON.stringify('development'),
      'TITLE': JSON.stringify('suiviDido'),
      'BASE_URL': JSON.stringify('.'),
      'CONTEXT_FILE_PATH': JSON.stringify('./context/context.json')
    }),

    new CopyWebpackPlugin([
      {
        from: 'boot/context/context.json',
        to: 'context'
      }
    ])
  ],

  resolveLoader: {
    modules: [
      "./node_modules"
    ]
  },
  mode: 'development'
});
