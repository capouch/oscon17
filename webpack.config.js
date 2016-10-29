const webpack = require('webpack')

module.exports = {
  entry: ["./js/Shell.jsx"],
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
        loader: "style!css!sass"
      }
    ]
  },
  plugins:
  [
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

  ],
};
