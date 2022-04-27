export const setting = {
  origin: "http://localhost:9000", //只允许http://localhost:8080这个域名的请求
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  allowMethods: ["GET", "POST", "PUT", "DELETE"], //设置所允许的HTTP请求方法
  allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
  exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
};
