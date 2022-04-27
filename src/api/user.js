const Router = require("koa-router");
const router = new Router({
  prefix: "/api",
});

router.get("/", async (ctx) => {
  console.log("查询参数", ctx.query);
  ctx.body = "获取用户列表";
});

router.get("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `获取id为${id}的用户`;
});

router.post("/", async (ctx) => {
  ctx.body = `创建用户`;
});

router.put("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `修改id为${id}的用户`;
});

router.del("/:id", async (ctx) => {
  const { id } = ctx.params;
  ctx.body = `删除id为${id}的用户`;
});

module.exports = router;
