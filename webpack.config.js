const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: __dirname + '\\src\\js',
	output: {
		path: __dirname + '\\dist',
		filename: 'bundle.js'
	},
	entry: '.\\main.js',
	module: {
		loaders: [
		    {
		      test: /\.jsx?$/,
		      exclude: /(node_modules|bower_components)/,
		      loader: 'babel', // 'babel-loader' is also a legal name to reference
		    	query: {
		          presets: ['es2015', 'react']
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
	    extensions: ['', '.js', '.jsx']
	  }
}