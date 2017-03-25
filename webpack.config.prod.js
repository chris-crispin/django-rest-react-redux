// require our dependencies
var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    // the base directory (absolute path) for resolving the entry option
  context: __dirname,
    // the entry point we created earlier. Note that './' means
    // your current directory. You don't have to specify the extension  now,
    // because you will specify extensions later in the `resolve` section
  entry: {
    epl: './assets/js/router'
  },

  output: {
        // where you want your compiled bundle to be stored
    path: path.resolve('./assets/static/bundles/'),
        // naming convention webpack should use for your files
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'standard'
      },
      // a regexp that tells webpack use the following loaders on all
      // .js and .jsx files
      { test: /\.jsx?$/,
        // we definitely don't want babel to transpile all the files in
        // node_modules. That would take a long time.
        exclude: /node_modules\/(?!preact-compat)/,
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

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      screw_ie8: true,
      mangle: true,
      compress: {
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        properties: true
      },
      comments: false
    }),
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css')
         // new ManifestPlugin({
         //   fileName: 'asset-manifest.json'
         // })
  ],
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
