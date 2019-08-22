const helpers = require('./helpers');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildOptimizerLoader = {
  loader: '@angular-devkit/build-optimizer/webpack-loader',
  options: {
    sourceMap: false
  }
};

module.exports = (isDevMode) =>({
  context: helpers.root('src'),

  entry: {
    'polyfills': helpers.root('src','polyfills.browser.ts'),
    'vendors': helpers.root('src','vendor.browser.ts'),
    'main': helpers.root('src','main.browser.ts')
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],

    modules: [helpers.root('src'), 'node_modules'],

    alias: {
      'jquery': helpers.root('node_modules/jquery/dist/jquery.js') // https://github.com/Dogfalo/materialize/issues/3707
    }
  },

  module: {
    rules: [
      {
        // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
        // Removing this will cause deprecation warnings to appear.
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: {system: true}  // enable SystemJS
      },
      {
        test: /\.js$/,
        use: !isDevMode ? [buildOptimizerLoader] : []
      },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: !isDevMode ? [buildOptimizerLoader, '@ngtools/webpack'] : ['@ngtools/webpack'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src/app'),
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.css$/,
        include: helpers.root('src/app'),
        loader: 'css-to-string-loader!css-loader'
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src/app'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.scss$/,
        include: helpers.root('src/app'),
        use: ['css-to-string-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          minimize: isDevMode,
          caseSensitive: true,
          removeAttributeQuotes: false,
          minifyJS: false,
          minifyCSS: false
        },
        exclude: [helpers.root('src/index.html'), helpers.root('src/mocha.html')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader',
        options: {
          digest: 'hex',
          hash: 'sha512',
          name: 'assets/[name].[hash].[ext]'
        }
      },
      {
        test: /\.md$/,
        loader: 'html-loader!markdown-loader'
      }
    ],
    noParse: [/.+zone\.js\/dist\/.+/]
  },

  plugins: [
    new AngularCompilerPlugin({
      tsConfigPath: helpers.root('tsconfig.json'),
      mainPath: helpers.root('src/main.browser'),
      entryModule: helpers.root('src/boot/boot.module#BootModule'),
      skipCodeGeneration: isDevMode,
      fullTemplateTypeCheck: true,
      skipMetadataEmit: true,
      sourceMap: isDevMode
    }),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery": "jquery",
      '_': 'lodash'
    }),

    new MiniCssExtractPlugin({
      filename: isDevMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevMode ? '[name].css' : '[name].[chunkhash].css',
      allChunks: true
    }),

    new HtmlWebpackPlugin({
      template: helpers.root('src/index.html'),
      chunksSortMode: function (a, b) {
        const entryPoints = ['polyfills', 'main', 'vendors'];
        return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
      },
      inject: true,
      xhtml: true,
      minify: !isDevMode ? {
        caseSensitive: true,
        collapseWhitespace: true,
        keepClosingSlash: true
      } : false,
      favicon: helpers.root('src/assets/favicon.png')
    }),

    new ScriptExtHtmlWebpackPlugin({
      sync: /polyfills|vendors/,
      defaultAttribute: 'async',
      preload: [/polyfills|main|vendors/],
      prefetch: [/chunk/]
    }),

    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: 'assets',
        ignore: ['favicon.png']
      }
    ]),

    new LoaderOptionsPlugin({
      minimize: !isDevMode,
      debug: isDevMode
    })
  ]
});
