const Koa = require("koa");
const mongoose = require("./src/setting/mongoose");
const cors = require("./src/setting/koa2-cors");
const jwt = require("./src/setting/jwt");
const koaBody = require("./src/setting/koa-body");
const koaStatic = require("./src/setting/koa-static");
const htmlHistory = require("./src/setting/html-history");
const app = new Koa();
const routerResponse = require("./src/setting/routerResponse");

//api部分
const user = require("./src/api/user");
const login = require("./src/api/login");
const file = require("./src/api/file");

//token鉴权
app.use(async (ctx, next) => {
  //配合鉴权
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.fail(-1, "没有权限访问");
    } else {
      throw err;
    }
  });
});

//基础部分
app.use(cors).use(koaBody).use(routerResponse).use(jwt);
//api部分
app.use(user.routes()).use(login.routes()).use(file.routes());
//静态页面托管
app.use(htmlHistory).use(koaStatic);
app.listen(9000);
console.log("app started at port 9000...");
