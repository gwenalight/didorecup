const helpers = require('./helpers');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const {CheckerPlugin} = require('awesome-typescript-loader');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

module.exports = {

  resolve: {
    extensions: ['.ts', '.js', 'json'],

    alias: {
      'jquery': helpers.root('node_modules/jquery/dist/jquery.js') // https://github.com/Dogfalo/materialize/issues/3707
    },

    plugins: [
      new TsConfigPathsPlugin({
        configFilePath: helpers.root('tsconfig.json')
      })
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        parser: {
          system: true // no warning : https://github.com/webpack/webpack/pull/6321
        }
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [helpers.root('src/index.html'), helpers.root('src/conf/mocha/mocha.html')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: 'null-loader'
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'app'),
        loader: 'null-loader'
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader!sass-loader'
      }
    ]
  },

  plugins: [
    new SimpleProgressWebpackPlugin(),

    new CheckerPlugin(),

    new webpack.ContextReplacementPlugin(                            // Fixes Angular 2++ webpack error :
      /(.+)?angular(\\|\/)core(.+)?/,                               // Critical dependency: the request of
      __dirname                                                    // a dependency is an expression
    ),

    new DefinePlugin({
      'E2E': JSON.stringify('false'),
      'ENV': JSON.stringify('development'),
      'process.env.NODE_ENV': JSON.stringify('development'),
      'CONTEXT_FILE_PATH': JSON.stringify('./context/context.json')
    }),

    new CopyWebpackPlugin([
      {
        from: 'src/boot/context/context.json',
        to: 'context'
      }
    ])
  ],

  performance: {
    hints: false
  }
};
