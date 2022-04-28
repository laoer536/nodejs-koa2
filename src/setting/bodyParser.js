const bodyParser = require("koa-bodyparser");
module.exports = bodyParser({
  multipart: true, //支持文件上传解析
  formidable: {
    maxFileSize: 30 * 1024 * 1024, // 设置上传文件大小最大限制，这里设置为30M
  },
});
