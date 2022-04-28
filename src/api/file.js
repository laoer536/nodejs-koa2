const Router = require("koa-router");
const path = require("path");
const fs = require("fs");
const router = new Router({
  prefix: "/file",
});
router.post("/add", async (ctx) => {
  // 上传文件
  const { filepath, originalFilename } = ctx.request.files.file; // 获取上传文件
  const reader = fs.createReadStream(filepath);
  let filePath = `upload/${Math.random().toString()}-${originalFilename}`; //储存在node服务中的upload文件夹下
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);

  console.log(process.env);

  ctx.response.body = {
    rsCode: 200,
    rsCause: "上传成功",
    data: {
      fileUrl: `${process.env.INIT_CWD}/${filePath}`, //前面那个部分后期可以替换为其他可以访问的前缀 这里本地测试用
    },
  };
});

module.exports = router;
