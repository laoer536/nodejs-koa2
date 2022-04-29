const Koa = require("koa");
const mongoose = require("./src/setting/mongoose");
const cors = require("./src/setting/koa2-cors");
const jwt = require("./src/setting/jwt");
const koaBody = require("./src/setting/koa-body");
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
      ctx.body = {
        rsCode: 50001,
        rsCause: "用户鉴权失败",
      };
    } else {
      throw err;
    }
  });
});

//基础部分
app.use(cors).use(koaBody).use(jwt).use(routerResponse);
//api部分
app.use(user.routes()).use(login.routes()).use(file.routes());
app.listen(9000);
console.log("app started at port 9000...");
