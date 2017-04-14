// require our dependencies
const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const webpack = require('webpack')
const webpackCommon = require('./webpack.common')

module.exports = {
  // the base directory (absolute path) for resolving the entry option
  context: __dirname,
  // the entry point we created earlier. Note that './' means
  // your current directory. You don't have to specify the extension  now,
  // because you will specify extensions later in the `resolve` section
  entry: {
    app: './assets/js/router'
  },

  output: {
    // where you want your compiled bundle to be stored
    path: path.resolve('./assets/static/bundles/'),
    // naming convention webpack should use for your files
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },

  plugins: [
    // tells webpack where to store data about your bundles.
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunk: 'app',
      minChunks: (module, count) => webpackCommon._isVendor(module)
    })
  ],

  module: {
    rules: [
      // { test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   enforce: 'pre',
      //   loader: 'standard'
      // },
      // a regexp that tells webpack use the following loaders on all
      // .js and .jsx files
      { test: /\.jsx?$/,
        // we definitely don't want babel to transpile all the files in
        // node_modules. That would take a long time.
        exclude: /node_modules/,
        // use the babel loader
        loader: 'babel-loader'
      },
      // custom scss loader
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },

  resolveLoader: {
    moduleExtensions: ['-loader']
  },

  resolve: {
        // tells webpack where to look for modules
    modules: ['node_modules'],
        // extensions that should be used to resolve modules
    extensions: ['.js', '.jsx']
  }
}
