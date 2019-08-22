const fs = require('fs');
const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HashedModuleIdsPlugin = require('webpack/lib/HashedModuleIdsPlugin');
const Visualizer = require('webpack-visualizer-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ArchivePlugin = require('webpack-archive-plugin');
const packageFile = JSON.parse(fs.readFileSync(helpers.root('./package.json')).toString());

const isDevMode = false;

module.exports = webpackMerge(commonConfig(isDevMode), {
  mode: 'production',

  output: {
    path: helpers.root('dist'),
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    sourceMapFilename: '[file].map'
  },

  plugins: [
    new DefinePlugin({
      'ngDevMode': false,
      'ENV': JSON.stringify('production'),
      'E2E': JSON.stringify('false'),
      'process.env.NODE_ENV': JSON.stringify('production'),
      'TITLE': JSON.stringify('suiviDido'),
      'BASE_URL': JSON.stringify('.'),
      'CONTEXT_FILE_PATH': JSON.stringify('/appconf/context.json')
    }),

    new HashedModuleIdsPlugin(),

    new ArchivePlugin({
      output: helpers.root('dist/artifacts/' + packageFile.name + '-' + packageFile.version)
    }),

    new Visualizer({
      filename: '../.stats/visualizer.html'
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../.stats/analyzer.html',
      openAnalyzer: false,
      generateStatsFile: false
    })
  ],

  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        parallel: true,
        cache: true,
        terserOptions: {
          ecma: 6,
          ie8: false,
          toplevel: true,
          module: true,
          compress: {
            dead_code: true,
            warnings: false,
            properties: true,
            drop_debugger: true,
            conditionals: true,
            booleans: true,
            loops: true,
            unused: true,
            toplevel: true,
            if_return: true,
            inline: true,
            join_vars: true,
            ecma: 6,
            module: true
          },
          output: {
            comments: false,
            beautify: false,
            indent_level: 2,
            ecma: 6
          },
          mangle: {
            module: true,
            toplevel: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
    fs: 'empty'
  },

  stats: 'errors-only'
});
