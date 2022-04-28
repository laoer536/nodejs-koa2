const Router = require("koa-router");
const path = require("path");
const fs = require("fs");
const router = new Router({
  prefix: "/file",
});
router.post("/add", async (ctx) => {
  // 上传多个文件
  console.log(ctx.request.body);
  const files = ctx.request.files.file; // 获取上传文件
  const urls = [];
  for (let file of files) {
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    let filePath =
      path.join(__dirname, "public/upload/") + `/${new Date()}-${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    urls.push(filePath);
  }
  ctx.response.body = {
    rsCode: 200,
    rsCause: "上传成功",
    data: {
      urls,
    },
  };
});

module.exports = router;
