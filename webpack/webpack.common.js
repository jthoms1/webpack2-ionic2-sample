var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');

/*
 * Webpack Plugins
 */
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
  entry: {
    polyfills: './app/polyfills',
    app: './app/app',
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.json', '.scss'],
    root: __dirname,
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            query: {
              typescript: require('typescript')
            }
          },
          {
            loader: 'angular2-template-loader'
          }
        ],
        exclude: [/\.(spec|e2e)\.ts$/],
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader', 'postcss-loader', 'sass-loader')
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'app'].reverse(),
      minChunks: Infinity
    }),

    new CopyWebpackPlugin([{
      from: 'app/assets',
      to: 'assets'
    }]),

    new ExtractTextPlugin('styles.css')
  ],

  postcss: [
    autoprefixer({
      browsers: [
        'last 2 versions',
        'iOS >= 7',
        'Android >= 4',
        'Explorer >= 10',
        'ExplorerMobile >= 11'
      ],
      cascade: false
    })
  ],

  sassLoader: {
    includePaths: [
      'node_modules/ionic-angular',
      'node_modules/ionicons/dist/scss'
    ]
  },

  node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
