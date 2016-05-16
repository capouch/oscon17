module.exports = {
  entry: ["babel-polyfill", "./js/Shell.jsx", "./css/main.scss"],
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
    target: 'http://localhost:2016',
    secure: false,
    },
    '/oscon-test*': {
    target: 'http://localhost:2016',
    secure: false,
    },
  },
},
  module: {
    loaders: [
      {
        test: /\.jsx?|\.js$/,
        exclude: /(node_modules|bower_components|neal-react)/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      }
    ]
  }
};
