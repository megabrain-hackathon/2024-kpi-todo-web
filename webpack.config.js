const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env',
							'@babel/preset-react',
							'@babel/preset-typescript',
						],
					},
				},
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			templateParameters: {
				PUBLIC_URL: 'https://kpitodo.jadru.com',
			},
		}),
		new Dotenv({
			path: './.env.development',
		}),
	],
	devServer: {
		historyApiFallback: true,
		static: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000,
	},
};
