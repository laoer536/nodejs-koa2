const path = require('path')
const argv = require('minimist')(process.argv.slice(2));
require('babel-register')({
  plugins: ['babel-plugin-transform-es2015-modules-commonjs'],
})
require('dotenv').config({
  path: path.resolve(process.cwd(),`.env.${argv.mode}`),
})
console.log('当前环境',process.env)

module.exports = require('../app.js')
