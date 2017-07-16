const webpack = require('webpack')
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin
const path = require('path')


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
    path: path.resolve(__dirname, 'public/js'),
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
      rules: [
        {
          exclude: {
            // web-push is an ES6, so has to be run through babel
            test   : path.resolve(__dirname, "node_modules"),
            exclude: path.resolve(__dirname, "node_modules/web-push"),
          },
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
    options: {
       context: __dirname,
       minimize: true,
       debug: false
     }
    }),
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    }
  }),
  new StatsWriterPlugin({
      fields:null,
      filename: "stats.json" // Default
    })
  ],
};
