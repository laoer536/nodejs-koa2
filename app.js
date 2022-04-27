const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const cors = require("koa2-cors");
const db = mongoose.connect("mongodb://localhost:27017/test");
const bodyParser = require("koa-bodyparser");
const user = require("./src/api/user");
import { setting } from "./src/setting/koa2-cors";
const app = new Koa();
app.use(cors(setting)).use(bodyParser()).use(user.routes());
app.listen(9000);
console.log("app started at port 9000...");