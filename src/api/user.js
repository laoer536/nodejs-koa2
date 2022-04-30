const Router = require("koa-router");
const router = new Router({
  prefix: "/user",
});
import { UserForm } from "../models/user";

router.get("/", async (ctx) => {
  let users = await UserForm.find();
  ctx.success(users, "获取所有用户成功");
});

router.get("/getUserInfo", async (ctx) => {
  const { id } = ctx.params;
  ctx.success(`获取id为${id}的用户`);
});

router.post("/add", async (ctx) => {
  //
  await UserForm.create(ctx.request.body);
  ctx.success(ctx.request.body, "用户信息提交成功");
});

router.put("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.success(`修改id为${id}的用户`);
});

router.del("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.success(`删除id为${id}的用户`);
});

module.exports = router;
