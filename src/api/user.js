const Router = require("koa-router");
const router = new Router({
  prefix: "/api",
});

router
  .get("/", async (ctx) => {
    console.log("查询参数", ctx.query);
    ctx.body = "获取用户列表";
  })
  .get("/:id", async (ctx) => {
    const { id } = ctx.params;
    ctx.body = `获取id为${id}的用户`;
  })
  .post("/", async (ctx) => {
    ctx.body = `创建用户`;
  })
  .put("/:id", async (ctx) => {
    const { id } = ctx.params;
    ctx.body = `修改id为${id}的用户`;
  })
  .del("/:id", async (ctx) => {
    const { id } = ctx.params;
    ctx.body = `删除id为${id}的用户`;
  })
  .all("/users/:id", async (ctx) => {
    ctx.body = ctx.params;
  });

module.exports = router;
