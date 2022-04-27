const Router = require("koa-router");
const router = new Router({
  prefix: "/user",
});
import { UserForm } from "../models/user";

router.get("/", async (ctx) => {
  console.log("查询参数", ctx.query);
  ctx.body = "获取用户列表";
  return ctx;
});

router.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `获取id为${id}的用户`;
  return ctx;
});

router.post("/add", async (ctx) => {
  // ctx.body = `创建用户`;
  console.log(ctx.request.body);
  try {
    await UserForm.create(ctx.request.body);
    ctx.response.body = {
      rsCode: 0,
      rsCause: "请求成功",
      data: ctx.request.body,
    };
  } catch (e) {
    ctx.response.body = {
      rsCode: -1,
      rsCause: e.errors.name.message,
      data: e.errors.name.message,
    };
  }
});

router.put("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `修改id为${id}的用户`;
  return ctx;
});

router.del("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `删除id为${id}的用户`;
  return ctx;
});

module.exports = router;