require("babel-register")({
  plugins: ["babel-plugin-transform-es2015-modules-commonjs"],
});

require('dotenv').config({ path: '.env' })

module.exports = require("./app.js");
