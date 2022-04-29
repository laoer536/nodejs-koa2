const Router = require("koa-router");
const sendfile = require("koa-sendfile");
const fs = require("fs");
const router = new Router({
  prefix: "/file",
});

router.post("/upload", async (ctx) => {
  // 上传文件
  const { filepath, originalFilename } = ctx.request.files.file; // 获取上传文件
  const reader = fs.createReadStream(filepath);
  let filePath = `upload/${Math.random().toString()}-${originalFilename}`; //储存在node服务中的upload文件夹下
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  const resData = {
    fileUrl: `${process.env.KOA_CORS_ORIGIN}/${filePath}`, //前面那个部分后期可以替换为其他可以访问的前缀 这里本地测试用
  };
  ctx.success(0, "文件上传成功", resData);
});

router.get("/download", async (ctx) => {
  // 下载文件
  console.log("ctx.request.query", ctx.request.query);
  const { fileName } = ctx.request.query;
  const path = `upload/${fileName}`;
  console.log(path);
  ctx.attachment(decodeURI(path)); //url编码 转换容易引起歧义的字符 例如中文字符
  await sendfile(ctx, path); //前端页面需要对文件名进行decodeURIComponent解码 解码后能够拿到真正的名字
  //另外 前端需要从返回体中获取文件名给a标签 从里面的headers的content-disposition中截取获得---》》》 res.headers["content-disposition"]
});

module.exports = router;
