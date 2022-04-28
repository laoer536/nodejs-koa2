const jwt = require("koa-jwt");
module.exports = jwt({
  secret: process.env.JWT_SECRET,
}).unless({ path: [/^\/public/, /\/login/] }); //token鉴权忽略public和login开头的接口
//koa-jwt默认配置下 前端axios的请求拦截的headers里面这样设置 config.headers["authorization"] = `Bearer ${token}`; 其中token是登录接口生成的
