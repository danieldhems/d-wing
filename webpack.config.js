const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: __dirname + '\\src\\js',
	output: {
		path: __dirname + '\\dist',
		filename: 'bundle.js'
	},
	entry: '.\\main',
	module: {
		loaders: [
		    {
		      test: /\.js/,
		      exclude: /(node_modules|bower_components)/,
		      loader: 'babel', // 'babel-loader' is also a legal name to reference
		    	query: {
		          presets: ['es2015']
		        }
		    }
	  	],
		plugins: [
			new CopyWebpackPlugin([
				{from: '.\\src\\index.html', to: '.\\dist\\index.html'}
			])
		],
	},
	resolve: {
	    extensions: ['.js']
	  }
}