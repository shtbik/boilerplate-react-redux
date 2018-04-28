const pckg = require('./package.json')

const json = JSON.stringify({ version: pckg.version })
module.exports = { json }
