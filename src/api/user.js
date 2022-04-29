const Router = require("koa-router");
const router = new Router({
  prefix: "/user",
});
import { UserForm } from "../models/user";

router.get("/", async (ctx) => {
  ctx.response.body = await UserForm.find();
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
    ctx.success(0, "用户信息提交成功", ctx.request.body);
    console.log("ctx.status", ctx.status);
  } catch (e) {
    console.log("ctx.status", ctx.status);
    console.log(e);
    ctx.fail(-1, e._message);
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
