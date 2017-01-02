var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				include: APP_DIR,
				query: {
					babelrc: false,
					presets: ['latest', 'stage-2', 'react']
				}
			},
			{
				test: /\.scss$/,
				loaders: ['style-loader', , 'css-loader?sourceMap', 'sass-loader?sourceMap']
			}
		]
	},
	sassLoader: {
		includePaths: [APP_DIR + '/stylesheets']
	}
}

module.exports = config;
