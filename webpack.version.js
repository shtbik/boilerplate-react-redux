const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const { html, json } = require('./version.js')

function VersionPlugin(options) {
	console.log('App version: ', chalk.bold.green.inverse(options.ver))
}

VersionPlugin.prototype.apply = function(compiler) {
	compiler.plugin('done', function() {
		fs.writeFileSync('./static/index.html', html)
		fs.writeFileSync('./static/meta.json', json)
	})
}

module.exports = VersionPlugin
