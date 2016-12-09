const webpack = require('webpack')
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin


module.exports = {
  entry: {
    js: [ 'whatwg-fetch', 'babel-polyfill', "./js/Shell.js"],
    vendor: [
      'react', 'react-dom', 'openseadragon',
      'react-image-gallery', 'griddle-react'
    ]
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  output: {
    path: "public/js",
    publicPath: "/js",
    filename: "bundle.js"
  },
  devServer: {
    port: 8080,
    inline: true,
    proxy: {
      '/uploadHandler*': {
        target: 'http://localhost',
        secure: false,
      },
      '/graphql*': {
      target: 'http://localhost',
      secure: false,
    },
  },
},
  module: {
    loaders: [
      {
      test: /\.jsx?|\.js$/,
      loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ["style", "css", "sass"]
      }
    ]
  },
  plugins:
  [
  new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    new StatsWriterPlugin({
      fields:null,
      filename: "stats.json" // Default
    })
  ],
};
