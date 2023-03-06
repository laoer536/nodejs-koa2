const { readFileSync, writeFileSync } = require('fs')
const data = readFileSync('apidoc/index.html', { encoding: 'utf-8' })
const dealPathData = data.replaceAll('assets', 'apidoc/assets')
writeFileSync('apidoc/index.html', dealPathData)
