const path = require('path');

module.exports = {
	context: __dirname + '/',

	entry: {
		javascript: './example/index.js',
		html: ['./example/index.html', './example/templates/demo.html', './example/templates/example.html']
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
			loader: 'babel-loader',
			query: {
				cacheDirectory: true,
				plugins: ['transform-decorators-legacy'],
				presets: ['es2015', 'stage-0']
			}
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