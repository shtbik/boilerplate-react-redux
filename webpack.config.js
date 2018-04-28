const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const _ = require('lodash')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const VersionPlugin = require('./webpack.version.js')
const pckg = require('./package.json')
const getStyleLoader = require('./webpack.style-loader')

const { join } = path

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'
const isDebug = !!process.env.DEBUG
const isInline = process.env.NODE_ENV === 'inline'
const cssChunkHash = isProd ? '.[contenthash:5]' : ''

const plugins = [
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'index.ejs'),
		inject: 'body',
	}),

	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(nodeEnv),
			VER: JSON.stringify(pckg.version),
		},
	}),
	new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en|ru/),

	new VersionPlugin({ ver: pckg.version }),
	new ProgressBarPlugin(),
]

if (isProd) {
	plugins.push(new CleanWebpackPlugin('static'))
	plugins.push(new CopyWebpackPlugin([{ from: 'assets/' }]))
} else {
	plugins.push(new webpack.HotModuleReplacementPlugin())
	plugins.push(new webpack.SourceMapDevToolPlugin())
}

if (isDebug) {
	plugins.push(new RuntimeAnalyzerPlugin())
}

if (!isInline) {
	plugins.push(
		new MiniCssExtractPlugin({
			filename: `css/[name]${cssChunkHash}.css`,
		})
	)
}

const minimizer = isProd
	? [
			new OptimizeCSSAssetsPlugin({}),
			new UglifyJsPlugin({
				parallel: true,
			}),
		]
	: []

const modulePaths = {
	components: 'src/components',
	configs: 'src/configs',
	containers: 'src/containers',
	helpers: 'src/helpers',
	modules: 'src/modules',
	selectors: 'src/selectors',
	routes: 'src/routes',
	store: 'src/store',
	styles: 'src/styles',
	mocks: 'src/mocks',
	integrations: 'src/integrations',
}

const localGlobalStylesReg = /styles[\\\/][^]+.(css|less)/

const vendorStyles = modulePath => localGlobalStylesReg.test(modulePath) || /antd/.test(modulePath)

module.exports = {
	mode: isProd ? 'production' : 'development',

	optimization: {
		minimizer,
	},

	entry: './src/index.js',

	devServer: {
		publicPath: '/',
		contentBase: join(__dirname, 'assets'),
		historyApiFallback: true,
		hot: true,
		port: process.env.PORT || 3000,
		https: true,
		stats: 'errors-only',
	},

	output: {
		path: join(__dirname, 'static'),
		filename: 'bundle.js',
		publicPath: '/',
	},

	resolve: {
		extensions: ['.js', '.scss', '.less'],
		alias: _.mapValues(modulePaths, str => join(process.cwd(), ...str.split('/'))),
	},

	plugins,

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: __dirname,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(css|less)$/,
				exclude: vendorStyles,
				use: getStyleLoader(),
			},
			{
				test: /\.(css|less)$/,
				include: vendorStyles,
				use: getStyleLoader(true),
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'babel-loader',
					},
					{
						loader: 'react-svg-loader',
						options: {
							jsx: true, // true outputs JSX tags
						},
					},
				],
			},
			{
				test: /\.(jpg|jpeg|gif|png)$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '/img/[name].[ext]',
				},
			},
		],
	},
}
