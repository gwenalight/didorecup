const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const isDevMode = false;

module.exports = webpackMerge(commonConfig(isDevMode), {
  mode: 'production',

  output: {
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    sourceMapFilename: '[file].map'
  },

  plugins: [
    new DefinePlugin({
      'ngDevMode': true,
      'ENV': JSON.stringify('production'),
      'E2E': JSON.stringify('true'),
      'process.env.NODE_ENV': JSON.stringify('production'),
      'TITLE': JSON.stringify('angular-icdc-generated-project'),
      'BASE_URL': JSON.stringify('.'),
      'CONTEXT_FILE_PATH': JSON.stringify('/appconf/context.json')
    })
  ]
});
