const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const cors = require("koa2-cors");
const db = mongoose.connect("mongodb://localhost:27017/admin");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
app.use(bodyParser()); // 解析request的body

const router = new Router({
  prefix: "/api", //基础前缀  如果不需要前缀修改为‘/’
});

// 账户的数据库模型
let UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
});
let User = mongoose.model("HHHH", UserSchema);
// 新增数据
let user = {
  username: "ydj",
  password: "123123",
  email: "",
};

let newUser = new User(user);
newUser.save();

router.get("/", async (ctx, next) => {
  let val = null;
  const data = await User.find();
  console.log("data", data);
  const result = {
    code: 200,
    response: data,
    ts: 12345,
  };
  ctx.response.body = result;
  return result;
});
app
  .use(
    cors({
      origin: function (ctx) {
        //设置允许来自指定域名请求
        return "http://localhost:9000"; //只允许http://localhost:8080这个域名的请求
      },
      maxAge: 5, //指定本次预检请求的有效期，单位为秒。
      credentials: true, //是否允许发送Cookie
      allowMethods: ["GET", "POST", "PUT", "DELETE"], //设置所允许的HTTP请求方法
      allowHeaders: ["Content-Type", "Authorization", "Accept"], //设置服务器支持的所有头信息字段
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization"], //设置获取其他自定义字段
    })
  )
  .use(router.routes());
app.listen(9000);
console.log("app started at port 9000...");
