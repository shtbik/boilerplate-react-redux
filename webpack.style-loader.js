const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'
const isInline = process.env.NODE_ENV === 'inline'

const loaderConfigs = {
	vendor: [
		{
			loader: 'css-loader',
			options: {
				sourceMap: !isProd,
			},
		},
		{
			loader: 'postcss-loader',
			options: { sourceMap: !isProd },
		},
		{
			loader: 'less-loader',
			options: { sourceMap: !isProd },
		},
	],
	app: [
		{
			loader: 'css-loader',
			options: {
				modules: true,
				camelCase: true,
				localIdentName: '[folder]__[local]--[hash:base64:5]',
				importLoaders: 2,
				sourceMap: !isProd,
			},
		},
		{
			loader: 'postcss-loader',
			options: { sourceMap: !isProd },
		},
		{
			loader: 'less-loader',
			options: {
				paths: [path.resolve(__dirname, 'src/styles')],
				sourceMap: !isProd,
			},
		},
	],
}

const cssExtractLoader = ['css-hot-loader', MiniCssExtractPlugin.loader]

const getStyleLoader = isVendor => {
	let config = []

	if (isVendor) {
		config = loaderConfigs.vendor
	} else {
		config = loaderConfigs.app
	}

	if (isInline) {
		config = [{ loader: 'style-loader' }, ...config]
	} else {
		config = [...cssExtractLoader, ...config]
	}

	return config
}

module.exports = getStyleLoader
