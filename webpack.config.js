var webpack = require('webpack');

var isProduction = !1;

var config = {
	entry: __dirname + '/assets/js/App.jsx',
	output: {
		path: __dirname + '/',
		publicPath: "/",
		filename: 'bundle.js',
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"development"',
			DEVELOPMENT: true,
			DEBUG: true,
		}),
	],
	watch: true,
	module: {
		loaders: [
			{ test: /\.js$/, loader: "babel-loader", query: {compact: false} },
			{ test: /\.jsx$/, loader: "react-hot!babel"},
			{ test: /\.json$/, loader: "json-loader" },
			{ test: /\.css/, loader: 'style-loader!css-loader' },
			{ test: /\.less$/, loader:  'style!css!less' },
			// { test: /\.gif$/, loader: "url-loader?limit=10000&mimetype=image/gif" },
			// { test: /\.jpg$/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
			// { test: /\.png$/, loader: "url-loader?limit=10000&mimetype=image/png" },
			// { test: /\.svg/, loader: "url-loader?limit=26000&mimetype=image/svg+xml" },
		]
	}
};

if (isProduction) {

	config.output.filename = 'bundle.min.js';

	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	);

	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"',
			DEVELOPMENT: false,
			DEBUG: false,
		})
	);
}

module.exports = config;