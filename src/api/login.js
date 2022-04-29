const Router = require("koa-router");
const jwtToken = require("jsonwebtoken");
const router = new Router({
  prefix: "/login",
});
router.get("/", async (ctx) => {
  //payload中加入用户唯一信息 例如用户唯一id phoneNumber password等
  const token = jwtToken.sign({ uid: "123" }, process.env.JWT_SECRET, {
    expiresIn: "15d", //设置该token的过期时间
  });
  ctx.success(0, "获取token成功", token);
});

module.exports = router;
