const pug = require('pug')
const pckg = require('./package.json')

const fn = pug.compileFile('index.pug', { pretty: true })
const html = fn({ version: pckg.version })
const json = JSON.stringify({ version: pckg.version })

module.exports = { html, json }
