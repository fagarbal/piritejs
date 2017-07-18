const path = require('path');

module.exports = {
	context: __dirname + '/',

	entry: {
		javascript: './example/index.js',
		html: './example/index.html',
	},

	output: {
		filename: 'pyritejs.js',
		path: __dirname + '/dist',
	},

	devtool: 'source-map',

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
			loaders: ['babel-loader'],
		}, {
			test: /index\.html$/,
			loaders: ['file?name=[name].[ext]']
		}, {
			test: /.html$/,
			loaders: ['html-loader?config=htmlConfig'],
			exclude: [path.resolve(__dirname, 'example/index.html')],
		}]
	}
}