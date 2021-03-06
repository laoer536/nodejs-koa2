const path = require('path')
require('babel-register')({
  plugins: ['babel-plugin-transform-es2015-modules-commonjs'],
})

require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.development'),
})

module.exports = require('../app.js')
