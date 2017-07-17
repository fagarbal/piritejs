const path = require('path');

module.exports = {
  context: __dirname + "/",

  entry: {
    javascript: "./example/index.js",
    html: "./example/index.html",
  },

  output: {
    filename: "pyritejs.js",
    path: __dirname + "/dist",
  },

  resolve: {
    extensions: ['', '.js', '.json'],
    root: path.resolve(__dirname),
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /index\.html$/,
        loaders: ["file?name=[name].[ext]"]
      },
      {
        test: /example\.html$/,
        loaders: ["html-loader"]
      }
     ]
  }
}
