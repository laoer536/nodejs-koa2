const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("./src/setting/mongoose");
const cors = require('./src/setting/koa2-cors')
const jwt = require('./src/setting/jwt')
const bodyParser = require("koa-bodyparser");

console.log("111",process.env)

//api部分
const user = require("./src/api/user");
const login = require("./src/api/login")

const app = new Koa();

app.use(async (ctx, next) => { //配合鉴权
    return next().catch((err) => {
        if (err.status === 401 ) {
            ctx.body = {
                code: 50001,
                message: '用户鉴权失败',
            };
        } else {
            throw err;
        }
    });
});

app.use(cors).use(bodyParser()).use(jwt).use(user.routes()).use(login.routes());
app.listen(9000);
console.log("app started at port 9000...");
