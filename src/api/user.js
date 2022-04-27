const Router = require("koa-router");
const router = new Router({
  prefix: "",
});
import { UserForm } from "../models/user";

router.get("/user", async (ctx) => {
  console.log("查询参数", ctx.query);
  ctx.body = "获取用户列表";
  return ctx;
});

router.get("/user/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `获取id为${id}的用户`;
  return ctx;
});

router.post("/postUser", async (ctx) => {
  // ctx.body = `创建用户`;
  console.log(ctx.request.body);
  let res = await UserForm.create(ctx.request.body);
  console.log(res);
  ctx.response.body = {
    rsCode: 0,
    rsCause: "请求成功",
    data: ctx.request.body,
  };
});

router.put("/user/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `修改id为${id}的用户`;
  return ctx;
});

router.del("/user/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `删除id为${id}的用户`;
  return ctx;
});

module.exports = router;
