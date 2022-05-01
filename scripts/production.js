const path = require("path");
require("babel-register")({
  plugins: ["babel-plugin-transform-es2015-modules-commonjs"],
});

require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.production.local"), //这里我在根目录下新建.env.production.local环境变量文件 你也可以选择就加载.env.production
});

module.exports = require("../app.js");
