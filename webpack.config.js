const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: __dirname + '/',

	entry: {
		javascript: './lib/index.js'
	},

	output: {
		filename: 'pyrite.min.js',
		path: __dirname + '/dist',
	},

	resolve: {
		extensions: ['', '.js', '.json'],
		root: path.resolve(__dirname),
	},

	htmlConfig: {
		collapseWhitespace: true
	},

	module: {
		loaders: [{
			test: /.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				cacheDirectory: true,
				plugins: ['transform-decorators-legacy'],
				presets: ['es2015', 'stage-0']
			}
		}]
	},

	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
}