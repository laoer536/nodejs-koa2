const fs = require("fs");
const htmlHistory = async (ctx, next) => {
  // history 中间件
  const path = "/web/"; // 需要判断的路径
  await next(); // 等待请求执行完毕
  if (ctx.response.status === 404 && ctx.request.url.includes(path)) {
    // 判断是否符合条件
    ctx.type = "text/html; charset=utf-8"; // 修改响应类型
    ctx.body = fs.readFileSync("." + path + "index.html"); // 修改响应体
  }
};
module.exports = htmlHistory;
