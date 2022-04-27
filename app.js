const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("./src/setting/mongoose");
const cors = require('./src/setting/koa2-cors')
const bodyParser = require("koa-bodyparser");
const user = require("./src/api/user");
const app = new Koa();
app.use(cors).use(bodyParser()).use(user.routes());
app.listen(9000);
console.log("app started at port 9000...");
